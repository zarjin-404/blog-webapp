import React from 'react';

interface BlogPostProps {
  blog: {
    id: string;
    Content: string;
    Description: string;
  }[];
}

export default function BlogPost({ blog }: BlogPostProps) {
  if (!blog || blog.length === 0) {
    return <p className="text-gray-500">No blog posts available.</p>;
  }

  return (
    <>
      {blog.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-xl font-bold text-gray-800">{post.Content}</h2>
          <p className="text-gray-600">{post.Description}</p>
        </div>
      ))}
    </>
  );
}
