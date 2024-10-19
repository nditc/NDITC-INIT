"use client";
import React from "react";
import ExtendedColors from "@/../color.config";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import { getEvent } from "@/api/events";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import PageLoading from "@/components/PageLoading";
import Error from "@/components/Error";
import Separator from "@/components/ui/Separator";
import { reqImgWrapper } from "@/api/requests";
import { TbCreditCardPay } from "react-icons/tb";

const Page = ({ params }: { params: { value: string } }) => {
  const [result, loadingEvent, errorEvent] = useFetch({
    fn: getEvent,
    params: [params.value],
  });
  const [user, loadingUser, errorUser] = useUser();
  const Router = useRouter();
  console.log(errorUser);

  if (loadingEvent && loadingUser) {
    return <PageLoading />;
  } else if (errorEvent) {
    return <Error msg="Something went wrong!" code={500} />;
  } else if (errorUser) {
    Router.push(
      "/login?" +
        new URLSearchParams({
          redirect: "true",
          popup: "true",
        }),
    );
    return <PageLoading />;
  } else if (result && user) {
    return (
      <>
        <main className="bg-grid-white/[0.02] relative flex min-h-screen w-full justify-center overflow-hidden bg-white antialiased dark:bg-[#141028] md:justify-center">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill={ExtendedColors.primary["200"]}
          />
          <div className="z-30 mt-28 w-screen">
            {/* {params.value}{" "} */}
            <div className="container flex flex-col gap-1 text-left">
              <div className="">
                <Link
                  href={"/events#s" + result.id}
                  className="mb-1 border-b border-transparent pb-1 text-lg text-primary-200 hover:border-primary-200"
                >
                  ← Back
                </Link>
              </div>
              {/* Heading */}
              <p className="Inter text-xl font-semibold text-primary-150">
                {result.submission === "{}" ? "PARTICIPATION" : "SUBMISSION"}
              </p>
              <div>
                <h2 className="title mb-0 mt-0 inline-block pb-1 text-left text-4xl md:text-5xl">
                  {result.name}
                </h2>
              </div>
            </div>
            {/* Participant info */}
            <div className="grid h-full grid-cols-[1fr_.7fr] items-start py-4">
              <div className="container-padding-left mr-2 inline-flex w-full max-w-[750px] items-center justify-between gap-6 rounded-r-full bg-gradient-to-r from-secondary-600 to-secondary-400 pb-5 pr-4 pt-4">
                <div className="z-10 ml-1 md:-ml-1">
                  <div className="mb-2 flex items-center text-sm">
                    <p className="text-secondary-200">Participant</p>
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
                    className="z-10 h-[90px] w-[90px] rounded-full outline outline-2 outline-offset-4 outline-primary-250 sm:h-[110px] sm:w-[110px]"
                    src={reqImgWrapper(user.image) || ""}
                    alt=""
                  />
                </div>
              </div>
              <div className="container-padding-right h-full text-white/75">
                <div className="h-full rounded-t-xl bg-gradient-to-r from-secondary-600/75 to-secondary-400/75 p-8">
                  <h3 className="Inter GradText pt-3 text-2xl font-bold">
                    <TbCreditCardPay className="icn-inline mr-1 text-4xl text-primary-250" />{" "}
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
                  <h3 className="Inter GradText pb-4 pt-6 text-2xl font-bold">
                    <TbCreditCardPay className="icn-inline mr-1 text-4xl text-primary-250" />{" "}
                    PAYMENT DETAILS
                  </h3>
                  <ul className="list-circle">
                    <li>
                      At first send <code>{result.fee}</code> to{" "}
                      <code>01946821177</code>
                      (bKash "Send Money")
                    </li>
                    <li>
                      please use your email ID <code>{user.email}</code> in the
                      reference
                    </li>
                    <li>
                      Then give us the number (from which you sent the money)
                      and the transaction id.
                    </li>
                    <li>Do not forget to keep proof of the payment.</li>
                    <li>
                      Your payment will be verified after being checked by the
                      admin.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default Page;
