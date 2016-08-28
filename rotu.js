
"use strict";

const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const mime = require("mime");
const Router = require("./router");

module.exports = class Rotu {

    constructor(config) {

        config = config || {};

        this.startServer(config);
    }

    startServer(config) {

        const router = new Router(config);

        let server = http.createServer( (request, response) => {

            mime.default_type = "text/pug";

            const contentType = mime.lookup(request.url);

            if (contentType === "text/pug") {

                const html = router.getHtml(request.url);

                response.writeHead(200, {"Content-Type": "text/html"});
                response.end(html);

            } else {

                const uri = url.parse(request.url).pathname;
                const filename = path.join(process.cwd(), uri);

                fs.readFile(filename, "binary", function(err, file) {

                    if (err) {
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write(err + "\n");
                        response.end();
                        return;
                    }

                    response.writeHead(200, {"Content-Type": contentType});
                    response.write(file, "binary");
                    response.end();
                });
            }
        });

        const port = (config && config.port) || 8000;

        server.listen(port);
        console.log(`Rotu running on port ${port}`);
    }
}


