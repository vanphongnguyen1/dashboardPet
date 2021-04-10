import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    return customAxiosApi.get(API_NAME.COMMENTS)
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
      state.comment = {}
      state.loading = 'idle'
    },

    defaultListComments: (state, action) => {
      state.list = []
    },

    setDataComment: (state, action) => {
      state.comment = action.payload
    },

    defaultDataComment: (state, action) => {
      state.comment = {}
    }
  },

  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      // Add user to the state array
      state.list = [...state.list]
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

export const {
  setDataComment,
  defaultState,
  defaultListComments,
  defaultDataComment
} = actions

export default reducer
