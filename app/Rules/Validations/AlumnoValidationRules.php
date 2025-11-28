<?php

namespace App\Rules\Validations;

class AlumnoValidationRules
{
    public static function rules(bool $esActualizacion = false): array
    {
        return [
            'alumno.apellido' => 'required|string|max:255',
            'alumno.nombre' => 'required|string|max:255',
            'alumno.dni' => [
                'required',
                'string',
                'max:20',
                $esActualizacion ? 'sometimes' : 'unique:alumnos,dni'
            ],
            'alumno.fecha_nacimiento' => 'required|date|before:today',
            'alumno.nacionalidad' => 'required|string|max:100',
            'alumno.genero' => 'required|in:M,F,X',
            'alumno.foto' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048', // Máximo 2MB
            'alumno.contacto.email' => 'nullable|email|max:255',
            'alumno.contacto.telefono' => 'required|string|max:20',
        ];
    }

    public static function messages(): array
    {
        return [
            'alumno.apellido.required' => 'El apellido del alumno es obligatorio',
            'alumno.nombre.required' => 'El nombre del alumno es obligatorio',
            'alumno.dni.required' => 'El DNI del alumno es obligatorio',
            'alumno.dni.unique' => 'Ya existe un alumno registrado con este DNI',
            'alumno.fecha_nacimiento.required' => 'La fecha de nacimiento es obligatoria',
            'alumno.fecha_nacimiento.before' => 'La fecha de nacimiento debe ser anterior a hoy',
            'alumno.nacionalidad.required' => 'La nacionalidad es obligatoria',
            'alumno.genero.required' => 'El género es obligatorio',
            'alumno.genero.in' => 'El género debe ser M, F o X',
            'alumno.foto.image' => 'El archivo debe ser una imagen',
            'alumno.foto.mimes' => 'La foto debe ser formato JPEG, JPG, PNG o WEBP',
            'alumno.foto.max' => 'La foto no puede superar los 2MB',
            'alumno.contacto.email.email' => 'El email del alumno debe ser una dirección válida',
            'alumno.contacto.telefono.required' => 'El teléfono del alumno es obligatorio',
        ];
    }
}