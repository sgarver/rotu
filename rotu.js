
const path = require('path');
const url = require('url');
const jade = require('jade');

module.exports = function(route, data, options, err) {

    try {

        options = options || {};

        var routed = path.normalize(url.parse(route).pathname);

        if (routed[routed.length - 1] === '/') {
            routed += "index";
        }

        const filename = path.basename(routed);
        const template = jade.compileFile('./pages' + routed + '.jade', options);

        return template(data[filename].locals);

    } catch(e) {
        typeof err === 'function' && err(e);
    }
};
