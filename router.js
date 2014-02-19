/**
	Description: 	Funciones de enrutado de una petici�n a los controladores adecuados
**/
var formidable = require("formidable"),
	util = require("util");



/**
	Description:	Selecciona el controlador adecuado para cada petici�n en funci�n de su pathName
	Params:			
					handle, array asociativo de pathName(key) y handler action(value)
					pathName, 	pathName de la petici�n
					response,  objeto donde se volcar� la respuesta
	Return:
					resultado de ejecutar el handler action
**/
function route(handle, pathname, response, request) {
	console.log("A punto de rutear una peticion para " + pathname);
  
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("No se encontro manipulador para " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;