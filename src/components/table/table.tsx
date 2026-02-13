"use client";

import { Table, TableCaption } from "@/components/ui/table";
import { fetchJobsClient } from "@/lib/api-client";
import { statusOptions } from "@/lib/data";
import { JobDataType } from "@/lib/types";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import SelectComponent from "../Select";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { columns } from "./columns";
import TableHeaderSection from "./table-header";

export default function TableComponent({
  statusProp,
}: {
  statusProp?: string;
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [status, setStatus] = useState(
    statusProp ? statusProp.toUpperCase() : "ALL",
  );
  const [data, setData] = useState<JobDataType[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobs = await fetchJobsClient(status.toLocaleLowerCase());
        setData(jobs);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getJobs();
  }, [status, refreshKey]);

  const table = useReactTable({
    data,
    columns,
    meta: {
      refresh: () => setRefreshKey((k) => k + 1),
    },
    getCoreRowModel: getCoreRowModel(),
    filterFns: {},
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
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
            state={status}
            stateFn={setStatus}
            label="Status"
            options={statusOptions}
            popup={false}
            id="status"
            disabled={false}
          />
        </div>
      </div>
      <Table key={status}>
        <TableCaption>
          A list of your{" "}
          <span className="text-primary/80">recent job applications.</span>
        </TableCaption>
        <TableHeaderSection table={table} />
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-primary/2">
              <TableCell
                colSpan={columns.length}
                className="text-center py-10 opacity-50"
              >
                No applications found for this status.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
