import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customAxiosApi } from '../customAxiosApi'
import { STATUS_FETCH, API_NAME } from '../dataDefault'

export const fetchSliderAll = createAsyncThunk(
  'slider/fetchSliderAll',
  async () => {
    return customAxiosApi.get(API_NAME.SLIDER)
      .then(response => {
        const { data } = response
        return data
      })
  }
)

export const fetchSlider = createAsyncThunk(
  'slider/fetchSlider',
  async (id) => {
    return customAxiosApi.get(`${API_NAME.SLIDER}/${id}`)
      .then(response => {
        const { data } = response
        return data
      })
  }
)

export const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    list: [],
    loading: 'idle',
  },

  reducers: {
    defaultState: (state, action) => {
      state.list = []
      state.loading = 'idle'
    },

    defaultListSlider: (state, action) => {
      state.list = []
    },

    defaultLoading: (state, action) => {
      state.loading = 'idle'
    }
  },

  extraReducers: {
    [fetchSliderAll.pending]: (state, action) => {
      // Add user to the state array
      state.list = [...state.list]
      state.loading = STATUS_FETCH.LOADING
    },

    [fetchSliderAll.fulfilled]: (state, action) => {
      // Add user to the state array

      state.list = action.payload
      state.loading = STATUS_FETCH.SUCCESS
    },

    [fetchSliderAll.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = STATUS_FETCH.FAILED
    },
  }
})

const { actions, reducer } = sliderSlice

export const {
  defaultLoading,
  defaultState,
  defaultListSlider
} = actions

export default reducer
