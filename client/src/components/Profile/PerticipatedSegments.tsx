import React, { useState } from "react";
import ProfileTitle from "./ProfileTitle";
import { FaCalendar, FaExternalLinkAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { TiTick } from "react-icons/ti";

const ParticipatedSegments: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState("Solo");

    const demoData = [
        {
            title: "Tech Quiz",
            type: "Solo Pass",
            status: "Registered",
            description: "Enjoy the realm of Mystery and A lot of Scarcity.",
            location: "Online Submission",
            date: "12 May, 2024",
            learnMoreLink: "#"
        },
        {
            title: "Tech Quiz",
            type: "Free",
            status: "Registered",
            description: "Explore the world of technology and innovation.",
            location: "Virtual Event",
            date: "15 May, 2024",
            learnMoreLink: "#"
        },
        {
            title: "Tech Quiz",
            type: "Free",
            status: "Registered",
            description: "Dive into the latest tech trends and challenges.",
            location: "Online Platform",
            date: "20 May, 2024",
            learnMoreLink: "#"
        }
    ];

    return (
        <div className="my-10">
            <ProfileTitle title="Participated Segments" />

            <div className="flex justify-center mb-6">
                <div className="bg-secondary-400 p-1 rounded-3xl flex">
                    {["Solo", "Team"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-12 py-2 rounded-3xl text-lg font-semibold transition-all duration-300 ${
                                selectedTab === tab ? "bg-primary-350 text-white shadow-lg" : "text-white"
                            }`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {demoData.map(({ title, type, status, description, location, date, learnMoreLink }, index) => (
                    <div
                        key={index}
                        className="px-6 py-10 min-h-80 relative bg-gradient-to-tl from-primary-550 to-primary-600 border border-secondary-500 backdrop-blur-md rounded-xl text-white shadow-lg"
                    >
                        <span className="absolute top-4 right-4 text-sm px-5 py-2 rounded-full font-medium bg-secondary-400 text-white">
                            {type}
                        </span>

                        <FaExternalLinkAlt className="absolute top-4 left-4 text-primary-200 text-xl" />

                        <div className="mt-16">
                            <p className="text-2xl font-semibold text-primary-150 text-center md:text-left">{title}</p>

                            <div className="flex justify-between gap-3 my-5 text-sm md:text-lg text-secondary-200">
                                <p className="flex items-center gap-2">
                                    <FaCalendar /> {date}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaMapMarkerAlt /> {location}
                                </p>
                            </div>

                            <p className="text-md md:text-xl text-primary-150">{description}</p>

                            <div className="flex justify-between gap-2 mt-8">
                                <button className="flex items-center gap-2 bg-primary-400 hover:bg-primary-450 transition text-white px-6 py-3 rounded-full text-sm md:text-lg font-semibold">
                                    <TiTick className="text-xl md:text-2xl" />
                                    {status}
                                </button>
                                <Link
                                    href={learnMoreLink}
                                    className="bg-secondary-500 hover:bg-primary-450 transition text-white px-6 py-3 rounded-full text-sm md:text-lg font-semibold"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParticipatedSegments;
