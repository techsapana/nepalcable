import cloudinary from "@/src/services/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export const uploadtocloudinary = (
  buffer: Buffer,
  folder = "team",
): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });
