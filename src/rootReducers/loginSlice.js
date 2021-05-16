import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: false,
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },

    deleteTokenLogOut: (state, action) => {
      state.token = action.payload
    },
  },
})

const { actions, reducer } = loginSlice

export const { setToken, deleteTokenLogOut } = actions

export default reducer
