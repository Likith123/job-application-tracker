"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { createJob, deleteJob, updateJob } from "@/lib/api";
import {
  actionConfig,
  jobModeOptions,
  jobTypeOptions,
  statusOptions,
} from "@/lib/data";
import { JobDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SelectField, TextInputField } from "./FormFields";
import DatePicker from "./ui/DatePicker";
import { Textarea } from "./ui/textarea";

export default function ModalForm({
  mode,
  job,
}: {
  mode: keyof typeof actionConfig;
  job: JobDataType;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<JobDataType>({
    defaultValues: {
      ...job,
    },
  });

  const config = actionConfig[mode];
  const Icon = config.icon;
  const [open, setOpen] = useState(false);
  const isDelete = mode === "delete" || mode === "view";
  const onSubmitFn = async (jobData: JobDataType) => {
    try {
      if (mode === "add") {
        await createJob(jobData);
        toast.success("Job added successfully !");
        setOpen(false);
      } else if (mode === "edit" && job) {
        if (!isDirty) {
          toast.error("No changes detected. Please modify at least one field.");
          setOpen(true);
        } else {
          await updateJob(job.id, jobData);
          setOpen(false);
        }
      } else if (mode === "delete" && job) {
        await deleteJob(job.id);
        toast.success("Job deleted successfully !");
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={`p-2 flex items-center ${config.className ?? ""}`}
          variant={config.variant}
          onClick={() => setOpen(true)}
        >
          <Icon className={config.showLabel ? "mr-1" : ""} />
          {config.showLabel && `${config.label} Application`}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmitFn)(e);
          }}
        >
          <DialogHeader className="mb-4">
            <DialogTitle className="capitalize">{mode} Job</DialogTitle>
            <DialogDescription>{config.description}</DialogDescription>
          </DialogHeader>
          <FieldGroup className="flex flex-col gap-4">
            <FieldGroup className="flex flex-row items-center gap-2">
              <TextInputField
                label="Company"
                name="company"
                register={register}
                isDelete={isDelete}
              />
              <TextInputField
                label="Role"
                name="role"
                register={register}
                isDelete={isDelete}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <SelectField
                name="jobType"
                label="Job Type"
                control={control}
                isDelete={isDelete}
                options={jobTypeOptions}
              />
              <SelectField
                name="mode"
                label="Job Mode"
                control={control}
                isDelete={isDelete}
                options={jobModeOptions}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <SelectField
                name="status"
                label="Status"
                control={control}
                isDelete={isDelete}
                options={statusOptions}
              />
              <TextInputField
                label="Location"
                name="location"
                placeholder="Hyderabad, San Fransisco, ..."
                register={register}
                isDelete={isDelete}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <TextInputField
                label="Job Link"
                name="jobLink"
                register={register}
                isDelete={isDelete}
              />
              <Field>
                <Label htmlFor="appliedAt">Applied On</Label>
                <Controller
                  name="appliedAt"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={field.onChange}
                      disabled={isDelete}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes here, if any."
                  {...register("notes")}
                  disabled={isDelete}
                />
              </Field>
            </FieldGroup>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "cursor-pointer",
                  mode === "delete" && "hover:bg-destructive/10",
                )}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "cursor-pointer",
                mode === "delete" && "bg-destructive hover:bg-destructive/80",
                mode === "view" && "hidden",
              )}
            >
              {isSubmitting ? config.buttonText[0] : config.buttonText[1]}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
