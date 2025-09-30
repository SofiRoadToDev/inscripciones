<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('domicilios', function (Blueprint $table) {
            $table->id();
            $table->string('calle', 25);
            $table->string('numero', 25);
            $table->string('manzana', 25)->nullable();
            $table->string('casa', 25)->nullable();
            $table->string('lote', 25)->nullable();
            $table->string('depto', 25)->nullable();
            $table->string('block', 25)->nullable();
            $table->string('piso', 25)->nullable();
            $table->foreignId('provincia_id')->constrained('provincias');
            $table->foreignId('departamento_id')->constrained('departamentos');
            $table->foreignId('localidad_id')->constrained('localidades');
            $table->timestamps();
        });
    }
};