'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    'smush-components': {      
      test: {
        fileMap:{
          js: './dist/components.js',
          css: './dist/components.css'
        }
      }
    },
    bumpup: ['bower.json', 'package.json'],
  });

  grunt.loadTasks('../tasks');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('smush', ['smush-components']);

};
