import { ChangeEvent } from 'react';
import { Provincia, Departamento, Localidad } from '@/types';

interface DomicilioFieldsProps {
    prefix: string; // 'alumno.domicilio' o 'tutores.0.domicilio'
    domicilio: {
        calle: string;
        numero: string;
        piso: string;
        depto: string;
        provincia_id: number | string;
        departamento_id: number | string;
        localidad_id: number | string;
    };
    errors: Record<string, string>;
    setData: (key: string, value: any) => void;
    provincias?: Provincia[];
    departamentos?: Departamento[];
    localidades?: Localidad[];
}

export default function DomicilioFields({
    prefix,
    domicilio,
    errors,
    setData,
    provincias = [],
    departamentos = [],
    localidades = [],
}: DomicilioFieldsProps) {
    
    // Filtrar departamentos por provincia seleccionada
    const departamentosFiltrados = departamentos.filter(
        (dep) => dep.provincia_id === Number(domicilio.provincia_id)
    );

    // Filtrar localidades por departamento seleccionado
    const localidadesFiltradas = localidades.filter(
        (loc) => loc.departamento_id === Number(domicilio.departamento_id)
    );

    const handleChange = (field: string, value: string) => {
        setData(`${prefix}.${field}`, value);
        
        // Reset dependientes cuando cambia la provincia
        if (field === 'provincia_id') {
            setData(`${prefix}.departamento_id`, '');
            setData(`${prefix}.localidad_id`, '');
        }
        
        // Reset localidad cuando cambia el departamento
        if (field === 'departamento_id') {
            setData(`${prefix}.localidad_id`, '');
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Domicilio</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calle */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Calle <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={domicilio.calle}
                        onChange={(e) => handleChange('calle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: San Martín"
                    />
                    {errors[`${prefix}.calle`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.calle`]}</p>
                    )}
                </div>

                {/* Número */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={domicilio.numero}
                        onChange={(e) => handleChange('numero', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 123"
                    />
                    {errors[`${prefix}.numero`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.numero`]}</p>
                    )}
                </div>

                {/* Piso */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Piso
                    </label>
                    <input
                        type="text"
                        value={domicilio.piso}
                        onChange={(e) => handleChange('piso', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 2"
                    />
                </div>

                {/* Departamento/Depto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Depto
                    </label>
                    <input
                        type="text"
                        value={domicilio.depto}
                        onChange={(e) => handleChange('depto', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: A"
                    />
                </div>

                {/* Provincia */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Provincia <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={domicilio.provincia_id}
                        onChange={(e) => handleChange('provincia_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Seleccione...</option>
                        {provincias.map((prov) => (
                            <option key={prov.id} value={prov.id}>
                                {prov.nombre}
                            </option>
                        ))}
                    </select>
                    {errors[`${prefix}.provincia_id`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.provincia_id`]}</p>
                    )}
                </div>

                {/* Departamento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Departamento <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={domicilio.departamento_id}
                        onChange={(e) => handleChange('departamento_id', e.target.value)}
                        disabled={!domicilio.provincia_id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                        <option value="">Seleccione...</option>
                        {departamentosFiltrados.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                                {dep.nombre}
                            </option>
                        ))}
                    </select>
                    {errors[`${prefix}.departamento_id`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.departamento_id`]}</p>
                    )}
                </div>

                {/* Localidad */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Localidad <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={domicilio.localidad_id}
                        onChange={(e) => handleChange('localidad_id', e.target.value)}
                        disabled={!domicilio.departamento_id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                        <option value="">Seleccione...</option>
                        {localidadesFiltradas.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.nombre}
                            </option>
                        ))}
                    </select>
                    {errors[`${prefix}.localidad_id`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`${prefix}.localidad_id`]}</p>
                    )}
                </div>
            </div>
        </div>
    );
}