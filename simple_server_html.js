// Load the http module to create an http server.
var http = require('http');
var port = 8080;

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
	console.log("Request to http://127.0.0.1:"+port+"/");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<!DOCTYPE html>");
	response.write("<html>");
	response.write("<head>");
	response.write("<title>simple server</title>");
	response.write("</head>");
	response.write("<body>");
	response.write("<h3>simple server</h3>");
	response.write("<p>a paragraph</p>");
	response.write("</body>");
	response.write("</html>");
	response.end();
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:"+port+"/");
