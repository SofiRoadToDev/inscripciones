import { useState, useEffect } from 'react';
import axios from 'axios';
import { Provincia, Departamento, Localidad } from '@/types';

interface DomicilioFieldsProps {
    prefix: string; // 'alumno.domicilio' o 'tutores.0.domicilio'
    domicilio: {
        calle: string;
        numero: string;
        piso: string;
        depto: string;
        manzana: string;
        casa: string;
        lote: string;
        block: string;
        barrio: string;
        provincia_id: number | string;
        departamento_id: number | string;
        localidad_id: number | string;
    };
    errors: Record<string, string>;
    setData: (key: string, value: any) => void;
    provincias?: Provincia[];
}

export const DomicilioFields = function DomicilioFields({
    prefix,
    domicilio,
    errors,
    setData,
    provincias = [],
}: DomicilioFieldsProps) {

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);
    const [loadingLocalidades, setLoadingLocalidades] = useState(false);

    // Efecto para cargar departamentos cuando cambia la provincia
    useEffect(() => {
        if (domicilio.provincia_id) {
            setLoadingDepartamentos(true);
            axios.get(`/api/departamentos/${domicilio.provincia_id}`)
                .then(response => {
                    setDepartamentos(response.data);
                })
                .catch(error => console.error('Error fetching departamentos:', error))
                .finally(() => setLoadingDepartamentos(false));
        } else {
            setDepartamentos([]);
        }
    }, [domicilio.provincia_id]);

    // Efecto para cargar localidades cuando cambia el departamento
    useEffect(() => {
        if (domicilio.departamento_id) {
            setLoadingLocalidades(true);
            axios.get(`/api/localidades/${domicilio.departamento_id}`)
                .then(response => {
                    setLocalidades(response.data);
                })
                .catch(error => console.error('Error fetching localidades:', error))
                .finally(() => setLoadingLocalidades(false));
        } else {
            setLocalidades([]);
        }
    }, [domicilio.departamento_id]);

    const handleChange = (field: string, value: string) => {
        setData(`${prefix}.${field}`, value);

        // Reset dependientes cuando cambia la provincia
        if (field === 'provincia_id') {
            // Limpiar estado local y del formulario
            setDepartamentos([]);
            setLocalidades([]);
            setData(`${prefix}.departamento_id`, '');
            setData(`${prefix}.localidad_id`, '');
        }

        // Reset localidad cuando cambia el departamento
        if (field === 'departamento_id') {
            setLocalidades([]);
            setData(`${prefix}.localidad_id`, '');
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Domicilio</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calle */}
                <div className="md:col-span-1">
                    <label htmlFor="calle" className="block text-sm font-medium text-foreground mb-1">
                        Calle <span className="text-red-500">*</span>
                    </label>
                    <input id="calle"
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
                    <label htmlFor="numero" className="block text-sm font-medium text-foreground mb-1">
                        Número <span className="text-red-500">*</span>
                    </label>
                    <input id="numero"
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
                    <label htmlFor="piso" className="block text-sm font-medium text-foreground mb-1">
                        Piso
                    </label>
                    <input id="piso"
                        type="text"
                        value={domicilio.piso}
                        onChange={(e) => handleChange('piso', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 2"
                    />
                </div>
                {/* Manzana */}
                <div>
                    <label htmlFor="manzana" className="block text-sm font-medium text-foreground mb-1">
                        Manzana
                    </label>
                    <input id="manzana"
                        type="text"
                        value={domicilio.manzana}
                        onChange={(e) => handleChange('manzana', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 2"
                    />
                </div>
                {/* Casa */}
                <div>
                    <label htmlFor="casa" className="block text-sm font-medium text-foreground mb-1">
                        Casa
                    </label>
                    <input id="casa"
                        type="text"
                        value={domicilio.casa}
                        onChange={(e) => handleChange('casa', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 2"
                    />
                </div>
                {/* Lote */}
                <div>
                    <label htmlFor="lote" className="block text-sm font-medium text-foreground mb-1">
                        Lote
                    </label>
                    <input id="lote"
                        type="text"
                        value={domicilio.lote}
                        onChange={(e) => handleChange('lote', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: M"
                    />
                </div>

                {/* Barrio */}
                <div>
                    <label htmlFor="barrio" className="block text-sm font-medium text-foreground mb-1">
                        Barrio
                    </label>
                    <input id="barrio"
                        type="text"
                        value={domicilio.barrio}
                        onChange={(e) => handleChange('barrio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Villa Soledad"
                    />
                </div>

                {/* Departamento/Depto */}
                <div>
                    <label htmlFor="depto" className="block text-sm font-medium text-foreground mb-1">
                        Depto
                    </label>
                    <input id="depto"
                        type="text"
                        value={domicilio.depto}
                        onChange={(e) => handleChange('depto', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: A"
                    />
                </div>

                {/* Provincia */}
                <div>
                    <label htmlFor="provincia_id" className="block text-sm font-medium text-foreground mb-1">
                        Provincia <span className="text-red-500">*</span>
                    </label>
                    <select id="provincia_id"
                        value={domicilio.provincia_id}
                        onChange={(e) => handleChange('provincia_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-foreground focus:ring-blue-500 focus:border-blue-500"
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
                    <label htmlFor="departamento_id" className="block text-sm font-medium text-foreground mb-1">
                        Departamento <span className="text-red-500">*</span>
                    </label>
                    <select id="departamento_id"
                        value={domicilio.departamento_id}
                        onChange={(e) => handleChange('departamento_id', e.target.value)}
                        disabled={!domicilio.provincia_id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-foreground focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                        <option value="">
                            {loadingDepartamentos ? 'Cargando...' : 'Seleccione...'}
                        </option>
                        {departamentos.map((dep) => (
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
                    <label htmlFor="localidad_id" className="block text-sm font-medium text-foreground mb-1">
                        Localidad <span className="text-red-500">*</span>
                    </label>
                    <select id="localidad_id"
                        value={domicilio.localidad_id}
                        onChange={(e) => handleChange('localidad_id', e.target.value)}
                        disabled={!domicilio.departamento_id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-foreground focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                        <option value="">
                            {loadingLocalidades ? 'Cargando...' : 'Seleccione...'}
                        </option>
                        {localidades.map((loc) => (
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
