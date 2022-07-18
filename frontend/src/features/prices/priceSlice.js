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
export const createPrice = createAsyncThunk(
    'prices/create',
    async (priceData, thunkAPI) => {
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
    }
)

// Get user prices
export const getPrices = createAsyncThunk(
    'prices/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await priceService.getPrices(token)
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
    }
)

// Delete user price
export const deletePrice = createAsyncThunk(
    'prices/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await priceService.deletePrice(id, token)
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
    }
)


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
            .addCase(getPrices.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPrices.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.prices = action.payload
            })
            .addCase(getPrices.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePrice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePrice.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // takes it out of the UI as we click 'X'
                // otherwise it would stay visible until page is reloaded
                state.prices = state.prices.filter(price => price._id !== action.payload.id)
            })
            .addCase(deletePrice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = priceSlice.actions
export default priceSlice.reducer