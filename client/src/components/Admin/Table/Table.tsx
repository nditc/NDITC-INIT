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
        return fields.some(f => f.toLowerCase() === field.toLowerCase());
    }

    return (
        <div className=" mt-32 bg-transparent text-white overflow-auto flex justify-start items-start mx-10">
            <ModalOverlay state={"data"} >
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
            <table className="table-fixed Nunito w-full min-w-[1200px]  ">
                <thead >
                    <tr className="bg-secondary-400 rounded-t-lg *:text-start text-lg font-bold">
                        {fields.map((field) => (
                            <th key={field} className="py-2 px-4 first:rounded-l-xl last:rounded-r-xl">{field.charAt(0).toUpperCase() + field.slice(1)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="*:py-3">
                            {showThisField("name") && (
                                <td className="px-4 py-2">
                                    <div className="inline-flex gap-2 items-center">
                                        <FaUserCircle className="w-14 h-14 rounded-full bg-gray-400" />
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{row.name}</span>
                                            <span className="text-sm">{row.email || "example@example.com"}</span>
                                            <span className="text-sm text-secondary-200 font-bold">{row.id || "N/A"}</span>
                                        </div>
                                    </div>
                                </td>
                            )}
                            {showThisField("class") && <td className="px-4 py-2">{row.class}</td>}
                            {showThisField("address") && <td className="px-4 py-2">{row.address}</td>}
                            {showThisField("institute") && <td className="px-4 py-2">{row.institute}</td>}
                            {showThisField("phone") && (
                                <td className="px-4 py-2">
                                    <div className="inline-flex gap-6 items-center">
                                        <span>{row.phone}</span>
                                        <a href="#" target="_blank">
                                            <FaFacebook className="w-6 h-6" />
                                        </a>
                                    </div>
                                </td>
                            )}
                            {showThisField("points") && (
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <span className="border-2 rounded-full font-bold text-xs p-1">CA</span>
                                        <button className="border-2 w-10 h-6 border-white p-1 rounded-3xl relative flex justify-end items-center">
                                            <div className="w-4 h-4 rounded-full bg-white absolute right-1"></div>
                                        </button>
                                    </div>
                                </td>
                            )}
                            {showThisField("actions") && (
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold px-3 py-2 bg-secondary-400 rounded-full cursor-pointer transition hover:opacity-80">
                                            ...
                                        </span>
                                        <Link href="#" target="_blank">
                                            <FaExternalLinkAlt className="text-xl text-secondary-400 cursor-pointer" />
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
