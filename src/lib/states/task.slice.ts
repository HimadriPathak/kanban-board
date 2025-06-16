import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { getRandomColor } from "../../utils/task";
import type { ColumnType, Task } from "../types/task";

interface TaskState {
  tasks: Task[];
  activeTaskIndex?: number;
}

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
  activeTaskIndex: undefined,
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
    setActiveTaskIndex: (state, action: PayloadAction<number>) => {
      state.activeTaskIndex = action.payload;
    },
    clearActiveTaskIndex: (state) => {
      state.activeTaskIndex = undefined;
    },
    onDrop: (
      state,
      action: PayloadAction<{ position: number; column: ColumnType }>
    ) => {
      console.log("onDrop action:", action.payload);
      const { position, column } = action.payload;

      if (state.activeTaskIndex === undefined) return;

      const taskToMove = state.tasks[state.activeTaskIndex];
      if (!taskToMove) return;

      state.tasks.splice(state.activeTaskIndex, 1);

      taskToMove.column = column;
      taskToMove.updatedAt = Date.now();

      state.tasks.splice(position, 0, taskToMove);

      state.activeTaskIndex = undefined;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setActiveTaskIndex,
  clearActiveTaskIndex,
  onDrop,
} = taskSlice.actions;
export default taskSlice.reducer;
