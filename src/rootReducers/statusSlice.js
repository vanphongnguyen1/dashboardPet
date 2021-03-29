import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'

export const fetchStatus = createAsyncThunk(
  'statusSlice/fetchStatus',
  async () => {
    return customAxiosApi.get('status')
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const statusSlice = createSlice({
  name: 'status',
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
    [fetchStatus.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = 'loading'
    },

    [fetchStatus.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = 'success'
    },

    [fetchStatus.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = 'failed'
    },
  }
})

const { actions, reducer } = statusSlice

export const { defaultLoading, defaultState, defaultListOrders  } = actions

export default reducer
