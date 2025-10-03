
import time
import os
from faker import Faker
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ==============================================================================
# Custom Wait Condition
# ==============================================================================
class select_has_options(object):
    """An expectation for checking that a select element has more than n options."""
    def __init__(self, locator, count):
        self.locator = locator
        self.count = count

    def __call__(self, driver):
        element = driver.find_element(*self.locator)
        select = Select(element)
        if len(select.options) > self.count:
            return element
        else:
            return False

# ==============================================================================
# Helper Functions
# ==============================================================================
def js_click(driver, element):
    """Force a click on an element using JavaScript."""
    driver.execute_script("arguments[0].click();", element)

# ==============================================================================
# Main Test Function
# ==============================================================================
def test_inscription_form():
    # --- 1. Setup ---
    print("Iniciando el script de prueba de Selenium...")
    fake = Faker('es_ES')

    dummy_file_name = "dummy_foto.jpg"
    with open(dummy_file_name, "w") as f:
        f.write("this is a dummy image")
    dummy_file_path = os.path.abspath(dummy_file_name)

    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 15)

    try:
        # --- 2. Navigate to the form ---
        url = "http://localhost:8000/inscripciones"
        print(f"Navegando a {url}...")
        driver.get(url)

        # --- 3. Fill Alumno Tab ---
        print("Pestaña Alumno: Llenando datos...")
        wait.until(EC.visibility_of_element_located((By.XPATH, "//label[contains(., 'Apellido')]/following-sibling::input")))

        driver.find_element(By.XPATH, "//label[contains(., 'Apellido')]/following-sibling::input").send_keys(fake.last_name())
        driver.find_element(By.XPATH, "//label[contains(., 'Nombre')]/following-sibling::input").send_keys(fake.first_name())
        driver.find_element(By.XPATH, "//label[contains(., 'DNI')]/following-sibling::input").send_keys(fake.numerify('########'))
        driver.find_element(By.XPATH, "//input[@type='file' and not(@capture='user')]").send_keys(dummy_file_path)
        driver.find_element(By.XPATH, "//label[contains(., 'Fecha de Nacimiento')]/following-sibling::input").send_keys("10-10-2010")
        driver.find_element(By.XPATH, "//label[contains(., 'Nacionalidad')]/following-sibling::input").send_keys("Argentino")
        Select(driver.find_element(By.XPATH, "//label[contains(., 'Género')]/following-sibling::select")).select_by_value("M")

        provincia_xpath = "//h3[text()='Domicilio']/following::label[contains(., 'Provincia')][1]/following-sibling::select"
        Select(wait.until(EC.element_to_be_clickable((By.XPATH, provincia_xpath)))).select_by_visible_text("Salta")

        depto_locator = (By.XPATH, "//h3[text()='Domicilio']/following::label[contains(., 'Departamento')][1]/following-sibling::select")
        Select(wait.until(select_has_options(depto_locator, 1))).select_by_index(1)

        loc_locator = (By.XPATH, "//h3[text()='Domicilio']/following::label[contains(., 'Localidad')][1]/following-sibling::select")
        Select(wait.until(select_has_options(loc_locator, 1))).select_by_index(1)

        driver.find_element(By.XPATH, "//h3[text()='Domicilio']/following::label[contains(., 'Calle')][1]/following-sibling::input").send_keys(fake.street_name())
        driver.find_element(By.XPATH, "//h3[text()='Domicilio']/following::label[contains(., 'Número')][1]/following-sibling::input").send_keys(fake.building_number())
        driver.find_element(By.XPATH, "//label[contains(., 'Email')]/following-sibling::input").send_keys(fake.email())
        driver.find_element(By.XPATH, "//label[contains(., 'Telfono')]/following-sibling::input").send_keys(fake.phone_number())

        # --- 4. Fill Tutores Tab ---
        print("Pestaña Tutores: Llenando datos...")
        tutores_tab = driver.find_element(By.XPATH, "//button[normalize-space()='Tutores']")
        js_click(driver, tutores_tab)
        
        tutor_apellido_xpath = "//h3[text()='Tutor 1']/following::label[contains(., 'Apellido')][1]/following-sibling::input"
        wait.until(EC.visibility_of_element_located((By.XPATH, tutor_apellido_xpath))).send_keys(fake.last_name())
        driver.find_element(By.XPATH, "//h3[text()='Tutor 1']/following::label[contains(., 'Nombre')][1]/following-sibling::input").send_keys(fake.first_name())
        driver.find_element(By.XPATH, "//h3[text()='Tutor 1']/following::label[contains(., 'DNI')][1]/following-sibling::input").send_keys(fake.numerify('########'))
        driver.find_element(By.XPATH, "//h3[text()='Tutor 1']/following::label[contains(., 'Teléfono')][1]/following-sibling::input").send_keys(fake.phone_number())

        tutor_prov_xpath = "//h3[text()='Tutor 1']/following::label[contains(., 'Provincia')][1]/following-sibling::select"
        Select(wait.until(EC.element_to_be_clickable((By.XPATH, tutor_prov_xpath)))).select_by_visible_text("Salta")

        tutor_depto_locator = (By.XPATH, "//h3[text()='Tutor 1']/following::label[contains(., 'Departamento')][1]/following-sibling::select")
        Select(wait.until(select_has_options(tutor_depto_locator, 1))).select_by_index(1)

        tutor_loc_locator = (By.XPATH, "//h3[text()='Tutor 1']/following::label[contains(., 'Localidad')][1]/following-sibling::select")
        Select(wait.until(select_has_options(tutor_loc_locator, 1))).select_by_index(1)

        driver.find_element(By.XPATH, "//h3[text()='Tutor 1']/following::label[contains(., 'Calle')][1]/following-sibling::input").send_keys(fake.street_name())
        driver.find_element(By.XPATH, "//h3[text()='Tutor 1']/following::label[contains(., 'Número')][1]/following-sibling::input").send_keys(fake.building_number())

        # --- 5. Fill Inscripcion Tab ---
        print("Pestaña Inscripción: Llenando datos...")
        inscripcion_tab = driver.find_element(By.XPATH, "//button[normalize-space()='Inscripción']")
        js_click(driver, inscripcion_tab)
        
        nivel_select_xpath = "//label[contains(., 'Nivel')]/following-sibling::select"
        Select(wait.until(EC.visibility_of_element_located((By.XPATH, nivel_select_xpath)))).select_by_index(1)
        
        curso_locator = (By.XPATH, "//label[contains(., 'Curso')]/following-sibling::select")
        Select(wait.until(select_has_options(curso_locator, 1))).select_by_index(1)

        driver.find_element(By.XPATH, "//label[contains(., 'Nombre')]/following-sibling::input[contains(@placeholder, 'Escuela')]").send_keys("Escuela de prueba")

        # --- 6. Fill Ficha de Salud Tab ---
        print("Pestaña Ficha de Salud: Llenando datos...")
        ficha_tab = driver.find_element(By.XPATH, "//button[normalize-space()='Ficha de Salud']")
        js_click(driver, ficha_tab)

        alergias_xpath = "//label[contains(., 'Alergias')]/following-sibling::input"
        wait.until(EC.visibility_of_element_located((By.XPATH, alergias_xpath))).send_keys("Ninguna")
        driver.find_element(By.ID, "vacunacion_completa").click()

        # --- 7. Submit Form ---
        print("Formulario completo. Enviando...")
        submit_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Guardar Inscripción')]")))
        js_click(driver, submit_button)

        print("Prueba enviada. Esperando 10 segundos para observar el resultado...")
        time.sleep(10)

    except Exception as e:
        print(f"Ocurrió un error durante la prueba: {e}")

    finally:
        # --- 8. Teardown ---
        print("Cerrando el navegador.")
        if 'driver' in locals():
            driver.quit()
        if os.path.exists(dummy_file_name):
            os.remove(dummy_file_name)
        print("Script de prueba finalizado.")

# ==============================================================================
# Run Script
# ==============================================================================
if __name__ == "__main__":
    test_inscription_form()
