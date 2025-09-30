<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FichaSalud extends Model
{
    use HasFactory;

    protected $table = 'fichas_salud';

    protected $fillable = [
        'enfermedad_cronica',
        'alergia',
        'discapacidad',
        'medicamentos',
        'presenta_cuil',
        'nivel_primario',
        'vacunacion_completa',
        'observaciones',
        'inscripcion_id',
    ];

    protected $casts = [
        'presenta_cuil' => 'boolean',
        'nivel_primario' => 'boolean',
        'vacunacion_completa' => 'boolean',
    ];

    public function inscripcion(): BelongsTo
    {
        return $this->belongsTo(Inscripcion::class);
    }
}
