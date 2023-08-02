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
const { createEmployee } = require("../../../common/utils");

router.get("/employee", async (req, res, next) => { //Obtener Empleados
  const employees = await execSQL(await fileRead(path.join(__dirname, "../queries/employees.sql")));
  var emp = employees; //Obtener los empleados
  res.json({ data: emp });//Retorne los productos en formato json
});


router.post("/employeeCreate", upload.single("imgemp"), async (req, res, next) => {
  try {
    const { nomemp, apeemp, paiemp } = req.body;
    const imgemp = req.file ? req.file.filename : ""; // Nombre del archivo de la imagen cargada
    const result = await createEmployee(nomemp, apeemp, paiemp, imgemp, execSQL, res);
    res.json("Empleado creado satisfactoriamente.", result);
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;