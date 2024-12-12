"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { Spotlight } from '@/components/ui/Spotlight/Spotlight';
import ImageContainer from "@/components/Admin/Gallery/ImageContainer"
import { IoAdd } from 'react-icons/io5';

export default function Page() {
  const router = useRouter();  
  return (
    <section className="flex flex-col gap-6 min-h-screen max-w-7xl mt-32 mx-auto overflow-hidden bg-primary-650 antialiased">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill={""} />
      {/* Go Back Button */}
      <div>
        <button
          onClick={() => router.back()}  
          className="border-b border-transparent pb-1 text-xl text-primary-200 hover:border-primary-200"
        >
          ← Back
        </button>
      </div>

      <h2 className="title Inter mb-4 mt-12 pb-1 text-center text-4xl font-extrabold md:text-5xl lg:mb-0 lg:mt-0 lg:text-left">
        GALLERY CONTROL
      </h2>
      <div className="flex gap-3">
        <Link href="#" className="cursor-pointer flex items-center gap-2 rounded-full bg-secondary-600 px-4 py-2.5 before:bg-secondary-600 md:text-xl">
        <IoAdd className='rounded-full bg-secondary-400 p-1 box-content' /> Add Section
        </Link>
        <Link href="#" className="cursor-pointer rounded-full bg-secondary-600 px-4 py-2.5 before:bg-secondary-600 sm:px-8 md:text-xl">
          Preview
        </Link>
      </div>
      <ImageContainer />
      <ImageContainer />
    </section>
  );
}
