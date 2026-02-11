import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JobDataType } from "@/lib/types";
import { flexRender, Table } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
export default function TableHeaderSection({
  table,
}: {
  table: Table<JobDataType>;
}) {
  return (
    <TableHeader className="bg-primary/10">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className="text-center">
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
  );
}
