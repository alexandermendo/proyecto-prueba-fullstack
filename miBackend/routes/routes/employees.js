const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usar el nombre original del archivo
  },
});
const upload = multer({ storage: storage });

const execSQL = require("../../database/db_sql");
const { fileRead } = require("./getDataFromFile");

router.get("/", async (req, res, next) => { //Obtener Empleados
  const employees = await execSQL(await fileRead(path.join(__dirname, "../queries/employees.sql")));
  var emp = employees;
  //Obtener los empleados
  res.json({ data: emp });//Retorne los productos en formato json
});


router.post("/createEmployee", upload.single("imgemp"), async (req, res, next) => {
  try {
    const { nomemp, apeemp, paiemp } = req.body;
    const imgemp = req.file ? req.file.filename : ""; // Nombre del archivo de la imagen cargada

    if (!nomemp || !apeemp || !paiemp || !imgemp) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const fileSQL = (await fileRead(path.join(__dirname, "../queries/insertEmployee.sql")))
      .replace("{NomEmp}", nomemp)
      .replace("{ApeEmp}", apeemp)
      .replace("{PaiEmp}", paiemp)
      .replace("{ImgEmp}", imgemp);

    // Aquí ejecuta el SQL y realiza la inserción en la base de datos
    var newEmployee = await execSQL(fileSQL);
    res.json({ data: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el empleado" });
  }
});

module.exports = router;