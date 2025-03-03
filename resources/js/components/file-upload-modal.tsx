import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FileData } from '../types';
import { Button } from './ui/button';

function FileUploadModal() {
    const [fileData, setFileData] = useState<FileData>({
        filename: '',
        tag: 'pdf',
        file: null,
    });

    const [message, setMessage] = useState<string>('');

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!fileData.filename) {
            setMessage('Please set a file name');
            return;
        }

        if (!fileData.file) {
            setMessage('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('filename', fileData.filename);
        formData.append('tag', fileData.tag);
        formData.append('file', fileData.file);

        try {
            const response = await axios.post('/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
            console.log('File uploaded successfully:', response.data.file_path);

            setFileData({
                filename: '',
                tag: 'pdf',
                file: null,
            });
        } catch (error) {
            setMessage('File upload failed');
            console.error('File upload failed:', error);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded-xl border border-(--custom-gray-30) bg-white p-4 lg:w-[25vw]">
            <h3 className="text-xl font-semibold text-(--custom-gray-60)">File upload</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label htmlFor="filename">Name</label>
                <input
                    className="px-1 py-2 border rounded-md"
                    type="text"
                    id="filename"
                    name="filename"
                    value={fileData.filename}
                    onChange={handleInputChange}
                />
                <label htmlFor="tag">Tag</label>
                <select className="px-1 py-2 border rounded-md" id="tag" name="tag" value={fileData.tag} onChange={handleInputChange}>
                    <option value="pdf">PDF</option>
                    <option value="doc">Doc</option>
                    <option value="invoice">Invoice</option>
                    <option value="letter">Letter</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor="file">File</label>
                <input className="px-1 py-2 border rounded-md" type="file" id="file" name="file" onChange={handleFileChange} />
                <Button className="mt-4" variant={'default'} type="submit">
                    Upload
                </Button>
                {message && <span className="text-red-500">{message}</span>}
            </form>
        </div>
    );
}

export default FileUploadModal;
