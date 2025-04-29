import React, { useState } from "react";
import Input from "../ui/form/Input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SearchBar = ({ eventSelected }: { eventSelected: string }) => {
  const searchParams = useSearchParams();
  const searchKey = searchParams.get("s") || "";
  const [searchVal, setSearchVal] = useState(searchKey || "");

  return (
    <div className="mb-4 flex gap-4">
      <Input
        className="grow-1 w-full"
        value={searchVal}
        onChange={(s) => setSearchVal(s.currentTarget.value)}
        label="Search by E-mail/fullName"
      />
      <Link
        type="button"
        href={`?event=${encodeURIComponent(eventSelected)}&s=${encodeURIComponent(searchVal)}`}
        className="flex shrink-0 cursor-pointer items-center rounded-full bg-secondary-600 px-5 py-2.5 before:bg-secondary-600 hover:bg-secondary-500 sm:px-8"
      >
        🔎 Search
      </Link>
    </div>
  );
};

export default SearchBar;
