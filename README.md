# Metalsmith Basic Auth
A Metalsmith plugin to enable HTTP basic authentication via front-matter attributes.

- So far, this is only supports authentication using Apache .htaccess files.
- HTTP basic authentication is only truly safe when using HTTPS.

## Installation
```sh
$ npm install metalsmith-basic-auth
```

## Usage
```js
var auth = require('metalsmith-basic-auth');
var metalsmith = require('Metalsmith');

metalsmith.use(auth({

    // Required: path to the root of your site on the server:
    serverPath: '/var/www/my-site',

    // Optional: name displayed in auth dialog:
    authName: 'My Protected Area'
}));
```

Add the following to your front matter:
```yaml
---
auth:
    user: username
    pass: password
---
```

`.htaccess` and `.htpasswd` files will be generated and placed alongside the output file.

