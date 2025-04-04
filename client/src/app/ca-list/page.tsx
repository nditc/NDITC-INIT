"use client";
import { useState, useMemo } from "react";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import { toast } from "react-toastify";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";
import { FaUser } from "react-icons/fa";
import ExtendedColors from "../../../color.config";

interface CAData {
  name: string;
  institution: string;
  class: string;
  caCode: string;
  points: number;
  image?: string;
}

const caData: CAData[] = [
  {
    name: "Tasneem Sahat",
    institution: "Notre Dame College",
    class: "11",
    caCode: "CA12345",
    points: 120,
  },
  {
    name: "John Doe",
    institution: "ABC College",
    class: "12",
    caCode: "CA67890",
    points: 95,
  },
  {
    name: "Jane Smith",
    institution: "XYZ School",
    class: "10",
    caCode: "CA54321",
    points: 150,
  },
  {
    name: "Tasneem Sahat",
    institution: "Notre Dame College",
    class: "11",
    caCode: "CA12345",
    points: 120,
  },
  {
    name: "John Doe",
    institution: "ABC College",
    class: "12",
    caCode: "CA67890",
    points: 95,
  },
  {
    name: "Jane Smith",
    institution: "XYZ School",
    class: "10",
    caCode: "CA54321",
    points: 150,
  },
];

interface SearchAndSortProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortPoints: string;
  setSortPoints: (value: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchTerm,
  setSearchTerm,
  sortPoints,
  setSortPoints,
}) => (
  <div className="mb-6 flex flex-col gap-4 md:flex-row">
    <Input
      type="text"
      placeholder="Search by name"
      value={searchTerm}
      onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      label="Search by name"
      divClass="w-full md:w-1/2"
    />
    <Select
      values={["", "lowToHigh", "highToLow"]}
      labels={["Sort by Points", "Points: Low to High", "Points: High to Low"]}
      defaultValue={sortPoints}
      onChange={(e) => setSortPoints((e.target as HTMLSelectElement).value)}
      label="Sort by points"
      divClass="w-full md:w-1/2"
    />
  </div>
);

interface TableRowProps {
  ca: CAData;
  copyCACode: (caCode: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ ca, copyCACode }) => (
  <tr className="transition-colors hover:bg-primary-650">
    <td className="px-5 py-3 text-white">
      <div className="flex items-center gap-3">
        {ca.image ? (
          <img
            src={ca.image}
            alt={ca.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500">
            <FaUser className="text-xl text-primary-150" />
          </div>
        )}
      </div>
    </td>
    <td className="max-w-[150px] truncate px-5 py-3 text-white">{ca.name}</td>
    <td className="max-w-[150px] truncate px-5 py-3 text-white">
      {ca.institution}
    </td>
    <td className="max-w-[100px] truncate px-5 py-3 text-white">{ca.class}</td>
    <td className="max-w-[100px] truncate px-5 py-3 text-secondary-200">
      {ca.caCode}
    </td>
    <td className="px-5 py-3">
      <button
        onClick={() => copyCACode(ca.caCode)}
        className="rounded-lg bg-secondary-300 px-4 py-2 text-primary-650 hover:bg-secondary-200"
      >
        Copy
      </button>
    </td>
  </tr>
);

const CAList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortPoints, setSortPoints] = useState<string>("");

  const filteredData = useMemo(() => {
    let result = caData.filter((ca) =>
      ca.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortPoints === "lowToHigh") {
      return [...result].sort((a, b) => a.points - b.points);
    }
    if (sortPoints === "highToLow") {
      return [...result].sort((a, b) => b.points - a.points);
    }
    return result;
  }, [searchTerm, sortPoints]);

  const copyCACode = (caCode: string) => {
    navigator.clipboard.writeText(caCode).then(() => {
      toast.success(`CA Code ${caCode} copied to clipboard!`);
    });
  };

  return (
    <main className="max-w-screen bg-primary-900 relative overflow-hidden text-primary-200">
      <section className="container-c mt-36 flex min-h-screen w-full flex-col gap-6 antialiased">
        <Spotlight
          className="-top-40 left-0 md:-top-64 md:left-60"
          fill={ExtendedColors.primary["200"]}
        />
        <p className="text-3xl font-bold text-secondary-200">CA List</p>

        <SearchAndSort
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortPoints={sortPoints}
          setSortPoints={setSortPoints}
        />

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-2xl border-2 border-primary-400 bg-gradient-to-bl from-primary-550 to-primary-650">
            <thead>
              <tr className="bg-primary-500 text-secondary-200">
                <th className="px-5 py-3 text-left">Image</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Institution</th>
                <th className="px-5 py-3 text-left">Class</th>
                <th className="px-5 py-3 text-left">CA Code</th>
                <th className="px-5 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((ca) => (
                  <TableRow key={ca.caCode} ca={ca} copyCACode={copyCACode} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-white">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default CAList;
