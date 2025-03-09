import { modalType } from '@/types';
import DeleteModalForm from './modal-forms/delete-modal-form';
import EditModalForm from './modal-forms/edit-modal-form';
import UploadModalForm from './modal-forms/upload-modal-form';

const DocumentActionsModalBody = ({ type }: { type: modalType }) => {
    return (
        <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded-xl border border-(--custom-gray-30) bg-white p-4 sm:w-1/2 lg:w-[25vw]">
            {type === 'create' && <UploadModalForm />}
            {type === 'edit' && <EditModalForm />}
            {type === 'delete' && <DeleteModalForm />}
        </div>
    );
};

export default DocumentActionsModalBody;
