import DocumentContainer from '@/components/dashboard/document-container/document-container';
import { DocumentFilter } from '@/components/dashboard/document-filter/document-filter';
import DocumentActionsModalBody from '@/components/dashboard/modals/document-actions-modal-body';
import ModalOverlay from '@/components/dashboard/modals/modal-overlay';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'resources/store/store';
import { showModal } from '../../store/modalSlice';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const modalData = useSelector((state: RootState) => state.modal);

    const handleUploadButtonClick = () => {
        dispatch(showModal('create'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="relative flex flex-col flex-1 background-">
                <div className="flex items-center justify-between py-8">
                    <h1 className="text-3xl font-semibold text-(--custom-gray-50)">Documents</h1>
                    <DocumentFilter />
                </div>
                <div className="mb-13 flex flex-col items-center gap-4 rounded-xl border border-dashed border-[#5d21d2] bg-(--custom-purple-20) py-10">
                    <Button variant={'default'} size={'lg'} onClick={handleUploadButtonClick}>
                        Choose file
                    </Button>
                    <span className="text-(--custom-gray-50)">click on the button to upload a new file</span>
                </div>
                <div>
                    <h2 className="mb-5 text-xl font-semibold text-(--custom-gray-60)">All Files</h2>
                    <DocumentContainer />
                </div>
            </div>
            {modalData.modalVisible && <ModalOverlay>{<DocumentActionsModalBody type={modalData.modalType} />}</ModalOverlay>}
        </AppLayout>
    );
};

export default Dashboard;
