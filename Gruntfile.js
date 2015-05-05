module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          base: '.'
        }
      }
    },
    jshint: {
      options: {
        // Require braces round all blocks
        curly:   true,
        // No ==
        eqeqeq: true,
        // IE8/9 compatability
        es3: true,
        // Init vars at top of functions
        latedef: true,
        // No deep nesting
        maxdepth: 4,
        // Require strict mode
        strict:  true,
        // No trailing whitespace
        trailing: true,
        // Warn on undefined variables
        undef: true,
        // Warn on unused variables
        unused: true,
        // Set environment for browser
        browser: true,
        // Define standard jquery globals
        jquery:  true
      },
      all: {
        src:     ['src/**']
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:8080/test/qunit.html']
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task(s).
  grunt.registerTask('test',    ['connect', 'qunit']);
  grunt.registerTask('default', ['jshint', 'test']);

};
