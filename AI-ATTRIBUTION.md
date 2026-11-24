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

## 2026-11-23: tweeter-server/src/storage/DynamoUserDAO.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted the DynamoDB implementation of `UserDAO` for looking up users by alias and creating user records. Explained how the conditional write prevents duplicate aliases and how the constructor receives the DynamoDB client and table name.
- Review: Looked through the implementation and it looks like it should provide all the functionality the user service will need to have access to .

## 2026-11-23: tweeter-server/src/model/dao/ImageDAO.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted the interface for uploading profile images and removing them if registration fails after upload. Compared the planned Base64 decoding and S3 upload flow with the Milestone 4A example.
- Review: Went through and interface contains everything it should need for uploading an image correctly to the dynamoDb

## 2026-11-23: tweeter-server/src/storage/S3ImageDAO.ts (new file), tweeter-server/package.json, tweeter-server/package-lock.json

- Tool: ChatGPT (Codex)
- Task: Drafted the S3 implementation of `ImageDAO` and gave the command to install `@aws-sdk/client-s3`. The DAO uploads profile images, returns their URLs, and supports deleting an upload if registration needs to clean it up. Discussed using a bucket policy to grant browser read access to profile photos.
- Review: reviewed the interface and used the suggested commands to install the required dependencies

## 2026-11-23: tweeter-server/src/model/service/UserService.ts, tweeter-server/package.json, tweeter-server/package-lock.json

- Tool: ChatGPT (Codex)
- Task: Guided me as I rewrote `UserService` to use constructor injection and replaced its fake data. Provided the bcrypt password comparison, logout method, and image format helper. Reviewed my login, profile lookup, and registration code and identified fixes to the alias check, image cleanup, and returned session token.
- Review: Utilized codex to catch errors in my refactoring of the UserService class.

## 2026-11-23: tweeter-server/src/services.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted the wiring module that creates the AWS clients and concrete DAOs, injects the session DAO into `AuthorizationService`, and exports a configured `UserService`. The module reads resource names from environment variables and sets a 30-minute inactivity timeout.
- Review: Reviewed the implementation. It looks good.

## 2026-11-23: tweeter-server/src/lambda/user/LoginLambda.ts, RegisterLambda.ts, GetUserLambda.ts, LogoutLambda.ts

- Tool: ChatGPT (Codex)
- Task: Showed me how to replace each handler’s `new UserService()` call with an import of the configured `userService` from `services.ts`.
- Review: I updated the four handlers myself. After deploying, I verified that registration and login worked. I also checked DevTools and confirmed that a wrong password returned HTTP 400 with the expected error message.

## 2026-11-23: tweeter-server/template.yaml

- Tool: ChatGPT (Codex)
- Task: Drafted the SAM resources for the users and sessions tables, the S3 profile-image bucket, and its read policy. Explained how `!Ref` passes the deployed resource names to the Lambdas as environment variables.
- Review: I added the YAML myself and checked where it belonged in the template. After deploying, I registered test users and saw their profile photos load in the app.

## 2026-11-23: Lambda layer and deployment permissions

- Tool: ChatGPT (Codex)
- Task: Gave me commands to package `bcryptjs` and the AWS SDK packages in the Lambda layer. Helped diagnose the `s3:CreateBucket` error, drafted a bucket-scoped IAM policy, and explained how to attach it as a customer-managed policy when the inline policy limit blocked me.
- Review: I built and deployed the project myself. I applied the IAM fix, retried the deploy, and confirmed it succeeded.

## 2026-11-24: tweeter-server/src/model/dao/FollowDAO.ts (new file), tweeter-server/src/storage/DynamoFollowDAO.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted the follow DAO interface and its DynamoDB implementation. Explained how a transaction changes the relationship and both users’ counts together, and how the reverse index supports the Followers list.
- Review: I added the DAO files and verified follow and unfollow in the deployed app. I saw the followee count update and the test user appear in the Followees tab.

## 2026-11-24: tweeter-server/src/storage/DynamoPagedDAO.ts (new file), tweeter-server/src/storage/DynamoFollowDAO.ts

- Tool: ChatGPT (Codex)
- Task: Helped implement my idea to share database pagination in a parent class. Drafted the generic paging method and showed me how to call it from `DynamoFollowDAO`.
- Review: I updated `DynamoFollowDAO` myself. I checked that it still selects the query direction and maps rows to aliases, while the parent handles the cursor and `hasMore`. I verified the Followees list with a real relationship.

## 2026-11-24: tweeter-server/src/model/service/FollowService.ts

- Tool: ChatGPT (Codex)
- Task: Guided and reviewed my constructor, shared follow/unfollow helper, and paging methods. Helped me correct the follow/unfollow booleans and the `Promise.all()` and null-handling code. Provided the relationship-status method and shared count helper.
- Review: I wrote the constructor, follow/unfollow helper, and paging methods, then fixed issues from the review. I checked the difference between the signed-in alias and the profile alias being viewed. I tested follow and unfollow through the deployed UI.

## 2026-11-24: tweeter-server/src/services.ts, tweeter-server/template.yaml, follow handlers under tweeter-server/src/lambda/follow/

- Tool: ChatGPT (Codex)
- Task: Drafted the wiring for `followService` and the SAM configuration for `FollowsTable` and `follow_index`. Showed me how to update the handlers to import the configured service.
- Review: I added the wiring, table configuration, and handler imports myself. I deployed successfully. I used the profile URL and DevTools to troubleshoot a user lookup, then confirmed the follow and unfollow flow worked with registered accounts.

## 2026-11-24: tweeter-server/src/model/dao/StatusDAO.ts (new file), tweeter-server/src/storage/DynamoStatusDAO.ts (new file)

- Tool: ChatGPT (Codex)
- Task: Drafted the DAO interface and DynamoDB implementation for stored stories and feeds. Reused the shared paging parent and explained the timeline keys, newest-first ordering, and batch-write retries.
- Review: Pending. I still need to review and compile these files and verify them once the status service is wired in.
