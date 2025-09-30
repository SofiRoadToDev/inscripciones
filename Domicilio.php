<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Domicilio extends Model
{
    use HasFactory;

    protected $fillable = [
        'calle', 'numero', 'manzana', 'casa', 'lote', 'depto', 'block', 'piso',
        'provincia_id', 'departamento_id', 'localidad_id'
    ];

    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class);
    }

    public function departamento(): BelongsTo
    {
        return $this->belongsTo(Departamento::class);
    }

    public function localidad(): BelongsTo
    {
        return $this->belongsTo(Localidad::class);
    }

    public function alumno(): HasOne
    {
        return $this->hasOne(Alumno::class);
    }

    public function tutor(): HasOne
    {
        return $this->hasOne(Tutor::class);
    }
}