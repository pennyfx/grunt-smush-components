'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    helpers = require('./lib/helpers');

  grunt.registerTask('smush-components', 'Combine components js and css files.', function() {

    var options = this.options({ out: './dist/', fileName: 'components' });
    var done = this.async();
    var async = grunt.util.async;

    function getDependencyMap(error, stdout, stderr) {
      
      var map = JSON.parse(stdout),
        files = helpers.findDependencies(map);

      grunt.initConfig({
        concat:{
          js: {
            src: files.js,
            dest: path.join(options.out, options.fileName + '.js')
          },
          css: {
            src: files.css,
            dest: path.join(options.out, options.fileName + '.css')
          }
        }
      });

      grunt.task.run('concat');
      done();
    }

    exec("bower list -map", getDependencyMap);

  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};
