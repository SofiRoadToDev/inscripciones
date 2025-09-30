<?php

namespace App\Rules\Validations;

class InscripcionValidationRules
{
    public static function rules(): array
    {
        return [
            'inscripcion.fecha' => 'required|date',
            'inscripcion.ciclo_lectivo' => 'required|integer|min:2020|max:2100',
            'inscripcion.curso_id' => 'required|exists:cursos,id',
            'inscripcion.nivel_id' => 'required|exists:niveles,id',
            'inscripcion.repite' => 'nullable|boolean',
            'inscripcion.materias_pendientes' => 'nullable|string',
            'inscripcion.promedio' => 'nullable|numeric|min:0|max:10',
            'inscripcion.puntaje' => 'nullable|numeric|min:0',
        ];
    }

    public static function messages(): array
    {
        return [
            'inscripcion.fecha.required' => 'La fecha de inscripción es obligatoria',
            'inscripcion.ciclo_lectivo.required' => 'El ciclo lectivo es obligatorio',
            'inscripcion.ciclo_lectivo.integer' => 'El ciclo lectivo debe ser un año válido',
            'inscripcion.curso_id.required' => 'Debe seleccionar un curso',
            'inscripcion.curso_id.exists' => 'El curso seleccionado no existe',
            'inscripcion.nivel_id.required' => 'Debe seleccionar un nivel',
            'inscripcion.nivel_id.exists' => 'El nivel seleccionado no existe',
            'inscripcion.promedio.numeric' => 'El promedio debe ser un número',
            'inscripcion.promedio.max' => 'El promedio no puede ser mayor a 10',
        ];
    }
}