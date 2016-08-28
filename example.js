
"use strict";

const Rotu = require("rotu");

const config = {}; //pass a config object to the Rotu(config) constructor to override default settings

//config.root = "./page"; // default top-level directory to use for jade templates
//config.options = {}; // set jade engine options
//config.error = (ex) => console.error(ex); // on error callback
//config.port = 8080; // port used to serve rendered html
//config.data = require("./data.json"); // a collection of all jade template names and jade local data

/* example data object
let data = {
    "index": { // template name
        "locals": { ... } // data used by jade for binding to template
    }
}
*/

const rotu = new Rotu(config);
