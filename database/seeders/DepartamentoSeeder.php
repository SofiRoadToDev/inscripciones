<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departamentos = [
            ['nombre' => 'Anta', 'provincia_id' => 16],
            ['nombre' => 'Cachi', 'provincia_id' => 16],
            ['nombre' => 'Cafayate', 'provincia_id' => 16],
            ['nombre' => 'Capital', 'provincia_id' => 16],
            ['nombre' => 'Cerrillos', 'provincia_id' => 16],
            ['nombre' => 'Chicoana', 'provincia_id' => 16],
            ['nombre' => 'General Güemes', 'provincia_id' => 16],
            ['nombre' => 'General José de San Martín', 'provincia_id' => 16],
            ['nombre' => 'Guachipas', 'provincia_id' => 16],
            ['nombre' => 'Iruya', 'provincia_id' => 16],
            ['nombre' => 'La Caldera', 'provincia_id' => 16],
            ['nombre' => 'La Candelaria', 'provincia_id' => 16],
            ['nombre' => 'La Poma', 'provincia_id' => 16],
            ['nombre' => 'La Viña', 'provincia_id' => 16],
            ['nombre' => 'Los Andes', 'provincia_id' => 16],
            ['nombre' => 'Metán', 'provincia_id' => 16],
            ['nombre' => 'Molinos', 'provincia_id' => 16],
            ['nombre' => 'Orán', 'provincia_id' => 16],
            ['nombre' => 'Rivadavia', 'provincia_id' => 16],
            ['nombre' => 'Rosario de la Frontera', 'provincia_id' => 16],
            ['nombre' => 'Rosario de Lerma', 'provincia_id' => 16],
            ['nombre' => 'San Carlos', 'provincia_id' => 16],
            ['nombre' => 'Santa Victoria', 'provincia_id' => 16],
        ];

        DB::table('departamentos')->insert($departamentos);
    }
}
