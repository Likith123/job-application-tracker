"use no memo";
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data, jobTypeOptions, statusOptions } from "@/lib/data";
import { JobDataType } from "@/lib/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { RowActions } from "./RowActions";
import SearchBar from "./SearchBar";
import SelectComponent from "./Select";

const columnHelper = createColumnHelper<JobDataType>();

// Define columns for the table
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jobType", {
    header: "Job Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("mode", {
    header: "Mode",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("appliedAt", {
    header: "Applied At",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="flex justify-center">
          <RowActions job={job} />
        </div>
      );
    },
    size: 40,
    enableSorting: false,
  }),
];

export default function TableComponent() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [jobType, setJobType] = useState("ALL");
  const [jobMode, setJobMode] = useState("ALL");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {},
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });
  return (
    <div className="p-4 flex flex-col w-full gap-4">
      <div className="flex justify-between items-center">
        <div className="w-full flex gap-4 items-center">
          <SearchBar
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search all columns..."
            className="px-2 py-1.5 border border-gray-300 rounded-md w-full max-w-60 active:ring-0"
          />
          <SelectComponent
            state={jobType}
            stateFn={setJobType}
            label="Job Type"
            options={jobTypeOptions}
            popup={false}
            id="jobType"
          />
          <SelectComponent
            state={jobMode}
            stateFn={setJobMode}
            label="Status"
            options={statusOptions}
            popup={false}
            id="status"
          />
        </div>
        <div>
          <Modal mode="add" />
        </div>
      </div>
      <Table>
        <TableCaption>
          A list of your{" "}
          <span className="text-primary/80">recent job applications.</span>
        </TableCaption>
        <TableHeader className="bg-primary/10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center">
                  {/* ⬇️ this is for sorting the columns */}
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none flex items-center"
                        : "flex justify-center",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() && (
                      <ArrowUpDown className="ml-2 shrink-0" size={14} />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
