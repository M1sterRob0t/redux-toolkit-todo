import { createSlice } from '@reduxjs/toolkit';
import { deleteTask, fetchTasks, postTask, toggleTaskStatus } from '../../async-actions';
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import type { TTask } from '../../../types/task';


function isError(action: Action) {
  return action.type.endsWith('rejected');
}

interface TasksState {
  list: TTask[];
  isLoading: boolean;
  error: null | Response;
}

const initialState: TasksState = {
  list: [],
  isLoading: true,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(postTask.fulfilled, (state, action: PayloadAction<TTask>) => {
      state.list.push(action.payload);
    });
    builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    });
    builder.addCase(toggleTaskStatus.fulfilled, (state, action: PayloadAction<string>) => {
      const task = state.list.find((task) => task.id === action.payload);

      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    });
    builder.addMatcher(isError, (state, action: PayloadAction<Response>) => {
      console.log(action.payload);
      state.error = action.payload;
      state.isLoading = false;
    });
  },
  selectors: {
    selectTasksState: (state) => state,
    selectTasks: (state) => state.list,
    selectTasksStatus: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});

export const { selectTasksState, selectError, selectTasks, selectTasksStatus} = tasksSlice.selectors;
export default tasksSlice.reducer;
