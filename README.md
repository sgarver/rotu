
# [![Rotu](./rotu.png)](https://www.npmjs.com/package/rotu)  
_Micro page routing for [Pug](https://pugjs.org)_.

**v2.0**

# The Basics

```javascript
// app.js
const Rotu = require("Rotu");
const rotu = new Rotu();
```

```bash
$ npm install rotu
$ node app.js
Rotu running on port 8000
```

The above _micro_ [Node.js&reg;](https://nodejs.org) application will respond to the request for [http://localhost:8000](http://localhost:8000) by looking in the current directory for a template named index.pug, compile the template and then serve the rendered html.

For example:  
[http://localhost:8000/home](http://localhost:8000/home)  
routes to the **./home.pug** template

[http://localhost:8000/home/](http://localhost:8000/home/)   
routes to the **./home/index.pug** template

[http://localhost:8000/home/blog](http://localhost:8000/home/blog)  
routes to the **./home/blog.pug** template

# Configuration

const rotu = new Rotu(**config**) | _object_  
An _optional_ configuration object that can be passed as an argument to the Rotu constructor with following default values:  
```javascript
var config = {
    "route": "/",
    "routed": null,
    "root": ".",
    "data": null,
    "options": {
        "pretty": true
    },
    "error": null
};
```

config.**root** | _string_  
The root path used to override the default which is the _current working directory_.

```javascript
config.root = "./pages";
```

config.**data** | _json_  
The first descendent of data must be the  _template name_ (without the . extension). This object requires an additional child object named _locals_ containing the data to be bound in the  template.

```javascript
config.data = {
    "index": {
        "locals": {
            "pageTitle": "Welcome",
            "youAreUsingPug": true,
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
The standard  configuration object.  
ref: https://pugjs.org

```javascript
config.options = {
    "pretty": true,
    "debug": true
};
```
config.**error**(error) | _callback method_  
A callback method that gets called if an exception is thrown during routing or template compilation.

```javascript
config.error = function(error) {
    response.end("There was a problem processing your template");
    console.log(error.message);
};
```
