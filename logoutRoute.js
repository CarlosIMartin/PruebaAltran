/*
logoutRoute.js -- Aquí se encuentran la ruta relacionada con la desautenticación del cliente.
*/

//Modulos requeridos.
let express 	= require('express');
let app			= express();
let bodyParser  = require('body-parser');
let router 		= express.Router();
let logoutController = require('./logoutController.js');

//Ruta para desautenticar el usuario.
router.post('/', logoutController.logout_post);

//Exporto el módulo.
module.exports 	= router;