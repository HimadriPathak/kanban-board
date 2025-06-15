import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setTheme } from "@/lib/states/theme";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ModeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const isDark = theme === "dark";

  const toggleTheme = () => {
    dispatch(setTheme(isDark ? "light" : "dark"));
  };

  return (
    <Button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative h-8 w-14 rounded-full bg-muted hover:bg-muted transition-colors duration-300 p-0"
    >
      <div
        className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-background shadow transition-transform duration-300 flex items-center justify-center ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-gray-800 dark:text-white" />
        ) : (
          <Sun className="h-4 w-4 text-orange-500" />
        )}
      </div>
    </Button>
  );
}
