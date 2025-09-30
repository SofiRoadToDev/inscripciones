import { InscripcionShowProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function Show({ inscripcion }: InscripcionShowProps) {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Inscripción #{inscripcion.id}</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Ciclo Lectivo {inscripcion.ciclo_lectivo}
                        </p>
                    </div>
                    <Link
                        href={route('inscripciones.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Nueva Inscripción
                    </Link>
                </div>

                {/* Datos del Alumno */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Datos del Alumno</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Nombre Completo</p>
                            <p className="font-medium">{inscripcion.alumno?.apellido}, {inscripcion.alumno?.nombre}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">DNI</p>
                            <p className="font-medium">{inscripcion.alumno?.dni}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                            <p className="font-medium">{inscripcion.alumno?.fecha_nacimiento}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Nacionalidad</p>
                            <p className="font-medium">{inscripcion.alumno?.nacionalidad}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Género</p>
                            <p className="font-medium">
                                {inscripcion.alumno?.genero === 'M' ? 'Masculino' : 
                                 inscripcion.alumno?.genero === 'F' ? 'Femenino' : 'Otro'}
                            </p>
                        </div>
                    </div>

                    {/* Domicilio del Alumno */}
                    {inscripcion.alumno?.domicilio && (
                        <div className="mt-6 pt-6 border-t">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Domicilio</h3>
                            <p className="text-gray-800">
                                {inscripcion.alumno.domicilio.calle} {inscripcion.alumno.domicilio.numero}
                                {inscripcion.alumno.domicilio.piso && `, Piso ${inscripcion.alumno.domicilio.piso}`}
                                {inscripcion.alumno.domicilio.depto && `, Depto ${inscripcion.alumno.domicilio.depto}`}
                                <br />
                                {inscripcion.alumno.domicilio.localidad?.nombre}, 
                                {inscripcion.alumno.domicilio.departamento?.nombre}, 
                                {inscripcion.alumno.domicilio.provincia?.nombre}
                            </p>
                        </div>
                    )}
                </div>

                {/* Tutores */}
                {inscripcion.alumno?.tutores && inscripcion.alumno.tutores.length > 0 && (
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Tutores</h2>
                        {inscripcion.alumno.tutores.map((tutor, index) => (
                            <div key={tutor.id} className={`${index > 0 ? 'mt-4 pt-4 border-t' : ''}`}>
                                <h3 className="font-semibold text-gray-700 mb-2">Tutor {index + 1}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Nombre Completo</p>
                                        <p className="font-medium">{tutor.apellido}, {tutor.nombre}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">DNI</p>
                                        <p className="font-medium">{tutor.dni}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Teléfono</p>
                                        <p className="font-medium">{tutor.telefono}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Ocupación</p>
                                        <p className="font-medium">{tutor.ocupacion || 'No especificado'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Datos de Inscripción */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Datos de Inscripción</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Fecha de Inscripción</p>
                            <p className="font-medium">{inscripcion.fecha}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Ciclo Lectivo</p>
                            <p className="font-medium">{inscripcion.ciclo_lectivo}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Nivel</p>
                            <p className="font-medium">
                                {inscripcion.nivel?.codigo} - {inscripcion.nivel?.ciclo}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Curso</p>
                            <p className="font-medium">
                                {inscripcion.curso?.codigo} - {inscripcion.curso?.nivel} {inscripcion.curso?.turno}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Repite</p>
                            <p className="font-medium">{inscripcion.repite ? 'Sí' : 'No'}</p>
                        </div>
                        {inscripcion.promedio && (
                            <div>
                                <p className="text-sm text-gray-600">Promedio</p>
                                <p className="font-medium">{inscripcion.promedio}</p>
                            </div>
                        )}
                        {inscripcion.materias_pendientes && (
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-600">Materias Pendientes</p>
                                <p className="font-medium">{inscripcion.materias_pendientes}</p>
                            </div>
                        )}
                        {inscripcion.escuela_procedencia && (
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-600">Escuela de Procedencia</p>
                                <p className="font-medium">{inscripcion.escuela_procedencia}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ficha de Salud */}
                {inscripcion.ficha_salud && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Ficha de Salud</h2>
                        <div className="space-y-3">
                            {inscripcion.ficha_salud.enfermedad_cronica && (
                                <div>
                                    <p className="text-sm text-gray-600">Enfermedad Crónica</p>
                                    <p className="font-medium">{inscripcion.ficha_salud.enfermedad_cronica}</p>
                                </div>
                            )}
                            {inscripcion.ficha_salud.alergia && (
                                <div>
                                    <p className="text-sm text-gray-600">Alergias</p>
                                    <p className="font-medium">{inscripcion.ficha_salud.alergia}</p>
                                </div>
                            )}
                            {inscripcion.ficha_salud.discapacidad && (
                                <div>
                                    <p className="text-sm text-gray-600">Discapacidad</p>
                                    <p className="font-medium">{inscripcion.ficha_salud.discapacidad}</p>
                                </div>
                            )}
                            {inscripcion.ficha_salud.medicamentos && (
                                <div>
                                    <p className="text-sm text-gray-600">Medicamentos</p>
                                    <p className="font-medium">{inscripcion.ficha_salud.medicamentos}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-600">Vacunación Completa</p>
                                <p className="font-medium">
                                    {inscripcion.ficha_salud.vacunacion_completa ? 'Sí' : 'No'}
                                </p>
                            </div>
                            {inscripcion.ficha_salud.observaciones && (
                                <div>
                                    <p className="text-sm text-gray-600">Observaciones</p>
                                    <p className="font-medium">{inscripcion.ficha_salud.observaciones}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}