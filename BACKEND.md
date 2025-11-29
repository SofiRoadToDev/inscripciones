# Documentación Backend - Sistema de Inscripciones

## 📁 Estructura del Proyecto

```
inscripciones/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php
│   │   │   ├── InscripcionController.php
│   │   │   └── Auth/
│   │   ├── Middleware/
│   │   └── Requests/
│   │       ├── InscripcionRequest.php
│   │       └── Auth/
│   ├── Models/
│   │   ├── Alumno.php
│   │   ├── Contacto.php
│   │   ├── Curso.php
│   │   ├── Domicilio.php
│   │   ├── EscuelaProcedencia.php
│   │   ├── FichaSalud.php
│   │   ├── Inscripcion.php
│   │   ├── Nivel.php
│   │   ├── Provincia.php
│   │   ├── Departamento.php
│   │   ├── Localidad.php
│   │   ├── Tutor.php
│   │   └── User.php
│   ├── Services/
│   │   ├── FileUploadService.php
│   │   └── InscripcionService.php
│   ├── Repositories/
│   │   └── InscripcionRepository.php
│   └── Rules/Validations/
│       ├── AlumnoValidationRules.php
│       ├── DomicilioValidationRules.php
│       ├── EscuelaProcedenciaValidationRules.php
│       ├── FichaSaludValidationRules.php
│       ├── InscripcionValidationRules.php
│       └── TutorValidationRules.php
├── database/
│   ├── factories/
│   │   └── UserFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 2024_01_01_000001-013_create_*.php
│   │   └── 2025_*.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── *.php
├── routes/
│   ├── auth.php
│   ├── web.php
│   └── settings.php
├── tests/
│   └── Feature/Auth/
├── config/
│   ├── auth.php
│   ├── fortify.php
│   ├── inertia.php
│   └── *.php
└── bootstrap/
    └── providers.php
```

---

## Stack Tecnológico Backend

- **PHP**: ^8.2
- **Laravel Framework**: ^12.0
- **Laravel Fortify**: ^1.30 (Autenticación)
- **Inertia.js**: ^2.0 (SPA integration)
- **Laravel Tinker**: ^2.10.1 (CLI development tool)
- **Laravel Wayfinder**: ^0.1.9 (URL generation)
- **Pest PHP**: ^3.8 (Testing framework)
- **Laravel Pint**: ^1.18 (Code style fixer)

---

## Estructura de Directorios

### 📁 `/app/`

#### Controllers (`app/Http/Controllers/`)

**Controller Base:**
- `Controller.php` - Clase base abstracta para todos los controladores del sistema

**Inscripciones:**
- `InscripcionController.php` - Controlador principal que maneja todo el flujo de inscripciones: creación, validación, almacenamiento y gestión

**Autenticación (`Auth/`):**
- `AuthenticatedSessionController.php` - Maneja login/logout de usuarios
- `EmailVerificationNotificationController.php` - Gestión de envío de emails de verificación
- `EmailVerificationPromptController.php` - Muestra prompt de verificación de email
- `NewPasswordController.php` - Maneja restablecimiento de contraseñas
- `PasswordResetLinkController.php` - Genera y envía links de reset de contraseña
- `RegisteredUserController.php` - Procesa registro de nuevos usuarios
- `VerifyEmailController.php` - Verifica tokens de confirmación de email

**Configuración (`Settings/`):**
- `PasswordController.php` - Cambio de contraseñas de usuarios autenticados
- `ProfileController.php` - Gestión del perfil de usuario
- `TwoFactorAuthenticationController.php` - Configuración y manejo de 2FA

#### Middleware (`app/Http/Middleware/`)

- `HandleAppearance.php` - Maneja preferencias de tema/appearance del usuario
- `HandleInertiaRequests.php` - Middleware personalizado para Inertia.js que comparte datos globales entre vistas

#### Requests (`app/Http/Requests/`)

**Inscripciones:**
- `InscripcionRequest.php` - Validación completa del formulario de inscripción con todas las reglas de negocio

**Autenticación (`Auth/`):**
- `LoginRequest.php` - Validación de datos de login (email, contraseña)

**Configuración (`Settings/`):**
- `ProfileUpdateRequest.php` - Validación para actualización de perfil de usuario
- `TwoFactorAuthenticationRequest.php` - Validación para configuración de 2FA

#### Models (`app/Models/`)

**Modelos Principales:**
- `Alumno.php` - Representa a un alumno con toda su información personal
- `Contacto.php` - Información de contacto (teléfono, email, etc.)
- `Curso.php` - Definición de cursos académicos
- `Domicilio.php` - Dirección física de personas
- `EscuelaProcedencia.php` - Datos de la escuela de donde viene el alumno
- `FichaSalud.php` - Información médica del alumno
- `Inscripcion.php` - Modelo principal que conecta todo, incluye campos administrativos como `aceptada`, `seguro_escolar`, `aporte_inscripcion`
- `Nivel.php` - Nivel educativo (primaria, secundaria)
- `Provincia.php` - División geográfica argentina
- `Departamento.php` - División interna de provincias
- `Localidad.php` - Ciudades y pueblos
- `Tutor.php` - Responsable/Representante legal del alumno
- `User.php` - Usuarios del sistema (padres y administradores)

#### Services (`app/Services/`)

- `FileUploadService.php` - Servicio especializado para subir y gestionar archivos (documentos, fotos, certificados)
- `InscripcionService.php` - Lógica de negocio central para procesar inscripciones, notificaciones y flujos administrativos

#### Repositories (`app/Repositories/`)

