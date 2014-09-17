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
    bumpup: ['package.json'],
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bumpup');
  grunt.registerTask('default', ['jshint']);

};
