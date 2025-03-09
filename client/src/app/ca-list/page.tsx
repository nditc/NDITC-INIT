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
    { name: "Tasneem Sahat", institution: "Notre Dame College", class: "11", caCode: "CA12345", points: 120 },
    { name: "John Doe", institution: "ABC College", class: "12", caCode: "CA67890", points: 95 },
    { name: "Jane Smith", institution: "XYZ School", class: "10", caCode: "CA54321", points: 150 },
    { name: "Tasneem Sahat", institution: "Notre Dame College", class: "11", caCode: "CA12345", points: 120 },
    { name: "John Doe", institution: "ABC College", class: "12", caCode: "CA67890", points: 95 },
    { name: "Jane Smith", institution: "XYZ School", class: "10", caCode: "CA54321", points: 150 },
  ];
 
interface SearchAndSortProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortPoints: string;
  setSortPoints: (value: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({ searchTerm, setSearchTerm, sortPoints, setSortPoints }) => (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
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
  <tr className="hover:bg-primary-650 transition-colors">
    <td className="py-3 px-5 text-white">
      <div className="flex items-center gap-3">
        {ca.image ? (
          <img src={ca.image} alt={ca.name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
            <FaUser className="text-primary-150 text-xl" />
          </div>
        )}
      </div>
    </td>
    <td className="py-3 px-5 text-white truncate max-w-[150px]">{ca.name}</td>
    <td className="py-3 px-5 text-white truncate max-w-[150px]">{ca.institution}</td>
    <td className="py-3 px-5 text-white truncate max-w-[100px]">{ca.class}</td>
    <td className="py-3 px-5 text-secondary-200 truncate max-w-[100px]">{ca.caCode}</td>
    <td className="py-3 px-5">
      <button
        onClick={() => copyCACode(ca.caCode)}
        className="px-4 py-2 bg-secondary-300 text-primary-650 rounded-lg hover:bg-secondary-200"
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
    let result = caData.filter((ca) => ca.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
    <main className="max-w-screen bg-primary-900 relative overflow-x-clip text-primary-200">
      <section className="container-c  mt-36 flex min-h-screen w-full flex-col gap-6 antialiased">
        <Spotlight className="-top-40 left-0 md:-top-64 md:left-60" fill={ExtendedColors.primary["200"]} />
        <p className="text-3xl font-bold text-secondary-200">CA List</p>
 
        <SearchAndSort
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortPoints={sortPoints}
          setSortPoints={setSortPoints}
        />
 
        <div className="overflow-x-auto">
          <table className="w-full bg-gradient-to-bl from-primary-550 to-primary-650 rounded-2xl overflow-hidden border-2 border-primary-400">
            <thead>
              <tr className="bg-primary-500 text-secondary-200">
                <th className="py-3 px-5 text-left">Image</th>
                <th className="py-3 px-5 text-left">Name</th>
                <th className="py-3 px-5 text-left">Institution</th>
                <th className="py-3 px-5 text-left">Class</th>
                <th className="py-3 px-5 text-left">CA Code</th>
                <th className="py-3 px-5 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((ca) => <TableRow key={ca.caCode} ca={ca} copyCACode={copyCACode} />)
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-white">
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
