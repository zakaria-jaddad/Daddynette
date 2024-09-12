import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}
const THEME = "theme";

function saveAndGetData(dataName: string, initialState) {
  localStorage.setItem(dataName, JSON.stringify(initialState));
  return localStorage.getItem(dataName);
}

function getDataFromLocalStorage(dataName: string, initialState) {
  let data = localStorage.getItem(dataName);
  if (data === null) data = saveAndGetData(dataName, initialState);
  return JSON.parse(data);
}

const initialState: ThemeState = getDataFromLocalStorage(THEME, {
  theme: "light",
});

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state: ThemeState, action: PayloadAction<string>) => {
      const { payload } = action;
      const newState = { ...state, theme: payload };

      saveAndGetData(THEME, newState);
      return newState;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
