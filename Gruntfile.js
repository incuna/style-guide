module.exports = function (grunt) {

    'use strict';

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks for each invocation of grunt.
        require('jit-grunt')(grunt);
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
        },
        sass: {
            options: {
                sourceMap: true,
                sourceMapContents: true,
                includePaths: [
                    require('node-bourbon').includePaths,
                    'sass'
                ]
            },
            dev: {
                files: {
                   'styles/main.css': 'sass/main.sass'
                }
            }
        },
    });

    // - - - T A S K S - - -

    grunt.registerTask('default', 'dev');

    grunt.registerTask('dev', [
        'sass',
        'watch'
    ]);

    grunt.registerTask('build', [
        'sass'
    ]);

}
