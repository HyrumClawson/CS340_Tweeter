## 2026-11-13: Milestone 3 planning

- Tool: ChatGPT
- Task: Helped break the Milestone 3 specs into a three-day work plan
  and suggested starting with Get Followees to test the full request path.
- Review: I provided the specs and my Friday time budget. This task was
  planning only, with no code written or changed.

## 2026-11-17 — Get Followees SAM deployment

- Tool: ChatGPT
- Task: Reviewed my SAM template and helped troubleshoot S3, CloudFormation, and IAM permissions.
- Review: I applied the changes, deployed the stack, and tested Get Followees in Lambda and API Gateway.

## 2026-11-17 — Get Followees client integration

- Tool: ChatGPT
- Task: Reviewed the course’s networking code and suggested how to connect `FollowService` to `ServerFacade`.
- Review: I wired up the client and verified two successful requests to the deployed endpoint in browser DevTools.

## 2026-11-17 — Git push troubleshooting

- Tool: ChatGPT
- Task: Helped identify tracked SAM build files and dependencies and suggested how to remove them from the unpushed commits.
- Review: I confirmed the generated files were tracked and the commits were still local.

## 2026-11-17: Follower and followee counts

- Tool: ChatGPT (Codex)
- Task: Helped review request/response types, Lambdas, and frontend wiring. Drafted SAM configuration and test requests.
- Review: Reviewed the changes and tested both count endpoints in AWS and the browser.

## 2026-11-18: Is-follower status

- Tool: ChatGPT (Codex)
- Task: Helped review the boolean response and Lambda, and drafted SAM configuration and a test request.
- Review: Reviewed the changes and tested the endpoint through the browser.

## 2026-11-18: Follow and unfollow

- Tool: ChatGPT (Codex)
- Task: Helped review request/response types, Lambdas, and frontend handling of returned counts. Drafted SAM configuration and test requests.
- Review: Reviewed the changes and tested both operations in AWS and the browser.

## 2026-11-18: Login endpoint

- Tool: ChatGPT (Codex)
- Task: Helped review login code, draft SAM configuration, and troubleshoot the frontend request URL.
- Review: Reviewed the changes and tested login in Lambda, API Gateway, and the browser.

## 2026-11-18: Registration endpoint

- Tool: ChatGPT (Codex)
- Task: Drafted RegisterRequest and SAM configuration, explained Base64 image handling, and reviewed the Lambda and server service.
- Review: Reviewed the changes and tested registration in the browser.

## 2026-11-18: Logout endpoint

- Tool: ChatGPT (Codex)
- Task: Reviewed backend logout code and drafted SAM configuration, test requests, and frontend facade/service methods.
- Review: Reviewed the changes and confirmed the browser request returned HTTP 200 with the expected response.

## 2026-11-18: Get user by alias

- Tool: ChatGPT (Codex)
- Task: Drafted request/response interfaces, Lambda and service examples, SAM configuration, IAM permission entry, and a test request. Reviewed my implementation.
- Review: Reviewed the changes and tested the endpoint through the browser.

## 2026-11-18: Post status

- Tool: ChatGPT (Codex)
- Task: Helped define StatusDto and PostStatusRequest, reviewed backend code, and drafted SAM configuration, an IAM permission entry, and a test request.
- Review: Reviewed the changes and confirmed the browser request returned HTTP 200 with success.

## 2026-11-18: Status DTO conversion

- Tool: ChatGPT (Codex)
- Task: Reviewed DTO conversion methods and provided code for the dto getter and null handling in fromDto.
- Review: Reviewed the conversion code and tested posting a status through the browser.

## 2026-11-18: Feed and story endpoints

- Tool: ChatGPT (Codex)
- Task: Drafted paged status interfaces, a shared fake-data helper, SAM configuration, IAM permission entries, and test requests. Reviewed Lambdas and frontend wiring and helped resolve a stale dependency layer.
- Review: Reviewed the changes and tested both endpoints in AWS and the browser.

## 2026-11-18: Feed and story navigation

- Tool: ChatGPT (Codex)
- Task: Identified missing React keys in App.tsx and provided keys to reset the scroller when switching tabs.
- Review: Added the keys and confirmed feed and story called their respective endpoints.

## 2026-11-18: Integration tests

- Tool: ChatGPT (Codex)
- Task: Reviewed Jest configuration and drafted integration tests for registration, followers, follower count, and successful story retrieval.
- Review: Tested execution and reviewed. All four tests passed.

## 2026-11-18: AI attribution log

- Tool: ChatGPT (Codex)
- Task: Drafted summarized attribution entries describing AI assistance throughout milestone 3.
- Review: I went through and reviewed all that the AI model gave me.

## Milestone 3 — ChatGPT attribution

- **API implementation and pass-off prep:** I used ChatGPT to review how my client, API Gateway, Lambda handlers, and server services work together. It helped me check how login returns an authentication token, how later requests pass that token to the server, and which endpoint configuration steps SAM already handles. It also helped me review error handling and prepare to explain my implementation at pass-off.
- **UML sequence diagram:** ChatGPT traced the successful post-status flow through the source files I shared and drafted the sequence diagram PDF. The diagram follows the request from `PostStatus.submitPost()` through the client and AWS layers to the success message on the component listener.
- **API documentation:** ChatGPT drafted short descriptions for all 14 POST endpoints and walked me through publishing the documentation to `prod` and exporting Swagger with API Gateway extensions. I entered the descriptions in API Gateway and exported the YAML.
- **Swagger review:** ChatGPT reviewed both exports, identified five blank or incorrect descriptions in the first one, and confirmed that I corrected all five in the second. It also checked that all 14 POST endpoints had `200`, `400`, and `500` integration mappings and flagged a typo in the `/followee/list` description.
- Review: I checked the UML sequence diagram chatgpt generated. Everything else seems in order as well.

## 2026-11-23: tweeter-server/src/model/dao/UserDAO.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted the `UserDAO` interface for finding and creating users. Defined `StoredUser` so the password hash stays separate from the profile sent to the client.
- Review: checked the interface and seems correct.

## 2026-11-23: tweeter-server/src/model/dao/SessionDAO.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted the `SessionDAO` interface for creating, refreshing, and revoking sessions. Explained how an active session gets a new expiration after a protected request.
- Review: Checked the interface and seems correct.

## 2026-11-23: tweeter-server/src/model/service/AuthorizationService.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted `AuthorizationService` to issue tokens, check and refresh sessions, and handle logout. Explained how the constructor receives a `SessionDAO` implementation.
- Review: checked the implementation and seems good.

## 2026-11-23: tweeter-server/tsconfig.json, tweeter-server/package.json, tweeter-server/package-lock.json

- Tool: ChatGPT (Codex)
- Task: Helped resolve the `node:crypto` TypeScript error by suggesting `@types/node` and adding `node` to the server's TypeScript `types` setting.
- Review: added node with the specifications to the .tsconfig file and issue has been resolved.

## 2026-11-23: tweeter-server/src/storage/DynamoSessionDAO.ts (new file), tweeter-server/package.json, tweeter-server/package-lock.json

- Tool: ChatGPT (Codex)
- Task: Drafted the DynamoDB implementation of `SessionDAO` and identified the AWS SDK dependencies it needs. Explained why the interface lives under `model/dao` and the AWS implementation lives under `storage`.
- Review: Understand how all the AWS database side DAOs will be in storage. Reviewed the implementation and looks good.
