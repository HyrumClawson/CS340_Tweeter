// AI-assisted: see AI-ATTRIBUTION.md
import type { StatusDto } from "tweeter-shared";

export type Timeline = "story" | "feed";

export interface StatusDAO {
  save(
    timeline: Timeline,
    ownerAliases: readonly string[],
    status: StatusDto,
  ): Promise<void>;

  page(
    timeline: Timeline,
    ownerAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[items: StatusDto[], hasMore: boolean]>;
}
