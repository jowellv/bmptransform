'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'transform.js', 'test/**/*.js']
      },

      options: {
        node: true,
        globals: {
          describe: true,
          it: true,
          before: true,
          after: true,
          beforeEach: true,
          afterEach: true
        }
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        // grep: '*-test',
        ui: 'bdd',
        reporter: 'tap'
      },
      dev: {
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('test', ['jshint:dev', 'simplemocha:dev']);
  grunt.registerTask('default', ['test']);
};
