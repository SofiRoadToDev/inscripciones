<?php

namespace App\Repositories;

use App\Models\Alumno;
use App\Models\Tutor;
use App\Models\Domicilio;
use App\Models\Inscripcion;
use App\Models\FichaSalud;
use App\Models\EscuelaProcedencia;
use App\Models\Contacto;

class InscripcionRepository
{
    // ============================================
    // ALUMNO
    // ============================================

    /**
     * Buscar alumno por DNI
     */
    public function buscarAlumnoPorDni(string $dni): ?Alumno
    {
        return Alumno::where('dni', $dni)->first();
    }

    /**
     * Crear nuevo alumno
     */
    public function crearAlumno(array $datos): Alumno
    {
        return Alumno::create($datos);
    }

    /**
     * Actualizar alumno existente
     */
    public function actualizarAlumno(int $id, array $datos): Alumno
    {
        $alumno = Alumno::findOrFail($id);
        $alumno->update($datos);
        return $alumno->fresh();
    }

    // ============================================
    // DOMICILIO
    // ============================================

    /**
     * Crear domicilio
     */
    public function crearDomicilio(array $datos): Domicilio
    {
        return Domicilio::create($datos);
    }

    /**
     * Actualizar domicilio existente
     */
    public function actualizarDomicilio(int $id, array $datos): Domicilio
    {
        $domicilio = Domicilio::findOrFail($id);
        $domicilio->update($datos);
        return $domicilio->fresh();
    }

    /**
     * Actualizar o crear domicilio del alumno
     */
    public function actualizarOCrearDomicilioAlumno(Alumno $alumno, array $datos): Domicilio
    {
        if ($alumno->domicilio_id) {
            return $this->actualizarDomicilio($alumno->domicilio_id, $datos);
        }
        
        $domicilio = $this->crearDomicilio($datos);
        $alumno->update(['domicilio_id' => $domicilio->id]);
        
        return $domicilio;
    }

     // ============================================
    // CONTACTO
    // ============================================
     /**
     * Crear domicilio
     */
    public function crearContacto(array $datos): Contacto
    {
        return Contacto::create($datos);
    }

    /**
     * Actualizar contacto existente
     */
    public function actualizarContacto(int $id, array $datos): Contacto
    {
        $contacto = Contacto::findOrFail($id);
        $contacto->update($datos);
        return $contacto->fresh();
    }

    /**
     * Actualizar o crear contacto del alumno
     */
    public function actualizarOCrearContactoAlumno(Alumno $alumno, array $datos): Contacto
    {
        if ($alumno->contacto_id) {
            return $this->actualizarContacto($alumno->contacto_id, $datos);
        }
        
        $contacto = $this->crearContacto($datos);
        $alumno->update(['contacto_id' => $contacto->id]);
        
        return $contacto;
    }
    // ============================================
    // TUTORES
    // ============================================

    /**
     * Buscar tutor por DNI
     */
    public function buscarTutorPorDni(string $dni): ?Tutor
    {
        return Tutor::where('dni', $dni)->first();
    }

    /**
     * Crear tutor
     */
    public function crearTutor(array $datos): Tutor
    {
        return Tutor::create($datos);
    }

    /**
     * Actualizar tutor existente
     */
    public function actualizarTutor(int $id, array $datos): Tutor
    {
        $tutor = Tutor::findOrFail($id);
        $tutor->update($datos);
        return $tutor->fresh();
    }

    /**
     * Sincronizar tutores con alumno (relación many-to-many)
     * Elimina relaciones viejas y crea las nuevas
     */
    public function sincronizarTutores(Alumno $alumno, array $tutoresIds): void
    {
        // Sincroniza la tabla pivote alumnos_tutores
        $alumno->tutores()->sync($tutoresIds);
    }

    /**
     * Obtener o crear tutor por DNI
     */
    public function obtenerOCrearTutor(array $datos): Tutor
    {
        $tutor = $this->buscarTutorPorDni($datos['dni']);
        
        if ($tutor) {
            // Actualizar datos del tutor existente (sin domicilio)
            $datosSinDomicilio = collect($datos)->except('domicilio')->toArray();
            return $this->actualizarTutor($tutor->id, $datosSinDomicilio);
        }
        
        return $this->crearTutor($datos);
    }

    // ============================================
    // INSCRIPCIÓN
    // ============================================

    /**
     * Crear inscripción para un alumno
     */
    public function crearInscripcion(Alumno $alumno, array $datos): Inscripcion
    {
        return $alumno->inscripciones()->create($datos);
    }

    // ============================================
    // FICHA DE SALUD
    // ============================================

    /**
     * Crear ficha de salud para una inscripción
     */
    public function crearFichaSalud(Inscripcion $inscripcion, array $datos): FichaSalud
    {
        return $inscripcion->fichaSalud()->create($datos);
    }

    // ============================================
    // ESCUELA DE PROCEDENCIA
    // ============================================

    /**
     * Buscar escuela por CUE
     */
    public function buscarEscuelaPorCue(string $cue): ?EscuelaProcedencia
    {
        return EscuelaProcedencia::where('cue', $cue)->first();
    }

    /**
     * Crear escuela de procedencia
     */
    public function crearEscuelaProcedencia(array $datos): EscuelaProcedencia
    {
        return EscuelaProcedencia::create($datos);
    }

    /**
     * Buscar o crear escuela de procedencia por CUE
     */
    public function buscarOCrearEscuelaProcedencia(array $datos): EscuelaProcedencia
    {
        $escuela = $this->buscarEscuelaPorCue($datos['cue']);
        
        if ($escuela) {
            // Actualizar datos si es necesario
            $escuela->update($datos);
            return $escuela->fresh();
        }
        
        return $this->crearEscuelaProcedencia($datos);
    }
}