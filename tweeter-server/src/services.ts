// AI-assisted: see AI-ATTRIBUTION.md
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

import { AuthorizationService } from "./model/service/AuthorizationService";
import { UserService } from "./model/service/UserService";
import { DynamoSessionDAO } from "./storage/DynamoSessionDAO";
import { DynamoUserDAO } from "./storage/DynamoUserDAO";
import { S3ImageDAO } from "./storage/S3ImageDAO";
import { FollowService } from "./model/service/FollowService";
import { DynamoFollowDAO } from "./storage/DynamoFollowDAO";
import { StatusService } from "./model/service/StatusService";
import { DynamoStatusDAO } from "./storage/DynamoStatusDAO";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const region = getRequiredEnv("AWS_REGION");
const dynamoClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region }),
);
const s3Client = new S3Client({ region });

const userDao = new DynamoUserDAO(dynamoClient, getRequiredEnv("USERS_TABLE"));
const sessionDao = new DynamoSessionDAO(
  dynamoClient,
  getRequiredEnv("SESSIONS_TABLE"),
);
const imageDao = new S3ImageDAO(
  s3Client,
  getRequiredEnv("PROFILE_IMAGES_BUCKET"),
  region,
);

const idleTimeoutMs = 30 * 60 * 1000;
const authorizationService = new AuthorizationService(
  sessionDao,
  idleTimeoutMs,
);

export const userService = new UserService(
  userDao,
  imageDao,
  authorizationService,
);

const followDao = new DynamoFollowDAO(
  dynamoClient,
  getRequiredEnv("FOLLOWS_TABLE"),
  getRequiredEnv("USERS_TABLE"),
);

export const followService = new FollowService(
  followDao,
  userDao,
  authorizationService,
);
const statusDao = new DynamoStatusDAO(
  dynamoClient,
  getRequiredEnv("STATUSES_TABLE"),
);
export const statusService = new StatusService(
  statusDao,
  followDao,
  userDao,
  authorizationService,
);
