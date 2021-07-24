import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchCarts = createAsyncThunk('cart/fetchCarts', async () => {
  return customAxiosApi.get(API_NAME.CARTS).then((response) => {
    const { data } = response.data
    return data
  })
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list: [],
    loading: 'idle',
  },

  extraReducers: {
    [fetchCarts.pending]: (state, action) => {
      // Add user to the state array
      state.list = [...state.list]
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchCarts.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchCarts.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  },
})

const { reducer } = cartSlice

export default reducer
