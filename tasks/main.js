'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    helpers = require('./lib/helpers');

  grunt.registerTask('smush-components', 'Combine components js and css files.', function() {

    var options = this.options({ fileMap: { js: 'components.js', css: 'components.css' } });
    var done = this.async();
    var async = grunt.util.async;

    function getDependencyMap(error, stdout, stderr) {
      
      var map = JSON.parse(stdout),
        files = helpers.findDependencies(map);

      var concatOptions = {};

      for (var item in options.fileMap){
        concatOptions[item] = {
          src: files[item],
          dest: options.fileMap[item]
        }
      }

      grunt.initConfig({
        concat: concatOptions
      });

      grunt.task.run('concat');
      done();
    }

    exec("bower list -map", getDependencyMap);

  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};
