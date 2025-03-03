import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface TagItem {
    name: string;
    db_name: string;
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

export interface FileData {
    filename: string;
    tag: string;
    file: File | null;
}

export interface FileCard {
    created_at: string;
    filename: string;
    id: number;
    path: string;
    tag: string;
    updated_at: string;
    user_id: number;
    size: number;
}

export interface FileCardProps {
    file: FileCard;
}
