import userReducer from '../features/Main/Users/asyncThunk/userSlice'
import orderReducer from '../features/Main/Orders/asyncThunk/orderSlice'
import productDetailOrderSlice from './productDetailOrderThunk'
import statusSlice from './statusSlice'
import trasportSlice from './trasportSlice'

export const rootReducers = {
  users: userReducer,
  orders: orderReducer,
  productDetailOrder: productDetailOrderSlice,
  status: statusSlice,
  trasport: trasportSlice,
}
