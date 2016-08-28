
"use strict";

const path = require("path");
const url = require("url");
const pug = require("pug")

module.exports = class Router {

    constructor(config) {

        this.config = {
            routed: null,
            root: ".",
            data: null,
            options: { "pretty": true },
            error: null
        };

        if (config) {
            Object.assign(this.config, config);
        }
    }

    getRouted(route) {

        try {

            let routed = path.normalize(url.parse(route).pathname);
            const endpoint = routed[routed.length - 1];

            if (endpoint === "/" || endpoint === "\\") {
                routed += "index";
            }

            this.config.routed =  routed;

        } catch (error) {
            console.error(`Rotu >>> Router.getRouted() exception. Message: ${error.message}`);
        }
    }

    getHtml(route) {

        this.getRouted(route);

        try {

            const filename = path.basename(this.config.routed);
            const template = pug.compileFile(`${this.config.root}${this.config.routed}.pug`, this.config.options);

            console.log(`Rotu >>> ${this.config.routed}`);

            if (this.config.data) {
                return template(this.config.data[filename].locals);
            } else {
                return template();
            }

        } catch (error) {

            if (error.code === "ENOENT") {
                console.error(`Rotu >>> Template missing: ${this.config.routed}`);
            }

            console.error(`Rotu >>> router.getHtml exception. Message: ${error.message}`);

            typeof this.config.error === "function" && this.config.error(ex);
        }
    }
}
