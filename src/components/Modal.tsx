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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createJob, deleteJob, updateJob } from "@/lib/api";
import { jobModeOptions, jobTypeOptions, statusOptions } from "@/lib/data";
import { JobDataType } from "@/lib/types";
import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SelectComponent from "./Select";
import DatePicker from "./ui/DatePicker";
import { Textarea } from "./ui/textarea";

const actionConfig = {
  add: {
    label: "Add Job Application",
    icon: Plus,
    variant: "default" as const,
    showLabel: true,
    className: "",
    description:
      "Add a new job you've applied to or plan to apply for. Track its status, type, and important details in one place.",
    buttonText: "Save Changes",
  },
  edit: {
    label: "Edit Job",
    icon: Edit,
    variant: "ghost" as const,
    showLabel: false,
    className: "",
    description:
      "Update job details to kepp your application progress accurate",
    buttonText: "Update Changes",
  },
  delete: {
    label: "Delete Job",
    icon: Trash,
    variant: "ghost" as const,
    showLabel: false,
    className: "text-destructive/60 hover:text-destructive",
    description:
      "Are you sure you want to delete this job? This action cannot be undone.",
    buttonText: "Delete Job",
  },
};

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
    formState: { errors },
  } = useForm<JobDataType>({
    defaultValues: {
      ...job,
    },
  });

  const config = actionConfig[mode];
  const Icon = config.icon;
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isDelete = mode === "delete";
  const onSubmitFn = async (jobData: JobDataType) => {
    try {
      setIsSubmitting(true);
      if (mode === "add") {
        await createJob(jobData);
      } else if (mode === "edit" && job) {
        await updateJob(job.id, jobData);
      } else if (mode === "delete" && job) {
        await deleteJob(job.id);
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={`p-2 flex items-center ${config.className ?? ""}`}
          variant={config.variant}
          onClick={() => setOpen(true)}
        >
          <Icon className={config.showLabel ? "mr-1" : ""} />
          {config.showLabel && config.label}
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
              <Field>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  {...register("company")}
                  disabled={isDelete}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  {...register("role")}
                  disabled={isDelete}
                  required
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="jobType">Job Type</Label>
                <Controller
                  name="jobType"
                  control={control}
                  render={({ field }) => (
                    <SelectComponent
                      state={field.value}
                      stateFn={field.onChange}
                      label="Job Type"
                      options={jobTypeOptions}
                      popup={true}
                      disabled={isDelete}
                      id="jobType"
                    />
                  )}
                />
              </Field>
              <Field>
                <Label htmlFor="mode">Job Mode</Label>
                <Controller
                  name="mode"
                  control={control}
                  render={({ field }) => (
                    <SelectComponent
                      state={field.value}
                      stateFn={field.onChange}
                      label="Job Mode"
                      options={jobModeOptions}
                      popup={true}
                      disabled={isDelete}
                      id="mode"
                    />
                  )}
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SelectComponent
                      state={field.value}
                      stateFn={field.onChange}
                      label="Status"
                      options={statusOptions}
                      popup={true}
                      disabled={isDelete}
                      id="status"
                    />
                  )}
                />
              </Field>
              <Field>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Hyderabad, San Fransisco, ..."
                  {...register("location")}
                  disabled={isDelete}
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="jobLink">Job Link</Label>
                <Input
                  id="jobLink"
                  {...register("jobLink")}
                  disabled={isDelete}
                />
              </Field>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={
                mode === "delete"
                  ? "bg-destructive hover:bg-destructive/80 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              {isSubmitting ? "Processing..." : config.buttonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
