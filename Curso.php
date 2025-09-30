<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = ['codigo', 'nivel', 'turno', 'division'];

    public function inscripciones(): HasMany
    {
        return $this->hasMany(Inscripcion::class);
    }
}