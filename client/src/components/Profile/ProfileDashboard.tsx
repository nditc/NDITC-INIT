import React from "react";
import ProfileTitle from "./ProfileTitle";

interface StatRowProps {
    titleLeft: string;
    valueLeft: string | number;
    titleRight: string;
    valueRight: string | number;
}

const StatRow: React.FC<StatRowProps> = ({ titleLeft, valueLeft, titleRight, valueRight }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5 justify-between items-center lg:gap-40 px-6 py-2 md:text-lg lg:text-xl text-white">
            <div className="flex justify-between  border-b border-secondary-600 pb-5 ">
                <p className="text-left">{titleLeft}</p>
                <span className="text-right">{valueLeft}</span>
            </div>
            <div className="flex justify-between  border-b border-secondary-600 pb-5 ">
                <p className="text-left ">{titleRight}</p>
                <span className="text-right">{valueRight}</span>
            </div>
        </div>
    );
};

const ProfileDashboard: React.FC = () => {
    return (
        <div className="my-10 ">
            <ProfileTitle title="Dashboard" />
            <div className="bg-gradient-to-bl from-primary-550 to-primary-650 py-10 px-5 lg:px-28 text-center  border-secondary-500 border  rounded-3xl shadow-lg text-white">
                <p className="text-xl md:text-2xl lg:text-2xl">Number of Participated Segments</p>

                <div className="bg-primary-400 text-white font-bold px-6 py-2 rounded-full inline-block my-5">
                    404
                </div>

                <div className="mt-4">
                    <StatRow titleLeft="Online Segments" valueLeft={404} titleRight="Solo Pass" valueRight={404} />
                    <StatRow titleLeft="Offline Segments" valueLeft={404} titleRight="Submission Based Segments" valueRight={404} />
                    <StatRow titleLeft="Paid Segments" valueLeft={404} titleRight="Submitted" valueRight={404} />
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;
