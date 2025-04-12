import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { FaFacebook, FaEnvelope, FaPhone, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

interface UserDataModalProps {
  user: {
    [key: string]: any;
  };
  handleClose: () => void;
  hideFields: string[];
}

const UserDataModal = ({ user, handleClose, hideFields }: UserDataModalProps) => { 
  let userData = Object.entries(user).filter(([key]) => !hideFields.includes(key));
 
  const formatFieldName = (field: string) => {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
 
  const renderValue = (value: any) => {
    if (value === null || value === undefined) return <span className="text-primary-150">N/A</span>;

    const strValue = String(value);

    if (isJsonString(strValue)) {
      const parsed = JSON.parse(strValue);
      return (
        <div className="space-y-1">
          {Object.entries(parsed).map(([k, v]) => (
            <div key={k} className="flex flex-wrap">
              <span className="font-medium text-secondary-200">{formatFieldName(k)}:</span>
              <span className="ml-2 text-primary-150 break-all">{String(v)}</span>
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
            className="text-primary-300 hover:underline hover:text-primary-200 flex items-center"
          >
            {isImage ? "Open Image" : "Open Link"}
            <FaExternalLinkAlt className="ml-1 text-xs" />
          </a>
        </div>
      );
    }

    return <span className="text-primary-150 break-all">{strValue}</span>;
  };

  return (
    <div className="relative max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-primary-600 p-8 pt-16 shadow-2xl  
                [&::-webkit-scrollbar]:w-3
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-secondary-700"> 
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 rounded-full p-2 text-secondary-200 hover:bg-primary-600 hover:text-white"
        aria-label="Close"
      >
        <FaTimes className="h-6 w-6" />
      </button>
 
      <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 mx-auto md:mx-0">
          {user.image && (
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary-400 shadow-lg md:mb-0">
              <img
                src={user.image}
                alt="User"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                }}
              />
            </div>
          )}

          <div className="text-center md:text-left">
            <p className="text-3xl font-bold text-secondary-200">{user.fullName || "User Details"}</p>
            {user.institute && (
              <p className="mt-1 text-lg text-primary-250">{user.institute}</p>
            )}
            {user.className && (
              <p className="text-primary-300">{`Class ${user.className}`} <span> {user.roll_no ? `- Roll ${user.roll_no}` : ''}</span></p>
            )}
          </div>
        </div>
 
        {user.qrCode && (
          <div className="mt-4 md:mt-0 mx-auto md:mx-0">
            <div className="rounded-lg bg-white p-2">
              <QRCodeSVG
                value={user.qrCode}
              />
            </div>
            <p className="text-xs text-center mt-1 text-secondary-200">{user.qrCode}</p>
          </div>
        )}
      </div>

      
      {(user.fb || user.email || user.phone) && (
        <div className="mt-6">
          <p className="mb-3 text-xl font-semibold text-secondary-200">Contact Information</p>
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

      
      <div className="mt-8 ">
        <p className="text-xl mb-3 font-semibold text-secondary-200">Event's Information</p>
        <div className=" grid grid-cols-1 gap-6 border-t border-primary-600 sm:grid-cols-2 lg:grid-cols-3">


          {userData.map(([key, value]) => (
            <div key={key} className="rounded-lg bg-dark-card-bg-light p-4 shadow break-words overflow-hidden">
              <label className="block text-sm font-semibold uppercase tracking-wider text-secondary-200">
                {formatFieldName(key)}
              </label>
              <div className="mt-2">
                {renderValue(value)}
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="text-right">
        <button
          onClick={handleClose}
          className=" bg-red-700 rounded-full px-4 py-2 mt-3 mx-auto hover:bg-red-600 transition mx-auto text-white"
          aria-label="Close"
        >
          Cancel
        </button>
      </div>

    </div>
  );
};

export default UserDataModal;