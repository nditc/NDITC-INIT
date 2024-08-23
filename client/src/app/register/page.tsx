"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { sendMessage } from "@/api/authentication";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Select } from "@/components/ui/Select";

const Register = () => {
  const [form, loading] = useForm({
    handler: sendMessage,
    successMsg: "Message Successfully sent. Reply will be sent to your email.",
  });

  return (
    <main className="bg-grid-white/[0.02] relative h-screen w-full overflow-x-clip bg-white antialiased dark:bg-[#141028] md:mb-10 md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="container flex flex-col items-center justify-center gap-20 py-[81px] md:flex-row">
        <form
          className="grid w-full flex-1 grid-cols-1 gap-5 p-5 sm:p-12"
          ref={form}
        >
          <h1 className="flex items-center gap-3 text-4xl">
            <AiOutlineUserAdd className="text-primary h-12 w-12" />
            <span className="GradText">Registration Form</span>
          </h1>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-6">
            <Input
              label="Full Name"
              name="name"
              id="name"
              placeholder="Your Name"
              type="text"
              divClass="md:col-span-4"
            />

            <div className="col-span-2 row-span-2 pr-2">
              <input className="h-full w-full rounded-full bg-white" />
            </div>

            <Input
              label="Address"
              name="address"
              id="address"
              placeholder="House / Road / Area"
              type="text"
              divClass="md:col-span-4"
            />

            <Input
              label="Email ID"
              name="email"
              id="email"
              placeholder="your@email.com"
              type="email"
              divClass="col-span-3"
            />

            <Input
              label="Mobile Number"
              name="number"
              id="number"
              placeholder="01........."
              type="number"
              divClass="col-span-3"
            />

            <Input
              label="Institute"
              name="institute"
              id="institute"
              placeholder="Institution Name"
              type="text"
              divClass="col-span-3"
            />

            <Select
              values={["1", "2", "3", "4", "5"]}
              name="class"
              label="Class"
              divClass="col-span-3"
            />

            <Input
              label="FB Link"
              name="fb"
              id="fb"
              placeholder="Facebook Link"
              type="text"
              divClass="col-span-6"
            />

            <Input
              label="CA Reference"
              name="ca"
              id="ca"
              placeholder="CA Reference"
              type="text"
              divClass="col-span-6"
            />

            <Input
              label="Password"
              name="password"
              id="password"
              placeholder="Your Password"
              type="text"
              divClass="col-span-3"
            />

            <Input
              label="Confirm"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Your Password"
              type="text"
              divClass="col-span-3"
            />
          </div>
        </form>

        <div className="flex-1 text-center">
          <img src="/INIT_Logo.svg" alt="Logo" />
        </div>
      </div>
    </main>
  );
};

export default Register;
