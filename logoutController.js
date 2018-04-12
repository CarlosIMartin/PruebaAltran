/*
logoutController.js -- Aqui se encuentra el controlador para el logout o "desautenticación."
El objetivo de este modulo es proveer toda la funcionalidad necesaria para la desautenticación
del cliente que consiste en eliminar la sesión almacenada en memoria.
*/

//Modulos requeridos.
let express 	= require('express');
let bodyParser  = require('body-parser');
let app 		= express();
let session		= require('express-session');

//Uso del middleware bodyParser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//logout_post es la función encargada de eliminar la sesión y se exporta para ser requerida
//posteriormente en el módulo logoutRoute.js
exports.logout_post  = (req, res) => {
	req.session.destroy((err) => {
		if (err)
			console.log(`Error al eliminar la sesión`);
	});
	console.log(`Cliente desautenticado exitosamente!`);
	res.send(`El cliente ha sido desautenticado correctamente.`);
}

