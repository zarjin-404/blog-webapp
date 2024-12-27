import { dataBases } from '../utils/appwrite';

interface Blog {
  id: string;
  Content: string;
  Description: string;
}

export const getBlog = async (): Promise<Blog[] | undefined> => {
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const collectionId = process.env.APPWRITE_COLLECTION_ID;

  if (!databaseId || !collectionId) {
    console.error(
      'Environment variables for Appwrite database or collection are not defined.',
    );
    return;
  }

  try {
    const response = await dataBases.listDocuments(databaseId, collectionId);
    const data: Blog[] = response.documents.map((doc) => ({
      id: doc.$id,
      Content: doc.Content,
      Description: doc.Description,
      ...doc,
    }));
    console.log('Fetched Blogs:', data);
    return data;
  } catch (error) {
    console.error('Get Blog Error:', error);
    throw error; // Rethrow the error for further upstream handling if necessary
  }
};
