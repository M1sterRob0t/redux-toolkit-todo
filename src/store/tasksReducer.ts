import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { TTask } from '../types/task';


interface TasksState {
  list: TTask[];
}

const initialState: TasksState = {
  list: [],
};

export const counterSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks: (state, action: PayloadAction<TTask[]>) => {
      state.list = action.payload;
    },
    addTask: (state, action: PayloadAction<TTask>) => {
      state.list.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
  },
});

export const { addTasks, addTask, removeTask, toggleTask } = counterSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.list;
export default counterSlice.reducer;
