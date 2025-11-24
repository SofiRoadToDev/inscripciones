<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cursos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->foreignId('nivel_id')->constrained('niveles');
            $table->string('turno');
            $table->string('division');
            $table->timestamps();
        });
    }
};