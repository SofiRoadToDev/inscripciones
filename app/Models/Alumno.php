<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Alumno extends Model
{
    use HasFactory;

    protected $fillable = [
        'apellido',
        'nombre',
        'dni',
        'fecha_nacimiento',
        'nacionalidad',
        'padre_madre',
        'tutor',
        'foto',
        'genero',
        'domicilio_id'
    ];

    protected $casts = [
        'padre_madre' => 'boolean',
    ];

    public function domicilio(): BelongsTo
    {
        return $this->belongsTo(Domicilio::class);
    }

    public function tutores(): BelongsToMany
    {
        return $this->belongsToMany(Tutor::class, 'alumnos_tutores');
    }

    public function inscripciones(): HasMany
    {
        return $this->hasMany(Inscripcion::class);
    }

    public function contacto(): HasOne
    {
        return $this->hasOne(Contacto::class);
    }

}