import { useState, useEffect, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { FormSectionProps, Provincia, Departamento, Localidad } from '@/types';
import {DomicilioFields} from './DomicilioFields';

interface AlumnoFormProps extends FormSectionProps {
    provincias?: Provincia[];
    departamentos?: Departamento[];
    localidades?: Localidad[];
}

export const AlumnoForm =function AlumnoForm({
    data,
    setData,
    errors,
    provincias = [],
    departamentos = [],
    localidades = [],
}: AlumnoFormProps) {

    const [fotoPreview, setFotoPreview] = useState<string | null>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (field: string, value: string) => {
        setData(`alumno.${field}`, value);
    };

    const handleFileChange = (file: File | undefined) => {
        if (file) {
            // Limpiar preview anterior si existe
            if (fotoPreview) {
                URL.revokeObjectURL(fotoPreview);
            }

            // Crear nueva URL para preview
            const objectUrl = URL.createObjectURL(file);
            setFotoPreview(objectUrl);
            setData('alumno.foto', file);
        }
    };

    // Limpiar URL de objeto cuando el componente se desmonte o cambie la foto
    useEffect(() => {
        return () => {
            if (fotoPreview) {
                URL.revokeObjectURL(fotoPreview);
            }
        };
    }, [fotoPreview]);

    // Helper functions (pueden colocarse al principio del archivo o en un archivo de utilidades separado)
    const formatDateToDDMMYYYY = (dateString: string | null | undefined) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ''; // Manejar cadenas de fecha inválidas
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes es 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const parseDateFromDDMMYYYY = (dateString: string) => {
        if (!dateString) return '';
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            // Validación básica para partes de fecha válidas
            if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                // Construir una cadena de fecha en formato YYYY-MM-DD
                return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            }
        }
        return ''; // Devolver cadena vacía para formato inválido
    };


    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const buscarAlumnoPorDni = async (dni: string) => {
        if (dni.trim() === '') return;
        
        setLoading(true);
        setSearchError(null);
        
        try {
            const response = await fetch(`/api/inscripciones/buscar-alumno?dni=${dni}`);
            const data = await response.json();
            
            if (data.encontrado && data.alumno) {
                // Actualizar el formulario con los datos del alumno encontrado
                const alumno = data.alumno;
                
                // Actualizar datos personales
                setData('alumno.apellido', alumno.apellido);
                setData('alumno.nombre', alumno.nombre);
                setData('alumno.dni', alumno.dni);
                setData('alumno.fecha_nacimiento', alumno.fecha_nacimiento);
                setData('alumno.nacionalidad', alumno.nacionalidad);
                setData('alumno.genero', alumno.genero);
                
                // Actualizar datos de contacto si existen
                if (alumno.contacto) {
                    setData('alumno.contacto.email', alumno.contacto.email || '');
                    setData('alumno.contacto.telefono', alumno.contacto.telefono || '');
                }
                
                // Actualizar domicilio si existe
                if (alumno.domicilio) {
                    setData('alumno.domicilio.calle', alumno.domicilio.calle || '');
                    setData('alumno.domicilio.numero', alumno.domicilio.numero || '');
                    setData('alumno.domicilio.piso', alumno.domicilio.piso || '');
                    setData('alumno.domicilio.departamento', alumno.domicilio.departamento || '');
                    setData('alumno.domicilio.codigo_postal', alumno.domicilio.codigo_postal || '');
                    setData('alumno.domicilio.localidad_id', alumno.domicilio.localidad_id || '');
                    
                    // Actualizar localidades/departamentos si es necesario
                    if (alumno.domicilio.localidad?.departamento_id) {
                        setData('alumno.domicilio.departamento_id', alumno.domicilio.localidad.departamento_id);
                    }
                    if (alumno.domicilio.localidad?.departamento?.provincia_id) {
                        setData('alumno.domicilio.provincia_id', alumno.domicilio.localidad.departamento.provincia_id);
                    }
                }
                
                // Actualizar foto si existe
                if (alumno.foto) {
                    setData('alumno.foto', alumno.foto);
                }
                
            } else {
                setSearchError(data.mensaje || 'No se encontró un alumno con ese DNI');
            }
        } catch (error) {
            console.error('Error buscando alumno:', error);
            setSearchError('Error al buscar el alumno. Por favor, inténtelo nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleDniSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const dni = data.alumno.dni;
        if (dni) {
            buscarAlumnoPorDni(dni);
        }
    };

    return (
        <div className="bg-card p-6 rounded-lg shadow space-y-6">
            <div className='grid grid-cols-2 gap-4 mb-4'>
                 <h2 className="text-4xl font-bold text-foreground mb-4">Datos del Alumno</h2>
                 
            {/* Campo de búsqueda por DNI */}
            <div className="bg-muted p-4 rounded-lg border">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Buscar alumno por DNI
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.alumno.dni}
                                onChange={(e) => handleChange('dni', e.target.value)}
                                className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                                placeholder="Ingrese DNI para buscar alumno existente"
                                disabled={loading}
                            />
                            <button
                                onClick={handleDniSearch}
                                disabled={loading || !data.alumno.dni}
                                className={`px-4 py-2 rounded-md font-medium ${
                                    loading || !data.alumno.dni
                                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                                }`}
                            >
                                {loading ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>
                        {searchError && (
                            <p className="mt-2 text-sm text-destructive">{searchError}</p>
                        )}
                    </div>
                </div>
            </div>
            </div>
           


            {/* Datos Personales */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Datos Personales</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Apellido <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.apellido}
                            onChange={(e) => handleChange('apellido', e.target.value)}
                            className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                            placeholder="Ej: Pérez"
                        />
                        {errors['alumno.apellido'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.apellido']}</p>
                        )}
                    </div>

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Nombre <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.nombre}
                            onChange={(e) => handleChange('nombre', e.target.value)}
                            className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                            placeholder="Ej: Juan"
                        />
                        {errors['alumno.nombre'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.nombre']}</p>
                        )}
                    </div>

                    {/* DNI */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            DNI <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.dni}
                            onChange={(e) => handleChange('dni', e.target.value)}
                            className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                            placeholder="Ej: 12345678"
                            maxLength={20}
                        />
                        {errors['alumno.dni'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.dni']}</p>
                        )}
                    </div>

                    {/* Foto 4x4 */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Foto 4x4 <span className="text-destructive">*</span>
                        </label>

                        {/* Inputs ocultos */}
                        <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="user"
                            onChange={(e) => handleFileChange(e.target.files?.[0])}
                            className="hidden"
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files?.[0])}
                            className="hidden"
                        />

                        {/* Botones con iconos */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => cameraInputRef.current?.click()}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:ring-1 focus:ring-ring focus:ring-offset-2"
                            >
                                <Camera size={20} />
                                <span className="font-medium">Tomar Foto</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors focus:ring-1 focus:ring-ring focus:ring-offset-2"
                            >
                                <Upload size={20} />
                                <span className="font-medium">Subir Archivo</span>
                            </button>
                        </div>

                        {/* Preview de la imagen */}
                        {fotoPreview && (
                            <div className="mt-4 flex flex-col items-center">
                                <img
                                    src={fotoPreview}
                                    alt="Preview de foto 4x4"
                                    className="w-42 h-42 object-cover rounded-lg border border-border shadow-sm"
                                />
                                <p className="mt-2 text-sm text-foreground">
                                    {data.alumno.foto instanceof File ? data.alumno.foto.name : 'Imagen cargada'}
                                </p>
                            </div>
                        )}

                        {errors['alumno.foto'] && (
                            <p className="mt-2 text-sm text-destructive">{errors['alumno.foto']}</p>
                        )}
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Fecha de Nacimiento <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="date"
                            value={data.alumno.fecha_nacimiento}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const parsedDate = parseDateFromDDMMYYYY(inputValue);

                                if (inputValue === '') {
                                    // Si el input está vacío, limpiar la fecha en el estado
                                    handleChange('fecha_nacimiento', '');
                                } else if (parsedDate) {
                                    // Si se pudo parsear a un formato válido YYYY-MM-DD, actualizar el estado
                                    handleChange('fecha_nacimiento', parsedDate);
                                } else {
                                    // Si el formato no es válido, actualizar el estado con el valor crudo
                                    // Esto permitirá que el usuario vea su entrada y la corrija,
                                    // y la validación del backend/frontend debería manejar el error.
                                    handleChange('fecha_nacimiento', inputValue);
                                }
                            }}
                            className="w-full px-3 py-2 border input rounded-md text-foreground focus:ring-1 focus:ring-ring focus:border-ring"
                            placeholder="dd/mm/yyyy" // Añadir un placeholder para guiar al usuario
                            maxLength={10} // dd/mm/yyyy tiene 10 caracteres
                        />
                        {errors['alumno.fecha_nacimiento'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.fecha_nacimiento']}</p>
                        )}
                    </div>

                    {/* Nacionalidad */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Nacionalidad <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.nacionalidad}
                            onChange={(e) => handleChange('nacionalidad', e.target.value)}
                            className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                            placeholder="Ej: Argentina"
                        />
                        {errors['alumno.nacionalidad'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.nacionalidad']}</p>
                        )}
                    </div>

                    {/* Género */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Género <span className="text-destructive">*</span>
                        </label>
                        <select
                            value={data.alumno.genero}
                            onChange={(e) => handleChange('genero', e.target.value)}
                            className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring text-foreground focus:border-ring"
                        >
                            <option value="">Seleccione...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="X">Otro</option>
                        </select>
                        {errors['alumno.genero'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.genero']}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Domicilio del Alumno */}
            <div className="border-t pt-6">
                <DomicilioFields
                    prefix="alumno.domicilio"
                    domicilio={data.alumno.domicilio}
                    errors={errors}
                    setData={setData}
                    provincias={provincias}
                />
            </div>
             {/* Contacto del Alumno */}
             <div className="border-t pt-6">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
               <label className="block text-sm font-medium text-foreground mb-1">
                    Email<span className="text-destructive">*</span>
                </label>
                <label className="block text-sm font-medium text-foreground mb-1">
                    Teléfono<span className="text-destructive">*</span>
                </label>
                <input
                            type="email"
                            value={data.alumno.contacto?.email || ''}
                            onChange={(e) => handleChange('contacto.email', e.target.value)}
                            className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                            placeholder="Ej: ejemplo@correo.com"
                        />
                        {errors['alumno.contacto.email'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.contacto.email']}</p>
                        )}
                
                <input
                            type="tel"
                            value={data.alumno.contacto?.telefono || ''}
                            onChange={(e) => handleChange('contacto.telefono', e.target.value)}
                            className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                            placeholder="Ej: 1123456789"
                        />
                        {errors['alumno.contacto.telefono'] && (
                            <p className="mt-1 text-sm text-destructive">{errors['alumno.contacto.telefono']}</p>
                        )}
            </div>
            </div>
        </div>
    );
}
