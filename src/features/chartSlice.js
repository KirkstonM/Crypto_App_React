import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    chartData: {},
    isLoading: true,
    error: false
};

export const fetchChartData = createAsyncThunk('chart/fetch', async ({ id, currency, days }, thunkAPI) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        const data = await response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChartData.pending, (state) => {
                state.isLoading = true;
                state.error = false
            })
            .addCase(fetchChartData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chartData = action.payload
            })
            .addCase(fetchChartData.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
});

export default chartSlice.reducer;
