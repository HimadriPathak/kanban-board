import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addTask, updateTask } from "@/lib/states/task.slice";
import type { ColumnType, Task } from "@/lib/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  column: z.enum(["todo", "in-progress", "done"]),
  tags: z.string().optional(),
});

type TaskForm = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  defaultColumn: ColumnType;
  task?: Task;
}

export function TaskDialog({
  open,
  setOpen,
  defaultColumn,
  task,
}: TaskDialogProps) {
  const dispatch = useAppDispatch();
  const isEdit = !!task;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      column: task?.column || defaultColumn,
      tags: task?.tags.join(", ") || "",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        column: task.column,
        tags: task.tags.join(", "),
      });
    }
  }, [task, reset]);

  const onSubmit = (data: TaskForm) => {
    const tagsArray =
      data.tags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [];

    if (isEdit && task) {
      dispatch(
        updateTask({
          id: task.id,
          title: data.title,
          description: data.description,
          tags: tagsArray,
        })
      );
    } else {
      dispatch(
        addTask({
          title: data.title,
          description: data.description,
          column: data.column,
          tags: tagsArray,
        })
      );
    }

    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Task" : "Create Task"}
            <Badge
              variant="outline"
              className="text-sm px-3 mx-1 py-1 rounded-md"
            >
              {defaultColumn}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <Input placeholder="Title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <Textarea placeholder="Description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <Input placeholder="Tags (comma separated)" {...register("tags")} />

          <input type="hidden" value={defaultColumn} {...register("column")} />

          <Button type="submit" className="w-full">
            {isEdit ? "Save Changes" : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
