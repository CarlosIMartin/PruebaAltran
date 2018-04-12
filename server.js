/*
server.js -- Aqui se encuentra el archivo principal para iniciar el servidor node.js
*/

//Modulos requeridos.
let clients		= require('./clientsRoute.js');
let policies	= require('./policiesRoute.js');
let login		= require('./loginRoute.js');
let logout 		= require('./logoutRoute.js');
let session		= require('express-session');
let config 		= require('./config/server_config.js');
let express 	= require('express');
let app 		= express();
let bodyParser  = require('body-parser');

//Uso del middleware session para hacer uso de la autenticación.
app.use(session({
	secret: 'prueba',
	resave: false,
	saveUninitialized: false
}));

//Uso del middleware bodyParser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Linkeo de rutas al framework node.
app.use('/clients', clients);
app.use('/policies', policies);
app.use('/login', login);
app.use('/logout', logout);

//Apertura del servidor en el puerto especificado en el archivo de configuración.
app.listen(config.port, () => {
	console.log(`Servidor Node.JS corriendo en localhost:${config.port}`);
});