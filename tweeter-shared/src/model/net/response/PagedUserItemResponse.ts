import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedUserItemResponse extends TweeterResponse {
  readonly items: UserDto[] | null; //should it be a UserDto array?
  readonly hasMore: boolean;
}
