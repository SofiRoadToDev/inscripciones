<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EscuelaProcedencia extends Model
{
    use HasFactory;

    protected $table = 'escuelas_procedencia';
    protected $fillable = ['cue', 'nombre', 'localidad_id'];

    public function localidad(): BelongsTo
    {
        return $this->belongsTo(Localidad::class);
    }
}
