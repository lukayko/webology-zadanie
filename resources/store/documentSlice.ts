import { DocumentCardType, DocumentType } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDocuments = createAsyncThunk('document/getDocuments', async (_, { getState }) => {
    const state = getState() as { document: { tag: string } };

    let params = {};

    if (state.document.tag !== 'all') {
        params = { tag: state.document.tag };
    }

    const response = await axios.get('/documents', {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    return response.data.files;
});

export const deleteDocument = createAsyncThunk('document/deleteDocument', async (id: number) => {
    const response = await axios.delete(`/delete-document/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
});

export const addDocument = createAsyncThunk('document/addDocument', async (documentData: FormData) => {
    const response = await axios.post('/upload-document', documentData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
});

export const editDocument = createAsyncThunk('document/editDocument', async (docData: DocumentCardType) => {
    const response = await axios.put(`/edit-document/${docData.id}`, docData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    return response.data;
});

const initialState: DocumentType = {
    documents: [],
    message: '',
    loading: false,
    tag: sessionStorage.getItem('selectedTag') || 'all',
    toastVisible: false,
    docData: null,
};

const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setTag: (state, action: PayloadAction<string>) => {
            state.tag = action.payload;
            sessionStorage.setItem('selectedTag', action.payload);
        },

        hideToast: (state) => {
            state.toastVisible = false;
            state.message = '';
        },
        setDocData: (state, action: PayloadAction<DocumentCardType>) => {
            state.docData = action.payload;
        },
        resetDocData: (state) => {
            state.docData = null;
        },

        removeDocument: (state, action: PayloadAction<number>) => {
            state.documents = state.documents.filter((doc) => doc.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDocuments.pending, (state) => {
            state.loading = true;
            state.message = 'Loading documents...';
        });
        builder.addCase(getDocuments.fulfilled, (state, action: PayloadAction<DocumentCardType[]>) => {
            state.documents = action.payload;
            state.loading = false;
            state.message = '';
        });
        builder.addCase(getDocuments.rejected, (state) => {
            state.message = 'Failed to load documents. Please try again.';
            state.loading = false;
        });

        builder.addCase(deleteDocument.fulfilled, (state) => {
            state.message = 'Document deleted successfully!';
        });
        builder.addCase(deleteDocument.rejected, (state) => {
            state.message = 'Failed to delete document. Please try again.';
        });

        builder.addCase(addDocument.fulfilled, (state) => {
            state.message = 'Document added successfully!';
        });
        builder.addCase(addDocument.rejected, (state) => {
            state.message = 'Failed to add document. Please try again.';
        });

        builder.addCase(editDocument.fulfilled, (state) => {
            state.message = 'Document edited successfully!';
        });
        builder.addCase(editDocument.rejected, (state) => {
            state.message = 'Failed to edit document. Please try again.';
        });
    },
});

export const { setTag, hideToast, setDocData, resetDocData, removeDocument } = documentSlice.actions;
export default documentSlice.reducer;
