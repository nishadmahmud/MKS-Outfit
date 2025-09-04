'use client';

import Image from "next/image";
import useStore from "@/app/CustomHooks/useStore";
import noImg from '/public/no-image.jpg'

export default function BlogPost({ params }) {
  const {blogs} = useStore();
  const blogsData = blogs?.data || [];
  const filteredBlogs = blogsData?.filter(blog => String(blog.id) === String(params.id));


  return (
    <div className="xl:w-9/12 w-11/12 mx-auto py-16">
      {filteredBlogs?.length > 0 ? (
        filteredBlogs?.map((blog) => (
          <div key={blog.id}>
           
            <Image
              src={blog?.image || noImg}
              alt={blog?.title}
              width={800}
              height={400}
              className="w-full h-[90vh] xl:pt-16 object-cover object-center rounded-lg mb-6"
            />
             <h1 className="text-3xl text-black font-bold mb-4">{blog.title}</h1>
             <div
              className="text-lg text-black"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />
         
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No blog data found.</p>
      )}
    </div>
  );
}
