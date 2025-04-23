"use client";
import { downloadHTMLtoPDF } from "@/api/utilapi";
import useUser from "@/hooks/useUser";
import { AdmitHTMLGenerator } from "@/utils/AdmitCardGenerator";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useRef } from "react";

const Page = () => {
  const qrCodeRef = useRef<SVGSVGElement>(null);

  const [user, loading, error] = useUser(true);

  useEffect(() => {
    if (user) {
      (async () => {
        const svgString = qrCodeRef?.current?.outerHTML;
        const generatedString = await AdmitHTMLGenerator(user, svgString || "");
        await downloadHTMLtoPDF(generatedString, "Admit_Card");
        setTimeout(() => {
          window.close();
        }, 2000);
      })();
    }
  }, [user]);

  return (
    <div>
      {" "}
      <QRCodeSVG value={user?.qrCode} ref={qrCodeRef} />
    </div>
  );
};

export default Page;
