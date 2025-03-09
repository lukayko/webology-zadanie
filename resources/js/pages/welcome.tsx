import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import accent from '../../../public/images/accent.png';
import logo from '../../../public/images/logo-small.png';
import mockup from '../../../public/images/mockup.png';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome"></Head>
            <div className="flex min-h-screen flex-col text-[#1b1b18]">
                <header className="border border-b bg-white p-4 sm:p-6">
                    <div className="mx-auto flex w-full max-w-7xl justify-between align-middle">
                        <img src={logo} alt={'File vault logo'} className="h-8 sm:h-12" />
                        <nav className="flex items-center justify-end gap-2 sm:gap-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-3 py-1 text-xs leading-normal text-[#1b1b18] hover:border-[#1915014a] sm:px-5 sm:py-1.5 sm:text-sm dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-(--custom-purple-100) px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-(--custom-purple-90) sm:px-5 sm:py-2 sm:text-base"
                                    >
                                        Get started
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md border px-3 py-1.5 text-xs font-semibold shadow-xs sm:px-5 sm:py-2 sm:text-base"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>
                <main className="mx-auto mt-12 flex flex-col gap-12 px-4 sm:mt-20 sm:gap-20 sm:px-6 md:mt-30 md:gap-30">
                    <div className="relative mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center sm:gap-6">
                        <img
                            src={accent}
                            alt={''}
                            className="absolute -top-5 -right-0 hidden w-10 opacity-50 md:-top-10 md:-right-10 md:block md:w-20 lg:-top-20 lg:-right-20 lg:w-30"
                        />
                        <img
                            src={accent}
                            alt={''}
                            className="absolute -bottom-15 -left-15 hidden w-20 rotate-180 opacity-30 grayscale md:block md:w-20 lg:-bottom-20 lg:-left-30 lg:w-30"
                        />
                        <h1 className="text-3xl font-bold sm:text-5xl md:text-7xl">Say goodbye to scattered files and endless searches</h1>
                        <p className="text-base text-(--custom-gray-60) sm:text-lg">
                            Our app helps you centralize, categorize, and retrieve your documents effortlessly, so you can focus on what matters most
                        </p>
                    </div>
                    <div className="w-full overflow-hidden">
                        <img src={mockup} alt={'App mockup'} />
                    </div>
                </main>
            </div>
        </>
    );
}
