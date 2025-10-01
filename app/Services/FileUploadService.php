<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Subir foto de alumno y retornar la ruta relativa
     *
     * @param UploadedFile $file Archivo de foto
     * @param string|null $dni DNI del alumno para nombrar el archivo
     * @return string Ruta relativa del archivo guardado (ej: "fotos4x4/12345678_hash.jpg")
     */
    public function subirFotoAlumno(UploadedFile $file, ?string $dni = null): string
    {
        // Validar que el archivo sea una imagen
        if (!$file->isValid()) {
            throw new \InvalidArgumentException('El archivo no es válido');
        }

        // Generar nombre único del archivo
        $extension = $file->getClientOriginalExtension();
        $hash = Str::random(8);
        $nombreArchivo = $dni
            ? "{$dni}_{$hash}.{$extension}"
            : "{$hash}.{$extension}";

        // Guardar en public/fotos4x4
        $rutaRelativa = $file->storeAs(
            'fotos4x4',
            $nombreArchivo,
            'public'
        );

        return $rutaRelativa;
    }

    /**
     * Eliminar foto anterior si existe
     *
     * @param string|null $rutaAnterior Ruta relativa de la foto anterior
     * @return bool
     */
    public function eliminarFoto(?string $rutaAnterior): bool
    {
        if (!$rutaAnterior) {
            return false;
        }

        if (Storage::disk('public')->exists($rutaAnterior)) {
            return Storage::disk('public')->delete($rutaAnterior);
        }

        return false;
    }

    /**
     * Actualizar foto: elimina la anterior y sube la nueva
     *
     * @param UploadedFile $nuevaFoto
     * @param string|null $fotoAnterior
     * @param string|null $dni
     * @return string Ruta de la nueva foto
     */
    public function actualizarFoto(UploadedFile $nuevaFoto, ?string $fotoAnterior, ?string $dni = null): string
    {
        // Eliminar foto anterior
        $this->eliminarFoto($fotoAnterior);

        // Subir nueva foto
        return $this->subirFotoAlumno($nuevaFoto, $dni);
    }

    /**
     * Obtener URL pública de una foto
     *
     * @param string|null $rutaRelativa
     * @return string|null
     */
    public function obtenerUrlPublica(?string $rutaRelativa): ?string
    {
        if (!$rutaRelativa) {
            return null;
        }

        return Storage::disk('public')->url($rutaRelativa);
    }
}
