import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../../../../customAxiosApi'

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    return customAxiosApi.get('orders')
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const orderSlice = createSlice({
  name: 'orders',
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
    [fetchOrders.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = 'loading'
    },

    [fetchOrders.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = 'success'
    },

    [fetchOrders.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = 'failed'
    },
  }
})

const { actions, reducer } = orderSlice

export const { defaultLoading, defaultState, defaultListOrders  } = actions

export default reducer
