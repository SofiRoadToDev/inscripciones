import { FormSectionProps } from '@/types';

export const FichaSaludForm = function FichaSaludForm({ data, setData, errors }: FormSectionProps) {

    const handleChange = (field: string, value: string | boolean) => {
        setData(`ficha_salud.${field}`, value);
    };

    return (
        <div className="bg-transparent p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Ficha de Salud</h2>

            <div className="space-y-4">
                {/* Enfermedad Crónica */}
                <div>
                    <label htmlFor="enfermedad_cronica" className="block text-sm font-medium text-white mb-1">
                        Enfermedad Crónica
                    </label>
                    <input
                        id="enfermedad_cronica"
                        type="text"
                        value={data.ficha_salud.enfermedad_cronica}
                        onChange={(e) => handleChange('enfermedad_cronica', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:ring-1 focus:ring-ring focus:border-ring"
                        placeholder="Ej: Asma"
                    />
                </div>

                {/* Alergia */}
                <div>
                    <label htmlFor="alergia" className="block text-sm font-medium text-white mb-1">
                        Alergias
                    </label>
                    <input
                        id="alergia"
                        type="text"
                        value={data.ficha_salud.alergia}
                        onChange={(e) => handleChange('alergia', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:ring-1 focus:ring-ring focus:border-ring"
                        placeholder="Ej: Polen, Frutos secos"
                    />
                </div>

                {/* Discapacidad */}
                <div>
                    <label htmlFor="discapacidad" className="block text-sm font-medium text-white mb-1">
                        Discapacidad
                    </label>
                    <input
                        id="discapacidad"
                        type="text"
                        value={data.ficha_salud.discapacidad}
                        onChange={(e) => handleChange('discapacidad', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:ring-1 focus:ring-ring focus:border-ring"
                        placeholder="Descripción si corresponde"
                    />
                </div>

                {/* Medicamentos */}
                <div>
                    <label htmlFor="medicamentos" className="block text-sm font-medium text-white mb-1">
                        Medicamentos
                    </label>
                    <textarea
                        id="medicamentos"
                        value={data.ficha_salud.medicamentos}
                        onChange={(e) => handleChange('medicamentos', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:ring-1 focus:ring-ring focus:border-ring"
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
                    <label htmlFor="vacunacion_completa" className="ml-2 block text-sm text-white">
                        Vacunación completa <span className="text-destructive">*</span>
                    </label>
                </div>
                {errors['ficha_salud.vacunacion_completa'] && (
                    <p className="mt-1 text-sm text-destructive">{errors['ficha_salud.vacunacion_completa']}</p>
                )}

                {/* Observaciones */}
                <div>
                    <label htmlFor="observaciones" className="block text-sm font-medium text-white mb-1">
                        Observaciones
                    </label>
                    <textarea
                        id="observaciones"
                        value={data.ficha_salud.observaciones}
                        onChange={(e) => handleChange('observaciones', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:ring-1 focus:ring-ring focus:border-ring"
                        rows={4}
                        placeholder="Información adicional relevante"
                    />
                </div>
            </div>
        </div>
    );
}
