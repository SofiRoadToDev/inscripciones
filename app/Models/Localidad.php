<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Localidad extends Model
{
    use HasFactory;

    protected $table = 'localidades';

    protected $fillable = [
        'nombre',
    ];

    public function domicilios(): HasMany
    {
        return $this->hasMany(Domicilio::class);
    }
}
