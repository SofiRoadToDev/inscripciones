<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\EscuelaProcedencia;

class EscuelasProcedenciaTest extends TestCase
{
    use RefreshDatabase;

    public function test_escuelas_procedencia_endpoint_exists()
    {
        $response = $this->get('/api/escuelas-procedencia/Escuela');
        
        $response->assertStatus(200);
    }
}