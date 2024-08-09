"use client";
import { sendMessage } from "@/api/contact";
import useForm from "@/hooks/useForm";
import React from "react";

const Contact = () => {
  const [form, loading] = useForm({
    handler: sendMessage,
    successMsg: "Message Successfully sent. Reply will be sent to your email.",
  });
  return (
    <div className="items-bottom mt-8 flex w-full flex-col md:flex-row">
      <div className="flex-1 basis-[50%] overflow-hidden rounded-tr-3xl">
        {" "}
        <iframe
          width="100%"
          height="600"
          className="h-full min-h-[500px]"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=notre%20dame%20college+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
      <div className="text- flex flex-1 basis-[50%] flex-col items-center bg-gradient-to-tr from-primary-350/15 to-primary-150/25 py-12 md:mt-8">
        <h2 className="title title-top text-white/80">Contact Us</h2>
        <form
          ref={form}
          className="grid w-[90%] max-w-[550px] grid-cols-2 gap-3"
        >
          <input
            className="col-span-2 w-full rounded-xl bg-primary-150/20 px-4 py-4"
            type="text"
            placeholder="Name"
            name="name"
          />{" "}
          <input
            className="col-span-2 w-full rounded-xl bg-primary-150/20 px-4 py-4 sm:col-span-1"
            type="text"
            placeholder="Institution"
            name="institute"
          />{" "}
          <input
            className="col-span-2 w-full rounded-xl bg-primary-150/20 px-4 py-4 sm:col-span-1"
            type="email"
            placeholder="Email"
            name="email"
          />{" "}
          <textarea
            rows={6}
            className="col-span-2 w-full rounded-xl bg-primary-150/20 px-4 py-4"
            placeholder="Share Your Query"
            name="message"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-prim Bebas col-span-2 w-full rounded-xl py-3 text-xl"
          >
            Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
