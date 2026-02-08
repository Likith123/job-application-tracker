import TableComponent from "@/components/Table";

export default async function Jobs({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;
  return (
    <div className="container max-w-7xl mx-auto">
      <TableComponent statusProp = {status}/>
    </div>
  );
}
