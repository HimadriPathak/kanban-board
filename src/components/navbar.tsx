import { KanbanSquare } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-1/2 z-50 w-11/12 max-w-7xl -translate-x-1/2 rounded-full border bg-gradient-to-r from-muted/60 to-background/60 p-4 shadow-md backdrop-blur-xl">
      <div className="flex items-center justify-between pr-2">
        <div className="flex items-center gap-3">
          <KanbanSquare className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">
            Kanban Board
          </h1>
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}
