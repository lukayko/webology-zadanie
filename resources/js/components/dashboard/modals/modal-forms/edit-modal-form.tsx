import { Button } from '@/components/ui/button';
import { DocumentCardEdit, DocumentCardType } from '@/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'resources/store/store';
import { editDocument, getDocuments, resetDocData } from '../../../../../store/documentSlice';
import { hideModal } from '../../../../../store/modalSlice';

const EditModalForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const fileDataObj = useSelector((state: RootState) => state.document.docData);

    const [fileData, setFileData] = useState<DocumentCardEdit>({
        filename: fileDataObj?.filename || '',
        tag: fileDataObj?.tag || 'pdf',
    });
    const [message, setmessage] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setFileData({
            ...fileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fileData.filename) {
            setmessage('Missing filename!');
            return;
        }

        const updatedDoc = {
            ...fileDataObj,
            id: fileDataObj?.id,
            filename: fileData.filename,
            tag: fileData.tag,
        } as DocumentCardType;

        dispatch(editDocument(updatedDoc));
        dispatch(resetDocData());
        dispatch(getDocuments());
        dispatch(hideModal());
    };

    const handleCancelClick = () => {
        dispatch(hideModal());
        setFileData({
            filename: '',
            tag: 'pdf',
        });
    };

    return (
        <>
            <h3 className="text-xl font-semibold text-(--custom-gray-60)">Edit file</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label htmlFor="filename">Name</label>
                <input
                    className="rounded-md border px-1 py-2"
                    type="text"
                    id="filename"
                    name="filename"
                    value={fileData.filename}
                    onChange={handleInputChange}
                />
                <label htmlFor="tag">Tag</label>
                <select className="rounded-md border px-1 py-2" id="tag" name="tag" value={fileData.tag} onChange={handleInputChange}>
                    <option value="pdf">PDF</option>
                    <option value="doc">Doc</option>
                    <option value="invoice">Invoice</option>
                    <option value="letter">Letter</option>
                    <option value="other">Other</option>
                </select>
                <div className="mt-4 flex flex-col gap-4 lg:flex-row">
                    <Button variant={'secondary'} onClick={handleCancelClick} className="flex-1" type={'reset'}>
                        Cancel
                    </Button>
                    <Button variant={'default'} type="submit" className="flex-1">
                        Save
                    </Button>
                </div>
            </form>
            {message && <p className="font-medium text-red-500">{message}</p>}
        </>
    );
};

export default EditModalForm;
