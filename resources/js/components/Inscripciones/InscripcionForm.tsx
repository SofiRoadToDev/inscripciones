import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FormSectionProps, Curso, Nivel } from '@/types';

interface InscripcionFormProps extends FormSectionProps {
    niveles?: Nivel[];
}

export const InscripcionForm = function InscripcionForm({
    data,
    setData,
    errors,
    niveles = [],
}: InscripcionFormProps) {

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loadingCursos, setLoadingCursos] = useState(false);
    const lastMatchedEscuelaNombreRef = useRef<string>('');
    const fetchCounterRef = useRef(0);


    useEffect(() => {
        if (data.inscripcion.nivel_id) {
            setLoadingCursos(true);
            axios.get(`/api/cursos/${data.inscripcion.nivel_id}`)
                .then(response => {
                    console.log(response.data);
                    setCursos(response.data);
                })
                .catch(error => console.error('Error fetching cursos:', error))
                .finally(() => setLoadingCursos(false));
        } else {
            setCursos([]);
        }
    }, [data.inscripcion.nivel_id]);

    const handleChange = (field: string, value: string | boolean | number) => {
        setData(`inscripcion.${field}`, value);

        // Si cambia el nivel, reseteamos el curso seleccionado
        if (field === 'nivel_id') {
            setCursos([]);
            setData('inscripcion.curso_id', '');
        }
    };

    const handleEscuelaNombreChange = (value: string) => {
        lastMatchedEscuelaNombreRef.current = '';
        setData('inscripcion.escuela_procedencia', '');
        setData('escuela_procedencia.cue', '');
        setData('escuela_procedencia.localidad_id', '');
        setData('escuela_procedencia.nombre', value);
    };

    useEffect(() => {
        const nombre = (data.escuela_procedencia.nombre || '').trim();

        if (!nombre) {
            lastMatchedEscuelaNombreRef.current = '';
            setData('inscripcion.escuela_procedencia', '');
            setData('escuela_procedencia.cue', '');
            setData('escuela_procedencia.localidad_id', '');
            return;
        }

        if (nombre.length < 3) {
            return;
        }

        if (nombre === lastMatchedEscuelaNombreRef.current) {
            return;
        }

        const requestId = ++fetchCounterRef.current;
        let isActive = true;

        axios
            .get(`/api/escuelas-procedencia/${encodeURIComponent(nombre)}`)
            .then((response) => {
                if (!isActive || requestId !== fetchCounterRef.current) {
                    return;
                }

                const payload = response.data;
                const escuelas = Array.isArray(payload) ? payload : [];

                if (escuelas.length > 0) {
                    const escuela = escuelas[0];
                    lastMatchedEscuelaNombreRef.current = escuela.nombre ?? nombre;
                    setData('inscripcion.escuela_procedencia', escuela.id ?? '');
                    setData('escuela_procedencia.cue', escuela.cue ?? '');
                    setData('escuela_procedencia.nombre', escuela.nombre ?? nombre);
                    setData('escuela_procedencia.localidad_id', escuela.localidad_id ?? '');
                } else {
                    lastMatchedEscuelaNombreRef.current = '';
                    setData('inscripcion.escuela_procedencia', '');
                    setData('escuela_procedencia.cue', '');
                    setData('escuela_procedencia.localidad_id', '');
                }
            })
            .catch(() => {
                if (!isActive || requestId !== fetchCounterRef.current) {
                    return;
                }

                lastMatchedEscuelaNombreRef.current = '';
                setData('inscripcion.escuela_procedencia', '');
                setData('escuela_procedencia.cue', '');
                setData('escuela_procedencia.localidad_id', '');
            });

        return () => {
            isActive = false;
        };
    }, [data.escuela_procedencia.nombre, setData]);

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Datos de Inscripción</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fecha */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Inscripción <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={data.inscripcion.fecha}
                        onChange={(e) => handleChange('fecha', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors['inscripcion.fecha'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['inscripcion.fecha']}</p>
                    )}
                </div>

                {/* Ciclo Lectivo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciclo Lectivo <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={data.inscripcion.ciclo_lectivo}
                        onChange={(e) => handleChange('ciclo_lectivo', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        min="2020"
                        max="2100"
                    />
                    {errors['inscripcion.ciclo_lectivo'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['inscripcion.ciclo_lectivo']}</p>
                    )}
                </div>

                {/* Nivel */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nivel <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={data.inscripcion.nivel_id}
                        onChange={(e) => handleChange('nivel_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Seleccione...</option>
                        {niveles.map((nivel) => (
                            <option key={nivel.id} value={nivel.id}>
                                {nivel.codigo} - {nivel.ciclo}
                            </option>
                        ))}
                    </select>
                    {errors['inscripcion.nivel_id'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['inscripcion.nivel_id']}</p>
                    )}
                </div>

                {/* Curso */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Curso <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={data.inscripcion.curso_id}
                        onChange={(e) => handleChange('curso_id', e.target.value)}
                        disabled={!data.inscripcion.nivel_id || cursos.length === 0}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                        <option value="">
                            {loadingCursos ? 'Cargando...' : 'Seleccione...'}
                        </option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                                {curso.codigo} - {curso.nivel} {curso.turno} - División {curso.division}
                            </option>
                        ))}
                    </select>
                    {errors['inscripcion.curso_id'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['inscripcion.curso_id']}</p>
                    )}
                </div>

                {/* Repite */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="repite"
                        checked={data.inscripcion.repite}
                        onChange={(e) => handleChange('repite', e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="repite" className="ml-2 block text-sm text-gray-700">
                        ¿Repite el año?
                    </label>
                </div>

                {/* Materias Pendientes */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Materias Pendientes
                    </label>
                    <textarea
                        value={data.inscripcion.materias_pendientes}
                        onChange={(e) => handleChange('materias_pendientes', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Ej: Matemática, Historia"
                    />
                </div>
            </div>

            {/* Escuela de Procedencia */}
            <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Escuela de Procedencia</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CUE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CUE <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.escuela_procedencia.cue}
                            onChange={(e) => setData('escuela_procedencia.cue', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 660123400"
                        />
                        {errors['escuela_procedencia.cue'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['escuela_procedencia.cue']}</p>
                        )}
                    </div>

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.escuela_procedencia.nombre}
                            onChange={(e) => handleEscuelaNombreChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Escuela Primaria N° 1"
                        />
                        {errors['escuela_procedencia.nombre'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['escuela_procedencia.nombre']}</p>
                        )}
                    </div>

                    {/* Localidad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Localidad <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={data.escuela_procedencia.localidad_id}
                            onChange={(e) => setData('escuela_procedencia.localidad_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="ID de localidad"
                        />
                        {errors['escuela_procedencia.localidad_id'] && (
                            <p className="mt-1 text-sm text-red-600">{errors['escuela_procedencia.localidad_id']}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

