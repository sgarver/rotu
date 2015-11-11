
const http = require('http');
const path = require('path');
const jade = require('jade');

const rotu = require('./rotu');
const data = require('./data.json');

const server = http.createServer(function (request, response) {

    var html = "";
    var template = "";
    var routed = rotu(request.url);

    console.log('rotu -> ' + routed);

    if (routed === '/favicon.ico') {

        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();

    } else {

        try {

            template = jade.compileFile('./pages' + routed + '.jade');
            html = template(data[path.basename(routed)].locals);

        } catch (e) {

            response.writeHead(200, {"Content-Type": "text/html"});
            response.end('The ' + routed + ' template was not found.');

        } finally {

            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(html);

        }
    }
});

server.listen(8000);
console.log("Server running on port 8000");
