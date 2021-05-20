import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (data) => {
    // console.log('aad', data);
    return customAxiosApi.post('auth/login', data)
      .then(response => {
        const { data } = response
        console.log('response', response);
        return data
      })
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: false,
    error: ''
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
})

const { actions, reducer } = loginSlice

export const {
  setToken,
  deleteTokenLogOut,
  defaulrError,
  setError
} = actions

export default reducer
