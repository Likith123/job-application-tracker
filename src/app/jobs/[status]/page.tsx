import TableComponent from "@/components/Table";

export default async function JobsByStatus({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;
  return (
    <div className="container max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col gap-4 py-6">
      <header className="text-center w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold bg-linear-to-tr from-primary/50 via-primary/75 to-primary text-transparent bg-clip-text capitalize">
          {status} Jobs
        </h1>
      </header>
      <TableComponent statusProp={status} />
    </div>
  );
}
