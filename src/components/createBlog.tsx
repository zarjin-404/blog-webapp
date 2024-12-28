'use client';
import React, { useState } from 'react';
import { createBlog } from '@/app/action/createBlog.action';
import Image from 'next/image';
import { uploadImage } from '@/app/action/imageUpload.action';

export default function CreateBlog() {
  const [formData, setFormData] = useState<{
    Content: string;
    Description: string;
    image: File | null;
    previewImage: string | null;
  }>({
    Content: '',
    Description: '',
    image: null,
    previewImage: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleCreateBlog = async () => {
    if (!formData.Content || !formData.Description) {
      alert('Please fill in both Content and Description.');
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedImageUrl: string | null = null;

      if (formData.image) {
        const imageUrl = await uploadImage(formData.image);
        if (typeof imageUrl === 'string') {
          uploadedImageUrl = imageUrl;
          alert('Image uploaded successfully');
        }
      }

      await createBlog({
        Content: formData.Content,
        Description: formData.Description,
        image: uploadedImageUrl,
      });

      alert('Blog created successfully');
      setFormData({ Content: '', Description: '', image: null, previewImage: null });
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4 flex flex-col justify-center items-center">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-2xl p-6 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Create Your Blog</h2>
        <div>
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
            Upload an Image
          </label>
          <div
            className="relative w-full h-48 border-4 border-dashed border-gray-300 rounded-lg flex justify-center items-center bg-gray-50 hover:border-blue-500 transition cursor-pointer"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Image
              src={formData.previewImage || '/placeholder-image.jpg'}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {!formData.previewImage && (
              <p className="absolute text-sm text-gray-500 font-medium">Click to upload an image</p>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="Content" className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            name="Content"
            id="Content"
            placeholder="Enter blog title"
            value={formData.Content}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
          />
        </div>
        <div>
          <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-2">
            Blog Content
          </label>
          <textarea
            name="Description"
            id="Description"
            placeholder="Write your blog content here..."
            value={formData.Description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition h-32 resize-none"
          />
        </div>
        <button
          onClick={handleCreateBlog}
          disabled={isSubmitting || !formData.image || !formData.Content || !formData.Description}
          className={`w-full py-3 text-white font-semibold rounded-md transition ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Create Blog'}
        </button>
      </div>
    </div>
  );
}
