import { test, expect } from '@playwright/test';

test.describe('Formulario de Inscripción', () => {
    test('debe completar y enviar el formulario con datos válidos', async ({ page }) => {
        test.setTimeout(45000);

        // Funciones helper para logging
        const consoleHandler = (msg: any) => {
            const type = msg.type();
            console.log(`[BROWSER ${type.toUpperCase()}] ${msg.text()}`);
        };
        const errorHandler = (error: Error) => {
            console.error(`[PAGE ERROR] ${error.message}`);
        };
        const requestFailedHandler = (request: any) => {
            console.error(`[REQUEST FAILED] ${request.url()} - ${request.failure()?.errorText}`);
        };

        const enableLogging = () => {
            page.on('console', consoleHandler);
            page.on('pageerror', errorHandler);
            page.on('requestfailed', requestFailedHandler);
        };

        const disableLogging = () => {
            page.off('console', consoleHandler);
            page.off('pageerror', errorHandler);
            page.off('requestfailed', requestFailedHandler);
        };

        // Navegar al formulario
        await page.goto('/inscripciones');

        // ============================================
        // TAB 1: ALUMNO
        // ============================================
        console.log('CARGANDO ALUMNO');
        await test.step('Completar datos del alumno', async () => {
            // Datos personales
            console.log('Llenando Apellido...');
            await page.getByLabel('Apellido').waitFor({ state: 'visible' });
            await page.getByLabel('Apellido').fill('Pérez');

            console.log('Llenando Nombre...');
            await page.getByLabel('Nombre').waitFor({ state: 'visible' });
            await page.getByLabel('Nombre').fill('Juan Manuel');

            console.log('Llenando DNI...');
            await page.getByLabel('DNI').nth(0).waitFor({ state: 'visible' });
            await page.getByLabel('DNI').nth(0).fill('45123456');

            console.log('Llenando Fecha de Nacimiento...');
            await page.getByLabel('Fecha de Nacimiento').fill('2010-03-15');

            console.log('Llenando Nacionalidad...');
            await page.getByLabel('Nacionalidad').fill('Argentina');

            console.log('Seleccionando Género...');
            await page.getByLabel('Género').selectOption('M');

            // Contacto
            console.log('Llenando Email...');
            await page.getByLabel('Email').fill('juan.perez@example.com');

            console.log('Llenando Teléfono...');
            await page.getByLabel('Teléfono').nth(0).fill('3874123456');

            // Domicilio - ACTIVAR LOGGING para llamadas API
            console.log('Llenando Calle...');
            await page.getByLabel('Calle').nth(0).fill('Av. San Martín');

            console.log('Llenando Número...');
            await page.getByLabel('Número').nth(0).fill('1234');

            console.log('\n=== Seleccionando Provincia (cargará departamentos) ===');
            enableLogging();
            await page.getByLabel('Provincia').nth(0).selectOption({ label: 'Salta' });
            await page.waitForTimeout(2000);
            disableLogging();

            console.log('\n=== Seleccionando Departamento (cargará localidades) ===');
            enableLogging();
            await page.getByLabel('Departamento').nth(0).selectOption({ label: 'Capital' });
            await page.waitForTimeout(2000);
            disableLogging();

            console.log('Seleccionando Localidad...');
            await page.getByLabel('Localidad').nth(0).selectOption({ label: 'Salta' });

            console.log('✓ Datos del alumno completados');
        });

        // ============================================
        // TAB 2: TUTORES
        // ============================================
        console.log('CARGANDO TUTORES');
        await test.step('Navegar a tab Tutores', async () => {
            await page.getByText('Tutores', { exact: true }).click();
        });

        await test.step('Completar datos del tutor', async () => {
            await page.locator('#apellido_0').fill('Pérez');
            await page.locator('#nombre_0').fill('Roberto');
            await page.locator('#dni_0').fill('20123456');
            await page.locator('#telefono_0').fill('3874987654');

            // Domicilio del tutor - ACTIVAR LOGGING
            await page.getByLabel('Calle').nth(0).fill('Av. San Martín');
            await page.getByLabel('Número').nth(0).fill('1234');

            console.log('\n=== Tutor: Seleccionando Provincia ===');
            enableLogging();
            await page.getByLabel('Provincia').nth(0).selectOption({ label: 'Salta' });
            await page.waitForTimeout(2000);
            disableLogging();

            console.log('\n=== Tutor: Seleccionando Departamento ===');
            enableLogging();
            await page.getByLabel('Departamento').nth(0).selectOption({ label: 'Capital' });
            await page.waitForTimeout(2000);
            disableLogging();

            await page.getByLabel('Localidad').nth(0).selectOption({ label: 'Salta' });
        });

        // ============================================
        // TAB 3: INSCRIPCIÓN
        // ============================================
        console.log('CARGANDO INSCRIPCION');
        await test.step('Navegar a tab Inscripción', async () => {
            await page.getByText('Inscripción', { exact: true }).click();
        });

        await test.step('Completar datos de inscripción', async () => {
            const today = new Date().toISOString().split('T')[0];
            await page.getByLabel('Fecha de Inscripción').fill(today);
            await page.getByLabel('Ciclo Lectivo').fill('2025');

            // Seleccionar nivel - ACTIVAR LOGGING (carga cursos)
            console.log('\n=== Seleccionando Nivel (cargará cursos) ===');
            enableLogging();
            await page.getByLabel('Nivel').selectOption({ index: 1 });
            await page.waitForTimeout(4000);
            disableLogging();

            // Seleccionar curso
            console.log('\n=== Seleccionando Curso ===');
            enableLogging();
            await page.getByLabel('Curso').selectOption({ index: 1 });
            await page.waitForTimeout(4000);
            disableLogging();

            // Escuela de procedencia - ACTIVAR LOGGING (búsqueda de escuela)
            console.log('\n=== Escribiendo nombre de escuela (búsqueda API) ===');
            enableLogging();
            await page.locator('#nombre_escuela').fill('San Juan');
            await page.waitForTimeout(4000);
            disableLogging();
        });

        // ============================================
        // TAB 4: FICHA DE SALUD
        // ============================================
        console.log('CARGANDO FICHA DE SALUD');
        await test.step('Navegar a tab Ficha de Salud', async () => {
            await page.getByText('Ficha de Salud', { exact: true }).click();
        });

        await test.step('Completar ficha de salud', async () => {
            await page.getByLabel('Enfermedad Crónica').fill('Ninguna');
            await page.getByLabel('Alergia').fill('Ninguna');
            await page.getByLabel('Discapacidad').fill('Ninguna');
            await page.getByLabel('Medicamentos').fill('Ninguno');
        });

        // ============================================
        // ENVIAR FORMULARIO
        // ============================================
        await test.step('Enviar formulario', async () => {
            console.log('\n=== Enviando formulario (POST request) ===');
            enableLogging();
            await page.getByRole('button', { name: 'Guardar Inscripción' }).click();

            // Esperar redirección o mensaje de éxito
            await page.waitForURL(/\/inscripciones\/\d+/, { timeout: 8000 });
            disableLogging();

            // Verificar que estamos en la página de detalle
            await expect(page).toHaveURL(/\/inscripciones\/\d+/);
        });
    });
});
