import {  createSlice } from '@reduxjs/toolkit';
import { FilterType } from '../../../constants';
import type {PayloadAction} from '@reduxjs/toolkit';


interface TFilterState {
  filter: FilterType;
}

const initialState: TFilterState = {
  filter: FilterType.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    switchFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
  selectors: {
    selectCurrentFilter: (state) => state.filter,
  },
});

export const { switchFilter } = filterSlice.actions;
export const { selectCurrentFilter } = filterSlice.selectors;
export default filterSlice.reducer;
