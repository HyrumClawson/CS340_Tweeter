// AI-assisted: see AI-ATTRIBUTION.md
export interface ImageDAO {
  upload(
    image: Uint8Array,
    contentType: string,
    extension: string,
  ): Promise<string>;

  remove(imageUrl: string): Promise<void>;
}
