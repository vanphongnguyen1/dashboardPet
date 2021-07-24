import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchProductInCart = createAsyncThunk(
  'productDetailOrder/fetchProductInCart',
  async () => {
    return customAxiosApi.get(API_NAME.PRODUCTINCART).then((response) => {
      const { data } = response.data
      return data
    })
  },
)

export const productInCartSlice = createSlice({
  name: 'productInCartSlice',
  initialState: {
    list: [],
    loading: 'idle',
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.loading = 'idle'
    },

    defaultList: (state, action) => {
      state.list = []
    },

    defaultLoading: (state, action) => {
      state.loading = 'idle'
    },
  },

  extraReducers: {
    [fetchProductInCart.pending]: (state, action) => {
      // Add user to the state array
      state.list = [...state.list]
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchProductInCart.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchProductInCart.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  },
})

const { actions, reducer } = productInCartSlice

export const { defaultLoading, defaultState, defaultList } = actions

export default reducer
