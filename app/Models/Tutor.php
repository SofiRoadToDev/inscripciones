<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tutor extends Model
{
    use HasFactory;

    protected $table = 'tutores';

    protected $fillable = [
        'apellido',
        'nombre',
        'dni',
        'estudios',
        'ocupacion',
        'telefono',
        'domicilio_id',
    ];

    public function domicilio(): BelongsTo
    {
        return $this->belongsTo(Domicilio::class);
    }

    public function alumnos(): BelongsToMany
    {
        return $this->belongsToMany(Alumno::class, 'alumnos_tutores');
    }
}
