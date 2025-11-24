<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Inscripcion extends Model
{
    use HasFactory;

    protected $table = 'inscripciones';

    protected $fillable = [
        'fecha',
        'ciclo_lectivo',
        'escuela_procedencia',
        'documentacion',
        'repite',
        'repite_anio_previo',
        'discontinuo',
        'materias_pendientes',
        'escuela_plan',
        'promedio',
        'puntaje',
        'egresos',
        'regulares',
        'alumno_id',
        'curso_id',
        'nivel_id',
    ];

    protected $casts = [
        'repite' => 'boolean',
        'discontinuo' => 'boolean',
        'fecha' => 'date',
    ];

    public function alumno(): BelongsTo
    {
        return $this->belongsTo(Alumno::class);
    }

    public function curso(): BelongsTo
    {
        return $this->belongsTo(Curso::class);
    }

    public function nivel(): BelongsTo
    {
        return $this->belongsTo(Nivel::class);
    }

    public function fichaSalud(): HasOne
    {
        return $this->hasOne(FichaSalud::class);
    }

    public function escuelaProcedencia(): BelongsTo
    {
        return $this->belongsTo(EscuelaProcedencia::class, 'escuela_procedencia');
    }
}
