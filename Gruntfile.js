'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var localConfig;
     try {
       localConfig = require('./sources/config/local.env');
    } catch(e) {
       localConfig = {};
    }

    grunt.initConfig({

        // Watch Config
        watch: {
            express: {
                files:  [ 'sources/**/*.{js,json}', '!**/node_modules/**', '!Gruntfile.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    livereload: true,
                    nospawn: true // Without this option specified express won't be reloaded
                }
            },
            mochaTest: {
                files: ['sources/**/*.spec.js'],
                tasks: ['env:test', 'mochaTest']
            }                   
        },
        // Hint Config
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'test/spec/**/*.js'
            ]
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist/*'
                    ]
                }
                ]
            },
            coverage: {
              src: ['coverage/']
            }
        },
        // configure tasks by environnement
        env: {
          test: {
            NODE_ENV: 'test'
          },
          coverage: {
            APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/sources/'
          },          
          prod: {
            NODE_ENV: 'production'
          },
          all: localConfig
        }, 
        // Express Config
        express: {
            options: {
              port: process.env.PORT || 8080
            },
            dev: {
                options: {
                    script: 'sources/app.js'
                }
            },
            prod: {
               options: {
               script: 'dist/app.js'
               }
            }            
        },
        // Copy Config
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sources',
                    dest: 'dist/',
                    src: ['**/*']
                }]  
            } 
        },
        mochaTest: {
          options: {
            reporter: 'spec'
          },
          src: ['test/**/*.spec.js']
        },
        instrument: {
          files: ['sources/**/*.js'],
          options: {
            lazy: true,            
            basePath: 'test/coverage/instrument/'
          }
        },   
        storeCoverage: {
          options: {
            dir: 'test/coverage/reports'
          }
        },
        makeReport: {
          src: 'test/coverage/reports/**/*.json',
          options: {
            type: 'lcov',
            dir: 'test/coverage/reports',
            print: 'detail'
          }
        }              
    });

    // Register Tasks
    // Workon
    grunt.registerTask('serve', 'Start working on this project.', [
        // 'jshint',
        'env:all',
        'express:dev',
        'watch'
    ]);


    // Restart
    grunt.registerTask('restart', 'Restart the server.', [
        'env:all',
        'express:dev',
        'watch'
    ]);

    // Test
    grunt.registerTask('test', 'Tests', [
        'env:test',
        'mochaTest'
    ]);
  
    grunt.registerTask('coverage', [
        'clean:coverage',
        'env:coverage', 
        'instrument', 
        'mochaTest',
        'storeCoverage', 
        'makeReport'
    ]);    

    //Build
    grunt.registerTask('build', 'Build production.', [
        'clean:dist',
        'copy:dist'
    ]);

};
