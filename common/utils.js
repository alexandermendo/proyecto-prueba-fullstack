// Este es el archivo de utilidades que tiene como objetivo almacenar funciones para reutilización y limpieza de código.

/**
 * Crea un nuevo empleado en la base de datos.
 * 
 * @param {string} nomemp - Nombre del empleado.
 * @param {string} apeemp - Apellido del empleado.
 * @param {string} paiemp - País del empleado.
 * @param {string} imgemp - Nombre de la imagen del empleado.
 * @param {Function} execSQL - Función para ejecutar el SQL y realizar la inserción en la base de datos.
 * @param {Object} res - Respuesta HTTP para enviar la respuesta al cliente.
 */
export const createEmployee = async (nomemp, apeemp, paiemp, imgemp, execSQL, res) => {
  try {
    // Comprobamos que todos los campos requeridos están presentes.
    if (!nomemp || !apeemp || !paiemp || !imgemp) {
      return res.status(400).json({ error: "Faltan campos requeridos" }); // Si faltan campos requeridos, enviamos una respuesta de error al cliente.
    }

    // Leemos el contenido del archivo "insertEmployee.sql" y reemplazamos los marcadores con los datos del empleado.
    const fileSQL = path.join(__dirname, "../miBackend/routes/queries/insertEmployee.sql")
      .replace("{NomEmp}", nomemp)
      .replace("{ApeEmp}", apeemp)
      .replace("{PaiEmp}", paiemp)
      .replace("{ImgEmp}", imgemp);

    console.log("Ruta::", __dirname);  // Imprimimos la ruta actual del archivo.
    const newEmployee = await execSQL(fileSQL); // Aquí ejecutamos el SQL con los datos del empleado y realizamos la inserción en la base de datos.
    console.log("Empleado:", newEmployee); // Imprimimos en consola los datos del nuevo empleado obtenidos tras la inserción.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el empleado" });
  }
}

export const getEmployees = async () => {
  try {
    const response = await fetch('http://localhost:3002/employees/employee'); // Reemplaza '/ruta-del-backend' con la URL real del endpoint del backend donde obtienes los empleados
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    return [];
  }
}


