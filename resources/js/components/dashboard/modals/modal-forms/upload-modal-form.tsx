import { Button } from '@/components/ui/button';
import { DocumentData } from '@/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'resources/store/store';
import { addDocument, getDocuments } from '../../../../../store/documentSlice';
import { hideModal } from '../../../../../store/modalSlice';

const UploadModalForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [fileData, setFileData] = useState<DocumentData>({
        filename: '',
        tag: 'pdf',
        file: null,
    });
    const [message, setmessage] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setFileData({
            ...fileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        setFileData({
            ...fileData,
            file: files && files.length > 0 ? files[0] : null,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!fileData.filename) {
            setmessage('Missing filename!');
            return;
        }

        if (!fileData.file) {
            setmessage('Missing file!');
            return;
        }

        const formData: FormData = new FormData();
        formData.append('filename', fileData.filename);
        formData.append('tag', fileData.tag);
        formData.append('file', fileData.file);

        dispatch(addDocument(formData));
        dispatch(getDocuments());
        dispatch(hideModal());
    };

    const handleCancelClick = () => {
        dispatch(hideModal());
        setFileData({
            filename: '',
            tag: 'pdf',
            file: null,
        });
    };

    return (
        <>
            <h3 className="text-xl font-semibold text-(--custom-gray-60)">File upload</h3>
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
                <label htmlFor="file">File</label>
                <input className="rounded-md border px-1 py-2" type="file" id="file" name="file" onChange={handleFileChange} />
                <div className="mt-4 flex gap-4">
                    <Button variant={'secondary'} onClick={handleCancelClick} className="flex-1" type={'reset'}>
                        Cancel
                    </Button>
                    <Button variant={'default'} type="submit" className="flex-1">
                        Upload
                    </Button>
                </div>
            </form>
            {message && <p className="font-medium text-red-500">{message}</p>}
        </>
    );
};

export default UploadModalForm;
