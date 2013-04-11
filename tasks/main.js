'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    helpers = require('./lib/helpers'),
    bower = require('bower');

  grunt.registerTask('smush-components', 'Combine components js and css files.', function() {

    var options = this.options({ fileMap: { js: 'components.js', css: 'components.css' } });
    var done = this.async();
    var async = grunt.util.async;

    function getDependencyMap(map) {

      var files = helpers.findDependencies(map),
        concatOptions = {};

      for (var item in options.fileMap){
        concatOptions[item] = {
          src: files[item],
          dest: options.fileMap[item]
        };
      }

      grunt.initConfig({
        concat: concatOptions
      });

      grunt.task.run('concat');
      done();
    }

    bower.commands.list({map:true})
    .on('data', function(data){
      getDependencyMap(data);
    })
    .on('error', function(data){
      console.log("bower error:", data);
      done(data);
    });

  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};
