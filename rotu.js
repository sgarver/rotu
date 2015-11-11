
const path = require('path');
const url = require('url');

module.exports = function(route) {

    var routed = path.normalize(url.parse(route).pathname);

    if (routed[routed.length - 1] === '/') {
        routed += "index";
    }

    return routed;
};
