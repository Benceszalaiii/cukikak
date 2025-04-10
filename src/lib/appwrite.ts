import { Client, ID, Storage } from "node-appwrite";
const client = new Client().setKey(process.env.APPWRITE_KEY || "23");

const shopBucketId = "67f7a3720004a0d3e889";
const galleryBucketId = "67f121170029fe2c7924";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f11f8f0024cc9e39b6");
const storage = new Storage(client);

export async function uploadFileS3(file: File, id: string) {
  const res = await storage.createFile(galleryBucketId, id, file);
  return res;
}

export async function uploadProductImageS3(file: File) {
  const res = await storage.createFile(shopBucketId, ID.unique(), file);
  return res;
}

export async function deleteProductImageS3(id: string) {
  const res = await storage.deleteFile(shopBucketId, id);
  return res;
}
export { ID } from "appwrite";
