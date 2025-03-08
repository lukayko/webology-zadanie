import { formatSize, formatTime } from '@/lib/utils';
import { DocumentCardType } from '@/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'resources/store/store';
import DOC from '../../../../../public/images/doc.png';
import INVOICE from '../../../../../public/images/invoice.png';
import LETTER from '../../../../../public/images/letter.png';
import OTHER from '../../../../../public/images/other.png';
import PDF from '../../../../../public/images/pdf.png';
import { setDocData } from '../../../../store/documentSlice';
import { showModal } from '../../../../store/modalSlice';
import { Button } from '../../ui/button';

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

const DocumentCard = ({ documentData }: { documentData: DocumentCardType }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleEditClick = () => {
        dispatch(setDocData(documentData));
        dispatch(showModal('edit'));
    };

    const handleDeleteClick = () => {
        dispatch(setDocData(documentData));
        dispatch(showModal('delete'));
    };

    return (
        <div className="grid grid-cols-4 items-center justify-between border-b border-(--custom-gray-30) p-8">
            <div className="flex items-center gap-4">
                <img src={fileIcons[documentData.tag]} className="max-w-10" />
                <h4 className="text-lg font-medium text-(--custom-gray-60)">{documentData.filename}</h4>
            </div>
            <div className="grid items-center grid-cols-4 justify-items-center">
                <p
                    className={`col-start-2 justify-self-start rounded-4xl bg-amber-400 px-[13px] py-[6px] text-xs font-medium text-white ${fileColors[documentData.tag]}`}
                >
                    {documentData.tag.toUpperCase()}
                </p>
                <p className="col-start-3 text-lg font-medium text-(--custom-gray-50)">{formatSize(documentData.size)}</p>
            </div>
            <p className="text-center text-lg text-(--custom-gray-50)">{formatTime(documentData.created_at)}</p>
            <div className="flex justify-end gap-4">
                <Button variant={'secondary'} onClick={handleEditClick}>
                    Edit
                </Button>
                <Button variant={'destructive'} onClick={handleDeleteClick}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default DocumentCard;
