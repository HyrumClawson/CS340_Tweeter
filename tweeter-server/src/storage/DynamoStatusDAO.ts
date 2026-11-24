// AI-assisted: see AI-ATTRIBUTION.md
import { createHash } from "node:crypto";
import { setTimeout } from "node:timers/promises";
import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import type {
  BatchWriteCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import type { StatusDto } from "tweeter-shared";
import type { StatusDAO, Timeline } from "../model/dao/StatusDAO";
import { DynamoPagedDAO } from "./DynamoPagedDAO";

export class DynamoStatusDAO extends DynamoPagedDAO implements StatusDAO {
  public constructor(
    client: DynamoDBDocumentClient,
    private readonly tableName: string,
  ) {
    super(client);
  }

  public async save(
    timeline: Timeline,
    ownerAliases: readonly string[],
    status: StatusDto,
  ): Promise<void> {
    const statusKey = this.getStatusKey(status);
    const uniqueAliases = [...new Set(ownerAliases)];

    for (let offset = 0; offset < uniqueAliases.length; offset += 25) {
      const batch = uniqueAliases.slice(offset, offset + 25);
      let pending: NonNullable<BatchWriteCommandInput["RequestItems"]> = {
        [this.tableName]: batch.map((alias) => ({
          PutRequest: {
            Item: {
              timelineKey: this.getTimelineKey(timeline, alias),
              statusKey,
              status,
            },
          },
        })),
      };

      for (let attempt = 0; ; attempt++) {
        const result = await this.client.send(
          new BatchWriteCommand({ RequestItems: pending }),
        );

        const unprocessed = result.UnprocessedItems?.[this.tableName];
        if (!unprocessed?.length) {
          break;
        }
        if (attempt === 5) {
          throw new Error(
            "internal-server-error: Could not save all status copies",
          );
        }

        pending = { [this.tableName]: unprocessed };
        await setTimeout(100 * 2 ** attempt);
      }
    }
  }

  public async page(
    timeline: Timeline,
    ownerAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    const timelineKey = this.getTimelineKey(timeline, ownerAlias);

    return this.readPage(
      {
        TableName: this.tableName,
        ConsistentRead: true,
        KeyConditionExpression: "timelineKey = :timeline",
        ExpressionAttributeValues: { ":timeline": timelineKey },
        ExclusiveStartKey: lastItem
          ? { timelineKey, statusKey: this.getStatusKey(lastItem) }
          : undefined,
        ScanIndexForward: false,
      },
      pageSize,
      (item) => item.status as StatusDto,
    );
  }

  private getTimelineKey(timeline: Timeline, alias: string): string {
    return `${timeline}#${alias}`;
  }

  private getStatusKey(status: StatusDto): string {
    const timestamp = String(status.timestamp).padStart(16, "0");
    const tieBreaker = createHash("sha256")
      .update(JSON.stringify([status.user.alias, status.post]))
      .digest("hex");

    return `${timestamp}#${tieBreaker}`;
  }
}
