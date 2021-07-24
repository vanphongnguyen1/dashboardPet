import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchLineage = createAsyncThunk(
  'lineageSlice/fetchLineage',
  async (id = '') => {
    return customAxiosApi
      .get(`${API_NAME.LINEAGE}${id ? `?groupID=${id || 1}` : ''}`)
      .then((response) => {
        const { data } = response.data
        return data
      })
  },
)

export const lineageSlice = createSlice({
  name: 'status',
  initialState: {
    list: [],
    loading: 'idle',
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.loading = 'idle'
    },

    defaultListLineage: (state, action) => {
      state.list = []
    },

    defaultLoading: (state, action) => {
      state.loading = 'idle'
    },
  },

  extraReducers: {
    [fetchLineage.pending]: (state, action) => {
      // Add user to the state array
      state.list = []
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchLineage.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchLineage.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  },
})

const { actions, reducer } = lineageSlice

export const { defaultLoading, defaultState, defaultListLineage } = actions

export default reducer
