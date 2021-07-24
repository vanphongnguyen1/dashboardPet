import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchStatus = createAsyncThunk(
  'statusSlice/fetchStatus',
  async () => {
    return customAxiosApi.get(API_NAME.STATUS).then((response) => {
      const { data } = response.data
      return data
    })
  },
)

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    list: [],
    loading: 'idle',
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
  },

  extraReducers: {
    [fetchStatus.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchStatus.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchStatus.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  },
})

const { actions, reducer } = statusSlice

export const { defaultLoading, defaultState, defaultListOrders } = actions

export default reducer
