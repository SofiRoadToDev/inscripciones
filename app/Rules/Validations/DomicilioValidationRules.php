<?php

namespace App\Rules\Validations;

class DomicilioValidationRules
{
    public static function alumnoRules(): array
    {
        return [
            'alumno.domicilio.calle' => 'required|string|max:255',
            'alumno.domicilio.numero' => 'required|string|max:10',
            'alumno.domicilio.piso' => 'nullable|string|max:10',
            'alumno.domicilio.depto' => 'nullable|string|max:10',
            'alumno.domicilio.provincia_id' => 'required|exists:provincias,id',
            'alumno.domicilio.departamento_id' => 'required|exists:departamentos,id',
            'alumno.domicilio.localidad_id' => 'required|exists:localidades,id',
        ];
    }

    public static function tutorRules(): array
    {
        return [
            'tutores.*.domicilio.calle' => 'required|string|max:255',
            'tutores.*.domicilio.numero' => 'required|string|max:10',
            'tutores.*.domicilio.piso' => 'nullable|string|max:10',
            'tutores.*.domicilio.depto' => 'nullable|string|max:10',
            'tutores.*.domicilio.provincia_id' => 'required|exists:provincias,id',
            'tutores.*.domicilio.departamento_id' => 'required|exists:departamentos,id',
            'tutores.*.domicilio.localidad_id' => 'required|exists:localidades,id',
        ];
    }

    public static function messages(): array
    {
        return [
            'alumno.domicilio.calle.required' => 'La calle del domicilio es obligatoria',
            'alumno.domicilio.numero.required' => 'El número del domicilio es obligatorio',
            'alumno.domicilio.provincia_id.required' => 'La provincia es obligatoria',
            'alumno.domicilio.provincia_id.exists' => 'La provincia seleccionada no existe',
            'alumno.domicilio.departamento_id.required' => 'El departamento es obligatorio',
            'alumno.domicilio.departamento_id.exists' => 'El departamento seleccionado no existe',
            'alumno.domicilio.localidad_id.required' => 'La localidad es obligatoria',
            'alumno.domicilio.localidad_id.exists' => 'La localidad seleccionada no existe',
            'tutores.*.domicilio.calle.required' => 'La calle del domicilio del tutor es obligatoria',
            'tutores.*.domicilio.numero.required' => 'El número del domicilio del tutor es obligatorio',
        ];
    }
}