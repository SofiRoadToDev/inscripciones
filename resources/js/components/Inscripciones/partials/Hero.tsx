import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { usePage } from '@inertiajs/react';

const Hero = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { url } = usePage();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const isActive = (path: string) => {
        return url === path;
    };

    return (
        <>
            <header className="relative overflow-hidden ">
                {/* Hero Section con efecto parallax usando Tailwind */}
                <div
                    className="md:h-screen md:h-[600px] lg:h-[700px] bg-fixed bg-center bg-no-repeat bg-cover relative"
                    style={{ backgroundImage: "url('/img/fachada-escalada.png')" }}
                >
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* Contenido del hero */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
                        <div className="flex flex-col items-center gap-6">
                            <img  className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40" src="/img/escudo.png" alt="" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in">
                               Escuela de Educación Técnica 3107
                            </h1>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight animate-fade-in">
                               "Juana Azurduy de Padilla"
                            </h1>
                            <button className="mt-4 sm:mt-6 md:mt-8 bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 md:py-4 md:px-10 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-delay">
                                Inscripciones
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 backdrop-blur-md text-white bg-blue-950 transition-all duration-300 border-b border-white/10 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center h-16">

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <a href="#" className={`text-white/90 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-md ${isActive('/') ? 'border border-white/50' : ''}`}>Inicio</a>
                                <a href="#" className={`text-white/90 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-md ${isActive('/nosotros') ? 'border border-white/50' : ''}`}>Nosotros</a>
                                <a href="#" className={`text-white/90 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-md ${isActive('/plan-estudio') ? 'border border-white/50' : ''}`}>Plan de Estudio</a>
                                <a href="#" className={`text-white/90 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-md ${isActive('/novedades') ? 'border border-white/50' : ''}`}>Novedades</a>
                                <a href="/inscripciones" className={`text-white/90 hover:text-white px-3 py-2 text-lg font-medium transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-md ${isActive('/inscripciones') ? 'border border-white/50' : ''}`}>Inscripciones</a>
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="ml-4 p-2 rounded-md text-white hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            aria-label="Cambiar tema"
                            title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                        >
                            {theme === 'light' ? (
                                <Moon className="h-6 w-6" />
                            ) : (
                                <Sun className="h-6 w-6" />
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="text-card-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-md p-2 text-white"
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
                    <div className="md:hidden bg-blue-950/90 backdrop-blur-md border-t border-white/10">
                        <div className="px-2 pt-2 pb-3 space-y-1 ">
                            <a href="#" className={`block px-3 py-2 text-base font-medium text-white hover:text-white hover:bg-blue-800/50 rounded-md transition-colors ${isActive('/') ? 'border border-white/50' : ''}`}>Inicio</a>
                            <a href="#" className={`block px-3 py-2 text-base font-medium text-white hover:text-white hover:bg-blue-800/50 rounded-md transition-colors ${isActive('/nosotros') ? 'border border-white/50' : ''}`}>Nosotros</a>
                            <a href="#" className={`block px-3 py-2 text-base font-medium text-white hover:text-white hover:bg-blue-800/50 rounded-md transition-colors ${isActive('/plan-estudio') ? 'border border-white/50' : ''}`}>Programas</a>
                            <a href="#" className={`block px-3 py-2 text-base font-medium text-white hover:text-white hover:bg-blue-800/50 rounded-md transition-colors ${isActive('/novedades') ? 'border border-white/50' : ''}`}>Admisiones</a>
                            <a href="#" className={`block px-3 py-2 text-base font-medium text-white hover:text-white hover:bg-blue-800/50 rounded-md transition-colors ${isActive('/contacto') ? 'border border-white/50' : ''}`}>Contacto</a>
                        </div>
                    </div>
                )}
            </nav>


        </>
    );
};

export default Hero;
