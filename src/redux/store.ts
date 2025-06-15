import { configureStore } from '@reduxjs/toolkit'
import TaskManagerSlice from './features/tasks/tasks'

export const store = configureStore({
  reducer: {
    data: TaskManagerSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch