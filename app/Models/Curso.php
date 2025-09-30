<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Curso extends Model
{
    use HasFactory;

    protected $table = 'cursos';

    protected $fillable = [
        'codigo',
        'nivel',
        'turno',
        'division',
    ];

    public function nivel(): BelongsTo
    {
        return $this->belongsTo(Nivel::class, 'nivel', 'codigo');
    }

    public function inscripciones(): HasMany
    {
        return $this->hasMany(Inscripcion::class);
    }
}
