import type { ColumnType } from "@/lib/types/task";
import { CheckCircle2, ClipboardList, RefreshCcw } from "lucide-react";
import type { JSX } from "react";
import Column from "./column";

const columns: { title: string; id: ColumnType; icon: JSX.Element }[] = [
  {
    title: "Todo",
    id: "todo",
    icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "In Progress",
    id: "in-progress",
    icon: <RefreshCcw className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Done",
    id: "done",
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  },
];

export default function Board() {
  return (
    <main className="pt-28 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col.id}
            title={col.title}
            icon={col.icon}
          />
        ))}
      </div>
    </main>
  );
}
