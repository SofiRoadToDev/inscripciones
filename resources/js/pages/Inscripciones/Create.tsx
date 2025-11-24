import { useForm } from '@inertiajs/react';
import { FormEvent, useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { InscripcionFormData, InscripcionCreateProps } from '@/types';
import { AlumnoForm } from '@/components/Inscripciones/AlumnoForm';
import { TutoresForm } from '@/components/Inscripciones/TutoresForm';
import { InscripcionForm } from '@/components/Inscripciones/InscripcionForm';
import { FichaSaludForm } from '@/components/Inscripciones/FichaSaludForm';
import Hero from '@/components/Inscripciones/partials/Hero';
import PublicLayout from '@/layouts/public/PublicLayout';


export default function Create({
    niveles = [],
    provincias = []
}: InscripcionCreateProps) {

    const [selectedTab, setSelectedTab] = useState(0);
    const [showError, setShowError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
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
            contacto: {
                email: '',
                telefono: ''
            },
            domicilio: {
                id: null,
                calle: '',
                numero: '',
                piso: '',
                depto: '',
                casa: '',
                lote: '',
                barrio: '',
                manzana: '',
                block: '',
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
                    casa: '',
                    lote: '',
                    barrio: '',
                    manzana: '',
                    block: '',
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
        const validations = {
            alumno: !data.alumno.apellido || !data.alumno.nombre || !data.alumno.dni || !data.alumno.fecha_nacimiento || !data.alumno.nacionalidad || !data.alumno.genero,
            domicilioAlumno: !data.alumno.domicilio.calle || !data.alumno.domicilio.numero || !data.alumno.domicilio.provincia_id || !data.alumno.domicilio.departamento_id || !data.alumno.domicilio.localidad_id,
            tutores: data.tutores.length === 0,
            tutorDetails: data.tutores.some(tutor => !tutor.apellido || !tutor.nombre || !tutor.dni || !tutor.telefono),
            tutorDomicilio: data.tutores.some(tutor => !tutor.domicilio.calle || !tutor.domicilio.numero || !tutor.domicilio.provincia_id || !tutor.domicilio.departamento_id || !tutor.domicilio.localidad_id),
            inscripcion: !data.inscripcion.fecha || !data.inscripcion.ciclo_lectivo || !data.inscripcion.curso_id || !data.inscripcion.nivel_id,
            escuela: !data.inscripcion.escuela_procedencia && (!data.escuela_procedencia.nombre || (data.escuela_procedencia.cue && !data.escuela_procedencia.localidad_id))
        };

        console.log('Validation results:', validations);

        return Object.values(validations).every(result => !result);
    };

    useEffect(() => {
        setIsFormValid(validateRequiredFields());
    }, [data]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            setShowError(true);
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
                                    {showError && (
                                        <p className="text-red-500 text-sm">
                                            Por favor, complete todos los campos requeridos antes de enviar el formulario.
                                        </p>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing || !isFormValid}
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
