import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Hero = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <header className="relative overflow-hidden">
                {/* Hero Section con efecto parallax usando Tailwind */}
                <div
                    className="h-[50vh] md:bg-fixed bg-scroll bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: "url('/img/fachada-escalada.png')" }}
                >
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* Contenido del hero */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] px-4 text-center text-white">
                        <img  className="h-15 w-15 md:h-30 md:w-30" src="/img/escudo.png" alt="" />
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                           Escuela de Educación Técnica 3107
                        </h1>
                        <h1 className="text-2xl md:text-4xl font-bold mb-6 animate-fade-in">
                           "Juana Azurduy de Padilla"
                        </h1>
                        <button className="bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-delay">
                            Inscripciones
                        </button>
                    </div>
                </div>
            </header>

            {/* Navbar */}
            <nav className="bg-card shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center h-16">

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="#" className="text-muted-foreground hover:text-primary px-3 py-2 text-lg font-medium transition-colors duration-200">Inicio</a>
                                <a href="#" className="text-muted-foreground hover:text-primary px-3 py-2 text-lg font-medium transition-colors duration-200">Nosotros</a>
                                <a href="#" className="text-muted-foreground hover:text-primary px-3 py-2 text-lg font-medium transition-colors duration-200">Plan de Estudio</a>
                                <a href="#" className="text-muted-foreground hover:text-primary px-3 py-2 text-lg font-medium transition-colors duration-200">Novedades</a>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="text-card-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-md p-2"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-card border-t border-border">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">Inicio</a>
                            <a href="#" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">Nosotros</a>
                            <a href="#" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">Programas</a>
                            <a href="#" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">Admisiones</a>
                            <a href="#" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">Contacto</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            </main>
        </>
    );
};

export default Hero;
