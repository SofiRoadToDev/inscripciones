import { FormSectionProps } from '@/types';

export const FichaSaludForm =function FichaSaludForm({ data, setData, errors }: FormSectionProps) {

    const handleChange = (field: string, value: string | boolean) => {
        setData(`ficha_salud.${field}`, value);
    };

    return (
        <div className="bg-card p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Ficha de Salud</h2>

            <div className="space-y-4">
                {/* Enfermedad Crónica */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                        Enfermedad Crónica
                    </label>
                    <input
                        type="text"
                        value={data.ficha_salud.enfermedad_cronica}
                        onChange={(e) => handleChange('enfermedad_cronica', e.target.value)}
                        className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                        placeholder="Ej: Asma"
                    />
                </div>

                {/* Alergia */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                        Alergias
                    </label>
                    <input
                        type="text"
                        value={data.ficha_salud.alergia}
                        onChange={(e) => handleChange('alergia', e.target.value)}
                        className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                        placeholder="Ej: Polen, Frutos secos"
                    />
                </div>

                {/* Discapacidad */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                        Discapacidad
                    </label>
                    <input
                        type="text"
                        value={data.ficha_salud.discapacidad}
                        onChange={(e) => handleChange('discapacidad', e.target.value)}
                        className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                        placeholder="Descripción si corresponde"
                    />
                </div>

                {/* Medicamentos */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                        Medicamentos
                    </label>
                    <textarea
                        value={data.ficha_salud.medicamentos}
                        onChange={(e) => handleChange('medicamentos', e.target.value)}
                        className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                        rows={3}
                        placeholder="Medicamentos que toma habitualmente"
                    />
                </div>

                {/* Vacunación Completa */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="vacunacion_completa"
                        checked={data.ficha_salud.vacunacion_completa}
                        onChange={(e) => handleChange('vacunacion_completa', e.target.checked)}
                        className="h-4 w-4 text-primary border-input rounded focus:ring-primary"
                    />
                    <label htmlFor="vacunacion_completa" className="ml-2 block text-sm text-foreground">
                        Vacunación completa <span className="text-destructive">*</span>
                    </label>
                </div>
                {errors['ficha_salud.vacunacion_completa'] && (
                    <p className="mt-1 text-sm text-destructive">{errors['ficha_salud.vacunacion_completa']}</p>
                )}

                {/* Observaciones */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                        Observaciones
                    </label>
                    <textarea
                        value={data.ficha_salud.observaciones}
                        onChange={(e) => handleChange('observaciones', e.target.value)}
                        className="w-full px-3 py-2 border input rounded-md focus:ring-1 focus:ring-ring focus:border-ring"
                        rows={4}
                        placeholder="Información adicional relevante"
                    />
                </div>
            </div>
        </div>
    );
}
