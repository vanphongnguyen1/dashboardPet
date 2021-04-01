import userReducer from './userSlice'
import orderReducer from './orderSlice'
import productDetailOrderSlice from './productDetailOrderThunk'
import statusSlice from './statusSlice'
import trasportSlice from './trasportSlice'
import reducerEditOrder from './reducerEditOrder'
import commentSlice from './commentSlice'
import commentOneSlice from './commentOneSlice'
import statusCommentsSlice from './statusCommentsSlice'

export const rootReducers = {
  users: userReducer,
  orders: orderReducer,
  productDetailOrder: productDetailOrderSlice,
  status: statusSlice,
  trasport: trasportSlice,
  dataEditOrder: reducerEditOrder,
  comments: commentSlice,
  comment: commentOneSlice,
  statusComments: statusCommentsSlice
}
