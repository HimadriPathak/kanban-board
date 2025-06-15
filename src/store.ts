// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./lib/states/task.slice";
import themeReducer from "./lib/states/theme.slice";
import { saveTasksToLocalStorage } from "./utils/local-storage";

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  const { tasks } = store.getState();
  saveTasksToLocalStorage(tasks.tasks);

  return result;
};

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
