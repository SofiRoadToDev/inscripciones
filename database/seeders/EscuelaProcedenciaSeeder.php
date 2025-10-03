<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EscuelaProcedenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('escuelas_procedencia')->insert([
            [
                'nombre' => 'Escuela Primaria N° 1',
                'cue' => '660123400',
                'localidad_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Escuela Secundaria N° 5',
                'cue' => '660567800',
                'localidad_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Colegio San Juan',
                'cue' => '660901200',
                'localidad_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}