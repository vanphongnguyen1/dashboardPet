import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    return customAxiosApi.get(API_NAME.ORDERS)
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
    order: {},
    loading: 'idle'
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.order = {}
      state.loading = 'idle'
    },
    defaultOrder: (state, action) => {
      state.order = {}
    },

    setOrder: (state, action) => {
      state.order = action.payload
    }
  },

  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      // Add user to the state array
      state.list = [...state.list]
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchOrders.fulfilled]: (state, action) => {
      // Add user to the state array
      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchOrders.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

const { actions, reducer } = orderSlice

export const { setOrder, defaultState, defaultOrder } = actions

export default reducer
