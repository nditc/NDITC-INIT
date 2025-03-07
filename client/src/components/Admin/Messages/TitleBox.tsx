'use client';
import { useState } from 'react';

export const TitleBox = () => {
  const [isReplied, setIsReplied] = useState("Not-Replied");

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-end items-center gap-5  mb-8">
      {/* Left Section */}
      <div>
        <button className="flex mx-auto md:mx-0 items-center gap-2 text-sm uppercase mb-4 text-primary-150 border-b border-current pb-0.5 hover:text-secondary-200">
          <span className="text-lg">&larr;</span>
          <span>BACK</span>
        </button>
        <p className="md:text-5xl text-3xl text-center md:text-left uppercase font-bold bg-gradient-to-r from-primary-400 to-secondary-200 bg-clip-text text-transparent">
          MESSAGES
        </p>
      </div>

      {/* Right Section */}
      <div className='bg-secondary-500 rounded-3xl p-1'>
      {["Not-Replied", "Replied"].map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 rounded-3xl text-lg font-semibold transition-all duration-300 ${isReplied === tab ? "bg-primary-350 text-white shadow-lg" : "text-white"
                }`}
              onClick={() => setIsReplied(tab)}
            >
              {tab}
            </button>
          ))}
      </div>
    </div>
  );
};