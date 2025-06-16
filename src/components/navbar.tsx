import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { filterTasksByTags } from "@/lib/states/task.slice";
import { KanbanSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { MultiSelect } from "./multi-select";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tasks.forEach((task) => task.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).map((tag) => ({ value: tag, label: tag }));
  }, [tasks]);

  useEffect(() => {
    dispatch(filterTasksByTags(selectedTags));
  }, [selectedTags, tasks, dispatch]);

  return (
    <nav className="fixed top-5 left-1/2 z-50 w-11/12 max-w-7xl -translate-x-1/2 rounded-full border bg-gradient-to-r from-muted/60 to-background/60 p-4 shadow-md backdrop-blur-xl">
      <div className="flex items-center justify-between pr-2">
        <div className="flex items-center gap-3">
          <KanbanSquare className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">
            Kanban Board
          </h1>
        </div>
        <div className="hidden sm:block w-[400px] mr-4">
          <MultiSelect
            options={allTags}
            defaultValue={selectedTags}
            onValueChange={setSelectedTags}
            placeholder="Filter by tag"
            maxCount={5}
            variant="inverted"
          />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
