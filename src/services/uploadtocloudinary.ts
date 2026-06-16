import cloudinary from "@/src/services/cloudinary";
import type { UploadApiOptions, UploadApiResponse } from "cloudinary";

export const uploadtocloudinary = (
  buffer: Buffer,
  folder = "team",
  options: UploadApiOptions = {},
): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto", ...options },
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
