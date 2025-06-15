import { useAppSelector } from "@/lib/hooks/redux";
import { PlusCircle } from "lucide-react";
import { useState, type JSX } from "react";
import TaskCard from "./task-card";
import { TaskDialog } from "./task-form";
import { Button } from "./ui/button";

interface Props {
  column: "todo" | "in-progress" | "done";
  title: string;
  icon: JSX.Element;
}

export default function Column({ column, title, icon }: Props) {
  const [open, setOpen] = useState(false);
  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter((task) => task.column === column)
  );

  return (
    <div className="bg-muted rounded-xl p-4 space-y-4 shadow flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:scale-110 duration-200"
          onClick={() => setOpen(true)}
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-3 overflow-y-auto min-h-[100px] max-h-[70vh] scrollbar-thin px-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <TaskDialog open={open} setOpen={setOpen} defaultColumn={column} />
    </div>
  );
}
