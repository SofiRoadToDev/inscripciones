<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Nivel extends Model
{
    use HasFactory;

    protected $table = 'niveles';

    protected $fillable = [
        'codigo',
        'ciclo',
    ];

    public function cursos(): HasMany
    {
        return $this->hasMany(Curso::class, 'nivel', 'codigo');
    }

    public function inscripciones(): HasMany
    {
        return $this->hasMany(Inscripcion::class);
    }
}
