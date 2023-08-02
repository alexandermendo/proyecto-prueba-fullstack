//Por lo general, las promesas sirven para manejar los procesos asíncronos 
var Connection = require("tedious").Connection; //Librería sql para la conexión a la base de datos
const config = require("./configsql.json");
var Request = require("tedious").Request;


/**
 * Ejecuta una consulta SQL en la base de datos.
 *
 * @async
 * @function
 * @param {string} q - Consulta SQL a ejecutar.
 * @param {object} con - Objeto "Connection" que representa la conexión a la base de datos.
 * @returns {Promise} - Resuelve con un arreglo de objetos que representan las filas devueltas por la consulta.
 * @throws {Error} - Lanza un error si hay algún problema al ejecutar la consulta.
 */
var exec = async (q, con) => {
  return new Promise((res, rej) => {
    try {
      var req = new Request(q, (err) => {
        if (err) console.log(err);
      });
      var rows = []; //Almacena los resultados de la consulta
      req.on("row", (cols) => {
        var row = {}; //Obtiene la fila de los resultados de la base de datos
        cols.forEach((col) => {
          if (col.value !== null) row[col.metadata.colName] = col.value;
        });
        rows.push(row);//Agrega un objeto de tipo row al final del arreglo.
      });
      req.on("done", (rowCount, more) => {
        console.log(rowCount + " rows returned"); //Imprime la cantidad de filas devueltas en la consola 
      });
      req.on("requestCompleted", (rowCount, more) => { //Este evento se activa cuando se ha completado la solicitud de consulta.
        con.close(); //Cierra la conexión cuando se completa la solicitud.
        res(rows); // Resuelve la promesa con los resultados obtenidos.
      });
      con.execSql(req);
    } catch (error) {
      console.log("exec conecto a sql pero no consulto, el defecto es:");
      console.log(error);
    }
  })
};


/**
 * Ejecuta una consulta SQL en la base de datos utilizando la configuración especificada en "configsql.json".
 *
 * @async
 * @function
 * @param {string} q - Consulta SQL a ejecutar.
 * @returns {Promise} - Resuelve con un arreglo de objetos que representan las filas devueltas por la consulta.
 * @throws {Error} - Lanza un error si hay algún problema al conectar o ejecutar la consulta.
 */
var execSQL = async (q) => {
  try {
    return new Promise((res, reject) => {
      try {
        var con = new Connection(config);
        con.on("connect", async (err) => {
          if (err) console.log(err);
          res(await exec(q, con));  //Espera la ejecución de la consulta SQL y resolver la promesa con los resultados obtenidos de la consulta
        });
        con.connect(); //Conecta y ejecuta la consulta
      } catch (e) {
        console.log("Error al conectar"+e)
      }
    });
  } catch (e) {
    console.log("execSQL no conecto, el defecto es:");
    console.log(e);
  }
};
module.exports = execSQL;

