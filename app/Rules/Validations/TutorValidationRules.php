<?php

namespace App\Rules\Validations;

class TutorValidationRules
{
    public static function rules(): array
    {
        return [
            'tutores' => 'required|array|min:1',
            'tutores.*.apellido' => 'required|string|max:255',
            'tutores.*.nombre' => 'required|string|max:255',
            'tutores.*.dni' => 'required|string|max:20',
            'tutores.*.estudios' => 'nullable|string|max:100',
            'tutores.*.ocupacion' => 'nullable|string|max:100',
            'tutores.*.telefono' => 'required|string|max:20',
        ];
    }

    public static function messages(): array
    {
        return [
            'tutores.required' => 'Debe registrar al menos un tutor',
            'tutores.min' => 'Debe registrar al menos un tutor',
            'tutores.*.apellido.required' => 'El apellido del tutor es obligatorio',
            'tutores.*.nombre.required' => 'El nombre del tutor es obligatorio',
            'tutores.*.dni.required' => 'El DNI del tutor es obligatorio',
            'tutores.*.telefono.required' => 'El teléfono del tutor es obligatorio',
        ];
    }
}