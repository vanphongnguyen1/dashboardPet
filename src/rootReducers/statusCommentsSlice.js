import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH } from '../dataDefault'

export const fetchStatusComments = createAsyncThunk(
  'statusCommentsSlice/fetchStatusComments',
  async () => {
    return customAxiosApi.get('statusComments')
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const statusCommentsSlice = createSlice({
  name: 'statusComments',
  initialState: {
    list: [],
    loading: 'idle'
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.loading = 'idle'
    },

    defaultList: (state, action) => {
      state.list = []
    },

    defaultLoading: (state, action) => {
      state.loading = 'idle'
    }
  },

  extraReducers: {
    [fetchStatusComments.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchStatusComments.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchStatusComments.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

const { actions, reducer } = statusCommentsSlice

export const { defaultLoading, defaultState, defaultList  } = actions

export default reducer
