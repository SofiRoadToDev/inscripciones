# Sistema de Inscripciones - Colegio San Patricio

## Descripción

Sistema web completo para la gestión de inscripciones escolares desarrollado con **Laravel 12** + **React + Inertia** + **TypeScript** + **Tailwind CSS**. Permite a los padres completar formularios de inscripción online y al personal administrativo revisar, aprobar y gestionar las inscripciones con un sistema de autenticación robusto.

## Stack Tecnológico

- **Backend**: Laravel 12
- **Frontend**: React 19 + TypeScript
- **Autenticación**: Laravel Fortify
- **Base de Datos**: MySQL/PostgreSQL
- **UI/UX**: Tailwind CSS + shadcn/ui components
- **Gestión de Estado**: Inertia.js

## Funcionalidades Principales

### 🔐 Sistema de Autenticación
- Registro y login de usuarios
- Verificación por email
- Autenticación de dos factores (2FA)
- Recuperación de contraseña
- Gestión de sesiones

### 📝 Formulario de Inscripción
Los padres pueden completar un formulario integral que incluye:

**Datos del Alumno:**
- Información personal completa
- Domicilio y datos de contacto
- Ficha médica y de salud
- Datos de la escuela de procedencia
- Tutor(es) responsable(s)

**Validaciones:**
- Validación en tiempo real
- Campos obligatorios marcados
- Verificación de datos consistentes

### 👨‍💼 Panel de Administración

El sistema incluye un **usuario administrador** con funcionalidades especiales:

**Gestión de Inscripciones:**
- ✅ **Vista completa** de todas las inscripciones
- ✅ **Aprobar/Rechazar** inscripciones con booleano `aceptada`
- ✅ **Campos exclusivos del admin:**
  - `seguro_escolar` - Monto del seguro escolar
  - `aporte_inscripcion` - Aporte de inscripción
- ✅ **Dashboard** con estadísticas y métricas
- ✅ **Filtros** por estado, fecha, nivel
- ✅ **Exportar datos** a Excel/PDF

**Roles y Permisos:**
- Usuarios regulares: Solo pueden crear y ver sus inscripciones
- Administrador: Acceso completo al panel de gestión
- Verificación de permisos en cada ruta

## Estructura de Base de Datos

### Tablas Principales

**`inscripciones`**
- `id`, `user_id`, `nivel_id`, `curso_id`
- `aceptada` (boolean) - Campo de aprobación administrativa
- `seguro_escolar` (decimal) - Solo visible para admin
- `aporte_inscripcion` (decimal) - Solo visible para admin
- `fecha_inscripcion`, `estado`

**`alumnos`**
- Datos personales del alumno
- `domicilio_id`, `contacto_id`

**`tutores`**
- Información de los responsables
- Relación many-to-many con alumnos

**`fichas_salud`**
- Información médica necesaria

**`niveles` / `cursos`**
- Estructura académica del colegio

## Instalación y Configuración

### Prerrequisitos
- PHP 8.1+
- Composer
- Node.js 18+
- Base de datos (MySQL/PostgreSQL)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone [repository-url]
cd inscripciones
```

2. **Instalar dependencias de PHP**
```bash
composer install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configurar base de datos en `.env`**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inscripciones_db
DB_USERNAME=username
DB_PASSWORD=password
```

5. **Ejecutar migraciones y seeders**
```bash
php artisan migrate --seed
```

6. **Instalar dependencias de Node.js**
```bash
npm install
```

7. **Compilar assets para producción**
```bash
npm run build
```

8. **Crear enlace simbólico para storage**
```bash
php artisan storage:link
```

### Usuario Administrador

El sistema incluye un seeder que crea un usuario administrador por defecto:

**Email**: admin@sanpatricio.edu
**Contraseña**: password123

⚠️ **Importante**: Cambiar la contraseña del administrador inmediatamente después del primer login.

## Flujo de Uso

### Para Padres/Usuarios
1. **Registro** → Verificar email → Login
2. **Completar formulario** de inscripción
3. **Enviar** inscripción
4. **Recibir confirmación** por email
5. **Consultar estado** de la inscripción

### Para Administradores
1. **Login** con credenciales de admin
2. **Dashboard** → Ver todas las inscripciones
3. **Revisar datos** completos del formulario
4. **Decidir** (Aceptar/Rechazar)
5. **Configurar** montos de seguro y aporte
6. **Notificar** al solicitante

## Desarrollo

### Comandos Útiles

```bash
# Desarrollo local
php artisan serve
npm run dev

# Testing
php artisan test

# Linting
npm run lint
npm run types

# Producción
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Estructura del Proyecto

```
├── app/
│   ├── Http/Controllers/
│   │   ├── InscripcionController.php
│   │   └── Admin/
│   ├── Models/
│   │   ├── Inscripcion.php
│   │   ├── Alumno.php
│   │   └── User.php
│   └── ...
├── resources/
│   ├── js/
│   │   ├── components/
│   │   ├── pages/
│   │   └── layouts/
│   └── views/
└── database/
    ├── migrations/
    └── seeders/
```

## Seguridad

- **Validación** en backend y frontend
- **Sanitización** de inputs
- **CSRF Protection**
- **SQL Injection** prevention
- **XSS Protection**
- **Rate Limiting** en formularios
- **Autenticación robusta** con Fortify

## Características del Frontend

### Catálogo de Componentes
El proyecto incluye un **catálogo completo de componentes UI** listos para usar:

- 📁 `catalogo-frontend/`
  - `buttons.html` - Botones (primarios, secundarios, iconos, estados)
  - `modals.html` - Modales (básicos, formularios, confirmaciones)
  - `tables.html` - Tablas (básicas, hover, responsive, datos complejos)
  - `badges.html` - Badges (estados, iconos, contadores, efectos)
  - `cards.html` - Cards (fade, flip, hover effects, glassmorphism)
  - `form-styles.html` - Formularios (minimalista, glassmorphism, corporativo)
  - `navbars.html` - Navbars (transparente, sólido, sticky, glassmorphism)
  - `parallax.html` - Efectos parallax con Tailwind

Todos los componentes están diseñados con **Tailwind CSS puro** y son **100% responsive**.

## Monitoreo y Logs

```bash
# Ver logs en tiempo real
tail -f storage/logs/laravel.log

# Limpiar logs
php artisan log:clear
```

## Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Soporte

Para soporte técnico o consultas:
- 📧 Email: soporte@sanpatricio.edu
- 📞 Teléfono: +54 11 1234-5678
- 📍 Dirección: Av. Educación 1234, CABA

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado para el Colegio San Patricio** - Sistema de Gestión de Inscripciones 2024
