"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { getBoothPar } from "@/api/booth";
import useFetch from "@/hooks/useFetch";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import Link from "next/link";

const ParticipantInfoPage = ({
  params,
  searchParams,
}: {
  params: { code: string };
  searchParams: { email: string };
}) => {
  const [user, loading, error] = useFetch(
    {
      fn: getBoothPar,
      params: [params.code, searchParams.email === "true"],
    },
    [params.code],
  );

  if (loading) {
    return <PageLoading />;
  } else if (!user && !loading) {
    return (
      <ErrorC
        code={401}
        msg="Wrong User Code!"
        href="/boothEntry/scan"
        handleText="Retry"
        noBg
      />
    );
  } else if (error) {
    return (
      <ErrorC code={500} msg="Someting went Wrong!" handleText="Retry" noBg />
    );
  } else {
    const userData = Object.entries(user).filter(
      ([key]) =>
        ![
          "id",
          "fullName",
          "institute",
          "fee",
          "className",
          "image",
          "roll_no",
          "fb",
          "email",
          "phone",
          "qrCode",
        ].includes(key),
    );

    const formatFieldName = (field: string) => {
      return field
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const isJsonString = (str: string) => {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    };

    const renderValue = (value: any, key?: string) => {
      if (value === null || value === undefined)
        return <span className="text-white/80">N/A</span>;

      const strValue = String(value);

      if (isJsonString(strValue)) {
        const parsed = JSON.parse(strValue);

        if (key === "SubNames") {
          return (
            <div className="space-y-1">
              {Object.entries(parsed).map(([k, v]) => {
                const names = String(v).split("&&&&");
                return (
                  <div key={k} className="flex flex-col">
                    <span className="font-medium text-secondary-200">
                      {formatFieldName(k)}:
                    </span>
                    <div className="ml-2 space-y-1">
                      {names.map((name, index) => (
                        <div key={index} className="text-white/80">
                          {name.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        if (key === "SubLinks") {
          const subNames = user.SubNames ? JSON.parse(user.SubNames) : {};
          return (
            <div className="space-y-1">
              {Object.entries(parsed).map(([k, v]) => {
                const links = String(v).split("&&&&");
                const names = subNames[k]
                  ? String(subNames[k]).split("&&&&")
                  : links.map((_, i) => `Link ${i + 1}`);

                return (
                  <div key={k} className="flex flex-col">
                    <span className="font-medium text-secondary-200">
                      {formatFieldName(k)}:
                    </span>
                    <div className="ml-2 space-y-1">
                      {links.map((link, index) => (
                        <div key={index} className="flex items-center">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-primary-300 hover:text-primary-200 hover:underline"
                          >
                            {names[index]?.trim() || `Link ${index + 1}`}
                            <FaExternalLinkAlt className="ml-1 text-xs" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        if (key === "transactionID") {
          return (
            <div className="space-y-1">
              {Object.entries(parsed).map(([k, v]) => (
                <div key={k} className="flex flex-wrap">
                  <span className="font-bold text-secondary-300">
                    {formatFieldName(k)}:
                  </span>
                  <span className="ml-2 break-all text-white/80">
                    {String(v)}
                  </span>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div className="space-y-1">
            {Object.entries(parsed).map(([k, v]) => (
              <div key={k} className="flex flex-wrap">
                <span className="font-medium text-secondary-200">
                  {formatFieldName(k)}:
                </span>
                <span className="ml-2 break-all text-white/80">
                  {String(v)}
                </span>
              </div>
            ))}
          </div>
        );
      }

      if (strValue.startsWith("http")) {
        const isImage = strValue.match(/\.(jpeg|jpg|gif|png)$/) !== null;
        return (
          <div className="flex items-center">
            <a
              href={strValue}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-300 hover:text-primary-200 hover:underline"
            >
              {isImage ? "Open Image" : "Open Link"}
              <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
          </div>
        );
      }

      return <span className="break-all text-white/80">{strValue}</span>;
    };

    return (
      <div className="mt-32 flex min-h-screen w-full items-start justify-center py-4 md:py-8">
        <div className="relative w-full items-start overflow-y-auto rounded-2xl bg-primary-600 p-8">
          <div className="mb-8">
            <Link
              href="/boothEntry/scan"
              className="border-b border-transparent text-lg text-primary-200 hover:border-primary-200"
            >
              ← Look Up For Another Participant
            </Link>
          </div>
          {/* Header with user image and basic info */}
          <div className="flex flex-col items-start md:flex-row md:justify-between">
            <div className="mx-auto flex flex-col items-center md:mx-0 md:flex-row md:space-x-6">
              {user.image && (
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary-400 shadow-lg md:mb-0">
                  <img
                    src={user.image}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="text-center md:text-left">
                <p className="text-3xl font-bold text-secondary-200">
                  {user.fullName || "User Details"}
                </p>
                {user.institute && (
                  <p className="mt-1 text-lg text-primary-250">
                    {user.institute}
                  </p>
                )}
                {user.className && (
                  <p className="text-primary-300">
                    {`Class ${user.className}`}{" "}
                    <span> {user.roll_no ? `- Roll ${user.roll_no}` : ""}</span>
                  </p>
                )}
              </div>
            </div>

            {/* QR Code at top right */}
            {user.qrCode && (
              <div className="mx-auto mt-4 md:mx-0 md:mt-0">
                <div className="rounded-lg bg-white p-2">
                  <QRCodeSVG value={user.qrCode} fgColor="#783DF9" />
                </div>
                <p className="mt-1 text-center text-xs text-secondary-200">
                  {user.qrCode}
                </p>
              </div>
            )}
          </div>

          {/* Contact information section */}
          {(user.fb || user.email || user.phone) && (
            <div className="mt-6">
              <p className="mb-3 text-xl font-semibold text-secondary-200">
                Contact Information
              </p>
              <div className="flex flex-wrap gap-3">
                {user.fb && (
                  <a
                    href={user.fb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-400"
                  >
                    <FaFacebook className="mr-2" />
                    Facebook
                  </a>
                )}
                {user.email && (
                  <a
                    href={`mailto:${user.email}`}
                    className="flex items-center rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-400"
                  >
                    <FaEnvelope className="mr-2" />
                    Email
                  </a>
                )}
                {user.phone && (
                  <a
                    href={`tel:${user.phone}`}
                    className="flex items-center rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-400"
                  >
                    <FaPhone className="mr-2" />
                    Call
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Main content grid */}
          <div className="mt-8">
            <p className="mb-3 text-xl font-semibold text-secondary-200">
              Event Information
            </p>
            <div className="grid grid-cols-1 gap-6 border-t border-primary-600 pt-4 sm:grid-cols-2 lg:grid-cols-3">
              {userData.map(([key, value]) => (
                <div
                  key={key}
                  className="overflow-hidden break-words rounded-lg bg-dark-card-bg-light p-4 shadow"
                >
                  <label className="block text-sm font-semibold uppercase tracking-wider text-white/60">
                    {formatFieldName(key)}
                  </label>
                  <div className="mt-2">{renderValue(value, key)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ParticipantInfoPage;
