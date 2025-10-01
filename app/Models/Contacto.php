<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    protected $fillable = [
        'nombre',
        'email',
        'telefono',
    ];

    public function alumno()
    {
        return $this->belongsTo(Alumno::class);
    }
}
