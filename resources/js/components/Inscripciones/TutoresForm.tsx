import { FormSectionProps, Provincia, Departamento, Localidad } from '@/types';
import { DomicilioFields } from './DomicilioFields';
import { PlusCircle, Trash2 } from 'lucide-react';

interface TutoresFormProps extends FormSectionProps {
    provincias?: Provincia[];
    departamentos?: Departamento[];
    localidades?: Localidad[];
}

export const TutoresForm =function TutoresForm({
    data,
    setData,
    errors,
    provincias = [],
    departamentos = [],
    localidades = [],
}: TutoresFormProps) {

    const agregarTutor = () => {
        setData('tutores', [
            ...data.tutores,
            {
                id: null,
                apellido: '',
                nombre: '',
                dni: '',
                estudios: '',
                ocupacion: '',
                telefono: '',
                domicilio: {
                    id: null,
                    calle: '',
                    numero: '',
                    piso: '',
                    depto: '',
                    provincia_id: '',
                    departamento_id: '',
                    localidad_id: '',
                }
            }
        ]);
    };

    const eliminarTutor = (index: number) => {
        const nuevosTutores = data.tutores.filter((_, i) => i !== index);
        setData('tutores', nuevosTutores);
    };

    const handleChange = (index: number, field: string, value: string) => {
        const nuevosTutores = [...data.tutores];
        nuevosTutores[index] = {
            ...nuevosTutores[index],
            [field]: value,
        };
        setData('tutores', nuevosTutores);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Tutores</h2>
                <button
                    type="button"
                    onClick={agregarTutor}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    <PlusCircle size={20} />
                    Agregar Tutor
                </button>
            </div>

            {errors['tutores'] && (
                <p className="text-sm text-red-600">{errors['tutores']}</p>
            )}

            {data.tutores.map((tutor, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                    {data.tutores.length > 1 && (
                        <button
                            type="button"
                            onClick={() => eliminarTutor(index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}

                    <h3 className="text-lg font-semibold text-gray-700">
                        Tutor {index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Apellido */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Apellido <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={tutor.apellido}
                                onChange={(e) => handleChange(index, 'apellido', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors[`tutores.${index}.apellido`] && (
                                <p className="mt-1 text-sm text-red-600">{errors[`tutores.${index}.apellido`]}</p>
                            )}
                        </div>

                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={tutor.nombre}
                                onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors[`tutores.${index}.nombre`] && (
                                <p className="mt-1 text-sm text-red-600">{errors[`tutores.${index}.nombre`]}</p>
                            )}
                        </div>

                        {/* DNI */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                DNI <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={tutor.dni}
                                onChange={(e) => handleChange(index, 'dni', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                maxLength={20}
                            />
                            {errors[`tutores.${index}.dni`] && (
                                <p className="mt-1 text-sm text-red-600">{errors[`tutores.${index}.dni`]}</p>
                            )}
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Teléfono <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={tutor.telefono}
                                onChange={(e) => handleChange(index, 'telefono', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors[`tutores.${index}.telefono`] && (
                                <p className="mt-1 text-sm text-red-600">{errors[`tutores.${index}.telefono`]}</p>
                            )}
                        </div>

                        {/* Estudios */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estudios
                            </label>
                            <input
                                type="text"
                                value={tutor.estudios}
                                onChange={(e) => handleChange(index, 'estudios', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Ej: Universitario"
                            />
                        </div>

                        {/* Ocupación */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ocupación
                            </label>
                            <input
                                type="text"
                                value={tutor.ocupacion}
                                onChange={(e) => handleChange(index, 'ocupacion', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Ej: Docente"
                            />
                        </div>
                    </div>

                    {/* Domicilio del Tutor */}
                    <div className="border-t pt-4 mt-4">
                        <DomicilioFields
                            prefix={`tutores.${index}.domicilio`}
                            domicilio={tutor.domicilio}
                            errors={errors}
                            setData={setData}
                            provincias={provincias}
                            departamentos={departamentos}
                            localidades={localidades}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
