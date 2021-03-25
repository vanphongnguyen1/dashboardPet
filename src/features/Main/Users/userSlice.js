import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../../../customAxiosApi'

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

    creactUser: (state, action) => {

    },
    updateUser: (state, action) => {

    },
    deleteUser: (state, action) => {

    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = 'loading'
    },

    [fetchUsers.fulfilled]: (state, action) => {
      // Add user to the state array
      state.list = action.payload
      state.loading = 'success'
    },

    [fetchUsers.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = 'failed'
    },
  }
})

// Action creators are generated for each case reducer function
export const { creactUser, updateUser, deleteUser, defaultState } = userSlice.actions

export default userSlice.reducer
