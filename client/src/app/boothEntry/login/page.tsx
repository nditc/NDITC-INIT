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
import { BoothLogin } from "@/api/booth";

const Login = ({
  searchParams,
}: {
  searchParams: { redirect: string; popup: string };
}) => {
  const [isParticipant, setIsParticipant] = useState(true);

  const Router = useRouter();

  const [form, loading] = useForm({
    handler: async (data) => {
      const { userName, password } = data;
      // cmnt

      if (userName == "" || password == "") {
        throw new Error("Invalid User Name or Password");
        return;
      }

      const response = await BoothLogin({
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
        Router.push("/boothEntry/scan");
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

      <div className="container-c mb-16 mt-[100px] flex min-h-[calc(100vh_-_100px)] w-full flex-1 flex-col items-center justify-center gap-5 md:flex-row md:justify-start md:gap-12">
        {/* <div className="hidden w-[60%] items-center justify-start md:flex-1 lg:flex">
          <div className="text-center">
            <img
              className="opacity-45 invert"
              src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-administrator-line-icon-vector-png-image_6688954.png"
              alt="Logo"
            />
          </div>
        </div> */}

        <div className="flex w-full items-center justify-center">
          <div className="flex w-full max-w-[550px] flex-col items-center justify-center px-2 md:px-0">
            <h1 className="Bebas GradText mb-10 text-center text-4xl tracking-wide md:text-5xl 2xl:text-6xl">
              Booth
            </h1>

            <form
              ref={form}
              className="flex w-full flex-col items-center space-y-5"
            >
              <Input
                disabled={loading}
                name="userName"
                label="Username"
                divClass="w-full"
              />
              <Input
                disabled={loading}
                name="password"
                label="Password"
                divClass="w-full"
                type="password"
              />

              <div className="Nunito flex flex-col items-center justify-center text-primary-300">
                <p className="my-1 text-lg font-semibold">
                  ONLY FOR BOOTH ACCESS
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
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
