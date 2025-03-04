"use client";

import { useState } from "react";



export default function Page() {

    const [selectedTab, setSelectedTab] = useState("Solo");
  return (
    <div className="bg-gradient-to-b from-indigo-900 to-indigo-700 text-white p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
          <div>
            <h1 className="text-3xl font-semibold">BINOD</h1>
            <p className="text-sm">aa.b@c.com</p>
            <p className="text-sm">Notre Dame College, Dhaka</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded-full">
            Download Init ID Card
          </button>
          <button className="bg-transparent hover:bg-indigo-500 text-white border-2 border-indigo-600 py-2 px-6 rounded-full">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm">
          <p>Init ID: 12345678900069</p>
        </div>
        <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center text-xl font-semibold">
          QR
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="border-b-2 border-indigo-600 inline-block my-2 w-24"></div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-8 text-center mb-8">
        {["Online Segments", "Offline Segments", "Paid Segments", "Solo Pass", "Submission Based Segments", "Submitted"].map(
          (title, index) => (
            <div key={index} className="bg-indigo-800 p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-2xl font-bold">404</p>
            </div>
          )
        )}
      </div>

      {/* Participated Segments Section */}
      <div className="mb-8">
        <div className="flex justify-center space-x-6 mb-4">
          <button
            className={`px-4 py-2 rounded-full text-lg ${
              selectedTab === "Solo" ? "bg-indigo-600" : "bg-indigo-500"
            }`}
            onClick={() => setSelectedTab("Solo")}
          >
            Solo
          </button>
          <button
            className={`px-4 py-2 rounded-full text-lg ${
              selectedTab === "Team" ? "bg-indigo-600" : "bg-indigo-500"
            }`}
            onClick={() => setSelectedTab("Team")}
          >
            Team
          </button>
        </div>

        {/* Cards for Segments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Tech Quiz", "Tech Quiz", "Tech Quiz"].map((title, index) => (
            <div key={index} className="bg-indigo-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    index === 0 ? "bg-indigo-600" : "bg-indigo-500"
                  }`}
                >
                  {index === 0 ? "Solo Pass" : "Free"}
                </span>
                <p className="text-sm">12 May, 2024</p>
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-sm mb-4">Enjoy the realm of Mystery and A lot of Scarcity.</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Status Section */}
      <div className="mt-8 bg-indigo-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Payment Status</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b-2 border-indigo-600">
              <th className="py-3 px-6 text-lg">Segment</th>
              <th className="py-3 px-6 text-lg">Payment Status</th>
              <th className="py-3 px-6 text-lg">Payment Info</th>
            </tr>
          </thead>
          <tbody>
            {["Tech Quiz", "Tech Quiz", "Tech Quiz", "Tech Quiz"].map((segment, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{segment}</td>
                <td className="py-4 px-6">
                  <span
                    className={`text-white font-semibold py-2 px-4 rounded-full ${
                      index === 0 ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {index === 0 ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm">TrxID: SAD65D4SAD24</p>
                  <p className="text-sm">Number: 013746363854</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
