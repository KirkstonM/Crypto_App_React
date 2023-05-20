import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    mode: "dark",
    coinData: [],
    isLoading: true,
    error: false,
    coinDescription: [],
    currentCurrency: "usd",
    currencyIcon: "$"
};

export const fetchCoinData = createAsyncThunk('coins/fetch', async (currency, thunkAPI) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
        const data = await response.json()
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
})
const coinSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark'
        },
        updateCurrency: (state, action) => {
            state.currentCurrency = action.payload;
            if (state.currentCurrency === 'usd') {
                state.currencyIcon = '$';
            } else if (state.currentCurrency === 'lkr') {
                state.currencyIcon = 'LKR';
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinData.pending, (state) => {
                state.isLoading = true;
                state.error = false
            })
            .addCase(fetchCoinData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coinData = action.payload
            })
            .addCase(fetchCoinData.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
});


export const { toggleMode, updateCurrency } = coinSlice.actions;
export const currentMode = (state) => state.coins.mode;
export const coinValues = (state) => state.coins.coinData;
export const fiatIcon = (state) => state.coins.currencyIcon;
export default coinSlice.reducer;