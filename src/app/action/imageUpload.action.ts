import { storage } from '../utils/appwrite';
import { ID } from 'appwrite';

export const uploadImage = async (file: File) => {
  try {
    const response = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID!,
      ID.unique(),
      file,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
