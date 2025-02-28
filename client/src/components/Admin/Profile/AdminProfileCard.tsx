import React from "react";
import { FaUserEdit } from "react-icons/fa";

const AdminProfileCard = () => {
  return (
    <div className="py-10 px-16  bg-primary-550   rounded-3xl shadow-lg text-white">
      <div className="flex items-center justify-between ">

        <div className="flex items-center space-x-4">
          <div className=" -mt-96 rounded-full flex items-center bg-gradient-to-tr from-primary-500 to-primary-200 p-2 justify-center">
            <div className="w-full h-full rounded-full flex items-center justify-center ">
              <img src="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg" alt="" className="rounded-full h-64 w-64 object-cover" />
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-6xl font-bold">admin420</p>
            <p className="text-2xl text-gray-400">admin420@gmail.com</p>
            <button className="mt-2 px-10 py-4 text-xl bg-gradient-to-r from-primary-400 to-secondary-400 hover:from-primary-300 hover:to-secondary-300  font-medium rounded-full flex items-center space-x-2">
              <span>Edit Profile</span>
              <FaUserEdit />
            </button>
            <p className="text-gray-400 text-xl cursor-pointer">Other Admins ▼</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-72 h-72 rounded-lg flex items-center justify-center p-2 bg-gradient-to-br from-primary-350 to-secondary-300">
            <div className="w-full h-full rounded-lg  flex items-center justify-center">
              <img src="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg" alt="" className="h-full w-full rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminProfileCard;