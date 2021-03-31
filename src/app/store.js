import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import { rootReducers } from '../rootReducers'

const store =  configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store
