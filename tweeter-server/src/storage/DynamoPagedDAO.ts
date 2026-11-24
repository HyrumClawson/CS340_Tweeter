// AI-assisted: see AI-ATTRIBUTION.md
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import type {
  DynamoDBDocumentClient,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";

export abstract class DynamoPagedDAO {
  protected constructor(protected readonly client: DynamoDBDocumentClient) {}

  protected async readPage<T>(
    query: QueryCommandInput,
    pageSize: number,
    mapItem: (item: Record<string, unknown>) => T,
  ): Promise<[items: T[], hasMore: boolean]> {
    if (!Number.isSafeInteger(pageSize) || pageSize < 1 || pageSize > 1000) {
      throw new Error("bad-request: Invalid page size");
    }

    const items: T[] = [];
    let startKey = query.ExclusiveStartKey;

    do {
      const result = await this.client.send(
        new QueryCommand({
          ...query,
          ExclusiveStartKey: startKey,
          Limit: pageSize + 1 - items.length,
        }),
      );

      for (const item of result.Items ?? []) {
        items.push(mapItem(item));
      }
      startKey = result.LastEvaluatedKey;
    } while (startKey && items.length <= pageSize);

    return [items.slice(0, pageSize), items.length > pageSize];
  }
}
