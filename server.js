/**
	Description: 	Inicializa el servidor, recibe las peticiones, las desglosa en pathName y parámetros de entrada
**/

var http = require("http"),		//módulo HTTP de Node.js
	url = require("url"),
	formidable =require("formidable"),
	util = require("util");		//módulo URL de Node.js



/**
	Description:	Inicia el servidor y atiende las peticiones entrantes
	Params:			
					route, 	Funcion de enrutado que recibe por parámetro el pathName de la request
					handle, array asociativo de pathName(key) y handler action(value)
**/
function iniciar(route, handle){
	function onRequest(request, response) {
		var postedData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Petición para " + pathname + " recibida.");
		
		route(handle, pathname, response, request);	//route
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Servidor iniciado");
}

exports.iniciar = iniciar;		//Exportar la funcion iniciar como parte de este módulo