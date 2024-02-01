import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './reducers/tasks/tasksReducer'
import themeReducer from './reducers/theme/themeReducer'
import filterReducer from './reducers/filter/filterReducer'


export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
    filter: filterReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
