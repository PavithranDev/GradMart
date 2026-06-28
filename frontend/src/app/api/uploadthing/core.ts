import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define an endpoint that strictly accepts images ONLY.
  // This enforces the user's rule to prevent source code uploads.
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      // In a real app, verify user session here
      return { uploadedAt: Date.now() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
