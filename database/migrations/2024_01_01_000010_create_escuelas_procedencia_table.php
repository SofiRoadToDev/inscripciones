<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('escuelas_procedencia', function (Blueprint $table) {
            $table->id();
            $table->string('cue')->unique()->nullable();
            $table->string('nombre');
            $table->foreignId('localidad_id')->constrained('localidades')->nullable();
            $table->timestamps();
        });
    }
};