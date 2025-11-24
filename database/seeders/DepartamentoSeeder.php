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
        $saltaId = DB::table('provincias')->where('nombre', 'Salta')->value('id');

        $departamentos = [
            ['nombre' => 'Anta', 'provincia_id' => $saltaId],
            ['nombre' => 'Cachi', 'provincia_id' => $saltaId],
            ['nombre' => 'Cafayate', 'provincia_id' => $saltaId],
            ['nombre' => 'Capital', 'provincia_id' => $saltaId],
            ['nombre' => 'Cerrillos', 'provincia_id' => $saltaId],
            ['nombre' => 'Chicoana', 'provincia_id' => $saltaId],
            ['nombre' => 'General Güemes', 'provincia_id' => $saltaId],
            ['nombre' => 'General José de San Martín', 'provincia_id' => $saltaId],
            ['nombre' => 'Guachipas', 'provincia_id' => $saltaId],
            ['nombre' => 'Iruya', 'provincia_id' => $saltaId],
            ['nombre' => 'La Caldera', 'provincia_id' => $saltaId],
            ['nombre' => 'La Candelaria', 'provincia_id' => $saltaId],
            ['nombre' => 'La Poma', 'provincia_id' => $saltaId],
            ['nombre' => 'La Viña', 'provincia_id' => $saltaId],
            ['nombre' => 'Los Andes', 'provincia_id' => $saltaId],
            ['nombre' => 'Metán', 'provincia_id' => $saltaId],
            ['nombre' => 'Molinos', 'provincia_id' => $saltaId],
            ['nombre' => 'Orán', 'provincia_id' => $saltaId],
            ['nombre' => 'Rivadavia', 'provincia_id' => $saltaId],
            ['nombre' => 'Rosario de la Frontera', 'provincia_id' => $saltaId],
            ['nombre' => 'Rosario de Lerma', 'provincia_id' => $saltaId],
            ['nombre' => 'San Carlos', 'provincia_id' => $saltaId],
            ['nombre' => 'Santa Victoria', 'provincia_id' => $saltaId],
        ];

        DB::table('departamentos')->insert($departamentos);
    }
}
