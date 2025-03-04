import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";
import ProfileTitle from "./ProfileTitle";
 
const dummyData = [
  {
    segment: "Tech Quiz",
    paymentStatus: "Paid",
    trxId: "SAD65D4SAD24",
    number: "013746363854",
  },
  {
    segment: "Tech Quiz",
    paymentStatus: "Pending",
    trxId: "SAD65D4SAD24",
    number: "013746363854",
  },
  {
    segment: "Tech Quiz",
    paymentStatus: "Pending",
    trxId: "SAD65D4SAD24",
    number: "013746363854",
  },
  {
    segment: "Tech Quiz",
    paymentStatus: "Pending",
    trxId: "SAD65D4SAD24",
    number: "013746363854",
  },
];

const PaymentStatus: React.FC = () => {
  return (
    <div className="my-10">
      <ProfileTitle title="Payment Status" />
      <div className="bg-gradient-to-bl from-primary-550 to-primary-650 md:py-20 p-3 lg:px-28 text-center border-secondary-500 border rounded-3xl shadow-lg text-white">
        <div className="overflow-x-auto">
          <table className="min-w-max w-full text-left">
            <thead className="bg-secondary-400 rounded-3xl">
              <tr className="text-lg text-center">
                <th className="py-3 px-6 rounded-l-2xl">Segment</th>
                <th className="py-3 px-6">Payment Status</th>
                <th className="py-3 px-6">Payment Info</th>
                <th className="py-3 px-6 rounded-r-2xl"></th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="py-4 px-6 text-xl font-bold text-white">{data.segment}</td>
                  <td className="py-4 px-6">
                    <div
                      className={`text-white mx-auto font-semibold rounded-full w-32 py-1 flex gap-2 items-center ${
                        data.paymentStatus === "Paid" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      <TbCoinTakaFilled className="w-7 h-7 ml-1" />
                      <span>{data.paymentStatus}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="inline-grid grid-cols-2 justify-between">
                      <div className="text-left text-primary-150">
                        <p className="text-sm">TrxID:</p>
                        <p className="text-sm">Number:</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm">{data.trxId}</p>
                        <p className="text-sm">{data.number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <FaExternalLinkAlt className="text-primary-200" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;