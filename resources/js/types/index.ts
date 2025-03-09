import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}
export type TagType = 'all' | 'doc' | 'invoice' | 'other' | 'letter' | 'pdf';

export interface TagItem {
    name: string;
    db_name: TagType;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface DocumentData {
    filename: string;
    tag: string;
    file: File | null;
}

export interface EditDocumentData {
    filename: string;
    tag: string;
}

export interface DocumentCardType {
    created_at: string;
    filename: string;
    id: number;
    path: string;
    tag: string;
    user_id: number;
    size: number;
}

export interface DocumentType {
    documents: DocumentCardType[];
    message: string;
    loading: boolean;
    tag: string;
    toastVisible: boolean;
    docData: DocumentCardType | null;
}

export type DocumentCardEdit = Pick<DocumentCardType, 'filename' | 'tag'>;

export interface DocumentContainerProps {
    documents: DocumentCardType[];
}

export type modalType = 'create' | 'edit' | 'delete' | '';

export interface modalState {
    modalVisible: boolean;
    modalType: modalType;
}
