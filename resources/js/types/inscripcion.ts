// ============================================
// MODELS - Entidades de la base de datos
// ============================================

export interface Alumno {
    id: number | null;
    apellido: string;
    nombre: string;
    dni: string;
    fecha_nacimiento: string;
    nacionalidad: string;
    genero: 'M' | 'F' | 'X' | '';
    foto?: string | null;
    domicilio_id?: number | null;
    domicilio?: Domicilio;
    tutores?: Tutor[];
    contacto?: Contacto;
    inscripciones?: Inscripcion[];
    created_at?: string;
    updated_at?: string;
}

export interface Tutor {
    id: number | null;
    apellido: string;
    nombre: string;
    dni: string;
    estudios?: string | null;
    ocupacion?: string | null;
    telefono: string;
    domicilio_id?: number | null;
    domicilio?: Domicilio;
    created_at?: string;
    updated_at?: string;
}

export interface Domicilio {
    id: number | null;
    calle: string;
    numero: string;
    piso?: string | null;
    depto?: string | null;
    provincia_id: number | string;
    departamento_id: number | string;
    localidad_id: number | string;
    provincia?: Provincia;
    departamento?: Departamento;
    localidad?: Localidad;
    created_at?: string;
    updated_at?: string;
}

export interface Contacto {
    id: number | null;
    email: string;
    telefono: string;
}

export interface Inscripcion {
    id: number;
    fecha: string;
    ciclo_lectivo: number;
    repite: boolean;
    materias_pendientes?: string | null;
    promedio?: number | null;
    puntaje?: number | null;
    escuela_procedencia?: string | null;
    alumno_id: number;
    curso_id: number;
    nivel_id: number;
    alumno?: Alumno;
    curso?: Curso;
    nivel?: Nivel;
    ficha_salud?: FichaSalud;
    created_at?: string;
    updated_at?: string;
}

export interface FichaSalud {
    id: number;
    enfermedad_cronica?: string | null;
    alergia?: string | null;
    discapacidad?: string | null;
    medicamentos?: string | null;
    vacunacion_completa: boolean;
    observaciones?: string | null;
    inscripcion_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface EscuelaProcedencia {
    id: number;
    cue: string;
    nombre: string;
    localidad_id: number;
    localidad?: Localidad;
    created_at?: string;
    updated_at?: string;
}

export interface Curso {
    id: number;
    codigo: string;
    nivel: string;
    turno: string;
    division: string;
    nivel_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Nivel {
    id: number;
    codigo: string;
    ciclo: string;
    created_at?: string;
    updated_at?: string;
}

// ============================================
// CATALOGOS - Datos de referencia
// ============================================

export interface Provincia {
    id: number;
    nombre: string;
}

export interface Departamento {
    id: number;
    nombre: string;
    provincia_id: number;
}

export interface Localidad {
    id: number;
    nombre: string;
    departamento_id: number;
}

// ============================================
// FORM DATA - Datos del formulario
// ============================================

export interface InscripcionFormData {
    alumno: AlumnoFormData;
    tutores: TutorFormData[];
    inscripcion: InscripcionDataForm;
    escuela_procedencia: EscuelaProcedenciaFormData;
    ficha_salud: FichaSaludFormData;
}

export interface AlumnoFormData {
    id: number | null;
    apellido: string;
    nombre: string;
    dni: string;
    fecha_nacimiento: string;
    nacionalidad: string;
    genero: 'M' | 'F' | 'X' | '';
    foto?: File | null;
    contacto: ContactoFormData;
    domicilio: DomicilioFormData;
}

export interface TutorFormData {
    id: number | null;
    apellido: string;
    nombre: string;
    dni: string;
    estudios: string;
    ocupacion: string;
    telefono: string;
    domicilio: DomicilioFormData;
}

export interface DomicilioFormData {
    id: number | null;
    calle: string;
    numero: string;
    piso: string;
    depto: string;
    casa: string;
    lote: string;
    barrio: string;
    manzana: string;
    block: string;
    provincia_id: number | string;
    departamento_id: number | string;
    localidad_id: number | string;
}

export interface ContactoFormData {
    email: string;
    telefono: string;
}

export interface InscripcionDataForm {
    fecha: string;
    ciclo_lectivo: number;
    curso_id: number | string;
    nivel_id: number | string;
    repite: boolean;
    materias_pendientes: string;
    promedio: number | null;
    puntaje: number | null;
    escuela_procedencia?: number | string | null;
}

export interface EscuelaProcedenciaFormData {
    cue: string;
    nombre: string;
    localidad_id: number | string;
}

export interface FichaSaludFormData {
    enfermedad_cronica: string;
    alergia: string;
    discapacidad: string;
    medicamentos: string;
    vacunacion_completa: boolean;
    observaciones: string;
}

// ============================================
// PROPS - Props de componentes
// ============================================

export interface InscripcionCreateProps {
    cursos: Curso[];
    niveles: Nivel[];
    provincias: Provincia[];
    departamentos?: Departamento[];
    localidades?: Localidad[];
}

export interface InscripcionShowProps {
    inscripcion: Inscripcion;
}

export interface FormSectionProps {
    data: InscripcionFormData;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
}

// ============================================
// RESPONSES - Respuestas de API
// ============================================

export interface BuscarAlumnoResponse {
    encontrado: boolean;
    mensaje?: string;
    alumno?: Alumno;
}