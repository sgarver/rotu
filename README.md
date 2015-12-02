
# [![rotu - minimal page routing for jade](./rotu.png)](https://www.npmjs.com/package/rotu)
_minimal page routing for jade_

```javascript
const http = require('http');
const rotu = require('rotu');

const server = http.createServer(function (req, res) {

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(rotu(req.url));
});

server.listen(8000);
```

# installation
```bash
$ npm install rotu
```

# options
**rotu**(**route**, [root, data, options, err]) **html** | string |

**route** | string | _required_  
The url returned from the http.createServer() request object.

```javascript
rotu(req.url)
```

**root** | string | _optional_  
The root path used to override the default which is the _current working directory_.

```javascript
rotu(req.url, './pages')
```

**data** | json | _optional_  
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

rotu(req.url, './pages', data);
```

**options** | json | _optional_  
Standard jade configuration object.

```javascript
var html = rotu(request.url, './pages', data, {"pretty": true});
```

**err**(exception) | function | _optional_  
Callback function to execute if exceptions are thrown during routing or template compilation.

```javascript
var html = rotu(request.url, './pages', data, {"pretty": true}, function(e) {

    if (e.errno === 34) {
        response.end('This page was not found.');
    } else {
        response.end('There was a problem processing your template');
        console.log(e);
    }
});
```




# status
**alpha**

**rotu** is currently alpha and undergoing many changes.  
Use at your own risk.
