import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { getRandomColor } from "../../utils/task";
import type { ColumnType, Task } from "../types/task";

interface TaskState {
  tasks: Task[];
}

// Utility to load from localStorage
const loadFromLocalStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem("kanban-tasks");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse tasks from localStorage:", error);
    return [];
  }
};

const initialState: TaskState = {
  tasks: loadFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        column: ColumnType;
        tags: string[];
      }>
    ) => {
      const timestamp = Date.now();
      state.tasks.push({
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        column: action.payload.column,
        tags: action.payload.tags,
        color: getRandomColor(),
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    },
    updateTask: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        description?: string;
        tags?: string[];
      }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        if (action.payload.title !== undefined)
          task.title = action.payload.title;
        if (action.payload.description !== undefined)
          task.description = action.payload.description;
        if (action.payload.tags !== undefined) task.tags = action.payload.tags;
        task.updatedAt = Date.now();
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTask: (
      state,
      action: PayloadAction<{ id: string; column: ColumnType }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.column = action.payload.column;
        task.updatedAt = Date.now();
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
