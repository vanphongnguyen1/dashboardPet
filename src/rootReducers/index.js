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
import genderSlice from './genderSlice'
import productsSlice from './productsSlice'
import sliderSlice from './sliderSlice'
import loginSlice from './loginSlice'
import forgotPassword from './forgotPassword'
import cartSlice from './cartSlice'
import productInCartSlice from './productInCart'

export const rootReducers = {
  users: userReducer,

  products: productsSlice,

  orders: orderReducer,
  productDetailOrder: productDetailOrderSlice,
  status: statusSlice,
  trasport: trasportSlice,

  comments: commentSlice,
  statusComments: statusCommentsSlice,

  lineage: lineageSlice,
  groups: groupSlice,
  gender: genderSlice,

  stateIsMenu: menuAnimation,
  navbarScrolled: navbarScrolled,

  slider: sliderSlice,
  carts: cartSlice,
  productInCart: productInCartSlice,

  loadingBar: loadingBarReducer,
  login: loginSlice,
  forgotPassword,
}
