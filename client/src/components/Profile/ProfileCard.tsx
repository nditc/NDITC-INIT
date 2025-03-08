import { reqImgWrapper } from "@/api/requests";
import UserContext from "@/context/UserContext";
import { QRCodeSVG } from "qrcode.react";
import React, { useContext } from "react";
import { FaDownload, FaUserEdit } from "react-icons/fa";

const ProfileCard = () => {
  const user = useContext(UserContext);
  return (
    <div className="rounded-3xl bg-primary-550 px-5 py-10 text-white shadow-lg md:px-16">
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="flex flex-col items-center space-x-4 lg:flex-row">
          <div className="flex items-center justify-center rounded-full bg-gradient-to-tr from-primary-500 to-primary-200 p-2">
            <div className="flex h-full w-full items-center justify-center rounded-full">
              <img
                src={reqImgWrapper(user.image) || ""}
                alt=""
                className="h-48 w-48 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col text-center lg:mt-0 lg:text-left">
            <p className="text-sm text-gray-400">{user.userName}</p>
            <p className="text-2xl font-bold md:text-3xl">{user.fullName}</p>
            <p className="text-gray-400"> {user.email}</p>
            <p className="text-gray-400">{user.institute}</p>
            <div className="mt-4 flex flex-col gap-4 md:flex-row">
              <button className="mx-auto flex items-center space-x-2 rounded-full border-4 border-primary-400 px-5 py-2 font-medium transition hover:bg-primary-400 lg:mx-0">
                <span>Edit Profile</span>
                <FaUserEdit />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex h-44 w-44 items-center justify-center rounded-lg bg-gradient-to-br from-primary-350 to-secondary-300 p-2">
            <div className="flex h-full w-full items-center justify-center rounded-lg">
              <QRCodeSVG value={user.qrCode} />
            </div>
          </div>
          <p className="text-xs font-light">{user.qrCode}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
