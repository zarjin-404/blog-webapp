import { dataBases } from '../utils/appwrite';
import { ID } from 'appwrite';


interface BlogData {
  Content: string;
  Description: string;
  image?: string | null;

}

export const createBlog = async (blogData: BlogData): Promise<void> => {
  const { Content, Description, } = blogData;

  if (!Content || !Description) {
    throw new Error('Content and Description cannot be empty.');
  }

  try {
    await dataBases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COLLECTION_ID!,
      ID.unique(),
      { Content, Description },
    );
    console.log('Blog created successfully.');
  } catch (error) {
    console.error('Create Blog Error:', error);
    throw error; // Rethrow the error for upstream handling
  }



};
