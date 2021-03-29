import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'

export const fetchTrasport = createAsyncThunk(
  'trasportSlice/fetchTrasport',
  async () => {
    return customAxiosApi.get('trasport')
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const trasportSlice = createSlice({
  name: 'trasport',
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
    [fetchTrasport.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = 'loading'
    },

    [fetchTrasport.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = 'success'
    },

    [fetchTrasport.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = 'failed'
    },
  }
})

const { actions, reducer } = trasportSlice

export const { defaultLoading, defaultState, defaultListOrders  } = actions

export default reducer
