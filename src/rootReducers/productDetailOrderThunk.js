import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchProductDetailOrder = createAsyncThunk(
  'productDetailOrder/fetchProductDetailOrder',
  async () => {
    return customAxiosApi.get(API_NAME.PRODUCTDETAILORDER)
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const productDetailOrderSlice = createSlice({
  name: 'productDetailOrder',
  initialState: {
    list: [],
    loading: 'idle'
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
    }
  },

  extraReducers: {
    [fetchProductDetailOrder.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchProductDetailOrder.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchProductDetailOrder.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

const { actions, reducer } = productDetailOrderSlice

export const { defaultLoading, defaultState, defaultListOrders  } = actions

export default reducer
