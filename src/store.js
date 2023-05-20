import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './features/coinSlice';
import coinDetailsReducer from './features/coinDetailsSlice';
import chartReducer from './features/chartSlice';


export const store = configureStore({
    reducer : {
        coins : coinReducer,
        details : coinDetailsReducer,
        chart : chartReducer,

    },
    devTools: false,
});
