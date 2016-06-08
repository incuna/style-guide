module.exports = function (grunt) {

    'use strict';

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks for each invocation of grunt.
        require('jit-grunt')(grunt,{
                'swig': 'grunt-swig-templates'
            });
    }

    grunt.config.merge({
        watch: {
            sass: {
                files: [
                    '**/*.sass'
                ],
                tasks: [
                    'sass'
                ]
            },
            swig: {
                files: [
                    'templates/**/*.html'
                ],
                tasks: [
                    'swig'
                ]
            }
        },
        sass: {
            options: {
                sourceMap: true,
                sourceMapContents: true,
                includePaths: [
                    require('node-bourbon').includePaths,
                    'bower_components/incuna-sass',
                    'bower_components/incuna-transitions',
                    'sass'
                ]
            },
            dev: {
                files: {
                   'styles/main.css': 'sass/main.sass'
                }
            }
        },

        swig: {
            options: {
            },
            dev: {
                expand: true,
                src: [ 'templates/**/*.html' ],
                dest: 'compiled-templates/'
            },
          }

    });

    // - - - T A S K S - - -

    grunt.registerTask('default', 'dev');

    grunt.registerTask('dev', [
        'sass',
        'swig',
        'watch'
    ]);

    grunt.registerTask('build', [
        'swig',
        'sass'
    ]);

}
