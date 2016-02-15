const Metalsmith = require('metalsmith');
const auth = require('../src');
const should = require('should');

describe('metalsmith-basic-auth', function () {

    it('should require the `path` setting', function (done) {
        Metalsmith('test/fixtures')
            .use(auth())
            .build(function (err) {
                err.should.equal('Path setting is required');
                done();
            });
    });

});