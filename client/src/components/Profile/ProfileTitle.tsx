import React from "react";

interface ProfileTitleProps {
    title: string;
}

const ProfileTitle: React.FC<ProfileTitleProps> = ({ title }) => {
    return (
        <div className="text-center mb-6">
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-400 via-secondary-200 to-primary-400 inline-block text-transparent bg-clip-text">
                {title}
            </p>
            <div className="border-b-8 rounded-lg mt-4 border-b-primary-350 w-44 mx-auto"></div>
        </div>
    );
};

export default ProfileTitle;
