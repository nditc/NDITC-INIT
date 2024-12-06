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

  const emailChildRef = useRef<any>(null);
  const passwordChildRef = useRef<any>(null);
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
      emailChildRef.current.vanish();
      passwordChildRef.current.passwordResetFunc();
      passwordChildRef.current.vanish();
      if (searchParams.redirect) {
        Router.back();
      } else {
        Router.push("/profile");
      }
    },
  });

  useEffect(() => {
    if (searchParams.popup) {
      toast.error("Login Required!");
    }
  }, [searchParams.popup]);

  return (
    <main className="bg-grid-white/[0.02] relative flex h-screen w-full items-center justify-center overflow-hidden bg-primary-650 antialiased md:mb-10 md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="mt-16 flex h-screen w-full flex-1 flex-col items-center justify-center gap-5 md:mt-0 md:flex-row md:gap-0">
        <div className="hidden w-[60%] items-center justify-center md:flex-1 lg:flex">
          <div className="text-center">
            <img src="/INIT_Logo.svg" alt="Logo" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="flex w-full max-w-full flex-col items-center justify-center p-6">
            <h1 className="Bebas GradText mb-10 text-center text-5xl tracking-wide md:text-6xl">
              Welcome <br /> Back
            </h1>

            <form
              ref={form}
              className="flex w-[90%] flex-col items-center space-y-5 md:w-[60%]"
            >
              <VanishInput
                placeholders={emailPlaceholders}
                ref={emailChildRef}
                isPasswordInput={false}
                disabled={loading}
                name="email"
              />
              <VanishInput
                placeholders={passwordPlaceholders}
                ref={passwordChildRef}
                isPasswordInput={true}
                disabled={loading}
                name="password"
              />

              <div className="Nunito flex flex-col items-center justify-center text-primary-300">
                <p className="my-1 text-lg font-semibold">LOGIN AS</p>
                <div className="my-3 flex items-center gap-10">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={loading}
                      onClick={() => {
                        setIsParticipant(true);
                      }}
                      type="button"
                      className="flex h-7 w-7 rounded-full border border-primary-400 p-1"
                    >
                      <div
                        className={`transition-all duration-300 ${isParticipant ? "opacity-100" : "opacity-0"} h-full w-full rounded-full bg-primary-400`}
                      />
                    </button>
                    <span>PARTICIPANT</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={loading}
                      onClick={() => {
                        setIsParticipant(false);
                      }}
                      type="button"
                      className="flex h-7 w-7 rounded-full border border-primary-400 p-1"
                    >
                      <div
                        className={`transition-all duration-300 ${!isParticipant ? "opacity-100" : "opacity-0"} h-full w-full rounded-full bg-primary-400`}
                      />
                    </button>
                    <span>CA</span>
                  </div>
                </div>
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
            </form>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
