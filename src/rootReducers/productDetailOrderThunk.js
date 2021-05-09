import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchProductDetailOrderAll = createAsyncThunk(
  'productDetailOrder/fetchProductDetailOrderAll',
  async () => {
    return customAxiosApi.get(API_NAME.PRODUCTDETAILORDER)
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const fetchDetailOrder = createAsyncThunk(
  'productDetailOrder/fetchDetailOrder',
  async (id) => {
    return customAxiosApi.get(`${API_NAME.PRODUCTDETAILORDER}?detailOrderID=${id}`)
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
    [fetchProductDetailOrderAll.pending]: (state, action) => {
      // Add user to the state array
      state.list = [...state.list]
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchProductDetailOrderAll.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchProductDetailOrderAll.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

const { actions, reducer } = productDetailOrderSlice

export const { defaultLoading, defaultState, defaultListOrders  } = actions

export default reducer
