import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import priceService from './priceService'

const initialState = {
    prices: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new Price
export const createPrice = createAsyncThunk('prices/create', async (priceData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await priceService.createPrice(priceData, token)
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
        // message here is passed as payload in extraReducer >> login.rejected
        return thunkAPI.rejectWithValue(message)
    }
})

export const priceSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPrice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPrice.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.prices.push(action.payload)
            })
            .addCase(createPrice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = priceSlice.actions
export default priceSlice.reducer