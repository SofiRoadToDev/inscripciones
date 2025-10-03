
import PublicLayout from '@/layouts/public/PublicLayout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {


    return (
        <>
        <PublicLayout>
           <main className='bg-slate-200 h-screen text-black'>
                <h1>WELCOME</h1>
           </main>
        </PublicLayout>
        </>
    );
}
