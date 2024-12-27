import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
    APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID: process.env.APPWRITE_COLLECTION_ID,
    APPWRITE_BUCKET_ID: process.env.APPWRITE_BUCKET_ID,
  },
};

export default nextConfig;
