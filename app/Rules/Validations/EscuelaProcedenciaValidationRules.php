<?php

namespace App\Rules\Validations;

class EscuelaProcedenciaValidationRules
{
    public static function rules(): array
    {
        return [
            'escuela_procedencia.cue' => 'required|string|max:20',
            'escuela_procedencia.nombre' => 'required|string|max:255',
            'escuela_procedencia.localidad_id' => 'required|exists:localidades,id',
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