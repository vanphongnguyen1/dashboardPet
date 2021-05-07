import { createSlice } from '@reduxjs/toolkit'

export const menuAnimation = createSlice({
  name: 'menu',
  initialState: {
    isMenu: true,

    menuLineageID: 0
  },

  reducers: {
    setIsMenu: (state, action) => {
      state.isMenu = action.payload
    },

    setMenuLineageID: (state, action) => {
      state.menuLineageID = action.payload
    },
  },
})

const { actions, reducer } = menuAnimation

export const { setIsMenu, setMenuLineageID } = actions

export default reducer
