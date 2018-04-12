/*
clientsRoute.js -- Aquí se encuentran las rutas relacionadas con la obtención de datos
de clients, asociadas al web service clients.
*/

//Modulos requeridos.
let express 	= require('express');
let app			= express();
let bodyParser  = require('body-parser');
let router 		= express.Router();
let clientsController 	= require('./clientsController.js');

//Ruta para obtener un cliente ingresando un client id.
router.get('/id/:id_client', clientsController.id_get);
//Ruta para obtener un cliente ingresando un client name.
router.get('/name/:name_client', clientsController.name_get);

//Exporto el módulo.
module.exports 	= router;