import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/Main/Users/userSlice'

const store =  configureStore({
  reducer: {
    users: userReducer,
  }
})

export default store
