var fs = require("fs"),
	formidable = require("formidable"),
	util = require('util');

function iniciar(response, data) {
  console.log("Manipulador de peticiones 'iniciar' fue llamado.");

  var body =     '<form action="/subir" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>';

    writeResponse(response, 200, body);
}

function subir(response, request) {
	console.log("Manipulador de petición 'subir' fue llamado.");
	//console.log("Request:"+util.inspect(request));
	
	var form = new formidable.IncomingForm();
	console.log("Parseando");
	form.parse(request, function(error, fields, files){

		if(files){
		
			console.log("Parseado terminado");
		
			fs.readFile(files.upload.path, function(error, data){
				var newPath = __dirname.replace(/\\/g,"/") + "/tmp/test.png";
				console.log("Escribiendo archivo "+newPath);
				fs.writeFile(newPath, data);
			});
			
			var body = "<p>Imagen recibida:</p> " + 
						"<img src='/mostrar'>";
		}else{
			var body = "No se ha recibido ninguna imagen";
		}
		
		writeResponse(response, 200, body);
		
		
	});

}

function mostrar(response, data) {
	console.log("Manipulador de petición 'mostrar' fue llamado.");
	
	fs.readFile(__dirname.replace(/\\/g,"/") + "/tmp/test.png", "binary", function(error, file) {
		if(error) {
			writeResponse(response, 500, error + "\n");
		} else {
			writeResponse(response, 200, file, "image/png", "binary");
		}
	});
}

//Private
function writeResponse(response, statusHTML, text, contentType, format){
	contentType |= "text/html";

	response.writeHead(statusHTML, {"Content-Type": contentType});
	if(format)
		response.write(text, format);
	else
		response.write(text);
	response.end();
}

exports.iniciar = iniciar;
exports.subir = subir;
exports.mostrar = mostrar;