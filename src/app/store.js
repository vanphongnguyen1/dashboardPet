import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import { rootReducers } from '../rootReducers'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const store =  configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loadingBarMiddleware({
      scope: 'sectionBar',
    })
)
})

export default store
