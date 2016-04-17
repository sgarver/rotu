
# [![rotu](./rotu.png)](https://www.npmjs.com/package/rotu)  
_micro page routing for [JADE](http://jade-lang.com)_

**v1.1.4**

```javascript
var http = require("http");
var rotu = require("rotu");

var server = http.createServer(function (req, res) {

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(rotu.html());
});

server.listen(8000);
```

See [rotu boilerplate](https://github.com/sgarver/rotu-boilerplate) for example project.

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

rotu.**config** | _object_  
An options object with following default values:  
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




rotu.config.**route** | _string_  
The url returned from the http.createServer() request object.

```javascript
rotu.config.route = req.url;
```

rotu.config.**root** | _string_  
The root path used to override the default which is the _current working directory_.

```javascript
rotu.config.root = "./pages";
```

rotu.config.**data** | _json_  
The first child of data must be the jade _template name_ (without the .jade extension). This object requires an additional child object named _locals_ containing the data to be bound in the jade template.

```javascript
rotu.config.data = {
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

rotu.config.**options** | _object_  
The standard jade configuration object.  
ref: http://jade-lang.com/api/

```javascript
rotu.config.options = {
    "pretty": true,
    "debug": true
};
```
rotu.config.**error**(exception) | _callback method_  
A callback method that gets called if an exception is thrown during routing or template compilation.

```javascript
rotu.config.error = function(ex) {
    response.end("There was a problem processing your template");
    console.log(ex);
};
```




# status
**beta**

During beta rotu will be undergoing frequent changes. Updates may contain breaking changes until rotu's status has been elevated.
