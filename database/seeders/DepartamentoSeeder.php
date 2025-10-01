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
            ['nombre' => 'Anta'],
            ['nombre' => 'Cachi'],
            ['nombre' => 'Cafayate'],
            ['nombre' => 'Capital'],
            ['nombre' => 'Cerrillos'],
            ['nombre' => 'Chicoana'],
            ['nombre' => 'General Güemes'],
            ['nombre' => 'General José de San Martín'],
            ['nombre' => 'Guachipas'],
            ['nombre' => 'Iruya'],
            ['nombre' => 'La Caldera'],
            ['nombre' => 'La Candelaria'],
            ['nombre' => 'La Poma'],
            ['nombre' => 'La Viña'],
            ['nombre' => 'Los Andes'],
            ['nombre' => 'Metán'],
            ['nombre' => 'Molinos'],
            ['nombre' => 'Orán'],
            ['nombre' => 'Rivadavia'],
            ['nombre' => 'Rosario de la Frontera'],
            ['nombre' => 'Rosario de Lerma'],
            ['nombre' => 'San Carlos'],
            ['nombre' => 'Santa Victoria'],
        ];

        DB::table('departamentos')->insert($departamentos);
    }
}
