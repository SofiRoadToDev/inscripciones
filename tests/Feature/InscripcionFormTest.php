<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\Provincia;
use App\Models\Departamento;
use App\Models\Localidad;
use App\Models\Nivel;
use App\Models\Curso;
use Database\Seeders\ProvinciaSeeder;
use Database\Seeders\DepartamentoSeeder;
use Database\Seeders\LocalidadSeeder;
use Database\Seeders\NivelSeeder;
use Database\Seeders\CursoSeeder;

class InscripcionFormTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed the database with necessary data
        $this->seed(ProvinciaSeeder::class);
        $this->seed(DepartamentoSeeder::class);
        $this->seed(LocalidadSeeder::class);
        $this->seed(NivelSeeder::class);
        $this->seed(CursoSeeder::class);
    }

    /** @test */
    public function it_can_submit_the_complete_inscription_form()
    {


        // Arrange: Get required related data from the database
        $provincia = Provincia::where('nombre', 'Salta')->firstOrFail();
        $departamento = Departamento::where('provincia_id', $provincia->id)->firstOrFail();
        $localidad = Localidad::where('departamento_id', $departamento->id)->firstOrFail();
        $nivel = Nivel::where('codigo', '1CB')->firstOrFail();
        $curso = Curso::where('nivel', $nivel->id)->firstOrFail();

        // Arrange: Generate valid fake data for the entire form
        $data = [
            'alumno' => [
                'apellido' => $this->faker->lastName,
                'nombre' => $this->faker->firstName,
                'dni' => $this->faker->unique()->numerify('########'),
                'fecha_nacimiento' => $this->faker->date('Y-m-d', '-10 years'),
                'nacionalidad' => 'Argentino',
                'genero' => 'M',

                'domicilio' => [
                    'calle' => $this->faker->streetName,
                    'numero' => $this->faker->buildingNumber,
                    'piso' => null,
                    'depto' => null,
                    'provincia_id' => $provincia->id,
                    'departamento_id' => $departamento->id,
                    'localidad_id' => $localidad->id,
                ],
            ],
            'tutores' => [
                [
                    'apellido' => $this->faker->lastName,
                    'nombre' => $this->faker->firstName,
                    'dni' => $this->faker->unique()->numerify('########'),
                    'estudios' => 'Universitario',
                    'ocupacion' => 'Programador',
                    'telefono' => $this->faker->phoneNumber,
                    'domicilio' => [
                        'calle' => $this->faker->streetName,
                        'numero' => $this->faker->buildingNumber,
                        'piso' => null,
                        'depto' => null,
                        'provincia_id' => $provincia->id,
                        'departamento_id' => $departamento->id,
                        'localidad_id' => $localidad->id,
                    ],
                ]
            ],
            'inscripcion' => [
                'fecha' => now()->format('Y-m-d'),
                'ciclo_lectivo' => now()->year,
                'curso_id' => $curso->id,
                'nivel_id' => $nivel->id,
                'repite' => false,
                'materias_pendientes' => null,
                'promedio' => 9.5,
                'puntaje' => 100,
            ],
            'ficha_salud' => [
                'enfermedad_cronica' => null,
                'alergia' => 'Polen',
                'discapacidad' => null,
                'medicamentos' => null,
                'vacunacion_completa' => true,
                'observaciones' => null,
            ],
            'escuela_procedencia' => [
                'cue' => $this->faker->numerify('#######'),
                'nombre' => 'Escuela Normal Superior',
                'localidad_id' => $localidad->id,
            ],
        ];



        // Act: First, visit the creation page to establish a session
        $this->get(route('inscripciones.create'));

        // Now, post the data to the store route
        $response = $this->post(route('inscripciones.store'), $data);

        // Assert: Check for successful redirection
        $response->assertStatus(302);
        $response->assertRedirect();

        // Assert: Verify data was saved to the database
        $this->assertDatabaseHas('alumnos', [
            'dni' => $data['alumno']['dni'],
            'nombre' => $data['alumno']['nombre'],
        ]);

        $this->assertDatabaseHas('tutores', [
            'dni' => $data['tutores'][0]['dni'],
        ]);

        $this->assertDatabaseHas('inscripciones', [
            'ciclo_lectivo' => $data['inscripcion']['ciclo_lectivo'],
            'curso_id' => $data['inscripcion']['curso_id'],
        ]);

        $this->assertDatabaseHas('fichas_salud', [
            'alergia' => 'Polen',
        ]);

        $this->assertDatabaseHas('escuelas_procedencia', [
            'cue' => $data['escuela_procedencia']['cue'],
        ]);


    }
}
