"use client";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Link from "next/link";
import React, { useState } from "react";
import { FaUserCircle, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";
import EditPhotoForm from "../Gallery/EditPhotoFor";
import UserDataModal from "./UserDataModal";
import reqs, { reqImgWrapper } from "@/api/requests";
import { method } from "lodash";
import fetchJSON from "@/api/fetchJSON";
import SwitchCheckbox from "@/components/ui/form/SwitchCheckbox";
interface CommonTableProps {
  data: Record<string, any>[];
  fields: string[];
}
const CommonTable: React.FC<CommonTableProps> = ({ data, fields }) => {
  const [modalState, setModalState] = useState<number>(-1);
  function showThisField(field: string) {
    return fields.includes(field);
  }

  return (
    <div className="mt-8 flex max-h-[60vh] w-full max-w-full scroll-pt-[50px] items-start justify-start overflow-auto bg-transparent text-sm text-white">
      <ModalOverlay state={modalState !== -1}>
        <UserDataModal
          user={data[modalState] || {}}
          handleClose={() => setModalState(-1)}
        />
      </ModalOverlay>
      <table className="Nunito relative z-10 w-full min-w-[1200px]">
        <thead className="sticky top-0 z-20 h-[50px]">
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
                <td className="max-w-[350px] px-4 py-2">
                  <div className="inline-flex items-center gap-2">
                    <img
                      className="h-14 w-14 rounded-full"
                      src={reqImgWrapper(row.image) || ""}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{row.fullName}</span>
                      <span className="break-all text-sm">
                        {row.email || "example@example.com"}
                      </span>
                      <span className="break-all text-sm font-bold text-secondary-200">
                        {row.userName || "N/A"}
                      </span>
                    </div>
                  </div>
                </td>
              )}
              {showThisField("class") && (
                <td className="max-w-[150px] px-4 py-2">{row.className}</td>
              )}
              {showThisField("address") && (
                <td className="max-w-[250px] px-4 py-2">{row.address}</td>
              )}
              {showThisField("institute") && (
                <td className="max-w-[250px] px-4 py-2">{row.institute}</td>
              )}
              {showThisField("phone") && (
                <td className="max-w-[250px] px-4 py-2">
                  <div className="inline-flex items-center gap-6">
                    <span>{row.phone}</span>
                    <Link href={row.fb} target="_blank">
                      <FaFacebook className="h-6 w-6" />
                    </Link>
                  </div>
                </td>
              )}
              {showThisField("points") && (
                <td className="max-w-[250px] px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border-2 border-primary-150 p-1 text-sm font-bold">
                      {row.used}
                    </span>
                    <SwitchCheckbox
                      id="blocked"
                      name={"allowed"}
                      onChange={(e) => {
                        fetchJSON(
                          reqs.BLOCK_CA,
                          {
                            method: "PATCH",
                            credentials: "include",
                          },
                          {
                            blockState: !e.currentTarget.checked,
                            userName: row.userName,
                          },
                        );
                      }}
                      defaultChecked={!row.blocked}
                    />
                  </div>
                </td>
              )}
              {showThisField("actions") && (
                <td className="max-w-[250px] px-4 py-2">
                  <div className="flex items-center gap-4">
                    <span className="cursor-pointer rounded-full bg-secondary-400 px-3 py-2 font-bold transition hover:opacity-80">
                      ...
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setModalState(index);
                      }}
                    >
                      <FaExternalLinkAlt className="cursor-pointer text-xl text-secondary-400" />
                    </button>
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
