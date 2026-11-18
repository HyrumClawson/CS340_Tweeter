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

//
//Requests
//
export type { PagedUserItemRequest } from "./model/net/request/PagedUserItemRequest";
export type { TweeterRequest } from "./model/net/request/TweeterRequest";
export type { FollowCountRequest } from "./model/net/request/FollowCountRequest";
export type { IsFollowerRequest } from "./model/net/request/IsFollowerRequest";

//
//Responses
//
export type { PagedUserItemResponse } from "./model/net/response/PagedUserItemResponse";
export type { TweeterResponse } from "./model/net/response/TweeterResponse"; //maybe change idk
export type { FollowCountResponse } from "./model/net/response/FollowCountResponse";
export type { IsFollowerResponse } from "./model/net/response/IsFollowerResponse";
//
//other
//

export { FakeData } from "./util/FakeData";
