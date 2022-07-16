import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    prices: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const priceSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const {reset} = priceSlice.actions
export default priceSlice.reducer