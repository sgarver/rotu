
# [![rotu](./rotu.png)](https://www.npmjs.com/package/rotu)  
_micro page routing for [JADE](http://jade-lang.com)_

**v1.1.6**

```javascript

"use strict";

const http = require("http");
const rotu = require("rotu");

let server = http.createServer(function (req, res) {

    const r = new rotu();

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(r.html());
});

server.listen(8000);
```

See [rotu boilerplate](https://github.com/sgarver/rotu-boilerplate) for an example project.

The above _micro_ [Node.js&reg;](https://nodejs.org) application will respond to the request for [http://localhost:8000](http://localhost:8000) by looking in the current directory for a jade template named index.jade, compile the template and then serve the resultant html.

rotu will also route directly to named templates:

[http://localhost:8000/home](http://localhost:8000/home)  
routes to the **./home.jade** template

[http://localhost:8000/home/](http://localhost:8000/home/)   
routes to the **./home/index.jade** template

[http://localhost:8000/home/blog](http://localhost:8000/home/blog)  
routes to the **./home/blog.jade** template

# installation
```bash
$ npm install rotu
```

# configuration

let r = new rotu(**config**) | _object_  
An _optional_ configuration object that can be passed as an argument to the rotu constructor with following default values:  
```javascript
{
    "route": "/",
    "routed": null,
    "root": ".",
    "data": null,
    "options": {
        "pretty": true
    },
    "error": null
}
```

config.**route** | _string_  
The url returned from the http.createServer() request object.

```javascript
config.route = req.url;
```

config.**root** | _string_  
The root path used to override the default which is the _current working directory_.

```javascript
config.root = "./pages";
```

config.**data** | _json_  
The first child of data must be the jade _template name_ (without the .jade extension). This object requires an additional child object named _locals_ containing the data to be bound in the jade template.

```javascript
config.data = {
    "index": {
        "locals": {
            "pageTitle": "Welcome to this Website",
            "youAreUsingJade": true,
            "youAreUsingRotu": true
        }
    },
    "about": {
        "locals": {
            "pageTitle": "About Rotu"
        }
    }
};
```

config.**options** | _object_  
The standard jade configuration object.  
ref: http://jade-lang.com/api/

```javascript
config.options = {
    "pretty": true,
    "debug": true
};
```
config.**error**(exception) | _callback method_  
A callback method that gets called if an exception is thrown during routing or template compilation.

```javascript
config.error = function(ex) {
    response.end("There was a problem processing your template");
    console.log(ex);
};
```

# status
**beta**

During beta rotu will be undergoing frequent changes. Updates may contain breaking changes until rotu's status has been elevated.
