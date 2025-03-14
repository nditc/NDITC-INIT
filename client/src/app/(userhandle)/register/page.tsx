"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../color.config";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";
import { register, sendMessage } from "@/api/authentication";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import Select from "@/components/ui/form/Select";
import Checkbox from "@/components/ui/form/Checkbox";
import Loading from "@/components/ui/LoadingWhite";
import { FiUser } from "react-icons/fi";
import { useRef, useState } from "react";
import { passRegEx } from "@/utils/validations";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/ui/PhotoUpload";
import { CLASSES } from "@/data/classes";

const Register = () => {
  const Router = useRouter();
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [form, loading] = useForm({
    handler: async (data, formData) => {
      const file = formData
        ? (formData?.get("participants") as File)
        : undefined;
      if (
        data?.password.trim().length < 8 ||
        !passRegEx.test(data?.password.trim())
      ) {
        throw new Error(
          "Password must be >8 chars with Uppercase letters and digits.",
        );
      } else if (data?.password.trim() !== data?.cpassword.trim()) {
        throw new Error("Password and Confirm Password Aren't same.");
      } else if (!file?.name) {
        throw new Error("Profile picture has not been selected.");
      } else if (!data?.agreed) {
        throw new Error("You haven't agreed to terms and conditions.");
      } else {
        const response = await register(formData);

        return response;
      }
    },
    formData: true,
    successMsg: "You successfully registered! Please login to continue.",
    onSuccess: () => {
      setCurrentPhoto(null);
      Router.push("/login");
    },
  });
  return (
    <main className="bg-grid-white/[0.02] relative min-h-screen w-full overflow-hidden bg-primary-650 antialiased md:mb-10 md:items-center md:justify-start">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="container-c flex flex-col items-center justify-center gap-20 py-[81px] md:flex-row">
        <form
          className="grid w-full max-w-[1000px] flex-1 grid-cols-1 gap-5"
          ref={form}
        >
          <div className="mt-16 flex w-full items-center justify-center gap-1.5 text-center">
            <AiOutlineUserAdd className="text-primary h-16 w-16 text-primary-150" />
            <div className="flex flex-col items-start justify-start gap-0.5">
              <p className="text-lg font-semibold text-primary-200">Init 5.0</p>
              <h1 className="GradText text-5xl">Registration</h1>
            </div>
          </div>
          <p className="mb-5 text-center text-white/80">
            Register for the upcoming ‘NDITC_INIT 5.0’ from here. Provide all
            the necessary information about yourself. (University students are
            restricted to participating only in robotics events at INIT 5.0.)
          </p>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-4">
            <Input
              label="Full Name"
              name="fullName"
              id="name"
              placeholder="Your Name"
              type="text"
              divClass="md:col-span-2 lg:col-span-3"
              required
            />

            <PhotoUpload
              name="participants"
              type="PFP"
              currentPhoto={currentPhoto}
              setCurrentPhoto={setCurrentPhoto}
            />
            <Input
              label="Address"
              name="address"
              id="address"
              placeholder="House / Road / Area"
              type="text"
              divClass="md:col-span-2 lg:col-span-3"
              required
            />

            <Input
              label="Email ID"
              name="email"
              id="email"
              placeholder="your@email.com"
              type="email"
              divClass="md:col-span-2"
              required
            />

            <Input
              label="Mobile Number"
              name="phone"
              id="number"
              placeholder="01........."
              type="number"
              divClass="md:col-span-2"
              required
            />

            <Input
              label="Institute"
              name="institute"
              id="institute"
              placeholder="Institution Name"
              type="text"
              divClass="md:col-span-2"
              required
            />

            <Select
              values={CLASSES}
              name="className"
              label="Class"
              divClass="md:col-span-2"
              required
            />

            <Input
              label="Facebook Link"
              name="fb"
              id="fb"
              placeholder="Facebook Link"
              type="text"
              divClass="md:col-span-2"
              required
            />

            <Input
              label="CA Reference"
              name="CAref"
              id="ca"
              placeholder="CA Reference"
              type="text"
              divClass="md:col-span-2"
            />

            <Input
              label="Password"
              name="password"
              id="password"
              placeholder="Your Password"
              type="password"
              divClass="md:col-span-2"
              required
            />

            <Input
              label="Confirm Password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Your Password"
              type="password"
              divClass="md:col-span-2"
              required
            />
          </div>
          <div className="flex justify-center">
            <Checkbox
              name="agreed"
              divClass="mx-1 lg:mx-4 mb-2.5 mt-7"
              labelText={
                <span className="text-sm font-light text-white/80">
                  I have thoroughly reviewed all the provided data and confirm
                  that it is entirely accurate.
                </span>
              }
            />
          </div>
          <div className="mt-4 flex flex-col-reverse items-center justify-center gap-6 text-right md:flex-row md:justify-end">
            <div className="Nunito ml-1.5 text-center text-sm tracking-wide text-white">
              <p>
                ALREADY&apos;T REGISTERED?{" "}
                <Link
                  href="/login"
                  className="text-primary-350 hover:underline"
                >
                  LOGIN!
                </Link>
              </p>
            </div>
            <button
              type="submit"
              disabled={false}
              className={
                "btn-prim Bebas inline-flex items-center gap-1 py-2.5 pr-8 text-center text-xl tracking-wide " +
                (0 ? "pl-6" : "pl-8")
              }
            >
              {loading ? <Loading scale={0.6} /> : null}
              Register
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
