"use strict";

var http = require('http');

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello, World!');
}).listen(8081);

console.log('Application is listening at port: 8081');