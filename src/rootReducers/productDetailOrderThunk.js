import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'

export const fetchProductDetailOrder = createAsyncThunk(
  'productDetailOrder/fetchProductDetailOrder',
  async () => {
    return customAxiosApi.get('productDetailOrder')
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
      state.loading = 'loading'
    },

    [fetchProductDetailOrder.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = 'success'
    },

    [fetchProductDetailOrder.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = 'failed'
    },
  }
})

const { actions, reducer } = productDetailOrderSlice

export const { defaultLoading, defaultState, defaultListOrders  } = actions

export default reducer
