import { createSlice } from '@reduxjs/toolkit'

export const navbarScrolled = createSlice({
  name: 'navbarScrolled',
  initialState: {
    max: 0,
    status: false
  },

  reducers: {
    defaultState: state => {
      state.max = 0
      state.status = false
    },

    setIsNavberScroll: (state, action) => {
      state.max = action.payload.max
      state.status = action.payload.status
    },
  },
})

const { actions, reducer } = navbarScrolled

export const { setIsNavberScroll, defaultState } = actions

export default reducer
