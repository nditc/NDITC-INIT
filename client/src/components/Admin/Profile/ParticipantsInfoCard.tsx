import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

const ParticipantsInfoCard = () => {
    return (
        <div className="py-10 md:px-16 px-2  bg-primary-550 rounded-3xl shadow-lg text-white text-center min-h-96">
            <div className="py-2 pl-2 pr-5 bg-secondary-400 text-xl font-bold inline-flex rounded-full items-center gap-4">
                <span className="bg-secondary-600 p-3 rounded-full ">
                    <IoPeople className="text-primary-300 text-3xl" />
                </span>
                <span> Participants Info</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-৪ mt-10">
                <div className="space-y-24 overflow-y-auto max-h-[75vh] md:px-10 px-5  
                [&::-webkit-scrollbar]:w-3
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-primary-300">
                    <div >
                        <p className="text-3xl text-primary-300 font-bold text-center">Olympiads</p>
                        <ul>
                            {
                                [...Array(3).keys()].map(i =>
                                    <li className="text-xl md:text-2xl text-white font-bold flex justify-between border-b md:border-b-2 py-7 border-secondary-100" key={i}>
                                        <span>Poster Design </span>
                                        <span>{i}</span>
                                    </li>)
                            }
                        </ul>
                    </div>
                    <div>
                        <p className="text-3xl text-primary-300 font-bold text-center">Olympiads</p>
                        <ul>
                            {
                                [...Array(5).keys()].map(i =>
                                    <li className="text-2xl text-white font-bold flex justify-between border-b-2 py-7 border-secondary-100" key={i}>
                                        <span>Poster Design </span>
                                        <span>{i}</span>
                                    </li>)
                            }
                        </ul>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default ParticipantsInfoCard;