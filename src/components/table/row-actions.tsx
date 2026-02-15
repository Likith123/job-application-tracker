import { JobDataType } from "@/lib/types";
import Modal from "../modal";

export function RowActions({
  job,
  refresh,
}: {
  job: JobDataType;
  refresh?: () => void;
}) {
  return (
    <div className="flex flex-row justify-center">
      <Modal mode="edit" job={job} refresh={refresh} />
      <Modal mode="delete" job={job} refresh={refresh} />
    </div>
  );
}
