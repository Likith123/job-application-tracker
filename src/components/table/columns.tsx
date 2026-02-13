import { JobDataType } from "@/lib/types";
import { formatDate, formatEnum } from "@/lib/utils";
import { createColumnHelper, RowData, TableMeta } from "@tanstack/react-table";
import { RowActions } from "./row-actions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    refresh?: () => void;
  }
}

const columnHelper = createColumnHelper<JobDataType>();

export const columns = [
  columnHelper.display({
    id: "serial",
    header: "S. No.",
    cell: ({ row }) => row.index + 1,
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
    cell: (info) => formatEnum(info.getValue()),
  }),
  columnHelper.accessor("jobType", {
    header: "Job Type",
    cell: (info) => formatEnum(info.getValue()),
  }),
  columnHelper.accessor("mode", {
    header: "Mode",
    cell: (info) => formatEnum(info.getValue()),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created On",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("appliedAt", {
    header: "Applied On",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const job = row.original;
      return <RowActions job={job} refresh={table.options.meta?.refresh} />;
    },
    size: 40,
    enableSorting: false,
  }),
];
