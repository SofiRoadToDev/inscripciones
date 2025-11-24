<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $niveles = DB::table('niveles')->pluck('id', 'codigo');

        $cursos = [
            ['codigo' => '11cbtm', 'nivel_id' => $niveles['1CB'], 'turno' => 'Mañana', 'division' => '1'],
            ['codigo' => '12cbtm', 'nivel_id' => $niveles['1CB'], 'turno' => 'Mañana', 'division' => '2'],
            ['codigo' => '11cbtt', 'nivel_id' => $niveles['1CB'], 'turno' => 'Tarde', 'division' => '1'],
            ['codigo' => '12cbtt', 'nivel_id' => $niveles['1CB'], 'turno' => 'Tarde', 'division' => '2'],
            ['codigo' => '13cbtt', 'nivel_id' => $niveles['1CB'], 'turno' => 'Tarde', 'division' => '3'],
        ];

        DB::table('cursos')->insert($cursos);
    }
}
