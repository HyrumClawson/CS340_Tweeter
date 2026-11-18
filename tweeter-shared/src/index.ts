// All classes that should be avaialble to other modules need to exported here. export * does not work when
// uploading to lambda. Instead we have to list each export.

//domain classes
export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

//
//DTOs
//
export type { UserDto } from "./model/dto/UserDto";
export type { AuthTokenDto } from "./model/dto/AuthTokenDto";

//
//Requests
//
export type { PagedUserItemRequest } from "./model/net/request/PagedUserItemRequest";
export type { TweeterRequest } from "./model/net/request/TweeterRequest";
export type { FollowCountRequest } from "./model/net/request/FollowCountRequest";
export type { IsFollowerRequest } from "./model/net/request/IsFollowerRequest";
export type { FollowActionRequest } from "./model/net/request/FollowActionRequest";
export type { LoginRequest } from "./model/net/request/LoginRequest";
export type { RegisterRequest } from "./model/net/request/RegisterRequest";
export type { LogoutRequest } from "./model/net/request/LogoutRequest";
export type { GetUserRequest } from "./model/net/request/GetUserRequest";

//
//Responses
//
export type { PagedUserItemResponse } from "./model/net/response/PagedUserItemResponse";
export type { TweeterResponse } from "./model/net/response/TweeterResponse"; //maybe change idk
export type { FollowCountResponse } from "./model/net/response/FollowCountResponse";
export type { IsFollowerResponse } from "./model/net/response/IsFollowerResponse";
export type { FollowActionResponse } from "./model/net/response/FollowActionResponse";
export type { AuthResponse } from "./model/net/response/AuthResponse";
export type { GetUserResponse } from "./model/net/response/GetUserResponse";
//
//other
//

export { FakeData } from "./util/FakeData";
