Prueba backend. Por Carlos I. Martin

					A) --- Estructura ---

El proyecto se encuentra dividido en 4 m�dulos fundamentales:
1) M�dulos controllers
2) M�dulos routes
3) M�dulo principal
4) M�dulos de configuraci�n

1) M�dulos controllers: Aqui encontraremos toda la funcionalidad asociada a la obtenci�n de datos y
autenticaci�n del cliente con la API.

�stos m�dulos son: clientsController.js, policiesController.js, loginController.js y logoutController.js

2) M�dulos routes: Aqui encontraremos todas las rutas a las que se acceder� para la obtenci�n de datos y
autenticaci�n del cliente con la API.

�stos m�dulos son: clientsRoute.js, policiesRoute.js, loginRoute.js y logoutRoute.js

3) M�dulo principal: Aqui tenemos el m�dulo encargado de iniciar todo el proyecto, en �ste caso es el
m�dulo server.js, quien crea el servidor node.js para poder realizar dicha tarea.

4) M�dulos de configuraci�n: Aqui tenemos el m�dulo server_config.js para configurar opciones del servidor
node.js con express y el m�dulo webServices.js donde se encuentran los links a los web services.


					B) --- Rutas y sus verbos HTTP asociados: ---

El proyecto consta de 6 rutas:

B1) POST http://localhost:PORT/login/:username

Donde en PORT ir� el puerto de nuestro servidor node.js/express, por default se encuentra en el 4000.
En ":username" se debe tipear el name del cliente que queremos loguear. Si el username existe, el usuario
se loguear� correctamente, sino se mostrar� un mensaje de error.

B2) POST http://localhost:PORT/logout

Donde en PORT ir� el puerto de nuestro servidor node.js/express, por default se encuentra en el 4000.
Al acceder a �sta ruta automaticamente se eliminara la sesi�n almacenada en memoria.

B3) GET http://localhost:PORT/clients/id/:id_client

Donde en PORT ir� el puerto de nuestro servidor node.js/express, por default se encuentra en el 4000.
En ":id_client" se debe tipear el id del cliente que queremos encontrar.

B4) GET http://localhost:PORT/clients/name/:name_client
Donde en PORT ir� el puerto de nuestro servidor node.js/express, por default se encuentra en el 4000.
En ":name_client" se debe tipear el name del cliente que queremos encontrar.

B5) GET http://localhost:PORT/policies/poluname/:name_client
Donde en PORT ir� el puerto de nuestro servidor node.js/express, por default se encuentra en el 4000.
En ":name_client" se debe tipear el client name para obtener las p�lizas asociadas a dicho cliente.

B6) GET http://localhost:PORT/policies/ulinkpol/:id_policy
Donde en PORT ir� el puerto de nuestro servidor node.js/express, por default se encuentra en el 4000.
En ":id_policy" se debe tipear el id de la p�liza para encontrar el usuario asociado.

Aviso: Para acceder a las rutas B3, B4, B5 y B6 es necesario estar logueado.

					C) --- Funcionamiento ---

Para poder ejecutar el proyecto seguir los siguientes pasos:

C1) Ejecutar la consola de comandos dentro de la carpeta src del proyecto o navegar hasta encontrarse
en la ubicaci�n del archivo server.js
C2) Tipear "npm start" sin las comillas y el servidor se iniciar�.
C3) Navegar a las rutas detalladas en el punto B para probar las funcionalidades.

**Recomiendo utilizar un API Tester como POSTMAN para poder realizar las request al servidor. Durante las pruebas,
he utilizado dicha aplicaci�n**

					D) --- Tecnolog�as utilizadas ---

D1) Node.js y el framework Express para hostear un servidor de prueba.
D2) Express-session para la administraci�n de sesiones.
D3) Lodash para el manejo de funciones de orden superior.
D4) Request para poder retornar objetos de los web services.
D5) BodyParser para parsear entradas de los request.

**Todas las librerias y frameworks utilizadas se encuentran en sus ultimas versiones**

					E) --- Puntos a mejorar ---

E1) Uso de promesas.
E2) Podria tener mayor modularidad la aplicaci�n.
E3) Hacen falta pruebas unitarias, las que hice durante su corto desarrollo fueron logs por consola para corroborar
que los objetos eran casteados y recibidos correctamente.
E4) Recomendaciones que los analistas propongan.