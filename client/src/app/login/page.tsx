"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";
import { FormEvent, useRef, useState } from "react";
import { VanishInput } from "@/components/ui/UltraInput/VanishInput";
import { ImSpinner10 } from "react-icons/im";
import { toast } from "react-toastify";

const Login = () => {
  const [isParticipant, setIsParticipant] = useState(true);

  const emailPlaceholders = [
    "Email Address",
    "swapnil@awesome.com",
    "init@coolest.com",
  ];

  const passwordPlaceholders = ["Password", "A Secured Pass"];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const emailChildRef = useRef<any>(null);
  const passwordChildRef = useRef<any>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (email == "" || password == "") {
      toast.error("Invalid Email or Password");
      return;
    }

    setLoading(true);

    emailChildRef.current.vanish();
    passwordChildRef.current.passwordResetFunc();
    passwordChildRef.current.vanish();

    //Add Submit Functionality Here
  };

  return (
    <main className="bg-grid-white/[0.02] relative flex h-screen w-full items-center justify-center overflow-hidden bg-white antialiased dark:bg-[#141028] md:mb-10 md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="mt-16 flex h-screen w-full flex-1 flex-col items-center justify-center gap-5 md:mt-0 md:flex-row md:gap-0">
        <div className="w-[60%] items-center justify-center md:flex-1 lg:flex">
          <div className="text-center">
            <img src="/INIT_Logo.svg" alt="Logo" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="flex w-full max-w-full flex-col items-center justify-center p-6">
            <h1 className="Bebas GradText mb-10 text-center text-5xl font-bold tracking-wide md:text-6xl">
              Welcome <br /> Back
            </h1>

            <form
              onSubmit={onSubmit}
              className="flex w-[90%] flex-col items-center space-y-5 md:w-[60%]"
            >
              <VanishInput
                placeholders={emailPlaceholders}
                onChange={handleChangeEmail}
                ref={emailChildRef}
                isPasswordInput={false}
                disabled={loading}
              />
              <VanishInput
                placeholders={passwordPlaceholders}
                onChange={handleChangePassword}
                ref={passwordChildRef}
                isPasswordInput={true}
                disabled={loading}
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
                <a href="#" className="text-primary-350 hover:underline">
                  REGISTER NOW!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
