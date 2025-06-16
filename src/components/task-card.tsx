import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  clearActiveTaskIndex,
  deleteTask,
  setActiveTaskIndex,
} from "@/lib/states/task.slice";
import type { Task } from "@/lib/types/task";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { TaskDialog } from "./task-form";
import { Button } from "./ui/button";

dayjs.extend(relativeTime);

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
      className={`rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-grab text-black ${
        task.color
      } ${
        isActive ? "ring-2 ring-zinc-800 dark:ring-gray-400 scale-[1.01]" : ""
      } transition-transform duration-200 ease-in-out`}
      draggable
      onDragStart={() => dispatch(setActiveTaskIndex(index))}
      onDragEnd={() => dispatch(clearActiveTaskIndex())}
    >
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="hover:scale-110"
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="w-4 h-4" />
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

        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-full bg-white/40 border border-black/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-xs text-gray-600 mt-1">
          Updated {dayjs(task.updatedAt).fromNow()}
        </div>
      </div>

      <TaskDialog
        open={editOpen}
        setOpen={setEditOpen}
        defaultColumn={task.column}
        task={task}
      />
    </div>
  );
}
