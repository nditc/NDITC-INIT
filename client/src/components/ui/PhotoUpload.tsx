"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CgAlbum } from "react-icons/cg";
import { FiUser } from "react-icons/fi";

// Compression function
const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Skip compression if file is under 300KB
    if (file.size <= 300 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate compression quality based on file size
        // Using a formula similar to: max(100-25600/M, 0)%
        // M is in KB, converting to appropriate scale
        const fileSizeKB = file.size / 1024;
        
        // Calculate quality percentage (0 to 1)
        // For very large files (>5MB), go as low as 0.1
        // For medium files (1-5MB), adjust between 0.2-0.6
        // For files just above 300KB, use higher quality
        let quality = 0.9; // Default high quality
        
        if (fileSizeKB > 5000) {
          quality = 0.1; // 10% quality for very large files (>5MB)
        } else if (fileSizeKB > 3000) {
          quality = 0.15; // 15% quality for 3-5MB files
        } else if (fileSizeKB > 2000) {
          quality = 0.2; // 20% quality for 2-3MB files
        } else if (fileSizeKB > 1000) {
          quality = 0.3; // 30% quality for 1-2MB files
        } else if (fileSizeKB > 500) {
          quality = 0.5; // 50% quality for 500KB-1MB files
        } else if (fileSizeKB > 300) {
          quality = 0.7; // 70% quality for 300-500KB files
        }

        // Maintain original dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob with calculated quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create new file from blob
              const compressedFile = new File(
                [blob], 
                file.name, 
                { 
                  type: 'image/jpeg', 
                  lastModified: Date.now() 
                }
              );
              
              console.log(`Original size: ${(file.size / 1024).toFixed(2)}KB`);
              console.log(`Compressed size: ${(compressedFile.size / 1024).toFixed(2)}KB`);
              console.log(`Quality used: ${quality * 100}%`);
              
              resolve(compressedFile);
            } else {
              reject(new Error('Could not compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Could not load image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Could not read file'));
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
      ? "mb-2 h-[80px] w-[80px] rounded-full bg-black object-cover"
      : "mb-2 max-h-[180px] w-full max-w-[300px] rounded-xl bg-black object-cover";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Show preview immediately
      setCurrentPhoto(URL.createObjectURL(file));
      
      // Check if compression is needed
      if (file.size > 300 * 1024) {
        setIsCompressing(true);
        
        try {
          // Compress the image
          const compressedFile = await compressImage(file);
          
          // Create a new FileList-like structure
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(compressedFile);
          
          // Update the input's files
          if (pfpRef.current) {
            pfpRef.current.files = dataTransfer.files;
          }
          
          // Update preview with compressed version (optional - shows slightly different quality)
          // setCurrentPhoto(URL.createObjectURL(compressedFile));
        } catch (error) {
          console.error('Compression failed:', error);
          // Fallback to original file
          if (pfpRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            pfpRef.current.files = dataTransfer.files;
          }
        } finally {
          setIsCompressing(false);
        }
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
        disabled={isCompressing}
        className="border-primary flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-secondary-200/50 bg-gradient-to-r from-secondary-700 to-secondary-600 p-5 text-center text-sm hover:border-primary-200 hover:from-secondary-700 hover:to-secondary-500/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCompressing ? (
          <div className="flex flex-col items-center">
            <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-primary-150 border-t-transparent"></div>
            <p>Compressing...</p>
          </div>
        ) : (
          <>
            {currentPhoto ? (
              <img src={currentPhoto} className={pfpClass} alt="Preview" />
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
            <p className="text-white/50">
              {isCompressing ? 'Compressing...' : 'JPG/PNG (Auto-compressed to ≤300KB)'}
            </p>
          </>
        )}
      </button>
    </div>
  );
};

export default PhotoUpload;