- `InscripcionRepository.php` - Abstracción de acceso a datos para operaciones complejas de inscripciones

#### Validation Rules (`app/Rules/Validations/`)

**Reglas de Validación Personalizadas:**
- `AlumnoValidationRules.php` - Reglas específicas para datos del alumno
- `DomicilioValidationRules.php` - Validación de direcciones y ubicaciones
- `EscuelaProcedenciaValidationRules.php` - Verificación de datos de escuelas anteriores
- `FichaSaludValidationRules.php` - Validación de información médica
- `InscripcionValidationRules.php` - Reglas de negocio para inscripciones completas
- `TutorValidationRules.php` - Validación específica para tutores/responsables

---

### 📁 `/database/`

#### Factories (`database/factories/`)

- `UserFactory.php` - Genera datos de prueba para usuarios (incluye admin por defecto)

#### Migrations (`database/migrations/`)

**Migraciones Principales del Sistema:**
- `0001_01_01_000000_create_users_table.php` - Tabla base de usuarios
- `0001_01_01_000001_create_cache_table.php` - Cache del sistema
- `0001_01_01_000002_create_jobs_table.php` - Cola de trabajos

**Geográficas:**
- `2024_01_01_000001_create_provincias_table.php` - Provincias argentinas
- `2024_01_01_000002_create_departamentos_table.php` - Departamentos
- `2024_01_01_000003_create_localidades_table.php` - Localidades/ciudades

**Datos Personales:**
- `2024_01_01_000004_create_domicilios_table.php` - Direcciones
- `2024_01_01_000005_create_alumnos_table.php` - Información de alumnos
- `2024_01_01_000006_create_tutores_table.php` - Tutores/responsables
- `2024_01_01_000007_create_alumnos_tutores_table.php` - Relación muchos a muchos
- `2024_01_01_000012_create_fichas_salud_table.php` - Datos médicos

**Académicas:**
- `2024_01_01_000008_create_niveles_table.php` - Niveles educativos
- `2024_01_01_000009_create_cursos_table.php` - Cursos específicos
- `2024_01_01_000010_create_escuelas_procedencia_table.php` - Escuelas anteriores

**Inscripciones:**
- `2024_01_01_000011_create_inscripciones_table.php` - Tabla principal de inscripciones
- `2025_08_26_100418_add_two_factor_columns_to_users_table.php` - Agrega columnas 2FA
- `2025_10_01_185350_add_pagos_to_inscripciones_table.php` - Campos de pagos administrativos
- `2025_10_01_192211_create_contactos_table.php` - Tabla de contactos
- `2025_10_01_192613_add_contacto_id_to_alumnos_table.php` - Relación alumno-contacto

#### Seeders (`database/seeders/`)

**Datos Base del Sistema:**
- `DatabaseSeeder.php` - Punto de entrada principal para poblar la base de datos
- `CursoSeeder.php` - Datos de cursos académicos
- `DepartamentoSeeder.php` - Departamentos por provincia
- `EscuelaProcedenciaSeeder.php` - Escuelas de ejemplo
- `LocalidadSeeder.php` - Localidades principales
- `NivelSeeder.php` - Niveles educativos del colegio
- `ProvinciaSeeder.php` - Provincias argentinas

---

### 📁 `/routes/`

**Definición de Rutas:**
- `auth.php` - Rutas de autenticación (login, registro, recuperación)
- `console.php` - Comandos Artisan personalizados
- `settings.php` - Rutas de configuración de usuario
- `web.php` - Rutas principales del sistema de inscripciones

---

### 📁 `/tests/`

**Tests del Backend:**
- `Feature/Auth/AuthenticationTest.php` - Tests de autenticación
- `Feature/Auth/EmailVerificationTest.php` - Tests de verificación de email
- `Feature/Auth/PasswordConfirmationTest.php` - Tests de confirmación de contraseña
- `Feature/Auth/PasswordResetTest.php` - Tests de reset de contraseña

---

### 📁 `/config/`

**Configuraciones:**
- `auth.php` - Configuración de autenticación
- `cache.php` - Configuración de cache
- `database.php` - Configuración de base de datos
- `filesystems.php` - Gestión de archivos
- `fortify.php` - Configuración de Laravel Fortify
- `inertia.php` - Configuración de Inertia.js
- `mail.php` - Configuración de emails
- `queue.php` - Configuración de colas
- `session.php` - Configuración de sesiones

---

### 📁 `/bootstrap/`

**Inicialización del Sistema:**
- `app.php` - Punto de entrada principal de la aplicación
- `providers.php` - Registro de service providers

---

## Flujo de Datos Backend

### 1. Autenticación
```
Usuario → Fortify → Email Verification → Login → Session
```

### 2. Inscripción
```
Formulario → InscripcionRequest → Validation Rules → InscripcionService → DB
```

### 3. Administración
```
Admin → InscripcionController → InscripcionService → Update Inscripcion → Notification
```

### 4. Validación
```
Request → Custom Validation Rules → Model Validation → Database Constraints
```

## Características Especiales

### **Campos Administrativos**
- `Inscripcion.aceptada` (boolean) - Para aprobar/rechazar
- `Inscripcion.seguro_escolar` (decimal) - Monto seguro (solo admin)
- `Inscripcion.aporte_inscripcion` (decimal) - Aporte (solo admin)

### **Seguridad Implementada**
- Rate limiting en formularios
- CSRF protection
- SQL injection prevention
- XSS protection
- Mass assignment protection
- Validation en multiple capas

### **Performance**
- Eager loading en relaciones complejas
- Cache de configuraciones
- Queue system para emails pesados
- Database indexing en campos críticos
