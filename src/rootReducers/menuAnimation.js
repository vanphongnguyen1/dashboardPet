import { createSlice } from '@reduxjs/toolkit'

export const menuAnimation = createSlice({
  name: 'menu',
  initialState: {
    isMenu: true
  },

  reducers: {
    setIsMenu: (state, action) => {
      state.isMenu = action.payload
    },
  },
})

const { actions, reducer } = menuAnimation

export const { setIsMenu } = actions

export default reducer
