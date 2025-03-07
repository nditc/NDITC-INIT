import React from "react";
import { FaDownload, FaUserEdit } from "react-icons/fa";

const ProfileCard = () => {
    return (
        <div className="py-10 md:px-16 px-5 bg-primary-550 rounded-3xl shadow-lg text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between  gap-10">

                <div className="flex flex-col lg:flex-row items-center space-x-4">
                    <div className=" lg:-mt-56 rounded-full flex items-center bg-gradient-to-tr from-primary-500 to-primary-200 p-2 justify-center">
                        <div className="w-full h-full rounded-full flex items-center justify-center ">
                            <img src="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg" alt="" className="rounded-full h-28 w-28 object-cover" />
                        </div>
                    </div>
                    <div className="space-y-3 text-center lg:text-left  lg:mt-0 mt-5">
                        <p className="lg:text-4xl font-bold text-2xl md:text-3xl">BINOD</p>
                        <p className="text-lg md:text-xl text-gray-400">aa.b@c.com</p>
                        <p className="text-lg md:text-xl text-gray-400">Notre Dame College, Dhaka</p>
                        <div className="flex gap-4 flex-col md:flex-row">
                        <button className="transition mx-auto lg:mx-0 px-9 md:px-5 py-2  border-4 border-primary-400 hover:bg-transparent bg-primary-400 font-medium rounded-full flex items-center space-x-2">
                            <span >INIT ID-Card</span>
                            <FaDownload />
                        </button>
                        <button className="transition mx-auto lg:mx-0 px-5 py-2  border-4 border-primary-400 hover:bg-primary-400 font-medium rounded-full flex items-center space-x-2">
                            <span >Edit Profile</span>
                            <FaUserEdit />
                        </button>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-44 h-44 rounded-lg flex items-center justify-center p-2 bg-gradient-to-br from-primary-350 to-secondary-300">
                        <div className="w-full h-full rounded-lg  flex items-center justify-center">
                            <img src="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg" alt="" className="h-full w-full rounded-xl object-cover" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfileCard;