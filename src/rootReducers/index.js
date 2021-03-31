import userReducer from './userSlice'
import orderReducer from './orderSlice'
import productDetailOrderSlice from './productDetailOrderThunk'
import statusSlice from './statusSlice'
import trasportSlice from './trasportSlice'
import reducerEditOrder from './reducerEditOrder'

export const rootReducers = {
  users: userReducer,
  orders: orderReducer,
  productDetailOrder: productDetailOrderSlice,
  status: statusSlice,
  trasport: trasportSlice,
  dataEditOrder: reducerEditOrder
}
