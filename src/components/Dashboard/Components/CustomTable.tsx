"use client";

import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import React, { useState } from "react";

interface TableData {
  [key: string]: any;
}

interface TableHeader {
  key: string;
  label: string;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface CustomTableProps {
  headers: TableHeader[];
  data: TableData[];
  title: string;
  btnAction: () => void;
  isBtnNeeded?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  data,
  title,
  btnAction,
  isBtnNeeded = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig && sortConfig.key == key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const filteredData = sortedData().filter((item) =>
    headers.some((header) =>
      item[header.key]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-4 bg-white">
      {/* Верхняя панель управления */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="flex items-center space-x-2">
          <select
            onChange={(e: any) => setRowsPerPage(e.target.value)}
            className="border px-4 py-2 me-3 focus:outline-none"
            name="rowperpage"
          >
            <option value="10">5</option>
            <option value="10">10</option>
            <option value="10">20</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 focus:outline-none"
          />
          {isBtnNeeded && (
            <button
              onClick={btnAction}
              className="bg-[#f34d13] rounded p-2 flex items-center gap-3 text-white font-bold"
            >
              <Plus />
              Add {title}
            </button>
          )}

          {/* <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2">
            Filter <BiFilter />
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2">
            Export <BiExport />
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2">
            Import
            <BiImport />
          </button> */}
        </div>
      </div>

      {/* Таблица */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md table-fixed">
        <thead>
          <tr className="">
            {headers.map((header, index) => (
              <th key={index} className="text-sm py-2 px-4 border-b">
                <button
                  onClick={() => handleSort(header.key)}
                  className="font-bold flex items-center gap-2 text-sm"
                >
                  {header.label}{" "}
                  {sortConfig?.key === header.key ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : (
                    ""
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`text-sm ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-[#f3f4f5]"
              } py-2 px-4 border-b`}
            >
              {headers.map((header, index) => (
                <td key={index} className={`py-2 px-4 border-b`}>
                  {header.key !== "action" ? row[header.key] : row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      <div className="p-4 flex justify-between items-center">
        <button
          className="px-2 py-1 border rounded-lg hover:bg-gray-200 text-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <div className="text-sm">
          Page {currentPage + 1} of{" "}
          {Math.ceil(filteredData.length / rowsPerPage)}
        </div>
        <button
          className="px-2 py-1 border rounded-lg hover:bg-gray-200 text-sm"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredData.length / rowsPerPage) - 1
              )
            )
          }
          disabled={
            currentPage === Math.ceil(filteredData.length / rowsPerPage) - 1
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
