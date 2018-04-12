/*
policiesRoute.js -- Aquí se encuentran las rutas relacionadas con la obtención de datos
de las policies, asociadas al web service policies.
*/

//Modulos requeridos.
let express 	= require('express');
let app			= express();
let bodyParser  = require('body-parser');
let router 		= express.Router();
let policesController 	= require('./policiesController.js');

//Ruta para la obtención de todas las pólizas asociadas a un client name.
router.get('/poluname/:name_client', policesController.policiesOfClient_get);
//Ruta para la obtención del cliente asociado a un policy id.
router.get('/ulinkpol/:id_policy', policesController.clientWithPolicy_get);

//Exporto el módulo.
module.exports 	= router;