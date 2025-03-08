import { configureStore } from '@reduxjs/toolkit';
import documentReducer from './documentSlice';
import modalReducer from './modalSlice';

const store = configureStore({
    reducer: {
        modal: modalReducer,
        document: documentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
