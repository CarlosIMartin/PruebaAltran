/*
loginRoute.js -- Aquí se encuentran la ruta relacionada con la autenticación del cliente.
*/

//Modulos requeridos.
let express 	= require('express');
let app			= express();
let bodyParser  = require('body-parser');
let router 		= express.Router();
let loginController = require('./loginController.js');

//Ruta para autenticar el usuario.
router.post('/:name_client', loginController.login_post);

//Exporto el módulo.
module.exports 	= router;