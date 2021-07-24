import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchTrasport = createAsyncThunk(
  'trasportSlice/fetchTrasport',
  async () => {
    return customAxiosApi.get(API_NAME.TRASPORT).then((response) => {
      const { data } = response.data
      return data
    })
  },
)

export const trasportSlice = createSlice({
  name: 'trasport',
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
    [fetchTrasport.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchTrasport.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchTrasport.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  },
})

const { actions, reducer } = trasportSlice

export const { defaultLoading, defaultState, defaultListOrders } = actions

export default reducer
