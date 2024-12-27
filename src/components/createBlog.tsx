'use client';
import React, { useState } from 'react';
import { createBlog } from '@/app/action/createBlog.action';

export default function CreateBlog() {
  const [Content, setContent] = useState('');
  const [Description, setDescription] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleCreateBlog = async () => {
    if (Content && Description) {
      await createBlog({ Content, Description });
      setContent('');
      setDescription('');
    } else {
      alert('Please fill in both Content and Description.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Content</label>
                  <input
                    type="text"
                    onChange={handleContentChange}
                    value={Content}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Blog title"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Description</label>
                  <textarea
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 h-32"
                    placeholder="Write your blog content here..."
                    onChange={handleDescriptionChange}
                    value={Description}
                  />
                </div>
                <button
                  onClick={handleCreateBlog}
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600"
                >
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
