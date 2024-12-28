import React from 'react';
import Image from 'next/image';

interface BlogPostProps {
  blog: {
    id: string;
    Content: string;
    Description: string;
    image?: string;  // Optional image URL
  }[];
}

export default function BlogPost({ blog }: BlogPostProps) {
  if (!blog || blog.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No blog posts available.</p>
        <a href="/create-blog" className="text-blue-500 hover:underline mt-4 block">
          Create a new post
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blog.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Image Section */}
          {post.image && (
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.Content}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{post.Content}</h2>
            <p className="text-gray-600 text-base">{post.Description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
