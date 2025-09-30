<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Validations\AlumnoValidationRules;
use App\Rules\Validations\TutorValidationRules;
use App\Rules\Validations\DomicilioValidationRules;
use App\Rules\Validations\InscripcionValidationRules;
use App\Rules\Validations\FichaSaludValidationRules;
use App\Rules\Validations\EscuelaProcedenciaValidationRules;

class InscripcionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Cambia a true o agrega tu lógica de autorización
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Detectar si es actualización (alumno existe)
        $esActualizacion = $this->input('alumno.id') !== null;

        return array_merge(
            AlumnoValidationRules::rules($esActualizacion),
            DomicilioValidationRules::alumnoRules(),
            TutorValidationRules::rules(),
            DomicilioValidationRules::tutorRules(),
            InscripcionValidationRules::rules(),
            FichaSaludValidationRules::rules(),
            EscuelaProcedenciaValidationRules::rules()
        );
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return array_merge(
            AlumnoValidationRules::messages(),
            TutorValidationRules::messages(),
            DomicilioValidationRules::messages(),
            InscripcionValidationRules::messages(),
            FichaSaludValidationRules::messages(),
            EscuelaProcedenciaValidationRules::messages()
        );
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'alumno.apellido' => 'apellido',
            'alumno.nombre' => 'nombre',
            'alumno.dni' => 'DNI',
            'alumno.fecha_nacimiento' => 'fecha de nacimiento',
            'alumno.nacionalidad' => 'nacionalidad',
            'alumno.genero' => 'género',
            'tutores.*.apellido' => 'apellido del tutor',
            'tutores.*.nombre' => 'nombre del tutor',
            'tutores.*.dni' => 'DNI del tutor',
            'tutores.*.telefono' => 'teléfono del tutor',
            'inscripcion.fecha' => 'fecha de inscripción',
            'inscripcion.ciclo_lectivo' => 'ciclo lectivo',
            'inscripcion.curso_id' => 'curso',
            'inscripcion.nivel_id' => 'nivel',
        ];
    }
}