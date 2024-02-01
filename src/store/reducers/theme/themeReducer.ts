import { createSlice } from '@reduxjs/toolkit';

interface TThemeState {
  isDarkMode: boolean;
}

const initialState: TThemeState = {
  isDarkMode: false,
};

export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  selectors: {
    selectThemeStatus: (state) => state.isDarkMode,
  },
});

export const { switchTheme } = counterSlice.actions;
export const { selectThemeStatus } = counterSlice.selectors;
export default counterSlice.reducer;
