/*
clientsController.js -- Aqui se encuentra el controlador para los clients. Todas las funcionalidades
acerca de la búsqueda de clientes referida a la URL ../clients/.. se encuentra en éste modulo.
*/

//Modulos requeridos.
let express 	= require('express');
let bodyParser  = require('body-parser');
let request		= require('request');
let webServices = require('./webServices.js');
let app 		= express();
let _ = require('lodash');
let sess;

//Uso del middleware bodyParser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//id_get es la función encargada de buscar un cliente por su ID. Se exporta para ser
//requerida posteriormente en el módulo clientsRoute.js
exports.id_get  = (req, res) => {
	//Obtención de la sesión almacenada en memoria al instante que se llame a esta función.
	sess = req.session;

	//Si existe un cliente logueado:
	if (sess._id) {
		//Se hace una petición GET al web service de clients para luego buscar el ID del cliente ingresado.
		request.get(webServices.clientService, (err, res2, bodyClients) => {
		//Se reciben todos los clientes del web service clients y en caso de no haber error, busco el cliente 
		//específico por su ID.
			if (!err) {
				//Se guarda en clients todo el objeto del servicio clients.
				let clients = JSON.parse(bodyClients);
				//Se verifica que el cliente que intenta acceder posee los privilegios necesarios.
				if (sess._role == 'user' || sess._role == 'admin') {
					//Procesamiento del objeto clients para la búsqueda del cliente ingresado.
					let client = _.find(clients.clients, {'id': req.params.id_client});
					//console.log(client) //Test para mostrar el cliente obtenido por consola.
					//Si el cliente se encontró con el ID enviado, se lo muestra.
					if (client)
						res.send(client);
					//Si no se encuentra el cliente, se muestra un mensaje de aviso.
					else
						res.send(`El id proporcionado no corresponde a un cliente real.`);
				}
				//Si el cliente que intenta acceder no posee los privilegios necesarios:
				else
					res.send(`El cliente logueado no posee los privilegios necesarios para obtener
						los datos requeridos.`);
			}
		});
	}
	//Si no existe un cliente logueado:
	else {
		res.send(`ERROR: No se ha autenticado un cliente.`);
	}
}

//name_get es la función encargada de buscar un cliente por su name. Se exporta para ser
//requerida posteriormente en el módulo clientsRoute.js
exports.name_get  = (req, res) => {
	//Obtención de la sesión almacenada en memoria al instante que se llame a esta función.
	sess = req.session;

	//Si existe un cliente logueado:
	if (sess._id) {
		//Se hace una petición GET al web service de clients para luego buscar el name del cliente ingresado.
		request.get(webServices.clientService, (err, res2, bodyClients) => {
		//Se reciben todos los clientes del web service clients y en caso de no haber error, busco el cliente 
		//específico por su name.
			if (!err) {
				//Se guarda en clients todo el objeto del servicio clients.
				let clients = JSON.parse(bodyClients);
				//Se verifica que el cliente que intenta acceder posee los privilegios necesarios.
				if (sess._role == 'user' || sess._role == 'admin') {
					//Procesamiento del objeto clients para la búsqueda del cliente ingresado.
					let client = _.find(clients.clients, {'name': req.params.name_client});
					//console.log(client) //Test para mostrar el cliente obtenido por consola.
					//Si el cliente se encontró con el name enviado, se lo muestra.
					if (client)
						res.send(client);
					//Si no se encuentra el cliente, se muestra un mensaje de aviso.
					else
						res.send(`El username proporcionado no corresponde a un cliente real.`);
				}
				//Si el cliente que intenta acceder no posee los privilegios necesarios:
				else
					res.send(`El cliente logueado no posee los privilegios necesarios para obtener
						los datos requeridos.`);
			}
		});
	}
	//Si no existe un cliente logueado:
	else {
		res.send(`ERROR: No se ha autenticado un cliente.`);
	}
}