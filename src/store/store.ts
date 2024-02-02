import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/theme/themeReducer';
import filterReducer from './reducers/filter/filterReducer';
import { tasksApi } from './api';
import { rtkQueryErrorLogger } from './error-middleware';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    filter: filterReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger).concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
