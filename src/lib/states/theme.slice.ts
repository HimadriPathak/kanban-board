import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Theme, ThemeState } from "../types/theme";

const storageKey = "vite-ui-theme";

const resolveSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(storageKey) as Theme | null;

    if (saved === "system" || !saved) {
      const resolved = resolveSystemTheme();
      localStorage.setItem(storageKey, resolved);
      applyThemeToDOM(resolved);
      return resolved;
    }

    applyThemeToDOM(saved);
    return saved;
  }

  return "light";
};

const applyThemeToDOM = (theme: "light" | "dark") => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

const initialState: ThemeState = {
  value: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      const newTheme = action.payload;

      if (newTheme === "system") {
        const resolved = resolveSystemTheme();
        localStorage.setItem(storageKey, resolved);
        applyThemeToDOM(resolved);
        state.value = resolved;
      } else {
        localStorage.setItem(storageKey, newTheme);
        applyThemeToDOM(newTheme);
        state.value = newTheme;
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
