import { FileCard as FileCardType } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FileCard from './file-card';

function FilesContainer() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('/user-files', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                setFiles(response.data.files);
                console.log('Successfully fetched files:', response.data.files);
            } catch (error) {
                console.error(`Error fetching files: ${error}`);
            }
        };

        fetchFiles();
    }, []);

    const emptyFilesMSG = (
        <p className="text-center">
            Ooops, It seems you have no uploaded documents.
            <br /> Click on the button above to upload your first document.
        </p>
    );

    const fileList = files.map((file: FileCardType) => {
        return <FileCard key={file.id} file={file} />;
    });

    return (
        <div className={`flex flex-col rounded-xl border border-(--custom-gray-30) bg-white ${files.length === 0 ? 'py-8' : ''}`}>
            {files.length === 0 ? emptyFilesMSG : fileList}
        </div>
    );
}

export default FilesContainer;
