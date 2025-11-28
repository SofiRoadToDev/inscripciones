<?php

namespace App\Rules\Validations;

class EscuelaProcedenciaValidationRules
{
    public static function rules(): array
    {
        return [
            'escuela_procedencia.cue' => 'nullable|string|max:20',
            'escuela_procedencia.nombre' => 'required_without:inscripcion.escuela_procedencia|string|max:255',
            'escuela_procedencia.localidad_id' => 'required_with:escuela_procedencia.cue|exists:localidades,id',
        ];
    }

    public static function messages(): array
    {
        return [
            'escuela_procedencia.cue.required' => 'El CUE de la escuela es obligatorio',
            'escuela_procedencia.nombre.required' => 'El nombre de la escuela es obligatorio',
            'escuela_procedencia.localidad_id.required' => 'La localidad de la escuela es obligatoria',
            'escuela_procedencia.localidad_id.exists' => 'La localidad seleccionada no existe',
        ];
    }
}