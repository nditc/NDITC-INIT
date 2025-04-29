"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../color.config";
import { FormEvent, useEffect, useRef, useState } from "react";
import { VanishInput } from "@/components/ui/UltraInput/VanishInput";
import { ImSpinner10 } from "react-icons/im";
import { toast } from "react-toastify";
import useForm from "@/hooks/useForm";
import { login } from "@/api/authentication";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/form/Input";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { passRegEx } from "@/utils/validations";

const ResetPass = () => {
  const [gotCode, setGotCode] = useState(false);
  const [mail, setMail] = useState("");

  const Router = useRouter();
  const searchParamObj = useSearchParams();
  const searchParams = {
    redirect: searchParamObj.get("redirect"),
    popup: searchParamObj.get("popup"),
  };
  const [form, loading] = useForm(
    {
      handler: async (data) => {
        const { email } = data;
        if (email == "") {
          throw new Error("Invalid Email");
          return;
        }
        setMail(email);
        const response = await fetchJSON(
          reqs.RESET_PASSWORD_TOKEN,
          {
            method: "POST",
          },
          {
            email: data.email,
            sendMode: "email",
            mode: "par",
          },
        );
        //Add Submit Functionality Here
        return response;
      },
      onSuccess: async () => {
        setGotCode(true);
      },
    },
    [gotCode],
  );

  const [form2, loading2] = useForm(
    {
      handler: async (data) => {
        const { email, password, confirmPass } = data;
        // cmnt

        if (email == "" || password == "") {
          throw new Error("Invalid Email or Password");
        } else if (
          data?.password.trim().length < 8 ||
          !passRegEx.test(data?.password.trim())
        ) {
          throw new Error(
            "Password must be >8 chars with Uppercase letters and digits.",
          );
        } else if (data?.password.trim() !== data?.confirmPass.trim()) {
          throw new Error("Password and Confirm Password Aren't same.");
        } else {
          const response = await fetchJSON(
            reqs.OTP_VERIFY_RESET_PASSWORD,
            {
              method: "POST",
            },
            {
              ...data,
              clientMode: "par",
              mode: "!ov",
              sendMode: "email",
            },
          );
          //Add Submit Functionality Here
          return response;
        }

        return { msg: "something went wrong", succeed: false };
      },
      onSuccess: async () => {
        if (searchParams.redirect) {
          Router.back();
        } else {
          Router.push("/login");
        }
      },
    },
    [gotCode],
  );

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

      <div className="container-c mb-16 mt-[100px] flex min-h-[calc(100vh_-_100px)] w-full flex-1 flex-col items-center justify-center gap-5 md:flex-row md:justify-start md:gap-12">
        <div className="hidden w-[60%] items-center justify-start md:flex-1 lg:flex">
          <div className="relative overflow-hidden rounded-xl text-center">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-tr from-primary-650 to-primary-600/0"></div>
            <img
              className="rounded-xl opacity-50"
              src="/bg/login.jpg"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:w-1/2 lg:justify-end">
          <div className="flex w-full max-w-[550px] flex-col items-center justify-center px-2 md:px-0">
            <h1 className="Bebas GradText mb-10 text-center text-4xl tracking-wide md:text-5xl 2xl:text-6xl">
              RESET <br /> PASSWORD
            </h1>

            <form
              ref={form}
              className={
                "w-full flex-col items-center space-y-5 " +
                (gotCode ? "hidden" : "flex")
              }
            >
              <Input
                disabled={loading}
                name="email"
                label="E-mail"
                divClass="w-full"
              />
              <p className="text-white/80">
                An OTP will be sent to this Email.
              </p>
              <button
                disabled={loading}
                type="submit"
                name="form1"
                className="btn-prim Nunito mt-4 flex w-full items-center justify-center rounded-full py-2 text-xl"
              >
                {loading ? (
                  <ImSpinner10 className="h-7 w-7 animate-spin" />
                ) : (
                  "Get OTP"
                )}
              </button>
            </form>

            <form
              ref={form2}
              className={
                "flex w-full flex-col items-center gap-5 " +
                (!gotCode ? "hidden" : "flex")
              }
            >
              <p className="text-center text-white/70">
                An OTP was sent to{" "}
                <span className="text-primary-150">{mail}</span>. Please submit
                it here and create new password.
              </p>
              <Input disabled={loading2} name="email" hidden value={mail} />
              <Input
                disabled={loading2}
                name="otp"
                label="OTP"
                divClass="w-full"
              />
              <Input
                disabled={loading2}
                name="password"
                type="password"
                label="Password"
                divClass="w-full"
              />
              <Input
                disabled={loading2}
                name="confirmPass"
                type="password"
                label="Confirm Password"
                divClass="w-full"
              />

              <button
                disabled={loading2 || !gotCode}
                type="submit"
                name="form2"
                className="btn-prim Nunito mt-8 flex w-full items-center justify-center rounded-full py-2 text-xl"
              >
                {loading2 ? (
                  <ImSpinner10 className="h-7 w-7 animate-spin" />
                ) : (
                  "Reset"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPass;
