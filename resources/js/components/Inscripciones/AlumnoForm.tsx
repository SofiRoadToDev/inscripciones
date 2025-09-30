import { FormSectionProps, Provincia, Departamento, Localidad } from '@/types';
import DomicilioFields from './DomicilioFields';

interface AlumnoFormProps extends FormSectionProps {
    provincias?: Provincia[];
    departamentos?: Departamento[];
    localidades?: Localidad[];
}

export default function AlumnoForm({
    data,
    setData,
    errors,
    provincias = [],
    departamentos = [],
    localidades = [],
}: AlumnoFormProps) {
    
    const handleChange = (field: string, value: string) => {
        setData(`alumno.${field}`, value);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Datos del Alumno</h2>

            {/* Datos Personales */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Datos Personales</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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

                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={data.alumno.fecha_nacimiento}
                            onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            max={new Date().toISOString().split('T')[0]}
                        />
                        {errors['alumno.fecha_nacimiento'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['alumno.fecha_nacimiento']}</p>
                        )}
                    </div>

                    {/* Nacionalidad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Género <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.alumno.genero}
                            onChange={(e) => handleChange('genero', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
        </div>
    );
}