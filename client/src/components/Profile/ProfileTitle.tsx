import React from "react";

interface ProfileTitleProps {
  title: string;
}

const ProfileTitle: React.FC<ProfileTitleProps> = ({ title }) => {
  return (
    <div className="mb-6 text-center">
      <p className="inline-block bg-gradient-to-r from-primary-400 via-secondary-200 to-primary-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
        {title}
      </p>
      <div className="mx-auto mt-2.5 w-44 rounded-lg border-b-4 border-b-primary-350"></div>
    </div>
  );
};

export default ProfileTitle;
