<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('fichas_salud', function (Blueprint $table) {
            $table->id();
            $table->string('enfermedad_cronica')->nullable();
            $table->string('alergia')->nullable();
            $table->string('discapacidad')->nullable();
            $table->string('medicamentos')->nullable();
            $table->boolean('presenta_cuil')->default(false);
            $table->boolean('nivel_primario')->default(false);
            $table->boolean('vacunacion_completa')->default(false);
            $table->text('observaciones')->nullable();
            $table->foreignId('inscripcion_id')->constrained('inscripciones');
            $table->timestamps();
        });
    }
};