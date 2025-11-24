import { FormSectionProps, Provincia, Departamento, Localidad } from '@/types';
import { DomicilioFields } from './DomicilioFields';
import { PlusCircle, Trash2 } from 'lucide-react';

interface TutoresFormProps extends FormSectionProps {
    provincias?: Provincia[];
}

export const TutoresForm = function TutoresForm({
    data,
    setData,
    errors,
    provincias = [],
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
        <div className="bg-card p-6 rounded-lg shadow space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground">Tutores</h2>
                <button
                    type="button"
                    onClick={agregarTutor}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    <PlusCircle size={20} />
                    Agregar Tutor
                </button>
            </div>

            {errors['tutores'] && (
                <p className="text-sm text-destructive">{errors['tutores']}</p>
            )}

            {data.tutores.map((tutor, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-4 relative">
                    {data.tutores.length > 1 && (
                        <button
                            type="button"
                            onClick={() => eliminarTutor(index)}
                            className="absolute top-2 right-2 text-destructive hover:text-destructive/80"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}

                    <h3 className="text-lg font-semibold text-foreground">
                        Tutor {index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Apellido */}
                        <div>
                            <label htmlFor={`apellido_${index}`} className="block text-sm font-medium text-foreground mb-1">
                                Apellido <span className="text-destructive">*</span>
                            </label>
                            <input
                                id={`apellido_${index}`}
                                type="text"
                                value={tutor.apellido}
                                onChange={(e) => handleChange(index, 'apellido', e.target.value)}
                                className="w-full px-3 py-2 border input rounded-md"
                            />
                            {errors[`tutores.${index}.apellido`] && (
                                <p className="mt-1 text-sm text-destructive">{errors[`tutores.${index}.apellido`]}</p>
                            )}
                        </div>

                        {/* Nombre */}
                        <div>
                            <label htmlFor={`nombre_${index}`} className="block text-sm font-medium text-foreground mb-1">
                                Nombre <span className="text-destructive">*</span>
                            </label>
                            <input
                                id={`nombre_${index}`}
                                type="text"
                                value={tutor.nombre}
                                onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                                className="w-full px-3 py-2 border input rounded-md"
                            />
                            {errors[`tutores.${index}.nombre`] && (
                                <p className="mt-1 text-sm text-destructive">{errors[`tutores.${index}.nombre`]}</p>
                            )}
                        </div>

                        {/* DNI */}
                        <div>
                            <label htmlFor={`dni_${index}`} className="block text-sm font-medium text-foreground mb-1">
                                DNI <span className="text-destructive">*</span>
                            </label>
                            <input
                                id={`dni_${index}`}
                                type="text"
                                value={tutor.dni}
                                onChange={(e) => handleChange(index, 'dni', e.target.value)}
                                className="w-full px-3 py-2 border input rounded-md"
                                maxLength={20}
                            />
                            {errors[`tutores.${index}.dni`] && (
                                <p className="mt-1 text-sm text-destructive">{errors[`tutores.${index}.dni`]}</p>
                            )}
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label htmlFor={`telefono_${index}`} className="block text-sm font-medium text-foreground mb-1">
                                Teléfono <span className="text-destructive">*</span>
                            </label>
                            <input
                                id={`telefono_${index}`}
                                type="text"
                                value={tutor.telefono}
                                onChange={(e) => handleChange(index, 'telefono', e.target.value)}
                                className="w-full px-3 py-2 border input rounded-md"
                            />
                            {errors[`tutores.${index}.telefono`] && (
                                <p className="mt-1 text-sm text-destructive">{errors[`tutores.${index}.telefono`]}</p>
                            )}
                        </div>

                        {/* Estudios */}
                        <div>
                            <label htmlFor={`estudios_${index}`} className="block text-sm font-medium text-foreground mb-1">
                                Estudios
                            </label>
                            <input
                                id={`estudios_${index}`}
                                type="text"
                                value={tutor.estudios}
                                onChange={(e) => handleChange(index, 'estudios', e.target.value)}
                                className="w-full px-3 py-2 border input rounded-md"
                                placeholder="Ej: Universitario"
                            />
                        </div>

                        {/* Ocupación */}
                        <div>
                            <label htmlFor={`ocupacion_${index}`} className="block text-sm font-medium text-foreground mb-1">
                                Ocupación
                            </label>
                            <input
                                id={`ocupacion_${index}`}
                                type="text"
                                value={tutor.ocupacion}
                                onChange={(e) => handleChange(index, 'ocupacion', e.target.value)}
                                className="w-full px-3 py-2 border input rounded-md"
                                placeholder="Ej: Docente"
                            />
                        </div>
                    </div>

                    {/* Domicilio del Tutor */}
                    <div className="border-t border-border pt-4 mt-4">
                        <DomicilioFields
                            prefix={`tutores.${index}.domicilio`}
                            domicilio={tutor.domicilio}
                            errors={errors}
                            setData={setData}
                            provincias={provincias}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
