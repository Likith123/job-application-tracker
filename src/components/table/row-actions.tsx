import { JobDataType } from "@/lib/types";
import ModalForm from "../modal-form";

export function RowActions({
  job,
  refresh,
}: {
  job: JobDataType;
  refresh?: () => void;
}) {
  return (
    <div className="flex flex-row justify-center">
      <ModalForm mode="edit" job={job} refresh={refresh} />
      <ModalForm mode="delete" job={job} refresh={refresh} />
    </div>
  );
}
