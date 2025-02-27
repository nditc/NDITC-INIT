"use client";
import React, { useRef, useState } from "react";
import ExtendedColors from "@/../color.config";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import {
  getEvent,
  single_event_par,
  submit_event,
  team_event_par,
} from "@/api/events";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import Separator from "@/components/ui/Separator";
import { reqImgWrapper } from "@/api/requests";
import { TbCreditCardPay } from "react-icons/tb";
import SubmissionInput from "@/components/Events/Register/SubmissionInput";
import TeamInput from "@/components/Events/Register/TeamInput";
import PaymentInput from "@/components/Events/Register/PaymentInput";
import CheckBox from "@/components/ui/form/Checkbox";
import useForm from "@/hooks/useForm";
import Loading from "@/components/ui/LoadingWhite";
import { toast } from "react-toastify";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/Textarea";
import { apply } from "@/api/ca";

const Page = () => {
  const Router = useRouter();
  const [user, loadingUser, errorUser] = useUser();
  const checkBox = useRef<HTMLInputElement>(null);

  const [form, formLoading] = useForm(
    {
      handler: async (data) => {
        console.log(data);
        if (checkBox?.current?.checked) {
          await apply({ ...data, ...user, mode: "ca" });
        } else {
          throw new Error("Please agree with the conditions.");
        }
      },
      successMsg: "You successfully applied for CA.",
      onSuccess: () => {
        Router.push("/login");
      },
    },
    [user],
  );

  console.log(user);

  if (loadingUser) {
    return <PageLoading />;
  } else if (user?.isAppliedCA) {
    return (
      <ErrorC msg="You already applied for CA!" code={400} href="/profile" />
    );
  } else if (errorUser) {
    Router.push(
      "/login?" +
        new URLSearchParams({
          redirect: "true",
          popup: "true",
        }),
    );
    return <PageLoading />;
  } else if (!user?.isAppliedCA && user) {
    return (
      <>
        <main className="bg-grid-white/[0.02] relative flex min-h-screen w-full justify-center overflow-hidden bg-primary-650 antialiased md:justify-center">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill={ExtendedColors.primary["200"]}
          />
          <div className="z-30 mt-28 w-screen">
            {/* {params.value}{" "} */}
            <div className="container flex flex-col gap-1 text-left">
              <div className="">
                <Link
                  href={"profile"}
                  className="mb-1 border-b border-transparent pb-1 text-lg text-primary-200 hover:border-primary-200"
                >
                  ← Back
                </Link>
              </div>
              {/* Heading */}
              <p className="Inter text-xl font-semibold text-primary-150">
                APPLICATION
              </p>
              <div>
                <h2 className="title mb-0 mt-0 inline-block pb-1 text-left text-4xl md:text-5xl">
                  Campus Ambassador
                </h2>
              </div>
            </div>
            <div className="grid grid-flow-col grid-cols-1 grid-rows-[auto_1fr_auto] items-start gap-6 py-4 lg:h-full lg:grid-cols-[1fr_.9fr] lg:grid-rows-[auto_1fr] lg:gap-12">
              {/* Participant info */}
              <div className="container-padding-left row-span-1 mr-4 inline-flex w-[90%] max-w-[1100px] items-center justify-between gap-6 rounded-r-full bg-gradient-to-r from-secondary-600 to-secondary-400 pb-5 pr-4 pt-4 lg:w-full">
                <div className="z-10 ml-1 lg:-ml-1">
                  <div className="mb-2 flex items-center text-sm">
                    <p className="text-secondary-200">Applicant</p>
                    <Separator className="mx-2" />
                    <p>{user.className}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold md:text-xl">
                      {user.fullName}
                    </p>
                    <p className="text-sm opacity-75 md:text-base">
                      {user.institute}
                    </p>
                    <p className="text-sm opacity-50">{user.email}</p>
                  </div>
                </div>
                <div>
                  <img
                    className="z-10 hidden h-[90px] w-[90px] rounded-full outline outline-2 outline-offset-4 outline-primary-250 sm:block sm:h-[110px] sm:w-[110px]"
                    src={reqImgWrapper(user.image) || ""}
                    alt=""
                  />
                </div>
              </div>

              {/* Input */}
              <div className="lg:container-padding-left container row-span-1 row-start-3 mb-12 max-w-[1100px] lg:row-start-2">
                <h3 className="Inter GradText mb-8 pt-3 text-xl font-bold md:text-2xl">
                  <TbCreditCardPay className="icn-inline mr-1 text-3xl text-primary-250 md:text-4xl" />{" "}
                  APPLICATION FORM
                </h3>

                <form ref={form} className="grid gap-4">
                  {/* <SubmissionInput data={result} />
                  <TeamInput data={result} />
                  <PaymentInput data={result} /> */}
                  <TextArea
                    type="text"
                    label="Why you want to be a CA?"
                    name="description"
                    rows={7}
                    required
                  />
                  <CheckBox
                    ref={checkBox}
                    divClass="mx-1 lg:mx-4 mb-2.5 mt-4"
                    labelText={
                      <span className="text-sm font-light text-white/80">
                        I rechecked all the given data and I am ready to take
                        responsibility as a Campus Ambassabor.
                      </span>
                    }
                  />
                  {/* <Select
                    name="dsad"
                    className="sadasd"
                    label="dsadasda"
                    values={["DAsda", "SADdasd", "sdasdasd"]}
                  />
                  <Input name="dsa1" label={"Hello Whats Your Name"} required />
                  <TextArea
                    name="dsa2"
                    label={"Hello Whats Your Name"}
                    required
                    rows={10}
                  /> */}
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className={
                        "btn-prim Bebas inline-flex items-center gap-1 py-2.5 pr-8 text-center text-xl tracking-wide " +
                        (formLoading ? "pl-6" : "pl-8")
                      }
                    >
                      {formLoading ? <Loading scale={0.6} /> : null}
                      APPLY
                    </button>
                  </div>
                </form>
              </div>

              {/* Instructions */}
              <div className="lg:container-padding-right container col-start-1 row-span-1 row-start-2 mb-8 text-white/75 lg:col-start-2 lg:row-span-2 lg:h-full">
                <div className="rounded-t-xl from-secondary-600/75 to-secondary-400/75 lg:h-full lg:bg-gradient-to-r lg:p-8">
                  <h3 className="Inter GradText pt-3 text-xl font-bold md:text-2xl">
                    <TbCreditCardPay className="icn-inline mr-1 text-3xl text-primary-250 md:text-4xl" />{" "}
                    INSTRUCTIONS
                  </h3>
                  <iframe
                    className="my-6 w-full rounded-xl"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/76lBrnr_2yE?si=RaS0fiTrPWJ_aoIH"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>

                  <ul className="list-circle">
                    <li>
                      Please provide the <b>exact email address</b> that your
                      teammates (other members) used to Register (Create
                      Account) in our website.
                    </li>
                    <li>Only the Team Leader should fill up this form</li>{" "}
                    <li>If you are solo, then remove all members.</li>{" "}
                    <li>
                      For paid events, please follow the given instructions
                      also)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return <div className="min-h-[100vh] w-full"></div>;
  }
};

export default Page;
