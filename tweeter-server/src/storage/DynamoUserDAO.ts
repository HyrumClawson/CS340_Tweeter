// AI-assisted: see AI-ATTRIBUTION.md
import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { UserDto } from "tweeter-shared";
import type { StoredUser, UserDAO } from "../model/dao/UserDAO";

export class DynamoUserDAO implements UserDAO {
  public constructor(
    private readonly client: DynamoDBDocumentClient,
    private readonly tableName: string,
  ) {}

  public async find(alias: string): Promise<StoredUser | null> {
    const { Item } = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { alias },
        ConsistentRead: true,
      }),
    );

    return (Item as StoredUser | undefined) ?? null;
  }

  public async create(
    profile: UserDto,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: {
            alias: profile.alias,
            profile,
            passwordHash,
            followerCount: 0,
            followeeCount: 0,
          },
          ConditionExpression: "attribute_not_exists(alias)",
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
}
