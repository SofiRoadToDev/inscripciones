<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('inscripciones', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->year('ciclo_lectivo');
            $table->text('documentacion')->nullable();
            $table->boolean('repite')->default(false);
            $table->string('repite_anio_previo')->nullable();
            $table->boolean('discontinuo')->default(false);
            $table->text('materias_pendientes')->nullable();
            $table->foreignId('escuela_procedencia')->nullable()->constrained('escuelas_procedencia');
            $table->integer('egresos')->nullable();
            $table->integer('regulares')->nullable();
            $table->foreignId('alumno_id')->constrained('alumnos');
            $table->foreignId('curso_id')->constrained('cursos');
            $table->foreignId('nivel_id')->constrained('niveles');
            $table->timestamps();
        });
    }
};