"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "@/../color.config";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";

interface ValidationResult {
  status: "success" | "error";
  message: string;
}

export default function CertificateValidation(): JSX.Element {
  const router = useRouter();

  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    if (!certificateId.trim()) {
      setResult({
        status: "error",
        message: "Please enter a certificate ID.",
      });
      return;
    }

    try {
      setLoading(true);
      const participant = await fetchJSON(
        reqs.GET_RESULT + certificateId,
        { credentials: "include" },
      );

      if (participant) {
        setResult({
          status: "success",
          message: "Certificate verified successfully.",
        });

        setTimeout(() => {
          router.push(`/result/${certificateId}`);
        }, 900);
      } else {
        throw new Error();
      }
    } catch {
      setResult({
        status: "error",
        message: "Invalid or non-existent certificate ID.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-primary-650 text-primary-200">
      <Spotlight
        className="-top-40 left-0 md:-top-64 md:left-60"
        fill={ExtendedColors.primary["350"]}
      />

      <section className="container-c mt-36 mb-32 flex flex-col items-center">
        {/* Card */}
        <div className="w-full max-w-md rounded-2xl border border-primary-500 bg-primary-600 px-8 py-10 shadow-2xl">
          <p className="mb-2 text-center text-3xl font-bold text-primary-150">
            Certificate Validation
          </p>

          <p className="mb-8 text-center text-sm text-primary-200">
            Verify your certificate using the unique validation code
          </p>
 
          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) =>
              setCertificateId(e.target.value.toUpperCase())
            }
            className="mb-5 w-full rounded-lg border border-primary-500 bg-primary-650 px-4 py-3 text-primary-150 placeholder-primary-300 transition
                       focus:border-primary-350 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
          />
 
          <button
            onClick={handleValidate}
            disabled={loading}
            className="w-full rounded-lg bg-primary-400 py-3 font-semibold text-white transition
                       hover:bg-primary-350 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Validating..." : "Validate Certificate"}
          </button>
 
          {result && (
            <div
              className={`mt-6 rounded-lg px-4 py-3 text-center text-sm font-medium ${
                result.status === "success"
                  ? "bg-primary-200/20 text-primary-150 border border-primary-300"
                  : "bg-secondary-100/30 text-secondary-200 border border-secondary-300"
              }`}
            >
              {result.message}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
