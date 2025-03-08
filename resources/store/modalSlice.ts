import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modalState, modalType } from '../js/types';

const modalInitialState: modalState = { modalVisible: false, modalType: '' };

const modalSlice = createSlice({
    name: 'modal',
    initialState: modalInitialState,
    reducers: {
        showModal: (state, action: PayloadAction<modalType>) => {
            state.modalVisible = true;
            state.modalType = action.payload;
        },
        hideModal: (state) => {
            state.modalVisible = false;
            state.modalType = '';
        },
    },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
