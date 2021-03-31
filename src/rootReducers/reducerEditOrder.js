import { createSlice } from '@reduxjs/toolkit'

export const reducerEditOrder = createSlice({
  name: 'dataEditOrder',

  initialState: {
    list: {
      user: {},
      order: {},
      products: [],
      total: {}
    },
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = {}
    },

    setState: (state, action) => {
      state.list = action.payload
    },

    updateStateUser: (state, action) => {
      state.list.user = action.payload
    },

    updateStateOrder: (state, action) => {
      state.list.order = action.payload
    },

    updateStateProducts: (state, action) => {
      state.list.products = action.payload
    },

    updateStateTotal: (state, action) => {
      state.list.total = action.payload
    },
  }
})

const { actions, reducer } = reducerEditOrder

export const {
  updateStateUser,
  updateStateOrder,
  updateStateProducts,
  updateStateTotal,
  setState,
  defaultState
} = actions

export default reducer
