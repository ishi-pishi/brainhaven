import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveSubject } from "../../storage/subject";

export function CreateSubjectPopup({
  open,
  onOpenChange,
  existingNames = [],
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingNames?: string[];
  onCreate: (name: string, id: string) => Promise<void> | void;
}) {
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    const trimmedName = subjectName.trim();
    if (!trimmedName) {
      setError("Subject name cannot be empty");
      return;
    }
    if (existingNames.some((name) => name.toLowerCase() === trimmedName.toLowerCase())) {
      setError("Subject name already exists");
      return;
    }
    try {
      setError(null);
      const res = await saveSubject(trimmedName);
      const newId = res.data.subject_insert.id;
      await onCreate(trimmedName, newId);
      setSubjectName("");
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to create subject");
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(val) => {
        if (!val) {
          setError(null);
          setSubjectName("");
        }
        onOpenChange(val);
      }}
    >
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>New Subject</DialogTitle>
          <DialogDescription>
            Enter a name for your new subject below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="subject-name">Subject Name</Label>
            <Input
              id="subject-name"
              value={subjectName}
              onChange={(e) => {
                setSubjectName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Math"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreate();
                }
              }}
            />
            {error && (
              <p className="text-sm font-medium text-destructive mt-1">
                {error}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleCreate}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
