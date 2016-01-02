var path = require("path");
var url = require("url");
var jade = require("jade");

module.exports = (function() {

    return {
        "config": {
            "route": "/",
            "routed": null,
            "root": ".",
            "data": null,
            "options": {"pretty": true},
            "error": null,
            "missing": "./404"
        },
        "route": function() {

            this.routed = path.normalize(url.parse(this.config.route).pathname);

            var endpoint = this.routed[this.routed.length - 1];

            if (endpoint === "/" || endpoint === "\\") {
                this.routed += "index";
            }

            return this.routed;

        },
        "html": function() {

            try {

                this.route();

                var filename = path.basename(this.routed);
                var template = jade.compileFile(this.config.root + this.routed + ".jade", this.config.options);

                console.log("rotu >>> " + this.routed);

                if (this.config.data) {
                    return template(this.config.data[filename].locals);
                } else {
                    return template();
                }

            } catch (ex) {

                if (ex.code === "ENOENT") {
                    var template = jade.compileFile(this.config.missing + ".jade", this.config.options);

                    console.log("template missing >>> " + this.routed);
                    return template();
                }

                typeof this.config.error === "function" && this.config.error(ex);

            }
        }
    };
})();
