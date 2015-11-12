
const path = require('path');
const url = require('url');
const jade = require('jade');

module.exports = function(route, data, options, err) {

    try {

        var routed = path.normalize(url.parse(route).pathname);

        if (routed[routed.length - 1] === '/') {
            routed += "index";
        }

        options = options || {};

        var template = jade.compileFile('./pages' + routed + '.jade', options);

        return template(data[path.basename(routed)].locals);

    } catch(e) {
        typeof err === 'function' && err(e);
    }
};
