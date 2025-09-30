<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Nivel extends Model
{
    use HasFactory;

    protected $fillable = ['codigo', 'ciclo'];

    public function inscripciones(): HasMany
    {
        return $this->hasMany(Inscripcion::class);
    }
}