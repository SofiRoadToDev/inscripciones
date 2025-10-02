<?php

namespace App\Http\Controllers;

use App\Services\InscripcionService;
use App\Http\Requests\InscripcionRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use App\Models\Departamento;
use App\Models\Localidad;
use App\Models\Curso;



class InscripcionController extends Controller
{
    /**
     * Constructor con inyección del servicio
     */
    public function __construct(
        private InscripcionService $inscripcionService
    ) {}

    /**
     * Mostrar formulario de creación de inscripción
     */
    public function create(): Response
    {
        return Inertia::render('Inscripciones/Create', [
        'cursos' => \App\Models\Curso::all(),
        'niveles' => \App\Models\Nivel::all(),
        'provincias' => \App\Models\Provincia::all(),
        // 'departamentos' y 'localidades' se cargarán dinámicamente.
        // 'departamentos' => \App\Models\Departamento::all(),
        // 'localidades' => \App\Models\Localidad::all(),
    ]);
    }

    /**
     * Guardar nueva inscripción
     */
    public function store(InscripcionRequest $request): RedirectResponse
    {
        try {
            // Crear inscripción con todos los datos validados
            $inscripcion = $this->inscripcionService->crearInscripcion(
                $request->validated()
            );
            
            return redirect()
                ->route('inscripciones.show', $inscripcion->id)
                ->with('success', 'Inscripción creada exitosamente');
                
        } catch (\Exception $e) {
            // Log del error
            \Log::error('Error al crear inscripción: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()
                ->withErrors(['error' => 'Ocurrió un error al procesar la inscripción. Por favor, inténtelo nuevamente.'])
                ->withInput();
        }
    }

    /**
     * Mostrar detalle de una inscripción
     */
    public function show(int $id): Response
    {
        // Cargar inscripción con todas sus relaciones
        $inscripcion = \App\Models\Inscripcion::with([
            'alumno.domicilio.localidad.departamento.provincia',
            'alumno.tutores.domicilio.localidad',
            'curso',
            'nivel',
            'fichaSalud'
        ])->findOrFail($id);
        
        return Inertia::render('Inscripciones/Show', [
            'inscripcion' => $inscripcion
        ]);
    }

    /**
     * Buscar alumno por DNI (endpoint para el frontend)
     * Útil cuando el usuario quiere inscribir un alumno existente
     */
    public function buscarAlumno(Request $request)
    {
        $request->validate([
            'dni' => 'required|string'
        ]);
        
        $alumno = $this->inscripcionService->buscarAlumnoPorDni($request->dni);
        
        if (!$alumno) {
            return response()->json([
                'encontrado' => false,
                'mensaje' => 'No se encontró un alumno con ese DNI'
            ]);
        }
        
        // Cargar relaciones necesarias
        $alumno->load([
            'domicilio.localidad.departamento.provincia',
            'tutores.domicilio.localidad.departamento.provincia'
        ]);
        
        return response()->json([
            'encontrado' => true,
            'alumno' => $alumno
        ]);
    }

    public function getDepartamentosPorProvincia($provincia_id){
        $departamentos = Departamento::where(['provincia_id' => $provincia_id])->get();
        if(!$departamentos->count()){
            return response()->json([
                'encontrado' => false,
                'mensaje' => 'No se encontraron departamentos para esta provincia'
            ]);
        }
        return response()->json($departamentos);
    }

    public function getLocalidadesPorDepartamento($departamento_id){
        $localidades = Localidad::where(['departamento_id' => $departamento_id])->get();
        if(!$localidades->count()){ 
            return response()->json([
                'encontrado' => false,
                'mensaje' => 'No se encontraron localidades para este departamento'
            ]);
        }
        return response()->json($localidades);
    }

    public function getCursosPorNivel($nivel_codigo){
        $cursos = Curso::where(['nivel' => $nivel_codigo])->get();
        if(!$cursos->count()){
            return response()->json([
                'encontrado' => false,
                'mensaje' => 'No se encontraron cursos para este nivel'
            ]);
        }
        return response()->json($cursos);
    }
}