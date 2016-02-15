const defaults = require('lodash.defaults');
const pass = require('pass');
const path = require('path');

/**
 * Expose `plugin`
 */

module.exports = plugin;

/**
 * Metalsmith plugin that enables adding HTTP basic
 * authentication via YAML attributes.
 *
 * @param  {Object} opts
 * @return {Function}
 */
function plugin (opts) {

    var opts = defaults(opts || {}, {
        authName: 'Protected Area'
    });

     /**
      * Plugin function
      *
      * @param  {Object}   files
      * @param  {Object}   metalsmith
      * @param  {Function} done
      */
    return function (files, metalsmith, done) {

        // Require `path` setting
        if (!opts.hasOwnProperty('path')) done('[Metalsmith Basic Auth]: Path setting is required.');

        // Gather information on files with auth attributes
        for (file in files) {
            if (files[file].auth) {
                addAuthFiles(files, file, files[file]);
            }
        }

        done();
    };

    /**
     * Add .htaccess and .htpasswd files next to the file
     *
     * @param {Object} files
     * @param {String} filepath
     * @param {Object} file
     */
    function addAuthFiles (files, filepath, file) {
        var htaccess = 'AuthType Basic\nAuthName "' + opts.authName + '"\nAuthUserFile ' + path.join(opts.path, filepath) + '/.htpasswd\nRequire valid-user';
        var htpasswd = file.auth.user + ':';

        // Generate encrypted password
        pass.generate(file.auth.pass, function (err, hash) {
            if (err) console.log(err);
            htpasswd += hash;
        });

        // Add .htaccess file to files object
        files[path.join(path.dirname(filepath), '.htaccess')] = {contents: htaccess};

        // Add .htpasswd file to files object
        files[path.join(path.dirname(filepath), '.htpasswd')] = {contents: htpasswd}
    }
}
