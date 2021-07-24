import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH } from '../dataDefault'

export const fetchForgotPassword = createAsyncThunk(
  'forgotPassword/fetchForgotPassword',
  async (data) => {
    return customAxiosApi.post('auth/forgotPassword', data).then((response) => {
      const { data } = response
      return data
    })
  },
)

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    data: {},
    loading: 'idle',
  },

  reducers: {
    setDataForgotPassword: (state, action) => {
      state.data = action.payload
    },
  },

  extraReducers: {
    [fetchForgotPassword.pending]: (state, action) => {
      // Add user to the state array
      state.data = {}
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchForgotPassword.fulfilled]: (state, action) => {
      // Add user to the state array

      state.data = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchForgotPassword.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  },
})

const { actions, reducer } = forgotPasswordSlice

export const { setDataForgotPassword } = actions

export default reducer
