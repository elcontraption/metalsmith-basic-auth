const auth = require('../src');
const fs = require('fs');
const Metalsmith = require('metalsmith');
const should = require('should');

describe('metalsmith-basic-auth', function () {

    it('should require the `serverPath` setting', function (done) {
        Metalsmith('test/fixtures')
            .use(auth())
            .build(function (err) {
                err.should.equal('serverPath setting is required');
                done();
            });
    });

    it('should add .htaccess and .htpasswd files alongside a protected file', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(auth({
                serverPath: '/path/on/server'
            }))
            .build(function (err) {
                if (err) console.log(err);

                fs.statSync('./test/fixtures/expected/.htaccess').isFile().should.be.true();
                fs.statSync('./test/fixtures/expected/.htpasswd').isFile().should.be.true();

                done();
            });
    });

    it('should add the correct contents to the .htaccess file', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(auth({
                serverPath: '/path/on/server'
            }))
            .build(function (err) {
                if (err) console.log(err);

                var file = fs.readFileSync('./test/fixtures/expected/.htaccess');

                String(file).should.equal('AuthType Basic\nAuthName "Protected Area"\nAuthUserFile /path/on/server/.htpasswd\nRequire valid-user');

                done();
            });
    });

    it('should update AuthName with authName option', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(auth({
                serverPath: '/path/on/server',
                authName: 'No Access!'
            }))
            .build(function (err) {
                if (err) console.log(err);

                var file = fs.readFileSync('./test/fixtures/expected/.htaccess');

                String(file).should.equal('AuthType Basic\nAuthName "No Access!"\nAuthUserFile /path/on/server/.htpasswd\nRequire valid-user');

                done();
            });
    });

    it('should add the correct contents to the .htpasswd file', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(auth({
                serverPath: '/path/on/server'
            }))
            .build(function (err) {
                if (err) console.log(err);

                var file = fs.readFileSync('./test/fixtures/expected/.htpasswd');

                String(file).should.equal('user:{SHA}nU4eI71bcnBGqeO0t9tXvY1u5oQ=');

                done();
            });
    });

});