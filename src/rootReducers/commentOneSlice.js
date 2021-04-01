import { createSlice } from '@reduxjs/toolkit'

export const commentOneSlice = createSlice({
  name: 'comment',
  initialState: {
    list: [],
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
    },

    setDataComment: (state, action) => {
      state.list = action.payload
    }
  },
})

const { actions, reducer } = commentOneSlice

export const { setDataComment, defaultState } = actions

export default reducer
