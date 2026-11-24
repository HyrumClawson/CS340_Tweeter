import { createHash } from "node:crypto";
import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { SessionDAO } from "../model/dao/SessionDAO";

export class DynamoSessionDAO implements SessionDAO {
  public constructor(
    private readonly client: DynamoDBDocumentClient,
    private readonly tableName: string,
  ) {}

  public async create(
    token: string,
    alias: string,
    expiresAt: number,
  ): Promise<void> {
    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: { ...this.key(token), alias, expiresAt },
        ConditionExpression: "attribute_not_exists(tokenHash)",
      }),
    );
  }

  public async refresh(
    token: string,
    now: number,
    expiresAt: number,
  ): Promise<string | null> {
    const key = this.key(token);

    try {
      const { Attributes } = await this.client.send(
        new UpdateCommand({
          TableName: this.tableName,
          Key: key,
          // Check and extend the session in one write.
          ConditionExpression: "expiresAt > :now AND expiresAt < :next",
          UpdateExpression: "SET expiresAt = :next",
          ExpressionAttributeValues: { ":now": now, ":next": expiresAt },
          ReturnValues: "ALL_NEW",
        }),
      );

      return Attributes?.alias ?? null;
    } catch (error) {
      if (!(error instanceof ConditionalCheckFailedException)) {
        throw error;
      }

      // Another request may have already extended the session at least this far.
      const { Item } = await this.client.send(
        new GetCommand({
          TableName: this.tableName,
          Key: key,
          ConsistentRead: true,
        }),
      );

      return Item && Item.expiresAt >= expiresAt ? Item.alias : null;
    }
  }

  public async revoke(token: string, now: number): Promise<boolean> {
    try {
      await this.client.send(
        new DeleteCommand({
          TableName: this.tableName,
          Key: this.key(token),
          ConditionExpression: "expiresAt > :now",
          ExpressionAttributeValues: { ":now": now },
        }),
      );

      return true;
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        return false;
      }
      throw error;
    }
  }

  private key(token: string): { tokenHash: string } {
    return { tokenHash: createHash("sha256").update(token).digest("hex") };
  }
}
