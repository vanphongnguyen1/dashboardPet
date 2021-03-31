import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH } from '../dataDefault'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (nameTable) => {
    return customAxiosApi.get(`/${nameTable}`)
      .then(response => {
        const { data } = response.data
        return data
      })
  }
)

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: 'idle'
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.loading = 'idle'
    },

    defaultUsers: (state, action) => {
      state.list = []
    },

    defaultLoading: (state, action) => {
      state.loading = 'idle'
    },

  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchUsers.fulfilled]: (state, action) => {
      // Add user to the state array
      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchUsers.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

// Action creators are generated for each case reducer function
export const { defaultLoading ,defaultUsers, defaultState } = userSlice.actions

export default userSlice.reducer
