import { toast } from "sonner";

export const saveTasksToLocalStorage = (tasks: any) => {
  try {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  } catch (err) {
    toast.error("Failed to save tasks to local storage.");
    console.error("LocalStorage Error:", err);
  }
};

export const loadTasksFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("kanban-tasks");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    toast.error("Failed to load tasks from local storage.");
    console.error("LocalStorage Load Error:", err);
    return [];
  }
};
