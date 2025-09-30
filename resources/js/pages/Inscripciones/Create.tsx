import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Tab } from '@headlessui/react';
import { InscripcionFormData, InscripcionCreateProps } from '@/types';
import AlumnoForm from '@/Components/Inscripciones/AlumnoForm';
import TutoresForm from '@/Components/Inscripciones/TutoresForm';
import InscripcionForm from '@/Components/Inscripciones/InscripcionForm';
import FichaSaludForm from '@/Components/Inscripciones/FichaSaludForm';

export default function Create({ 
    cursos = [], 
    niveles = [], 
    provincias = [], 
    departamentos = [], 
    localidades = [] 
}: InscripcionCreateProps) {
    
    const { data, setData, post, processing, errors } = useForm<InscripcionFormData>({
        alumno: {
            id: null,
            apellido: '',
            nombre: '',
            dni: '',
            fecha_nacimiento: '',
            nacionalidad: 'Argentina',
            genero: '',
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
        },
        tutores: [
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
        ],
        inscripcion: {
            fecha: new Date().toISOString().split('T')[0],
            ciclo_lectivo: new Date().getFullYear(),
            curso_id: '',
            nivel_id: '',
            repite: false,
            materias_pendientes: '',
            promedio: null,
            puntaje: null,
        },
        escuela_procedencia: {
            cue: '',
            nombre: '',
            localidad_id: '',
        },
        ficha_salud: {
            enfermedad_cronica: '',
            alergia: '',
            discapacidad: '',
            medicamentos: '',
            vacunacion_completa: true,
            observaciones: '',
        }
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('inscripciones.store'));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Nueva Inscripción</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Complete todos los datos requeridos para inscribir al alumno
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Tab.Group>
                        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mb-6">
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                                    ${selected
                                        ? 'bg-white text-blue-700 shadow'
                                        : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-800'
                                    }`
                                }
                            >
                                Alumno
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                                    ${selected
                                        ? 'bg-white text-blue-700 shadow'
                                        : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-800'
                                    }`
                                }
                            >
                                Tutores
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                                    ${selected
                                        ? 'bg-white text-blue-700 shadow'
                                        : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-800'
                                    }`
                                }
                            >
                                Inscripción
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                                    ${selected
                                        ? 'bg-white text-blue-700 shadow'
                                        : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-800'
                                    }`
                                }
                            >
                                Ficha de Salud
                            </Tab>
                        </Tab.List>

                        <Tab.Panels>
                            <Tab.Panel>
                                <AlumnoForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    provincias={provincias}
                                    departamentos={departamentos}
                                    localidades={localidades}
                                />
                            </Tab.Panel>

                            <Tab.Panel>
                                <TutoresForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    provincias={provincias}
                                    departamentos={departamentos}
                                    localidades={localidades}
                                />
                            </Tab.Panel>

                            <Tab.Panel>
                                <InscripcionForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    cursos={cursos}
                                    niveles={niveles}
                                />
                            </Tab.Panel>

                            <Tab.Panel>
                                <FichaSaludForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Botones de Acción */}
                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Guardando...' : 'Guardar Inscripción'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}