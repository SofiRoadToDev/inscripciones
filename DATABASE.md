    Consulta exitosa

Basado en el Diagrama de Entidad-Relación (DER) proporcionado, aquí tienes un conjunto de instrucciones en formato Markdown para que un LLM genere las migraciones y modelos de Laravel para esa base de datos.

Instrucciones para Generar Migraciones y Modelos de Laravel a partir de un DER

Objetivo

El objetivo es que un modelo de lenguaje (LLM) genere el código de las migraciones y los modelos de Laravel para la base de datos representada en el Diagrama de Entidad-Relación (DER) proporcionado.

Estructura de la Base de Datos

Aquí se describe la estructura de la base de datos para que el LLM pueda entender las relaciones y atributos de cada tabla.

Tablas

    domicilios

        Atributos: calle, numero, manzana, casa, lote, depto, block, piso.

        Relaciones: Tiene claves foráneas a las tablas provincias, departamentos y localidades.

        Notas: Todos los campos string deben tener una longitud de 25.

    provincias

        Atributos: nombre.

    departamentos

        Atributos: nombre.

    localidades

        Atributos: nombre.

    alumnos

        Atributos: apellido, nombre, dni, fecha_nacimiento, nacionalidad, padre_madre, tutor, foto, genero.

        Relaciones: Tiene una clave foránea a la tabla domicilios.

    alumnos_tutores

        Atributos: Ninguno, esta es una tabla pivote para la relación muchos a muchos.

        Relaciones: Tiene claves foráneas a alumnos (alumno_id) y tutores (tutor_id).

    tutores

        Atributos: apellido, nombre, dni, estudios, ocupacion, telefono.

        Relaciones: Tiene una clave foránea a la tabla domicilios.

    fichas_salud

        Atributos: enfermedad_cronica, alergia, discapacidad, medicamentos, presenta_cuil, nivel_primario, vacunacion_completa, observaciones.

        Relaciones: Tiene una clave foránea a la tabla inscripciones.

    escuelas_procedencia

        Atributos: cue, nombre.

        Relaciones: Tiene una clave foránea a la tabla localidad.

    inscripciones

        Atributos: fecha, ciclo_lectivo, escuela_procedencia, documentacion, repite, repite_anio_previo, discontinuo, materias_pendientes, escuela_plan, promedio, puntaje, egresos, regulares.

        Relaciones: Tiene claves foráneas a alumnos, cursos y niveles.

    cursos

        Atributos: codigo, nivel, turno, division.

    niveles

        Atributos: codigo, ciclo.

        Notas: el campo ciclo debe ser de tipo enum o string con valores específicos ('basico', 'superior').

Solicitud de Generación

Ahora, con esta información, el LLM debe generar el código para:

1. Migraciones de Laravel

    Generar una migración para cada una de las tablas mencionadas.

    Asegurar que las claves primarias (id) sean de tipo bigIncrements y las claves foráneas (foreignId) estén correctamente definidas, incluyendo la relación (constrained).

    Configurar los tipos de datos de las columnas de acuerdo con el DER (ej. string, integer, date, boolean, text, etc.).

    Añadir las columnas created_at y updated_at a todas las tablas, excepto a las tablas pivote (alumnos_tutores).

    Crear la tabla pivote alumnos_tutores con las claves foráneas correspondientes.

    Definir los campos nullable donde se indique en el DER.

2. Modelos de Laravel

    Generar un modelo de Eloquent para cada tabla.

    En cada modelo, definir las relaciones (hasOne, hasMany, belongsTo, belongsToMany) que correspondan de acuerdo al DER.

    Utilizar la convención de nombres de Laravel (por ejemplo, el modelo Alumno para la tabla alumnos).

    Asegurar que las relaciones muchos a muchos (belongsToMany) estén correctamente definidas en los modelos Alumno y Tutor.

    Definir la propiedad $fillable en cada modelo con las columnas correspondientes.

Ejemplo de Salida Esperada

    Migración create_domicilios_table.php: Debe incluir las columnas calle, numero, manzana, casa, etc., con sus tipos de datos y las claves foráneas a provincias, departamentos y localidades.

    Modelo Domicilio.php: Debe incluir las relaciones belongsTo a Provincia, Departamento y Localidad, y las relaciones hasMany o hasOne a Alumno y Tutor.

El LLM debe seguir esta estructura y generar el código completo para cada archivo de migración y modelo.