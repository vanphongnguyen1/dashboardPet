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
    user: {},
    loading: 'idle'
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },

    defaultState: (state, action) => {
      state.list = []
      state.user = {}
      state.loading = 'idle'
    },

    defaultUser: (state, action) => {
      state.user = []
    },
    defaultUsers: (state, action) => {
      state.list = []
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
export const { defaultUsers, defaultState, setUser, defaultUser } = userSlice.actions

export default userSlice.reducer
