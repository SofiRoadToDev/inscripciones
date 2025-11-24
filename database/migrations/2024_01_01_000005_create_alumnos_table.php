<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id();
            $table->string('apellido');
            $table->string('nombre');
            $table->string('dni')->unique();
            $table->date('fecha_nacimiento');
            $table->string('nacionalidad');
            $table->boolean('padre_madre')->default(false);
            $table->string('tutor')->nullable();
            $table->string('foto')->nullable();
            $table->string('genero');
            $table->foreignId('domicilio_id')->constrained('domicilios');
            $table->timestamps();
        });
    }
};