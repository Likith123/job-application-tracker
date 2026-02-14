"use client";

import { Table, TableCaption } from "@/components/ui/table";
import { fetchJobsClient } from "@/lib/api-client";
import { statusOptions } from "@/lib/data";
import { JobDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import SelectComponent from "../Select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [status, setStatus] = useState(
    statusProp ? statusProp.toUpperCase() : "ALL",
  );
  const [data, setData] = useState<JobDataType[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true);
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

  const refreshTable = useCallback(() => {
    setPagination({ pageIndex: 0, pageSize: 10 });
    setRefreshKey((k) => k + 1);
  }, []);

  const table = useReactTable({
    data,
    columns,
    meta: {
      refresh: refreshTable,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {},
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data.length / pagination.pageSize),
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
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Pagination className="mx-0! w-auto!">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={cn(
                  "cursor-pointer",
                  !table.getCanPreviousPage() &&
                    "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
            {table.getPageOptions().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={table.getState().pagination.pageIndex === page}
                  onClick={() => table.setPageIndex(page)}
                  className="cursor-pointer"
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={cn(
                  "cursor-pointer",
                  !table.getCanNextPage() && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
