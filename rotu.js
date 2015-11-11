
const path = require('path');
const url = require('url');

module.exports = function(routed) {

    var routed = path.normalize(url.parse(routed).pathname);

    if (routed[routed.length - 1] === '/') {
        routed += "index";
    }

    return routed;
};
