<?php

namespace App\Rules\Validations;

class FichaSaludValidationRules
{
    public static function rules(): array
    {
        return [
            'ficha_salud.enfermedad_cronica' => 'nullable|string',
            'ficha_salud.alergia' => 'nullable|string',
            'ficha_salud.discapacidad' => 'nullable|string',
            'ficha_salud.medicamentos' => 'nullable|string',
            'ficha_salud.vacunacion_completa' => 'required|boolean',
            'ficha_salud.observaciones' => 'nullable|string',
        ];
    }

    public static function messages(): array
    {
        return [
            'ficha_salud.vacunacion_completa.required' => 'Debe indicar si tiene vacunación completa',
            'ficha_salud.vacunacion_completa.boolean' => 'El campo de vacunación debe ser verdadero o falso',
        ];
    }
}