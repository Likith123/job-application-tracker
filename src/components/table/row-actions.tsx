import { JobDataType } from "@/lib/types";
import Modal from "../Modal";

export function RowActions({ job }: { job: JobDataType }) {
  return (
    <div className="flex flex-row justify-center">
      <Modal mode="edit" job={job} />
      <Modal mode="delete" job={job} />
    </div>
  );
}
