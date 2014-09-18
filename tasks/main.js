'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    helpers = require('./lib/helpers');

  function buildDependencyTree(options){
    var missingDependencies = false;
    var bowerJson = JSON.parse(grunt.file.read(options.cwd + 'bower.json'));
    var crawlChain = function(dependencies){
      Object.keys(dependencies||{}).forEach(function(key){
        if (options.packages.length > 0 && options.packages.indexOf(key) == -1){
          delete dependencies[key];
          return;
        }
        var dependencyPath = path.join(options.cwd, options.bower_components, key, 'bower.json' );
        if (fs.existsSync(dependencyPath)){
            var dep = JSON.parse(grunt.file.read(dependencyPath));
            dependencies[key] = dep
            crawlChain(dep.dependencies);
        } else {
          missingDependencies = true;
          grunt.log.writeln("Missing dependency:", dependencyPath);
        }
      });
    };
    crawlChain(bowerJson.dependencies);
    if (missingDependencies) { grunt.log.writeln("\nPlease run:  bower install"); }
    return bowerJson;
  }

  grunt.registerMultiTask('smush-components', 'Combine components js and css files.', function() {

    var options = this.options({
      cwd: process.cwd() + '/',
      bower_components: 'bower_components'}),
      data = this.data;

    options.packages = data.packages || [];

    var done = this.async();
    var async = grunt.util.async;

    function getDependencyMap(map) {
      var files = helpers.findDependencies(map),
        concatOptions = grunt.config.getRaw('concat') || {};
      for (var item in data.fileMap){
        concatOptions['smush-'+item] = {
          src: files[item].map(function(i){
            return path.join(options.cwd, options.bower_components, i);
          }),
          dest: data.fileMap[item]
        };
      }
      grunt.config.set('concat', concatOptions);
      for (var item in data.fileMap){
        grunt.task.run('concat:smush-' + item);
      }
      done();
    }

    var tree = buildDependencyTree(options);
    getDependencyMap(tree);
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};
