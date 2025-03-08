import { Button } from '@/components/ui/button';
import { DocumentCardType } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'resources/store/store';
import { deleteDocument, removeDocument } from '../../../../../store/documentSlice';
import { hideModal } from '../../../../../store/modalSlice';

const DeleteModalForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const docData = useSelector((state: RootState) => state.document.docData) as DocumentCardType;

    const onCloseClick = () => {
        dispatch(hideModal());
    };

    const onDeleteClick = () => {
        if (docData.id) {
            dispatch(deleteDocument(docData.id));
            dispatch(removeDocument(docData.id));
            dispatch(hideModal());
        }
    };

    return (
        <>
            <h3 className="text-xl font-semibold text-(--custom-gray-60)">Delete file</h3>
            <p>Are you sure you want to delete this file?</p>
            <div className="flex justify-end gap-4">
                <Button variant={'secondary'} size={'default'} onClick={onCloseClick} className="flex-1">
                    Cancel
                </Button>
                <Button variant={'destructive'} size={'default'} onClick={onDeleteClick} className="flex-1">
                    Delete
                </Button>
            </div>
        </>
    );
};

export default DeleteModalForm;
