<?php

namespace App\Services;

use App\Repositories\InscripcionRepository;
use App\Models\Inscripcion;
use App\Models\Alumno;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class InscripcionService
{
    /**
     * Constructor con inyección del repositorio y servicio de archivos
     */
    public function __construct(
        private InscripcionRepository $repository,
        private FileUploadService $fileUploadService
    ) {}

    /**
     * Crear inscripción completa con todas sus relaciones
     * 
     * @param array $datos Datos validados del formulario
     * @return Inscripcion
     * @throws \Exception
     */
    public function crearInscripcion(array $datos): Inscripcion
    {
        return DB::transaction(function () use ($datos) {
            
            // 1. Procesar Alumno y su Domicilio
            $alumno = $this->procesarAlumno($datos['alumno']);
            
            // 2. Procesar Tutores con sus Domicilios
            $this->procesarTutores($alumno, $datos['tutores']);
            
            // 3. Procesar Escuela de Procedencia
            // Si se proporciona un ID de escuela existente, usarla directamente
            // De lo contrario, buscar o crear una nueva escuela
            if (!empty($datos['inscripcion']['escuela_procedencia'])) {
                // Se ha seleccionado una escuela existente por ID
                $escuela = \App\Models\EscuelaProcedencia::find($datos['inscripcion']['escuela_procedencia']);
                if (!$escuela) {
                    throw new \Exception('La escuela de procedencia seleccionada no existe');
                }
            } else {
                // No se ha seleccionado una escuela existente, buscar o crear con los datos proporcionados
                $escuela = $this->repository->buscarOCrearEscuelaProcedencia(
                    $datos['escuela_procedencia']
                );
            }
            
            // 4. Crear Inscripción
            $inscripcion = $this->repository->crearInscripcion($alumno, [
                'fecha' => $datos['inscripcion']['fecha'],
                'ciclo_lectivo' => $datos['inscripcion']['ciclo_lectivo'],
                'curso_id' => $datos['inscripcion']['curso_id'],
                'nivel_id' => $datos['inscripcion']['nivel_id'],
                'repite' => $datos['inscripcion']['repite'] ?? false,
                'materias_pendientes' => $datos['inscripcion']['materias_pendientes'] ?? null,
                'promedio' => $datos['inscripcion']['promedio'] ?? null,
                'puntaje' => $datos['inscripcion']['puntaje'] ?? null,
                'escuela_procedencia' => $escuela->id,
            ]);
            
            // 5. Crear Ficha de Salud
            $this->repository->crearFichaSalud($inscripcion, $datos['ficha_salud']);
            
            Log::info('Inscripción creada exitosamente', [
                'inscripcion_id' => $inscripcion->id,
                'alumno_id' => $alumno->id,
                'alumno_dni' => $alumno->dni,
            ]);
            
            return $inscripcion;
        });
    }

    /**
     * Procesar alumno: crear nuevo o actualizar existente
     *
     * @param array $datosAlumno
     * @return Alumno
     */
    private function procesarAlumno(array $datosAlumno): Alumno
    {
        // Extraer datos del domicilio y la foto
        $datosDomicilio = $datosAlumno['domicilio'];
        $datosContacto = $datosAlumno['contacto'];
        $archivoFoto = $datosAlumno['foto'] ?? null;
        $datosAlumnoSinDomicilio = collect($datosAlumno)->except(['domicilio', 'foto'])->toArray();

        // Procesar foto si existe
        if ($archivoFoto && $archivoFoto instanceof \Illuminate\Http\UploadedFile) {
            $rutaFoto = $this->fileUploadService->subirFotoAlumno(
                $archivoFoto,
                $datosAlumno['dni']
            );
            $datosAlumnoSinDomicilio['foto'] = $rutaFoto;
        }

        // Verificar si es actualización o creación
        if (isset($datosAlumno['id']) && $datosAlumno['id']) {
            // ACTUALIZAR alumno existente
            $alumno = $this->repository->actualizarAlumno(
                $datosAlumno['id'],
                $datosAlumnoSinDomicilio
            );

            // Actualizar domicilio existente
            $this->repository->actualizarOCrearDomicilioAlumno($alumno, $datosDomicilio);

            // Actualizar contacto existente
            $this->repository->actualizarOCrearContactoAlumno($alumno, $datosContacto);
        } else {
            // CREAR domicilio nuevo
            $domicilio = $this->repository->crearDomicilio($datosDomicilio);
            // CREAR contacto nuevo
            $contacto = $this->repository->crearContacto($datosContacto);

            // CREAR alumno nuevo con referencia al domicilio
            $alumno = $this->repository->crearAlumno(
                array_merge($datosAlumnoSinDomicilio, [
                    'domicilio_id' => $domicilio->id,
                    'contacto_id' => $contacto->id
                ])
            );
        }

        return $alumno;
    }

    /**
     * Procesar tutores: crear/actualizar tutores y relacionarlos con el alumno
     * 
     * @param Alumno $alumno
     * @param array $datosTutores
     * @return void
     */
    private function procesarTutores(Alumno $alumno, array $datosTutores): void
    {
        $tutoresIds = [];
        
        foreach ($datosTutores as $datosTutor) {
            // Extraer datos del domicilio del tutor
            $datosDomicilioTutor = $datosTutor['domicilio'];
            $datosTutorSinDomicilio = collect($datosTutor)->except('domicilio')->toArray();
            
            // Crear o actualizar domicilio del tutor
            $domicilioTutor = isset($datosTutor['domicilio']['id']) && $datosTutor['domicilio']['id']
                ? $this->repository->actualizarDomicilio(
                    $datosTutor['domicilio']['id'],
                    $datosDomicilioTutor
                )
                : $this->repository->crearDomicilio($datosDomicilioTutor);
            
            // Obtener o crear tutor
            $tutor = $this->repository->obtenerOCrearTutor(
                array_merge($datosTutorSinDomicilio, [
                    'domicilio_id' => $domicilioTutor->id
                ])
            );
            
            $tutoresIds[] = $tutor->id;
        }
        
        // Sincronizar relación many-to-many (tabla pivote alumnos_tutores)
        $this->repository->sincronizarTutores($alumno, $tutoresIds);
    }

    /**
     * Buscar alumno por DNI (útil para el frontend)
     * 
     * @param string $dni
     * @return Alumno|null
     */
    public function buscarAlumnoPorDni(string $dni): ?Alumno
    {
        return $this->repository->buscarAlumnoPorDni($dni);
    }
}