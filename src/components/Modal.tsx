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
import { jobModeOptions, jobTypeOptions, statusOptions } from "@/lib/data";
import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";
import SelectComponent from "./Select";
import { JobDataType } from "@/lib/types";

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

export default function Modal({ mode, job }: { mode: keyof typeof actionConfig, job?: JobDataType }) {
  const [jobType, setJobType] = useState("ALL");
  const [jobMode, setJobMode] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const config = actionConfig[mode];
  const Icon = config.icon;

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className={`p-2 flex items-center ${config.className ?? ""}`}
            variant={config.variant}
          >
            <Icon className={config.showLabel ? "mr-1" : ""} />
            {config.showLabel && config.label}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="capitalize">{mode} Job</DialogTitle>
            <DialogDescription>{config.description}</DialogDescription>
          </DialogHeader>
          <FieldGroup className="flex flex-col gap-4">
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" />
              </Field>
              <Field>
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" />
              </Field>
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="jobType">Job Type</Label>
                <SelectComponent
                  state={jobType}
                  stateFn={setJobType}
                  label="Job Type"
                  options={jobTypeOptions}
                  popup={true}
                  id="jobType"
                />
              </Field>
              <Field>
                <Label htmlFor="mode">Job Mode</Label>
                <SelectComponent
                  state={jobMode}
                  stateFn={setJobMode}
                  label="Job Mode"
                  options={jobModeOptions}
                  popup={true}
                  id="mode"
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="status">Status</Label>
                <SelectComponent
                  state={status}
                  stateFn={setStatus}
                  label="Status"
                  options={statusOptions}
                  popup={true}
                  id="status"
                />
              </Field>
              <Field>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Hyderabad, San Fransisco, ..."
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="flex flex-row items-center gap-2">
              <Field>
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  name="source"
                  placeholder="LinkedIn, AngelList, ..."
                />
              </Field>
            </FieldGroup>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className={
                mode === "delete"
                  ? "bg-destructive hover:bg-destructive/80"
                  : ""
              }
            >
              {config.buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
