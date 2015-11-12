
const http = require('http');

const rotu = require('./rotu');
const data = require('./data.json');

const server = http.createServer(function (request, response) {

    if (request.url === '/favicon.ico') {

        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();

    } else {

        response.writeHead(200, {"Content-Type": "text/html"});

        var html = rotu(request.url, data, {"pretty": true}, function(e) {

            if (e.errno === 34) {
                response.end('This page was not found.');
            } else {
                response.end('There was a problem processing your template');
                console.log(e);
            }
        });

        response.end(html);
    }
});

server.listen(8000);
console.log("Server running on port 8000");
