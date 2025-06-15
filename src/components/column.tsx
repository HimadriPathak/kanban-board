import { useAppSelector } from "@/lib/hooks/redux";
import { PlusCircle } from "lucide-react";
import { Fragment, useState, type JSX } from "react";
import DropArea from "./drop-area";
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
  const tasks = useAppSelector((state) => state.tasks.tasks);

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
        <DropArea
          isListEmpty={tasks.length ? false : true}
          column={column}
          position={0}
        />

        {tasks.map(
          (task, index) =>
            task.column === column && (
              <Fragment key={task.id}>
                <TaskCard task={task} index={index} />
                <DropArea column={column} position={index + 1} />
              </Fragment>
            )
        )}
      </div>

      <TaskDialog open={open} setOpen={setOpen} defaultColumn={column} />
    </div>
  );
}
