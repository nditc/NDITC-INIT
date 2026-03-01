"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CgAlbum } from "react-icons/cg";
import { FiUser } from "react-icons/fi";

// Add compression function - compress all images
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        const maxDimension = 1200; // Max width/height
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with quality adjustment
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Compression failed'));
            }
          },
          'image/jpeg',
          0.7 // Quality (0.7 = 70% quality, adjust as needed)
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

const PhotoUpload = ({
  name,
  type,
  defaultImage,
  divClass,
  currentPhoto,
  setCurrentPhoto,
}: {
  name: string;
  type: "PFP" | "IMG";
  defaultImage?: string;
  divClass?: string;
  currentPhoto: string | null;
  setCurrentPhoto: (s: string) => void;
}) => {
  const pfpRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  useLayoutEffect(() => {
    if (defaultImage) {
      setCurrentPhoto(defaultImage);
    }
  }, [defaultImage]);
  
  const pfpClass =
    type === "PFP"
      ? "mb-2 h-[80px] w-[80px] rounded-full bg-black"
      : "mb-2 max-h-[180px] w-full max-w-[300px] rounded-xl bg-black";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const originalFile = e.target.files[0];
      
      setIsCompressing(true);
      try {
        // Compress all images
        const compressedFile = await compressImage(originalFile);
        
        // Create a new FileList-like object with the compressed file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(compressedFile);
        e.target.files = dataTransfer.files;
        
        // Show preview of compressed image
        setCurrentPhoto(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error('Compression failed:', error);
        // Fallback to original if compression fails
        setCurrentPhoto(URL.createObjectURL(originalFile));
      } finally {
        setIsCompressing(false);
      }
    }
  };

  return (
    <div
      className={
        "row-start-1 mx-1 md:col-span-2 md:row-span-2 lg:col-span-1 " + divClass
      }
    >
      <input
        className="h-full w-full"
        type="file"
        accept="image/png, image/jpeg"
        hidden
        ref={pfpRef}
        onChange={handleFileChange}
        name={name}
      />
      <button
        type="button"
        onClick={() => {
          if (pfpRef && pfpRef.current) {
            pfpRef.current.click();
          }
        }}
        className="border-primary flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-secondary-200/50 bg-gradient-to-r from-secondary-700 to-secondary-600 p-5 text-center text-sm hover:border-primary-200 hover:from-secondary-700 hover:to-secondary-500/50"
      >
        {isCompressing ? (
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-150 border-t-transparent"></div>
            <p className="mt-2 text-primary-150">Compressing...</p>
          </div>
        ) : currentPhoto ? (
          <img src={currentPhoto} className={pfpClass} alt="" />
        ) : (
          <>
            {type === "PFP" ? (
              <FiUser className="h-9 w-9 text-primary-150" />
            ) : (
              <CgAlbum className="h-9 w-9 text-primary-150" />
            )}
          </>
        )}
        <p>Upload {type === "PFP" && "Profile"} Picture</p>
        <p className="text-white/50">JPG/PNG, Auto-compressed</p>
      </button>
    </div>
  );
};

export default PhotoUpload;