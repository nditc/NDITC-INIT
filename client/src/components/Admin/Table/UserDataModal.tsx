import React, { useContext } from "react";


interface UserDataModalProps {
  user: {
    name: string;
    email: string;
    id: string;
    class: string;
    address: string;
    institute: string;
    phone: string;
    points: string;
    [key: string]: string;
  };
}

const UserDataModal = ({ user }: UserDataModalProps) => {
  

  const handleClose = () => {
    
  };

  return (
    <div className="bg-opacity-200 w-full max-w-[550px] rounded-2xl bg-secondary-700/80 to-gray-900 p-6 shadow-lg">
      <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">User Details</h2>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-secondary-500 pt-4">
        {[
          { label: "Name", value: user.name },
          { label: "Email", value: user.email },
          { label: "User ID", value: user.id },
          { label: "Class", value: user.class },
          { label: "Phone", value: user.phone },
          { label: "Points", value: user.points },
        ].map(({ label, value }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-secondary-300">{label}</label>
            <p className="mt-1 text-secondary-200">{value}</p>
          </div>
        ))}

        {["Institute", "Address"].map((label) => (
          <div key={label} className="col-span-2">
            <label className="block text-sm font-medium text-secondary-300">{label}</label>
            <p className="mt-1 text-secondary-200">{user[label.toLowerCase()]}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleClose}
          className="rounded-full bg-secondary-500 px-6 py-2 text-white transition hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDataModal;