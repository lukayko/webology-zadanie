import FileUploadModal from '@/components/file-upload-modal';
import ModalOverlay from '@/components/modal-overlay';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type TagItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const tags: TagItem[] = [
    {
        name: 'PDFs',
        db_name: 'pdf',
    },
    {
        name: 'Docs',
        db_name: 'doc',
    },
    {
        name: 'Invoices',
        db_name: 'invoice',
    },
    {
        name: 'Letters',
        db_name: 'letter',
    },
    {
        name: 'Others',
        db_name: 'other',
    },
];

export default function Dashboard() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleUploadButtonClick() {
        setModalOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="relative flex flex-col flex-1 background-">
                <div className="flex items-center justify-between py-8">
                    <h1 className="text-3xl font-semibold text-(--custom-gray-50)">Documents</h1>
                    <div className="flex gap-4">
                        <Button variant={'tag_default'} size={'tag_default'}>
                            All Documents
                        </Button>

                        {tags.map((tag) => (
                            <Button variant={'tag_default'} size={'tag_default'} key={tag.db_name}>
                                {tag.name}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="mb-13 flex flex-col items-center gap-4 rounded-xl border border-dashed border-[#5d21d2] bg-(--custom-purple-20) py-10">
                    <Button variant={'default'} size={'lg'} onClick={() => handleUploadButtonClick()}>
                        Choose file
                    </Button>
                    <span className="text-(--custom-gray-50)">click on the button to upload a new file</span>
                </div>
                {modalOpen && (
                    <ModalOverlay>
                        <FileUploadModal />
                    </ModalOverlay>
                )}
                <div>
                    <h2 className="mb-5 text-xl font-semibold text-(--custom-gray-60)">All Files</h2>
                    <div className="rounded-xl border border-(--custom-gray-30) bg-white py-10">
                        <p className="text-center">
                            Ooops, It seems you have no uploaded documents.
                            <br /> Click on the button above to upload your first document.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
