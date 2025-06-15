import { useAppDispatch } from "@/lib/hooks/redux";
import { deleteTask } from "@/lib/states/task.slice";
import type { Task } from "@/lib/types/task";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { TaskDialog } from "./task-form";
import { Button } from "./ui/button";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const dispatch = useAppDispatch();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div
      className={`relative rounded-lg p-3 shadow-md transition-all cursor-grab ${task.color}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
      }}
    >
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-1">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:scale-110 duration-200"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="w-4 h-4 text-black" />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:scale-110 duration-200"
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      {/* Task Info */}
      <div className="text-black font-medium text-base mb-1">{task.title}</div>
      <div className="text-sm text-muted-foreground mb-2">
        {task.description}
      </div>
      <div className="flex flex-wrap gap-1">
        {task.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Edit Dialog */}
      <TaskDialog
        open={editOpen}
        setOpen={setEditOpen}
        defaultColumn={task.column}
        task={task}
      />
    </div>
  );
}
