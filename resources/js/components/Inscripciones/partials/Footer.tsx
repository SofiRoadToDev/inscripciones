import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card de Información de Contacto */}
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 text-white">Información de Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-6 w-6 text-blue-300 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-white/90 font-medium">Dirección:</p>
                                    <p className="text-white/70">Av. Belgrano 1234</p>
                                    <p className="text-white/70">Localidad, Provincia</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-6 w-6 text-blue-300 flex-shrink-0" />
                                <div>
                                    <p className="text-white/90 font-medium">Teléfono:</p>
                                    <a href="tel:+541234567890" className="text-white/70 hover:text-white transition-colors">
                                        +54 12 3456-7890
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-6 w-6 text-blue-300 flex-shrink-0" />
                                <div>
                                    <p className="text-white/90 font-medium">Email:</p>
                                    <a href="mailto:info@escuela3107.edu.ar" className="text-white/70 hover:text-white transition-colors">
                                        info@escuela3107.edu.ar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card de Mapa */}
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/20 shadow-xl">
                        <div className="relative rounded-lg overflow-hidden h-64 bg-white/5">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1234567890!2d-58.1234567890!3d-34.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1ses!2sar!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                                title="Ubicación de la Escuela"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/60 text-sm">
                        © 2024 Escuela de Educación Técnica 3107 "Juana Azurduy de Padilla". Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
