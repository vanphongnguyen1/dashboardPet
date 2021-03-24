import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../../customAxiosApi'

export const fetchData = createAsyncThunk(
  'users/fetchData',
  async (nameTable) => {
    return customAxiosApi.get(`/${nameTable}`)
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
    [fetchData.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = 'loading'
    },

    [fetchData.fulfilled]: (state, action) => {
      // Add user to the state array
      state.list = action.payload
      state.loading = 'success'
    },

    [fetchData.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = 'failed'
    },
  }
})

// Action creators are generated for each case reducer function
export const { creactUser, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer
