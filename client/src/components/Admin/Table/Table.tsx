"use client";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Link from "next/link";
import React from "react";
import { FaUserCircle, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";
import EditPhotoForm from "../Gallery/EditPhotoFor";
import UserDataModal from "./UserDataModal";
interface CommonTableProps {
  data: Record<string, any>[];
  fields: string[];
}
const CommonTable: React.FC<CommonTableProps> = ({ data, fields }) => {
  function showThisField(field: string) {
    return fields.some((f) => f.toLowerCase() === field.toLowerCase());
  }

  return (
    <div className="mx-10 mt-32 flex items-start justify-start overflow-auto bg-transparent text-white">
      <ModalOverlay state={false}>
        <UserDataModal
          user={{
            name: "Michael Smith",
            email: "michael@gmail.com",
            id: "556677ABC",
            class: "SSC-2023",
            address: "456 Oak Avenue, Riverside",
            institute: "Riverside Academy",
            phone: "01987654321",
            points: "32",
          }}
        />
      </ModalOverlay>
      <table className="Nunito w-full min-w-[1200px] table-fixed">
        <thead>
          <tr className="rounded-t-lg bg-secondary-400 text-lg font-bold *:text-start">
            {fields.map((field) => (
              <th
                key={field}
                className="px-4 py-2 first:rounded-l-xl last:rounded-r-xl"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="*:py-3">
              {showThisField("name") && (
                <td className="px-4 py-2">
                  <div className="inline-flex items-center gap-2">
                    <FaUserCircle className="h-14 w-14 rounded-full bg-gray-400" />
                    <div className="flex flex-col">
                      <span className="font-semibold">{row.name}</span>
                      <span className="text-sm">
                        {row.email || "example@example.com"}
                      </span>
                      <span className="text-sm font-bold text-secondary-200">
                        {row.id || "N/A"}
                      </span>
                    </div>
                  </div>
                </td>
              )}
              {showThisField("class") && (
                <td className="px-4 py-2">{row.class}</td>
              )}
              {showThisField("address") && (
                <td className="px-4 py-2">{row.address}</td>
              )}
              {showThisField("institute") && (
                <td className="px-4 py-2">{row.institute}</td>
              )}
              {showThisField("phone") && (
                <td className="px-4 py-2">
                  <div className="inline-flex items-center gap-6">
                    <span>{row.phone}</span>
                    <a href="#" target="_blank">
                      <FaFacebook className="h-6 w-6" />
                    </a>
                  </div>
                </td>
              )}
              {showThisField("points") && (
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border-2 p-1 text-xs font-bold">
                      CA
                    </span>
                    <button className="relative flex h-6 w-10 items-center justify-end rounded-3xl border-2 border-white p-1">
                      <div className="absolute right-1 h-4 w-4 rounded-full bg-white"></div>
                    </button>
                  </div>
                </td>
              )}
              {showThisField("actions") && (
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <span className="cursor-pointer rounded-full bg-secondary-400 px-3 py-2 font-bold transition hover:opacity-80">
                      ...
                    </span>
                    <Link href="#" target="_blank">
                      <FaExternalLinkAlt className="cursor-pointer text-xl text-secondary-400" />
                    </Link>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
