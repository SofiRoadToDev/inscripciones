<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tutores', function (Blueprint $table) {
            $table->id();
            $table->string('apellido');
            $table->string('nombre');
            $table->string('dni')->unique();
            $table->string('estudios')->nullable();
            $table->string('ocupacion')->nullable();
            $table->string('telefono')->nullable();
            $table->foreignId('domicilio_id')->constrained('domicilios');
            $table->timestamps();
        });
    }
};