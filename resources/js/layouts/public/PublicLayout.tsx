

import { ReactNode } from 'react';
import Hero from '@/components/Inscripciones/partials/Hero';



const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
        <Hero/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground shadow-2xl dark:shadow-2xl dark:shadow-slate-100">
            {children}
        </main>
    </>
  )
}

export default PublicLayout
