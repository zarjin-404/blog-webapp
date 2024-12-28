import React from 'react';
import CreateBlog from '@/components/createBlog';
import { getBlog } from './action/getBlog.action';
import BlogPost from '@/components/blogPost';


export default async function Page() {
  const blogs = await getBlog();
  return (
    <main>
      <CreateBlog />
      <BlogPost blog={blogs ?? []} />

    </main>
  );
}
