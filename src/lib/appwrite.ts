import { Client, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f11f8f0024cc9e39b6");
const storage = new Storage(client);
export async function uploadFileS3(file: File, id: string){
    const res =await storage.createFile("67f121170029fe2c7924", id, file);
    return res;
}
export { ID } from "appwrite";
