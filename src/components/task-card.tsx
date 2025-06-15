import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  clearActiveTaskIndex,
  deleteTask,
  setActiveTaskIndex,
} from "@/lib/states/task.slice";
import type { Task } from "@/lib/types/task";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { TaskDialog } from "./task-form";
import { Button } from "./ui/button";

interface Props {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  const dispatch = useAppDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const activeIndex = useAppSelector((state) => state.tasks.activeTaskIndex);
  const isActive = activeIndex === index;

  return (
    <div
      className={`rounded-lg cursor-grab ${task.color} ${
        isActive ? "ring-2 ring-zinc-800 dark:ring-gray-500 scale-[1.01]" : ""
      } transition-transform duration-200 ease-in-out`}
      draggable
      onDragStart={() => dispatch(setActiveTaskIndex(index))}
      onDragEnd={() => dispatch(clearActiveTaskIndex())}
    >
      <div className="p-3 flex flex-col">
        <div className="flex justify-between">
          <div className="text-black font-medium text-base">{task.title}</div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="hover:scale-110"
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="w-4 h-4 text-black" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:scale-110"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground pb-2">
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
