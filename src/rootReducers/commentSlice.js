import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH } from '../dataDefault'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (url) => {
    return customAxiosApi.get(url)
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    list: [],
    comment: {},
    loading: 'idle'
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.loading = 'idle'
    },

    defaultListComments: (state, action) => {
      state.list = []
    },

    setDataComment: (state, action) => {
      state.comment = action.payload
    }
  },

  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchComments.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchComments.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

const { actions, reducer } = commentSlice

export const { setDataComment, defaultState, defaultListComments  } = actions

export default reducer
