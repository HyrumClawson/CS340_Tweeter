import type { UserDto } from "tweeter-shared";

export interface StoredUser {
  profile: UserDto;
  passwordHash: string;
  followerCount: number;
  followeeCount: number;
}

export interface UserDAO {
  find(alias: string): Promise<StoredUser | null>;
  create(profile: UserDto, passwordHash: string): Promise<boolean>;
}
