// AI-assisted: see AI-ATTRIBUTION.md
export interface SessionDAO {
  create(token: string, alias: string, expiresAt: number): Promise<void>;

  // Extend an active session and return its user's alias.
  // Return null if the token is missing, expired, or revoked.
  refresh(
    token: string,
    now: number,
    expiresAt: number,
  ): Promise<string | null>;

  // Invalidate an active session. Return false if there was no active session.
  revoke(token: string, now: number): Promise<boolean>;
}
