"use client";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaUserCircle,
  FaFacebook,
  FaExternalLinkAlt,
  FaTrash,
} from "react-icons/fa";
import EditPhotoForm from "../Gallery/EditPhotoFor";
import UserDataModal from "./UserDataModal";
import reqs, { reqImgWrapper } from "@/api/requests";
import { method } from "lodash";
import fetchJSON from "@/api/fetchJSON";
import SwitchCheckbox from "@/components/ui/form/SwitchCheckbox";
import { parseConditionalJSON } from "@/utils/JSONparse";
import { TbCoinTakaFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ConfirmClose from "@/components/ConfirmClose";
interface CommonTableProps {
  data: Record<string, any>[];
  fields: string[];
  selectedEvent: string;
  refreshPage?: () => void;
}

const TableRow = ({
  row,
  setModalState,
  fields,
  index,
  selectedEvent,
  refreshPage,
}: {
  row: any;
  setModalState: (b: number) => void;
  fields: string[];
  index: number;
  selectedEvent: string;
  refreshPage?: () => void;
}) => {
  const rowData: any = {};
  Object.keys(row).map((key) => {
    const val = row[key];
    rowData[key] = parseConditionalJSON(val);
  });
  function showThisField(field: string) {
    return fields.includes(field);
  }
  const Router = useRouter();

  const handleDelete = () => {
    toast.warning(
      <ConfirmClose
        deleteAction={async () => {
          try {
            await fetchJSON(
              reqs.DELETE_EVENT_PARTICIPATION,
              {
                method: "PUT",
                credentials: "include",
              },
              {
                parId: rowData.id,
                targetEvent: selectedEvent,
              },
            );
            toast.success("Event Deleted Successfully.");
            Router.refresh();
            refreshPage && refreshPage();
          } catch (err) {
            toast.error(String(err));
          }
        }}
      />,
      {
        autoClose: false,
        position: "bottom-center",
        closeButton: false,
        toastId: "close?",
      },
    );
  };
  return (
    <tr key={index} className="*:py-3">
      {showThisField("name") && (
        <td className="min-w-[300px] max-w-[350px] px-4 py-2">
          <div className="inline-flex items-center gap-2">
            <img
              className="h-14 w-14 rounded-full"
              src={reqImgWrapper(rowData.image) || ""}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-semibold">{rowData.fullName}</span>
              <span className="break-all text-sm">
                {rowData.email || "example@example.com"}
              </span>
              <span className="break-all text-sm font-bold text-secondary-200">
                {rowData.userName || "N/A"}
              </span>
            </div>
          </div>
        </td>
      )}
      {showThisField("class") && (
        <td className="max-w-[150px] px-4 py-2">{rowData.className}</td>
      )}
      {showThisField("address") && (
        <td className="min-w-[150px] max-w-[250px] shrink-0 px-4 py-2">
          {rowData.address}
        </td>
      )}
      {showThisField("institute") && (
        <td className="min-w-[150px] max-w-[250px] shrink-0 px-4 py-2">
          {rowData.institute}
        </td>
      )}
      {showThisField("phone") && (
        <td className="min-w-[150px] max-w-[250px] shrink-0 px-4 py-2">
          <div className="inline-flex items-center gap-6">
            <span>{rowData.phone}</span>
            <Link href={rowData.fb} target="_blank">
              <FaFacebook className="h-6 w-6" />
            </Link>
          </div>
        </td>
      )}
      {showThisField("points") && (
        <td className="min-w-[150px] max-w-[250px] shrink-0 px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="rounded-full border-2 border-primary-150 p-1 text-sm font-bold">
              {rowData.used}
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
                    userName: rowData.userName,
                  },
                );
              }}
              defaultChecked={!rowData.blocked}
            />
          </div>
        </td>
      )}
      {showThisField("actions") && (
        <td className="min-w-[150px] max-w-[250px] shrink-0 px-4 py-2">
          <div className="flex items-center gap-4">
            {selectedEvent !== "allPar" ? (
              <button
                onClick={handleDelete}
                className="cursor-pointer rounded-full bg-red-600 px-3 py-2 font-bold text-white transition hover:opacity-80"
              >
                <FaTrash />
              </button>
            ) : null}
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
      {showThisField("submission") && (
        <td className="min-w-[200px] max-w-[250px] shrink-0 px-4 py-2">
          <div className="flex flex-col gap-2 text-white/80">
            {rowData?.SubNames[selectedEvent]
              ?.split("&&&&")
              .map((n: any, i: number) => {
                return (
                  <>
                    {" "}
                    <Link
                      key={i}
                      className="text-primary-250 hover:underline"
                      target="_blank"
                      href={rowData?.SubLinks[selectedEvent]?.split("&&&&")[i]}
                    >
                      {n} <FaExternalLinkAlt className="icn-inline" />
                    </Link>{" "}
                  </>
                );
              })}
          </div>
        </td>
      )}
      {showThisField("payment verification") && (
        <td className="min-w-[250px] max-w-[350px] shrink-0 px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="text-sm">
              <span className="text-white/60">TrxId:</span>{" "}
              {rowData?.transactionID[selectedEvent]} <br></br>
              <span className="text-white/60">Number:</span>{" "}
              {rowData?.transactionNum[selectedEvent]}
            </span>
            <div className="flex flex-col justify-center gap-1.5">
              <div
                className={`inline-flex rounded-full py-1 pl-2 pr-3 text-xs font-semibold text-white ${
                  rowData?.paidEvent[selectedEvent] === 1
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                <div className="mx-auto flex items-center gap-1">
                  <TbCoinTakaFilled className="h-4 w-4" />
                  <span>
                    {rowData?.paidEvent[selectedEvent] ? "Cofirmed" : "Pending"}
                  </span>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    await fetchJSON(
                      reqs.PAYMENT_VERIFICATION + rowData.id,
                      { credentials: "include", method: "POST" },
                      { type: true, eventName: selectedEvent },
                    );
                    toast.success("User Payment Verified");
                    refreshPage && refreshPage();
                  } catch (err) {
                    toast.error(String(err));
                  }
                }}
                className={`inline-flex justify-center rounded-full bg-primary-400 p-3 py-1 text-center text-xs font-semibold text-white hover:bg-primary-450`}
              >
                Verify
              </button>
            </div>
          </div>
        </td>
      )}
      {showThisField("Member Count") && (
        <td className="text- min-w-[150px] max-w-[250px] shrink-0 px-4 py-2">
          <span className="rounded-full border-2 border-primary-350 p-2 px-4 text-base text-white">
            {rowData?.members?.length}
          </span>
        </td>
      )}
      {showThisField("Members Name") && (
        <td className="min-w-[200px] max-w-[250px] shrink-0 px-4 py-2">
          <div className="flex flex-col">
            {rowData?.members?.map((md: any, i: number) => {
              return (
                <p key={i}>
                  <span className="text-primary-150">{i + 1}</span>.{" "}
                  {md?.fullName}
                </p>
              );
            })}
          </div>
        </td>
      )}
      {showThisField("Members Email") && (
        <td className="min-w-[200px] max-w-[250px] shrink-0 px-4 py-2">
          <div className="flex flex-col">
            {rowData?.members?.map((md: any, i: number) => {
              return (
                <p key={i}>
                  <span className="text-primary-150">{i + 1}</span>. {md?.email}
                </p>
              );
            })}
          </div>
        </td>
      )}
    </tr>
  );
};

const CommonTable: React.FC<CommonTableProps> = ({
  data,
  fields,
  selectedEvent,
  refreshPage,
}) => {
  const [modalState, setModalState] = useState<number>(-1);

  return (
    <div className="mt-8 flex max-h-[60vh] w-full max-w-full scroll-pt-[50px] items-start justify-start overflow-auto bg-transparent text-sm text-white">
      <ModalOverlay state={modalState !== -1}>
        <UserDataModal
          user={data[modalState] || {}}
          handleClose={() => setModalState(-1)}
          hideFields={[
            "id",
            "className",
            "image",
            "roll_no",
            "fb",
            "email",
            "phone",
            "qrCode",
            "SubNames",
            "Members",
          ]}
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
            <TableRow
              key={index}
              row={row}
              index={index}
              setModalState={setModalState}
              fields={fields}
              selectedEvent={selectedEvent}
              refreshPage={refreshPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
