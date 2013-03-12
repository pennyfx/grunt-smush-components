'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    // Configuration to be run (and then tested).
    'smush-components': {
      options: {
        out: './dist/'
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('smush', ['smush-components']);

};
