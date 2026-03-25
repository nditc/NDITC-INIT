"use client";
import Link from "next/link";
import React from "react";
import { BiCopy, BiCopyAlt } from "react-icons/bi";
import {
  FaCheckCircle,
  FaRegClock,
  FaCopy,
  FaRegStar,
  FaExternalLinkAlt,
  FaLink,
} from "react-icons/fa";
import { IoMdCode } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProgramStatusProps {
  type: "CA" | "CPartner";
  user: {
    isApplied: boolean;
    isApproved: boolean;
    code?: string;
    points?: number;
    clubName?: string;
    designation?: string;
  };
  otherApplied: boolean;
  groupLink: string;
}

const ProgramStatus: React.FC<ProgramStatusProps> = ({
  type,
  user,
  otherApplied,
  groupLink,
}) => {
  const { isApplied, isApproved, code, points } = user;

  const handleCopyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast.success(`${type} Code copied to clipboard!`);
    }
  };

  const StatusMessage = ({ icon, message, additionalContent }: any) => (
    <div className="flex flex-col items-center gap-4">
      {icon}
      <p className="text-center text-lg text-white/70">{message}</p>
      {additionalContent}
    </div>
  );

  const ApprovedContent = () => (
    <div className="bg-primary-700 flex w-full flex-col items-center justify-between gap-4 rounded-lg px-4 py-2 text-secondary-200 md:flex-row">
      <div className="w-full rounded-lg bg-secondary-500/20 p-6 text-center">
        <strong>
          <FaRegStar className="icn-inline mr-2 text-primary-300" />
          Points:
        </strong>{" "}
        <br></br> <span className="text-xl text-white/80">{points}</span>
      </div>
      <div className="w-full rounded-lg bg-secondary-500/20 p-6 text-center">
        <strong>
          <FaLink className="icn-inline mr-2 text-primary-300" />
          Messenger Group Join Link:
        </strong>{" "}
        <br></br>{" "}
        <a
          target="_blank"
          href={groupLink || "#"}
          className="pt-4 text-lg text-primary-300 underline"
        >
          <FaExternalLinkAlt className="icn-inline mr-2" />
          Click Here
        </a>
      </div>
      <div className="w-full rounded-lg bg-secondary-500/20 p-6 text-center text-primary-150">
        <strong>
          <IoMdCode className="icn-inline mr-2 text-primary-300" />
          {type} Code:
        </strong>{" "}
        <br></br>
        <span className="text-xl text-white/80">{code}</span>
        <button
          onClick={handleCopyCode}
          className="ml-2 text-primary-150 transition-colors hover:text-secondary-100"
        >
          <BiCopy className="text-xl" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="my-2 w-full rounded-2xl border-white/5 bg-gradient-to-br from-secondary-700 to-secondary-500/20 p-6 text-primary-200 backdrop-blur-md">
      <p className="mb-4 text-center text-3xl font-bold text-secondary-200">
        {type === "CA" ? "CA Status" : "Club Partner Status"}
      </p>

      {!isApplied ? (
        <StatusMessage
          message={
            otherApplied
              ? `You have already applied for the ${type === "CA" ? "Club Partner" : "CA"} program, so you cannot apply for this.`
              : `You have not applied for the ${type === "CA" ? "CA program" : "Club Partner program"} yet.`
          }
          additionalContent={
            !otherApplied && (
              <Link
                href={type === "CA" ? "/apply/ca" : "/apply/cpartner"}
                className="rounded-lg bg-secondary-300 px-6 py-2 text-primary-650 transition-colors hover:bg-secondary-200"
              >
                Apply for {type === "CA" ? "CA" : "Partner"}
              </Link>
            )
          }
        />
      ) : !isApproved ? (
        <StatusMessage
          icon={<FaRegClock className="text-4xl text-primary-400" />}
            message={`Your ${type === "CA" ? "CA" : "Club Partner"} application is pending approval. Please wait for the admins to review your application.`}
        />
      ) : (
        <StatusMessage
          icon={<FaCheckCircle className="text-4xl text-primary-400" />}
          message={`Congratulations! Your ${type === "CA" ? "CA" : "Club Partner"} application has been approved. If you want to earn points then Participants must use the provided code to register on this site.`}
          additionalContent={<ApprovedContent />}
        />
      )}
    </div>
  );
};

interface CAStatusProps {
  user: {
    caData: any;
    cpData: any;
  };
  settings: any;
}

const CAStatus: React.FC<CAStatusProps> = ({ user, settings }) => {
  const isCAApplied = !!user.caData?.isApplied;
  const isCPApplied = !!user.cpData?.isApplied;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center text-yellow-200">
        <p className="font-semibold italic">
          <span className="mr-2 font-bold text-yellow-400 underline">
            ATTENTION:
          </span>
          You are permitted to apply for ONLY ONE program: either Campus
          Ambassador (CA) or Club Partner. Once you apply for one, the other
          option will be permanently disabled.
        </p>
      </div>
      <ProgramStatus
        type="CA"
        user={{
          isApplied: isCAApplied,
          isApproved: user.caData?.isApproved,
          code: user.caData?.code,
          points: user.caData?.points,
        }}
        otherApplied={isCPApplied}
        groupLink={settings?.caGroupLink}
      />
      <ProgramStatus
        type="CPartner"
        user={{
          isApplied: isCPApplied,
          isApproved: user.cpData?.isApproved,
          code: user.cpData?.code,
          points: user.cpData?.points,
          clubName: user.cpData?.clubName,
          designation: user.cpData?.designation,
        }}
        otherApplied={isCAApplied}
        groupLink={settings?.cpartnerGroupLink}
      />
    </div>
  );
};

export default CAStatus;
