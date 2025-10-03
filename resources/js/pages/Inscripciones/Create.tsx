import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Tab } from '@headlessui/react';
import { InscripcionFormData, InscripcionCreateProps } from '@/types';
import {AlumnoForm} from '@/components/Inscripciones/AlumnoForm';
import {TutoresForm} from '@/components/Inscripciones/TutoresForm';
import {InscripcionForm} from '@/components/Inscripciones/InscripcionForm';
import {FichaSaludForm} from '@/components/Inscripciones/FichaSaludForm';
import Hero from '@/components/Inscripciones/partials/Hero';
import PublicLayout from '@/layouts/public/PublicLayout';


export default function Create({
    niveles = [],
    provincias = []
}: InscripcionCreateProps) {

    const [selectedTab, setSelectedTab] = useState(0);
    const { data, setData, post, processing, errors } = useForm<InscripcionFormData>({
        alumno: {
            id: null,
            apellido: '',
            nombre: '',
            dni: '',
            fecha_nacimiento: '',
            nacionalidad: 'Argentina',
            genero: '',
            foto: null,
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

    const validateRequiredFields = (): boolean => {
        // Validar Alumno
        if (!data.alumno.apellido || !data.alumno.nombre || !data.alumno.dni ||
            !data.alumno.fecha_nacimiento || !data.alumno.nacionalidad || !data.alumno.genero || !data.alumno.foto) {
            return false;
        }

        // Validar Domicilio del Alumno
        if (!data.alumno.domicilio.calle || !data.alumno.domicilio.numero ||
            !data.alumno.domicilio.provincia_id || !data.alumno.domicilio.departamento_id ||
            !data.alumno.domicilio.localidad_id) {
            return false;
        }

        // Validar Tutores (al menos uno con datos completos)
        if (data.tutores.length === 0) {
            return false;
        }

        for (const tutor of data.tutores) {
            if (!tutor.apellido || !tutor.nombre || !tutor.dni || !tutor.telefono) {
                return false;
            }

            // Validar Domicilio del Tutor
            if (!tutor.domicilio.calle || !tutor.domicilio.numero ||
                !tutor.domicilio.provincia_id || !tutor.domicilio.departamento_id ||
                !tutor.domicilio.localidad_id) {
                return false;
            }
        }

        // Validar Inscripción
        if (!data.inscripcion.fecha || !data.inscripcion.ciclo_lectivo ||
            !data.inscripcion.curso_id || !data.inscripcion.nivel_id) {
            return false;
        }

        // Validar Escuela de Procedencia
        // Si se ha seleccionado una escuela existente (tiene ID), usamos ese ID
        // Si no se ha seleccionado una escuela existente, debe haber al menos el nombre para crearla
        if (!data.inscripcion.escuela_procedencia) {
            // Si no se ha encontrado una escuela existente, se requiere al menos el nombre
            if (!data.escuela_procedencia.nombre) {
                return false;
            }
            // Opcionalmente, si se proporciona CUE, también debe haber localidad_id
            if (data.escuela_procedencia.cue && !data.escuela_procedencia.localidad_id) {
                return false;
            }
        }
        // Si se ha encontrado una escuela existente (data.inscripcion.escuela_procedencia tiene un valor),
        // no se necesitan los campos individuales de escuela_procedencia

        return true;
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateRequiredFields()) {
            alert('Por favor, complete todos los campos requeridos antes de enviar el formulario.');
            return;
        }
        post('/inscripciones');
    };

    return (
        <>
        <PublicLayout>
        <div className="min-h-screen bg-background  py-8 " >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-foreground">Nueva Inscripción</h1>
                    <p className="mt-2 text-sm text-foreground">
                        Complete todos los datos requeridos para inscribir al alumno
                    </p>
                </div>

                <form onSubmit={submit} className='bg-background'>
                    <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mb-6">
                            <Tab
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium  leading-5
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
                                />
                            </Tab.Panel>

                            <Tab.Panel>
                                <TutoresForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    provincias={provincias}
                                />
                            </Tab.Panel>

                            <Tab.Panel>
                                <InscripcionForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
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

                    {/* Botones de Acción - Solo en la última tab */}
                    {selectedTab === 3 && (
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
                                disabled={processing || !validateRequiredFields()}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Guardando...' : 'Guardar Inscripción'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
       </PublicLayout>
        </>
    );
}
