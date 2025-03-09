import { DocumentCardType } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'resources/store/store';
import { getDocuments } from '../../../../store/documentSlice';
import DocumentCard from '../document-card/document-card';

const DocumentContainer = () => {
    const { documents, message, loading, tag } = useSelector((state: RootState) => state.document);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getDocuments());
    }, [dispatch, tag]);

    const docList = documents.map((document: DocumentCardType) => {
        return <DocumentCard key={document.id} documentData={document} />;
    });

    const formattedMsg = <p className="text-(--custom-gray-50)">{message}</p>;
    const noFilesMsg = <p className="text-(--custom-gray-50)">No files uploaded</p>;

    return (
        <div className={`flex flex-col rounded-xl border border-(--custom-gray-30) bg-white ${documents.length === 0 ? 'p-8' : ''}`}>
            {loading && formattedMsg}
            {!loading && documents.length === 0 && noFilesMsg}
            {!loading && documents.length !== 0 && docList}
        </div>
    );
};

export default DocumentContainer;
