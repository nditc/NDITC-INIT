"use client";

import React, { useContext } from "react";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/Textarea";
import ImageContext from "@/context/ImageContext";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../../color.config";
import "@/components/Admin/Dashboard/Dashboard.css"
import { useRouter } from "next/navigation";


const EventEditForm = () => {
  const router = useRouter();
  const [, dispatch] = useContext(ImageContext) || [, () => { }];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <main className="max-w-screen relative overflow-x-clip bg-primary-900 text-primary-200">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <section className="container my-32 flex flex-col gap-6 antialiased">
        <div>
          <div className="flex flex-row justify-between items-center py-5 mb-10 overflow-x-hidden">
            <div className="flex flex-col md:flex-row items-center gap-5 mx-auto w-full">
              <div className="flex items-center gap-5 flex-1">
                <div className="flex flex-col self-stretch">
                  <div className="flex flex-col">
                    <div>
                      <button
                       onClick={() => router.back()}
                       className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200">
                        ← Back
                      </button>
                    </div>
                    <h1 className="text-7xl bg-gradient-to-r from-secondary-300 via-primary-150 to-secondary-300 bg-clip-text text-transparent mt-3">
                      EDIT EVENT
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              
              <div className="flex items-center flex-col md:flex-row lg:gap-10 gap-4">
                <div className="w-full md:w-1/3">
                  <img
                    src="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
                    alt="Event"
                    className="rounded-lg object-cover h-52 w-full"
                  />
                </div>
                <div className="flex-1 w-full space-y-4 md:space-y-8">
                  <Input 
                    type="text"
                    name="title"
                    label="Title"

                  />
                  <div className="flex flex-row lg:gap-10 gap-4">
                    <Input
                      type="date"
                      name="date"
                      divClass="w-1/2"
                      label="Date"

                    />
                    <Input
                      type="number"
                      name="price"
                      divClass="w-1/2"
                      label="Price (BDT)"

                    />
                  </div>
                </div>
              </div>
              
              <div className="flex  flex-col md:flex-row lg:gap-10 gap-4">
                <div className="md:w-2/3 w-full space-y-6">
                  <Input
                  divClass="w-full"
                    type="text"
                    name="category"
                    label="Category"

                  />
                  <div className="flex lg:gap-10 gap-4">
                    <Input
                      divClass="md:w-1/2 w-full"
                      type="text"
                      name="type"
                      label="Type"

                    />
                    <Input
                      divClass="md:w-1/2 w-full"
                      type="text"
                      name="location"
                      label="Location"

                    />
                  </div>
                </div>
                <TextArea
                  divClass="md:w-1/3 w-full"
                  label="Short Description"
                  rows={4}
                />
              </div>

              <div className="flex flex-col items-start md:items-center md:flex-row lg:gap-10 gap-4">
                <div className="w-1/5">
                  <p className="text-white text-3xl">Team:</p>
                </div>
                <div className="flex w-full md:w-4/5 items-start md:items-center md:flex-row gap-4 lg:gap-10">
                  <Input
                    divClass="w-1/2"
                    type="number"
                    name="min-members"
                    label="Min Members"

                  />
                  <Input
                    divClass="w-1/2"
                    type="number"
                    name="max-members"
                    label="Max Members"

                  />
                </div>
              </div>

              
              <div className="flex flex-col items-start md:items-center md:flex-row lg:gap-10 gap-4">
                <div className="w-1/5">
                  <p className="text-white text-3xl">Submission:</p>
                </div>
                <div className="flex w-full md:w-4/5 items-start md:items-center md:flex-row gap-4 lg:gap-10">
                <Input
                  divClass="w-full md:w-1/2"
                  type="text"
                  name="link1"
                  label="Link 1 Name"

                />
                <Input
                  divClass="w-full md:w-1/2"
                  type="text"
                  name="link2"
                  label="Link 2 Name"

                />
                </div>
              </div>

              
              <div className="flex justify-between  gap-6">
                {["Gift", "Snacks", "Lunch", "Prize"].map((item) => (
                  <div key={item} className="flex flex-col md:flex-row items-center gap-1 md:gap-8 w-full  md:w-auto ">
                    <label htmlFor={item} className="font-bold text-white text-sm md:text-xl">
                      {item}
                    </label>
                    <input
                      id={item}
                      type="checkbox" className="toggle-checkbox"
                    />
                  </div>
                ))}
              </div>

              
              <div className="flex flex-col md:flex-row lg:gap-10 gap-4">
                <Input
                  divClass="w-full"
                  type="text"
                  name="prize-champion"
                  label="Prize Champion"

                />
                <Input
                  divClass="w-full"
                  type="text"
                  name="prize-1st-runner"
                  label="1st Runner"

                />
                <Input
                  divClass="w-full"
                  type="text"
                  name="prize-2nd-runner"
                  label="2nd Runner"
                />
              </div>

              
              <TextArea
                label="About"
                rows={4}
              />
              <TextArea
                label="Rules & Regulations"
                rows={4}
              />

              
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="rounded-full mx-auto md:mx-0 px-10 py-2 text-white  bg-primary-400 hover:bg-primary-300 focus:outline-none"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventEditForm;