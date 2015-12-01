
# [![rotu - minimal page routing for jade](./rotu.png)](https://https://www.npmjs.com/package/rotu)
_minimal page routing for jade_

```javascript
const http = require('http');
const rotu = require('rotu');

const server = http.createServer(function (request, response) {

    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(rotu(request.url));
});

server.listen(8000);
```

# installation
```bash
npm install rotu
```
# status
**alpha**

**rotu** is currently alpha, undergoing many changes and is not yet production ready

use at your own risk
