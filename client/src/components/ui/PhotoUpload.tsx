"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CgAlbum } from "react-icons/cg";
import { FiUser } from "react-icons/fi";

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

  useLayoutEffect(() => {
    if (defaultImage) {
      setCurrentPhoto(defaultImage);
    }
  }, [defaultImage]);
  const pfpClass =
    type === "PFP"
      ? "mb-2 h-[80px] w-[80px] rounded-full bg-black"
      : "mb-2 max-h-[180px] w-full max-w-[300px] rounded-xl bg-black";

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
        onChange={(e) => {
          if (e.target.files) {
            if (e.target.files.length > 0) {
              setCurrentPhoto(URL.createObjectURL(e.target.files[0]));
            }
          }
        }}
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
        {currentPhoto ? (
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
        <p className="text-white/50">JPG/PNG, 5 MB</p>
      </button>
    </div>
  );
};

export default PhotoUpload;
