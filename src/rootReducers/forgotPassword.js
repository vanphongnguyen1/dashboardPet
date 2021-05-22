import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH } from '../dataDefault'

export const fetchForgotPassword = createAsyncThunk(
  'forgotPassword/fetchForgotPassword',
  async (data) => {
    return customAxiosApi.post('auth/forgotPassword', data)
      .then(response => {
        const { data } = response
        console.log('response', response);
        return data
      })
  }
)

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    data: {},
    loading: 'idle'
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },

    deleteTokenLogOut: (state, action) => {
      state.token = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
    },

    defaulrError: (state, action) => {
      state.error = ''
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
  }
})

const { actions, reducer } = forgotPasswordSlice

export const {
  setToken,
  deleteTokenLogOut,
  defaulrError,
  setError
} = actions

export default reducer
