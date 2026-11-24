// AI-assisted: see AI-ATTRIBUTION.md
import { randomUUID } from "node:crypto";
import type { AuthTokenDto } from "tweeter-shared";
import type { SessionDAO } from "../dao/SessionDAO";

export class AuthorizationService {
  public constructor(
    private readonly sessions: SessionDAO,
    private readonly idleTimeoutMs: number,
  ) {}

  public async start(alias: string): Promise<AuthTokenDto> {
    const token = randomUUID();
    const timestamp = Date.now();

    await this.sessions.create(token, alias, timestamp + this.idleTimeoutMs);
    return { token, timestamp };
  }

  public async requireUser(token: string): Promise<string> {
    if (typeof token !== "string" || !token) {
      throw new Error("unauthorized: Please sign in");
    }

    const now = Date.now();
    const alias = await this.sessions.refresh(
      token,
      now,
      now + this.idleTimeoutMs,
    );

    if (alias === null) {
      throw new Error(
        "unauthorized: Session expired or invalid. Please sign in.",
      );
    }

    return alias;
  }

  public async logout(token: string): Promise<void> {
    if (typeof token !== "string" || !token) {
      throw new Error("unauthorized: Please sign in");
    }

    const revoked = await this.sessions.revoke(token, Date.now());
    if (!revoked) {
      throw new Error(
        "unauthorized: Session expired or invalid. Please sign in.",
      );
    }
  }
}
