const Metalsmith = require('metalsmith');
const auth = require('../src');
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

});