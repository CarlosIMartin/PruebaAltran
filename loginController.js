/*
loginController.js -- Aqui se encuentra el controlador para el login o "autenticación."
El objetivo de este modulo es proveer toda la funcionalidad necesaria para la autenticación
del cliente que consiste en crear una sesión y almacenarla en memoria mientras el servidor
se encuentre activo o el cliente de desautentique. 
*/

//Modulos requeridos.
let express 	= require('express');
let bodyParser  = require('body-parser');
let request		= require('request');
let webServices = require('./webServices.js');
let app 		= express();
let _ = require('lodash');
let session		= require('express-session');
let sess;

//Uso del middleware bodyParser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//login_post es la función encargada de loguear o autenticar al cliente creando una sesión temporal
//y se exporta para ser requerida posteriormente en el módulo loginRoute.js
exports.login_post = (req, res) => {
	//Obtención de la sesión almacenada en memoria al instante que se llame a esta función.
	sess = req.session;
	//console.log(req.session); //Test para mostrar la cookie almacenada para dicha sesión.

	//Si existe un cliente logueado:
	if(sess._id) {
		res.send(`ATENCIÓN! El cliente ${sess._name} con id ${sess._id} ya se encuentra autenticado.`);
	}
	//Si no existe un cliente logueado:
	else {
		//Se hace una petición GET al web service de clients para buscar el name del cliente ingresado.
		request.get(webServices.clientService, (err, res2, bodyClients) => {
		//Se reciben todos los clientes del web service clients y en caso de no haber error, busco el cliente 
		//específico.
			if (!err) {
				//Se guarda en clients todo el objeto del servicio clients.
				let clients = JSON.parse(bodyClients);
				//Procesamiento del objeto clients para la búsqueda del cliente ingresado.
				let client = _.find(clients.clients, {'name': req.params.name_client});
				//Si se ha encontrado un cliente:
				if (client) {
					console.log(`Cliente autenticado exitosamente!`);
					//console.log(client); //Test para mostrar los detalles del cliente por consola.
					//Asigno variables de sesión para almacenar datos del usuario.
					sess._id = client.id;
					sess._name = client.name;
					sess._email = client.email;
					sess._role = client.role;				
					res.send(`El cliente ${sess._name} con id ${sess._id} ha sido autenticado correctamente!`);
				}
				//Si no se ha encontrado un cliente:
				else {
					res.send(`El cliente ingresado no existe!`);
				}
			}
		});
	}
	
}