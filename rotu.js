
"use strict";

const path = require("path");
const url = require("url");
const jade = require("jade")

module.exports = class rotu {

    constructor(config) {

        this.config = {
            "route": "/",
            "routed": null,
            "root": ".",
            "data": null,
            "options": { "pretty": true },
            "error": null,
            "missing": "./404"
        };

        if (config) {
            Object.assign(this.config, config);
        }
    }
    route() {

        let routed = path.normalize(url.parse(this.config.route).pathname);

        const endpoint = routed[routed.length - 1];

        if (endpoint === "/" || endpoint === "\\") {
            routed += "index";
        }

        this.config.routed =  routed;
    }
    html() {

        try {

            this.route();

            const filename = path.basename(this.config.routed);
            const template = jade.compileFile(this.config.root + this.config.routed + ".jade", this.config.options);

            console.log("rotu >>> " + this.config.routed);

            if (this.config.data) {
                return template(this.config.data[filename].locals);
            } else {
                return template();
            }

        } catch (ex) {

            if (ex.code === "ENOENT") {

                const template = jade.compileFile(this.config.missing + ".jade", this.config.options);

                console.log("template missing >>> " + this.config.routed);

                return template();
            }

            typeof this.config.error === "function" && this.config.error(ex);
        }
    }
}
