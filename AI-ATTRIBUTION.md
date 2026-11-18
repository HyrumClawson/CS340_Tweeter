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
