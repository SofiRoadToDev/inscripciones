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


    return (
        <div className="bg-secondary p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Datos del Alumno</h2>

            {/* Datos Personales */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Datos Personales</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Apellido <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.apellido}
                            onChange={(e) => handleChange('apellido', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Pérez"
                        />
                        {errors['alumno.apellido'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.apellido']}</p>
                        )}
                    </div>

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.nombre}
                            onChange={(e) => handleChange('nombre', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Juan"
                        />
                        {errors['alumno.nombre'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.nombre']}</p>
                        )}
                    </div>

                    {/* DNI */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            DNI <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.dni}
                            onChange={(e) => handleChange('dni', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 12345678"
                            maxLength={20}
                        />
                        {errors['alumno.dni'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.dni']}</p>
                        )}
                    </div>

                    {/* Foto 4x4 */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Foto 4x4 <span className="text-red-500">*</span>
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
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Camera size={20} />
                                <span className="font-medium">Tomar Foto</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
                                    className="w-42 h-42 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                                />
                                <p className="mt-2 text-sm text-foreground">
                                    {data.alumno.foto instanceof File ? data.alumno.foto.name : 'Imagen cargada'}
                                </p>
                            </div>
                        )}

                        {errors['alumno.foto'] && (
                            <p className="mt-2 text-sm text-red-600">{errors['alumno.foto']}</p>
                        )}
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Fecha de Nacimiento <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text" // Cambiado de "date" a "text" para permitir el formato dd/mm/yyyy
                            value={formatDateToDDMMYYYY(data.alumno.fecha_nacimiento)}
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
                                    // Esto permitirá que el usuario vea su entrada y la correja,
                                    // y la validación del backend/frontend debería manejar el error.
                                    handleChange('fecha_nacimiento', inputValue);
                                }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-foreground focus:ring-blue-500 focus:border-blue-500"
                            placeholder="dd/mm/yyyy" // Añadir un placeholder para guiar al usuario
                            // El atributo 'max' no es aplicable para type="text" y se ha eliminado.
                            // Si necesitas validación de fecha máxima, deberás implementarla manualmente.
                        />
                        {errors['alumno.fecha_nacimiento'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.fecha_nacimiento']}</p>
                        )}
                    </div>

                    {/* Nacionalidad */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Nacionalidad <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alumno.nacionalidad}
                            onChange={(e) => handleChange('nacionalidad', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Argentina"
                        />
                        {errors['alumno.nacionalidad'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.nacionalidad']}</p>
                        )}
                    </div>

                    {/* Género */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Género <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.alumno.genero}
                            onChange={(e) => handleChange('genero', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 text-foreground focus:border-blue-500"
                        >
                            <option value="">Seleccione...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="X">Otro</option>
                        </select>
                        {errors['alumno.genero'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.genero']}</p>
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
                    departamentos={departamentos}
                    localidades={localidades}
                />
            </div>
             {/* Contacto del Alumno */}
             <div className="border-t pt-6">
               <label className="block text-sm font-medium text-foreground mb-1">
                    Email<span className="text-red-500">*</span>
                </label>
                <input
                            type="email"
                            value={data.alumno.contacto.email}
                            onChange={(e) => handleChange('contacto.email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Argentina"
                        />
                        {errors['alumno.email'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.contacto.email']}</p>
                        )}
            </div>
        </div>
    );
}
