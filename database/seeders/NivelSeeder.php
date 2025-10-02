<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NivelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $niveles = [
            ['codigo' => '1CB','ciclo' => 'basico'],
            ['codigo' => '2CB','ciclo' => 'basico'],
            ['codigo' => '1CS','ciclo' => 'superior'],
            ['codigo' => '2CS','ciclo' => 'superior'],
            ['codigo' => '3CS','ciclo' => 'superior'],
            ['codigo' => '4CS','ciclo' => 'superior']                     
        ];

        DB::table('niveles')->insert($niveles);
    }
}
