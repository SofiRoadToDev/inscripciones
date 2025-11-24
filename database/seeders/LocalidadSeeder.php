<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocalidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Obtener los departamentos de Salta para mapear nombres a IDs
        $provinciaIdSalta = DB::table('provincias')->where('nombre', 'Salta')->value('id');
        $departamentos = DB::table('departamentos')
            ->where('provincia_id', $provinciaIdSalta)
            ->pluck('id', 'nombre');

        $localidades = [
            // Anta
            ['nombre' => 'Joaquín Víctor González', 'departamento_id' => $departamentos['Anta'] ?? null],
            // Cachi
            ['nombre' => 'Cachi', 'departamento_id' => $departamentos['Cachi'] ?? null],
            // Cafayate
            ['nombre' => 'Cafayate', 'departamento_id' => $departamentos['Cafayate'] ?? null],
            // Capital
            ['nombre' => 'Salta', 'departamento_id' => $departamentos['Capital'] ?? null],
            // Cerrillos
            ['nombre' => 'Cerrillos', 'departamento_id' => $departamentos['Cerrillos'] ?? null],
            // Chicoana
            ['nombre' => 'Chicoana', 'departamento_id' => $departamentos['Chicoana'] ?? null],
            // General Güemes
            ['nombre' => 'General Güemes', 'departamento_id' => $departamentos['General Güemes'] ?? null],
            // General José de San Martín
            ['nombre' => 'Tartagal', 'departamento_id' => $departamentos['General José de San Martín'] ?? null],
            // Guachipas
            ['nombre' => 'Guachipas', 'departamento_id' => $departamentos['Guachipas'] ?? null],
            // Iruya
            ['nombre' => 'Iruya', 'departamento_id' => $departamentos['Iruya'] ?? null],
            // La Caldera
            ['nombre' => 'La Caldera', 'departamento_id' => $departamentos['La Caldera'] ?? null],
            // La Candelaria
            ['nombre' => 'La Candelaria', 'departamento_id' => $departamentos['La Candelaria'] ?? null],
            // La Poma
            ['nombre' => 'La Poma', 'departamento_id' => $departamentos['La Poma'] ?? null],
            // La Viña
            ['nombre' => 'La Viña', 'departamento_id' => $departamentos['La Viña'] ?? null],
            // Los Andes
            ['nombre' => 'San Antonio de los Cobres', 'departamento_id' => $departamentos['Los Andes'] ?? null],
            // Metán
            ['nombre' => 'San José de Metán', 'departamento_id' => $departamentos['Metán'] ?? null],
            // Molinos
            ['nombre' => 'Molinos', 'departamento_id' => $departamentos['Molinos'] ?? null],
            // Orán
            ['nombre' => 'San Ramón de la Nueva Orán', 'departamento_id' => $departamentos['Orán'] ?? null],
            // Rivadavia
            ['nombre' => 'Rivadavia', 'departamento_id' => $departamentos['Rivadavia'] ?? null],
            // Rosario de la Frontera
            ['nombre' => 'Rosario de la Frontera', 'departamento_id' => $departamentos['Rosario de la Frontera'] ?? null],
            // Rosario de Lerma
            ['nombre' => 'Rosario de Lerma', 'departamento_id' => $departamentos['Rosario de Lerma'] ?? null],
            // San Carlos
            ['nombre' => 'San Carlos', 'departamento_id' => $departamentos['San Carlos'] ?? null],
            // Santa Victoria
            ['nombre' => 'Santa Victoria Oeste', 'departamento_id' => $departamentos['Santa Victoria'] ?? null],
        ];

        // Filtrar localidades que no encontraron su departamento (por si acaso)
        $localidadesValidas = array_filter($localidades, fn($localidad) => $localidad['departamento_id'] !== null);

        DB::table('localidades')->insert($localidadesValidas);
    }
}
