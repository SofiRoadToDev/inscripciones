<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InscripcionController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('inscripciones')->name('inscripciones.')->group(function () {
    
    // Mostrar formulario de creación
    Route::get('/create', [InscripcionController::class, 'create'])
        ->name('create');
    
    // Guardar inscripción
    Route::post('/', [InscripcionController::class, 'store'])
        ->name('store');
    
    // Ver detalle de inscripción
    Route::get('/{id}', [InscripcionController::class, 'show'])
        ->name('show');
    
    // Buscar alumno por DNI (para el frontend)
    Route::post('/buscar-alumno', [InscripcionController::class, 'buscarAlumno'])
        ->name('buscar-alumno');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
