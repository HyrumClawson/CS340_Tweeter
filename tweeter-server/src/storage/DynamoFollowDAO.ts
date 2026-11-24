// AI-assisted: see AI-ATTRIBUTION.md
import { TransactionCanceledException } from "@aws-sdk/client-dynamodb";
import { GetCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { FollowDAO, FollowDirection } from "../model/dao/FollowDAO";
import { DynamoPagedDAO } from "./DynamoPagedDAO";

export class DynamoFollowDAO extends DynamoPagedDAO implements FollowDAO {
  public constructor(
    client: DynamoDBDocumentClient,
    private readonly tableName: string,
    private readonly usersTableName: string,
  ) {
    super(client);
  }
  public async exists(follower: string, followee: string): Promise<boolean> {
    const { Item } = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { follower_alias: follower, followee_alias: followee },
        ConsistentRead: true,
      }),
    );
    return Item !== undefined;
  }

  public async change(
    follower: string,
    followee: string,
    following: boolean,
  ): Promise<boolean> {
    const key = { follower_alias: follower, followee_alias: followee };
    const relationshipChange = following
      ? {
          Put: {
            TableName: this.tableName,
            Item: key,
            ConditionExpression: "attribute_not_exists(follower_alias)",
          },
        }
      : {
          Delete: {
            TableName: this.tableName,
            Key: key,
            ConditionExpression: "attribute_exists(follower_alias)",
          },
        };

    const delta = following ? 1 : -1;
    const updateCount = (alias: string, field: string) => ({
      Update: {
        TableName: this.usersTableName,
        Key: { alias },
        ConditionExpression: "attribute_exists(#alias)",
        UpdateExpression: "ADD #count :delta",
        ExpressionAttributeNames: { "#alias": "alias", "#count": field },
        ExpressionAttributeValues: { ":delta": delta },
      },
    });

    try {
      await this.client.send(
        new TransactWriteCommand({
          TransactItems: [
            relationshipChange,
            updateCount(follower, "followeeCount"),
            updateCount(followee, "followerCount"),
          ],
        }),
      );
      return true;
    } catch (error) {
      if (
        error instanceof TransactionCanceledException &&
        error.CancellationReasons?.[0]?.Code === "ConditionalCheckFailed"
      ) {
        return false;
      }
      throw error;
    }
  }

  public async page(
    alias: string,
    direction: FollowDirection,
    pageSize: number,
    lastAlias?: string,
  ): Promise<[string[], boolean]> {
    const byFollowee = direction === "followers";
    const partitionKey = byFollowee ? "followee_alias" : "follower_alias";
    const sortKey = byFollowee ? "follower_alias" : "followee_alias";

    return this.readPage(
      {
        TableName: this.tableName,
        IndexName: byFollowee ? "follow_index" : undefined,
        ConsistentRead: byFollowee ? undefined : true,
        KeyConditionExpression: "#partition = :alias",
        ExpressionAttributeNames: { "#partition": partitionKey },
        ExpressionAttributeValues: { ":alias": alias },
        ExclusiveStartKey: lastAlias
          ? { [partitionKey]: alias, [sortKey]: lastAlias }
          : undefined,
      },
      pageSize,
      (item) => item[sortKey] as string,
    );
  }
}
