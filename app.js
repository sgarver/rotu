
const fs = require('fs');
const http = require('http');
const url = require('url');
const jade = require('jade');

const pageData = require('./pageData.json');

const server = http.createServer(function (request, response) {

    var path = url.parse(request.url).pathname;
    const options = {};

    response.writeHead(200, {"Content-Type": "text/html"});

    if (path === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();
    } else {

        try {

            if (path === '/') {
                path = "/home"
            }

            const template = jade.compileFile('./pages/' + path + '.jade', options);
            var html = template(pageData[path.replace(/\//g, '')].locals);
        } catch (e) {
            html = "404 File Not Found"
            console.log(e);
        } finally {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(html);
            console.log('page served');
        }
    }
});

server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");
