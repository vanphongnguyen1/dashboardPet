import userReducer from './userSlice'
import orderReducer from './orderSlice'
import productDetailOrderSlice from './productDetailOrderThunk'
import statusSlice from './statusSlice'
import trasportSlice from './trasportSlice'
import commentSlice from './commentSlice'
import statusCommentsSlice from './statusCommentsSlice'
import menuAnimation from './menuAnimation'
import { loadingBarReducer } from 'react-redux-loading-bar'
import navbarScrolled from './navbarScrolled'
import lineageSlice from './lineageSlice'
import groupSlice from './groupSlice'

export const rootReducers = {
  users: userReducer,

  orders: orderReducer,
  productDetailOrder: productDetailOrderSlice,
  status: statusSlice,
  trasport: trasportSlice,

  comments: commentSlice,
  statusComments: statusCommentsSlice,

  lineage: lineageSlice,
  groups: groupSlice,

  stateIsMenu: menuAnimation,
  navbarScrolled: navbarScrolled,

  loadingBar: loadingBarReducer,
}
