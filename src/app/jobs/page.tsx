import TableComponent from "@/components/table/table";

export default function AllJobs() {
  return (
    <div className="container max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col gap-4 py-6">
      <header className="text-center w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold bg-linear-to-tr from-primary/50 via-primary/75 to-primary text-transparent bg-clip-text capitalize">
          All Jobs
        </h1>
      </header>
      <TableComponent />
    </div>
  );
}
