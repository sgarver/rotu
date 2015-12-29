
# [![rotu](./rotu.png)](https://www.npmjs.com/package/rotu)  
**v1.1.0**

_micro page routing for jade_
```javascript
var http = require("http");
var rotu = require("rotu");

var server = http.createServer(function (req, res) {

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(rotu(req.url));
});

server.listen(8000);
```

# installation
```bash
$ npm install rotu
```

# configuration
<!-- **rotu**(**route**[, root, data, options, err]) **html** | string | -->

**rotu.config** | options object with default values  
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
rotu(req.url);
```

rotu.config.**root** | _string_  
The root path used to override the default which is the _current working directory_.

```javascript
rotu(req.url, "./pages");
```

rotu.config.**data** | _json_  
The first child of data must be the jade **template name** (without the .jade extension). This object requires an additional child object named **locals** which contains the data to be bound to the jade template.

```javascript
var data = {
    "index": {
        "locals": {
            "pageTitle": "Welcome to Rotu",
            "youAreUsingJade": true
        }
    },
    "about": {
        "locals": {
            "pageTitle": "About Rotu",
            "youAreUsingJade": true
        }
    }
};

rotu(req.url, "./pages", data);
```

rotu.config.**options** | _json_  
Standard jade configuration object.

```javascript
var html = rotu(req.url, "./pages", data, {"pretty": true});
```

rotu.config.**error**(exception) | _callback method_  
Callback method called if an exception is thrown during routing or template compilation.

```javascript
var html = rotu(req.url, "./pages", data, {"pretty": true}, function(ex) {

    if (ex.errno === 34) {
        response.end("This page was not found.");
    } else {
        response.end("There was a problem processing your template");
        console.log(ex);
    }
});
```




# status
**alpha**

**rotu** is currently alpha and will be undergoing many changes.  
Update at your own risk.
