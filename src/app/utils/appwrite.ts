import { Client, Databases, Storage } from 'appwrite';

export const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!);

export const storage = new Storage(client);
export const dataBases = new Databases(client);
