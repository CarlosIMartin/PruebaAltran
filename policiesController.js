/*
policiesController.js -- Aqui se encuentra el controlador para las policies. Todas las funcionalidades
acerca de la búsqueda de pólizas referida a la URL ../policies/.. se encuentra en éste modulo.
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

//policiesOfClient_get es la función encargada de la búsqueda de todas las pólizas relacionadas con el
//name de un client. Se exporta para ser requerida posteriormente en el módulo policiesRoute.js
exports.policiesOfClient_get  = (req, res) => {
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
				if (sess._role == 'admin') {
					//Procesamiento del objeto clients para la búsqueda del cliente ingresado.
					let client = _.find(clients.clients, {'name': req.params.name_client});		
					//console.log(client) //Test para mostrar el cliente obtenido por consola.
					//Si el cliente se encontró con el name enviado, busco las pólizas linkeadas a ese client name:
					if (client)
						//Se hace una petición GET al web service de policies para luego 
						//buscar las pólizas asociadas al client name enviado.
						request.get(webServices.policyService, (err, res3, bodyPolicies) => {
						//Se reciben todas las pólizas del web service policies y en caso de no haber error, 
						//busco las pólizas asociadas al client name específico.
							if (!err) {
								//Procesamiento y búsqueda del objeto policies y policiesOfClient.
								let policies = JSON.parse(bodyPolicies);
								let policiesOfClient = _.filter(policies.policies, {'clientId': client.id});

								//Si hay pólizas para el client name ingresado las muestro.
								if (policiesOfClient.length > 0) 
									res.send(policiesOfClient);
								//Si no hay pólizas para el client name ingresado:
								else
									res.send(`No se han encontrado policies para el cliente ingresado.`);
							}
						});
					//Si el client name ingresado es erróneo o no existe:
					else
						res.send(`El username proporcionado no corresponde a un cliente real.`);
				}
				//Si el cliente que intenta acceder no posee los privilegios necesarios:
				else
					res.send(`El cliente logueado no posee los privilegios necesarios para obtener los datos requeridos.`);
			}
		});
	}
	//Si no existe un cliente logueado:
	else {
		res.send(`ERROR: No se ha autenticado un cliente.`);
	}
}

//clientWithPolicy_get es la función encargada de la búsqueda de un cliente asociado a un policy id.
//Se exporta para ser requerida posteriormente en el módulo policiesRoute.js
exports.clientWithPolicy_get  = (req, res) => {
	//Obtención de la sesión almacenada en memoria al instante que se llame a esta función.
	sess = req.session;

	//Si existe un cliente logueado:
	if (sess._id) {
		//Se hace una petición GET al web service de policies para luego 
		//buscar el usuario asociado al client id que se encuentra en la póliza a buscar.
		request.get(webServices.policyService, (err, res2, bodyPolicies) => {
			//Se reciben todas las pólizas del web service policies y en caso de no haber error, 
			//busco la póliza asociada al policy id ingresado.
			if (!err) {
				//Procesamiento y búsqueda del objeto policies y userOfPolicy.
				let policies = JSON.parse(bodyPolicies);
				//Se verifica que el cliente que intenta acceder posee los privilegios necesarios.
				if (sess._role == 'admin') {
					//Se hace una búsqueda en el objeto policies con el fin de encontrar la póliza 
					//asociada al policy id ingresado.
					let userOfPolicy = _.find(policies.policies, {'id': req.params.id_policy});		
					//Si existe:
					if (userOfPolicy) {
						//Se hace una petición GET al web service de clients para luego
						//buscar el usuario asociado al clientId de la póliza encontrada anteriormente.
						request.get(webServices.clientService, (err, res3, bodyClients) => {
							if (!err) {
								//Procesamiento del objeto clients y client.
								let clients = JSON.parse(bodyClients);
								let client = _.find(clients.clients, {'id': userOfPolicy.clientId});

								//Si existe un cliente para el policy id se lo muestra:
								if(client) 
									res.send(client);
								//Si no existe:
								else
									res.send(`No se ha encontrado un cliente para el policy id ingresado.`)
							}
						});
					}
					//Si el policy id ingresado no existe:
					else
						res.send(`El policy id ingresado no es correcto.`);
				}
				//Si el cliente que intenta acceder no posee los privilegios necesarios:
				else
					res.send(`El cliente logueado no posee los privilegios necesarios para obtener los datos requeridos.`);
			}
		});
	}
	//Si no existe un cliente logueado:
	else {
		res.send(`ERROR: No se ha autenticado un cliente.`);
	}
}