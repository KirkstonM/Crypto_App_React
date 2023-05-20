import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    coinDetails: {},
    isLoading: false,
    error: false
};

export const fetchDetails = createAsyncThunk('details/fetch', async (id, thunkAPI) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        const data = await response.json();
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }

});

const coinDetailSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        cleanDetails : (state) => {
            state.coinDetails = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetails.pending, (state) => {
                state.isLoading = true;
                state.error = false
            })
            .addCase(fetchDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coinDetails = action.payload
            })
            .addCase(fetchDetails.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
});
export const { cleanDetails } = coinDetailSlice.actions;
export default coinDetailSlice.reducer;

