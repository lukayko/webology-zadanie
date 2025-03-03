import { type ClassValue, clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatTime(time: string) {
    const parsedTime = parseISO(time);
    const formattedTime = format(parsedTime, 'dd MMMM, yyyy');
    return formattedTime;
}
