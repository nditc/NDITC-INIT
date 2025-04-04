"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../color.config";
import { FormEvent, useEffect, useRef, useState } from "react";
import { VanishInput } from "@/components/ui/UltraInput/VanishInput";
import { ImSpinner10 } from "react-icons/im";
import { toast } from "react-toastify";
import useForm from "@/hooks/useForm";
import { login } from "@/api/authentication";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/form/Input";

const Login = ({
  searchParams,
}: {
  searchParams: { redirect: string; popup: string };
}) => {
  const [isParticipant, setIsParticipant] = useState(true);

  const emailPlaceholders = [
    "Email Address",
    "init@awesome.com",
    "init@coolest.com",
  ];

  const passwordPlaceholders = ["Password", "A Secured Pass"];

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [loading, setLoading] = useState(false);

  // const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.currentTarget.value);
  // };
  // const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.currentTarget.value);
  // };

  const Router = useRouter();

  const [form, loading] = useForm({
    handler: async (data) => {
      const { email, password } = data;
      console.log(data);

      if (email == "" || password == "") {
        throw new Error("Invalid Email or Password");
        return;
      }

      const response = await login({
        ...data,
        mode: isParticipant ? "par" : "ca",
      });

      //Add Submit Functionality Here
      return response;
    },
    onSuccess: async () => {
      if (searchParams.redirect) {
        Router.back();
      } else {
        Router.push("/profile");
        Router.refresh();
      }
    },
  });

  useEffect(() => {
    if (searchParams.popup) {
      toast.error("Login Required!");
    }
  }, [searchParams.popup]);

  return (
    <main className="bg-grid-white/[0.02] relative min-h-screen w-full overflow-hidden bg-primary-650 antialiased md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="container-c mb-16 mt-[100px] flex min-h-[calc(100vh_-_100px)] w-full flex-1 flex-col items-center justify-center gap-5 md:flex-row-reverse md:justify-start md:gap-12">
        <div className="hidden w-[60%] items-center justify-start md:flex-1 lg:flex">
          <div className="relative overflow-hidden rounded-xl text-center">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-tl from-primary-650 to-primary-600/0"></div>
            <img
              className="rounded-xl opacity-50"
              src="/bg/login.jpg"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:w-1/2 lg:justify-start">
          <div className="flex w-full max-w-[550px] flex-col items-center justify-center px-2 md:px-0">
            <h1 className="Bebas GradText mb-10 text-center text-4xl tracking-wide md:text-5xl 2xl:text-6xl">
              Welcome <br /> Back
            </h1>

            <form
              ref={form}
              className="flex w-full flex-col items-center space-y-5"
            >
              <Input
                disabled={loading}
                name="email"
                label="E-mail"
                divClass="w-full"
              />
              <Input
                disabled={loading}
                name="password"
                label="Password"
                divClass="w-full"
                type="password"
              />
              <div className="Nunito mt-7 text-center text-sm tracking-wide text-white">
                <p>
                  <Link
                    href="/reset-password"
                    className="text-primary-350 hover:underline"
                  >
                    FORGOT PASSWORD?
                  </Link>
                </p>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="btn-prim Nunito flex w-full items-center justify-center rounded-full py-2 text-xl"
              >
                {loading ? (
                  <ImSpinner10 className="h-7 w-7 animate-spin" />
                ) : (
                  "Log In"
                )}
              </button>
              <div className="Nunito mt-7 text-center text-sm tracking-wide text-white">
                <p>
                  HAVEN&apos;T REGISTERED YET? <br />
                  <Link
                    href="/register"
                    className="text-primary-350 hover:underline"
                  >
                    REGISTER NOW!
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
