"use server";
import { revalidatePath } from "next/cache";
import { createJob, deleteJob, updateJob } from "./api";
import { getSession } from "./auth/auth";
import { JobDataType } from "./types";

export async function handleSubmitFn(
  mode: string,
  pathname: string,
  jobData: JobDataType,
  job: JobDataType,
  isDirty: boolean,
) {
  const session = await getSession();
  try {
    if (mode === "add") {
      await createJob(session?.user.id as string, jobData);
      revalidatePath(pathname, "layout");
      return { success: true, msg: "Job added successfully !" };
    } else if (mode === "edit" && job) {
      if (!isDirty) {
        return {
          success: false,
          msg: "No changes detected. Please modify at least one field.",
        };
      } else {
        await updateJob(job.id, session?.user.id as string, jobData);
        revalidatePath(pathname, "layout");
        return { success: true, msg: "Job updated successfully !" };
      }
    } else if (mode === "delete" && job) {
      await deleteJob(job.id);
      revalidatePath(pathname, "layout");
      return { success: true, msg: "Job deleted successfully !" };
    }
  } catch (err) {
    console.error(err);
    return { success: false, msg: "Something went wrong. Please try again." };
  }
}
