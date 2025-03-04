"use client";
import CommonTable from "@/components/Admin/Table/Table";
import Pagination from "@/components/Pagination";
import { useState } from "react";

const data = [
  {
    name: "Sumit Shaha",
    email: "whereareyou@gmail.com",
    id: "326438AAB",
    class: "HSC-2024",
    address: "39, Toyanbee Circular Road, Arambagh, Dhaka",
    institute: "Notre Dame College",
    phone: "01912638273",
    points: "32",
  },
  {
    name: "Alice Johnson",
    email: "alice@gmail.com",
    id: "112233XYZ",
    class: "HSC-2024",
    address: "123 Elm Street, Springfield",
    institute: "Springfield High",
    phone: "01712345678",
    points: "32",
  },
  {
    name: "Michael Smith",
    email: "michael@gmail.com",
    id: "556677ABC",
    class: "SSC-2023",
    address: "456 Oak Avenue, Riverside",
    institute: "Riverside Academy",
    phone: "01987654321",
    points: "32",
  },
];

const fields = ["name", "class", "address", "institute", "phone", "points", "actions"]; // Write the fields you want to display in the table.



export default function Page() {

  const totalPages = 50
  const [currentPage, setCurrentPage] = useState(0);
  function onPageChange(page:number) {
    setCurrentPage(page)
  }
  return (
    <div className="my-80">
      {/* <CommonTable data={data} fields={fields} /> */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
