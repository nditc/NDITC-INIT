"use client";
import React from "react";
import { FaCheckCircle, FaRegClock, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CAStatusProps {
  user: {
    hasAppliedForCA: boolean;
    isApproved: boolean;
    caCode?: string;
    points?: number;
  };
}

const CAStatus: React.FC<CAStatusProps> = ({ user }) => {
  const { hasAppliedForCA, isApproved, caCode, points } = user;

  const handleApplyForCA = () => {
    toast.info("Redirecting to CA application page...");
  };

  const handleCopyCode = () => {
    if (caCode) {
      navigator.clipboard.writeText(caCode);
      toast.success("CA Code copied to clipboard!");
    }
  };

  const StatusMessage = ({ icon, message, additionalContent }: any) => (
    <div className="flex flex-col items-center gap-4">
      {icon}
      <p className="text-lg text-center">{message}</p>
      {additionalContent}
    </div>
  );

  const ApprovedContent = () => (
    <div className="flex items-center w-full justify-between gap-4 bg-primary-700 px-4 py-2 rounded-lg text-secondary-200 text-2xl">
      <div className="text-center bg-primary-400/50 p-6 rounded-lg border border-primary-400/50 w-full text-xl">
        <strong>Points:</strong> <span>{points}</span>
      </div>
      <div className="text-center text-primary-150 text-xl bg-primary-400/50 p-6 rounded-lg border w-full border-primary-400/50">
        <strong>CA Code:</strong> {caCode}
        <button onClick={handleCopyCode} className="text-primary-150 ml-2 hover:text-secondary-100 transition-colors">
          <FaCopy className="text-xl" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl my-2 mx-auto border-white/5 bg-gradient-to-tl from-primary-550 to-primary-600 backdrop-blur-md p-6 rounded-2xl border-2 border-primary-400 text-primary-200">
      <p className="text-3xl font-bold text-secondary-200 mb-4 text-center">CA Status</p>

      {!hasAppliedForCA ? (
        <StatusMessage
          message="You have not applied for the CA program yet."
          additionalContent={
            <button
              onClick={handleApplyForCA}
              className="px-6 py-2 bg-secondary-300 text-primary-650 rounded-lg hover:bg-secondary-200 transition-colors"
            >
              Apply for CA
            </button>
          }
        />
      ) : !isApproved ? (
        <StatusMessage
          icon={<FaRegClock className="text-4xl text-primary-400" />}
          message="Your CA application is pending approval. Please wait for the admins to review your application."
        />
      ) : (
        <StatusMessage
          icon={<FaCheckCircle className="text-4xl text-primary-400" />}
          message="Congratulations! Your CA application has been approved."
          additionalContent={<ApprovedContent />}
        />
      )}
    </div>
  );
};

export default CAStatus;
