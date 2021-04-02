import userReducer from './userSlice'
import orderReducer from './orderSlice'
import productDetailOrderSlice from './productDetailOrderThunk'
import statusSlice from './statusSlice'
import trasportSlice from './trasportSlice'
import reducerEditOrder from './reducerEditOrder'
import commentSlice from './commentSlice'
import statusCommentsSlice from './statusCommentsSlice'
import menuAnimation from './menuAnimation'

export const rootReducers = {
  users: userReducer,
  orders: orderReducer,
  productDetailOrder: productDetailOrderSlice,
  status: statusSlice,
  trasport: trasportSlice,
  dataEditOrder: reducerEditOrder,
  comments: commentSlice,
  statusComments: statusCommentsSlice,
  stateIsMenu: menuAnimation
}
