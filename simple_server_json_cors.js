// Load the http module to create an http server.
var http = require('http');
var port = 8080;

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
	console.log("Request to http://127.0.0.1:"+port+"/");
	response.writeHead(200, {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin" : "*"
	});
	response.write("{");
	response.write('"color" : "red",');
	response.write('"location" : "maryland"');
	response.write("}");
	response.end();
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:"+port+"/");
