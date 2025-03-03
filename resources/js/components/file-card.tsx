import { formatTime } from '@/lib/utils';
import { FileCardProps } from '@/types';
import axios from 'axios';
import DOC from '../../../public/images/doc.png';
import INVOICE from '../../../public/images/invoice.png';
import LETTER from '../../../public/images/letter.png';
import OTHER from '../../../public/images/other.png';
import PDF from '../../../public/images/pdf.png';
import { Button } from '../components/ui/button';

const fileIcons: { [key: string]: string } = {
    pdf: PDF,
    invoice: INVOICE,
    doc: DOC,
    letter: LETTER,
    other: OTHER,
};

const fileColors: { [key: string]: string } = {
    pdf: 'bg-red-400',
    invoice: 'bg-green-400',
    doc: 'bg-blue-700',
    letter: 'bg-gray-400',
    other: 'bg-purple-600',
};

function FileCard({ file }: FileCardProps) {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/delete-file/${file.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    function handleEdit() {
        console.log('Edit' + file.id);
    }

    return (
        <div className="grid grid-cols-4 items-center justify-between border-b border-(--custom-gray-30) p-8">
            <div className="flex items-center gap-4">
                <img src={fileIcons[file.tag]} className="max-w-10" />
                <h4 className="text-lg font-medium text-(--custom-gray-60)">{file.filename}</h4>
            </div>
            <div className="flex items-center justify-center gap-4">
                <p className={`rounded-4xl bg-amber-400 px-[13px] py-[6px] font-medium text-white ${fileColors[file.tag]}`}>{file.tag}</p>
                <p className="text-lg font-medium text-(--custom-gray-50)">1MB</p>
            </div>
            <p className="text-center text-lg text-(--custom-gray-50)">{formatTime(file.created_at)}</p>
            <div className="flex justify-end gap-4">
                <Button variant={'secondary'} onClick={handleEdit}>
                    Edit
                </Button>
                <Button variant={'destructive'} onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default FileCard;
