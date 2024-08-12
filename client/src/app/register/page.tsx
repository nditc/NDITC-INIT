"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { sendMessage } from "@/api/authentication";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import Select from "@/components/ui/Select";

const Register = () => {
  const [form, loading] = useForm({
    handler: sendMessage,
    successMsg: "Message Successfully sent. Reply will be sent to your email.",
  });

  return (
    <main className="bg-grid-white/[0.02] relative flex h-screen w-full items-center justify-center overflow-hidden bg-white antialiased dark:bg-[#141028] md:mb-10 md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <form
        className="container grid w-full grid-cols-1 gap-5 p-5 sm:p-12"
        ref={form}
      >
        <AiOutlineUserAdd className="text-primary h-12 w-12" />
        <h1 className="text-4xl">
          <span className="text-primary">Registration</span> Form
        </h1>
        <p>
          Please fill out the form below to secure your spot in the contest. We
          can’t wait to see what you’ll bring to the table!{" "}
          <Link
            className="text-primary hover:border-primary inline border-b-2 border-transparent font-medium"
            href="/login"
          >
            Login Instead
          </Link>{" "}
          if you have already registered. By filling out this form you are
          agreeing, to our terms and conditions.
        </p>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Full Name"
            name="name"
            id="name"
            placeholder="Your Name"
            type="text"
          />

          <Input
            label="Address"
            name="address"
            id="address"
            placeholder="House / Road / Area"
            type="text"
          />

          <Input
            label="Email ID"
            name="email"
            id="email"
            placeholder="your@email.com"
            type="email"
          />

          <Input
            label="Mobile Number"
            name="number"
            id="number"
            placeholder="01........."
            type="number"
          />

          <Input
            label="Institute"
            name="institute"
            id="institute"
            placeholder="Institution Name"
            type="text"
          />

          <Select
            selected={""}
            values={["1"]}
            setValue={() => {}}
            name="class"
            label="Class"
          />

          <Input
            label="FB Link"
            name="fb"
            id="fb"
            placeholder="Facebook Link"
            type="text"
          />

          <Input
            label="CA Reference"
            name="ca"
            id="ca"
            placeholder="CA Reference"
            type="text"
          />

          <Input
            label="Password"
            name="password"
            id="password"
            placeholder="Your Password"
            type="text"
          />

          <Input
            label="Confirm"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Your Password"
            type="text"
          />
        </div>
      </form>
    </main>
  );
};

export default Register;
