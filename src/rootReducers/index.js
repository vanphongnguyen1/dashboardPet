import userReducer from '../features/Main/Users/asyncThunk/userSlice'
import orderReducer from '../features/Main/Orders/asyncThunk/orderSlice'

export const rootReducers = {
  users: userReducer,
  orders: orderReducer,
}
