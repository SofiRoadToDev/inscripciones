

import { ReactNode } from 'react';
import Hero from '@/components/Inscripciones/partials/Hero';
import Footer from '@/components/Inscripciones/partials/Footer';



const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
        <Hero/>
        <div
          className="min-h-screen relative"
          style={{
            backgroundImage: "linear-gradient(rgba(30, 58, 138, 0.85), rgba(30, 58, 138, 0.85)), url('/img/fondo-paginas.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundColor: '#1e3a8a',
          }}
        >
          {children}
        </div>
        <Footer />
    </>
  )
}

export default PublicLayout
