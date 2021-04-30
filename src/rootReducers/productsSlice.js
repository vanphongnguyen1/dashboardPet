import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return customAxiosApi.get(API_NAME.PRODUCTS)
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: 'idle',
    product: {}
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.loading = 'idle'
    },

    defaultListOrders: (state, action) => {
      state.list = []
    },

    defaultLoading: (state, action) => {
      state.loading = 'idle'
    },

    setProduct: (state, action) => {
      state.product = action.payload
    },

    defaultProduct: (state, action) => {
      state.product = {}
    }
  },

  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      // Add user to the state array
      state.list = [...state.list]
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchProducts.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchProducts.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

const { actions, reducer } = productsSlice

export const {
  defaultLoading,
  defaultState,
  defaultListOrders,
  setProduct,
  defaultProduct
} = actions

export default reducer
