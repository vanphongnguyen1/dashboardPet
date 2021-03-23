import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../../url'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (id) => {
    return axios.get(id ? `${url}/users/${id}` : `${url}/users`)
      .then(response => {
        const { data } = response.data
        return data
      })
    // const response = await userApi.fetchById(userId)
    // return response.data
  }
)
// export const fetchUser = createAsyncThunk(
//   'users/fetchUse/id',
//   async (id) => {
//     return axios.get(`${url}/users/${id}`).then(response => {
//       const { data } = response.data
//       return data
//     })
//     // const response = await userApi.fetchById(userId)
//     // return response.data
//   }
// )

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: 'idle'
  },

  reducers: {
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
export const { creactUser, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer
