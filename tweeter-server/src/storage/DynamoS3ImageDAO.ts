// AI-assisted: see AI-ATTRIBUTION.md
import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import type { S3Client } from "@aws-sdk/client-s3";
import type { ImageDAO } from "../model/dao/ImageDAO";

export class S3ImageDAO implements ImageDAO {
  public constructor(
    private readonly client: S3Client,
    private readonly bucket: string,
    private readonly region: string,
  ) {}

  public async upload(
    image: Uint8Array,
    contentType: string,
    extension: string,
  ): Promise<string> {
    const key = `profile-images/${randomUUID()}.${extension}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: image,
        ContentType: contentType,
      }),
    );

    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  public async remove(imageUrl: string): Promise<void> {
    const key = new URL(imageUrl).pathname.slice(1);

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }
}
