import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './userSlice'
import bookReducer from './bookSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    book: bookReducer,
  },
})
