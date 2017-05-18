module.exports = function (grunt) {

    'use strict';

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks for each invocation of grunt.
        require('jit-grunt')(grunt, {
            'nunjucks': 'grunt-nunjucks-2-html'
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
            nunjucks: {
                files: [
                    'templates/**/*'
                ],
                tasks: [
                    'nunjucks'
                ]
            }
        },

        sass: {
            options: {
                sourceMap: true,
                sourceMapContents: true,
                includePaths: [
                    require('node-bourbon').includePaths,
                    require('incuna-sass').includePaths,
                    require('incuna-transitions').includePaths,
                    'sass'
                ]
            },
            dev: {
                files: {
                    'styles/style-guide.css': 'sass/style-guide.sass'
                }
            }
        },

        nunjucks: {
            options: {
                data: {
                    colors: {
                        // Just some example colors for show
                        color1: '#206ba4',
                        color2: '#bbd9ee',
                        color3: '#ebf4fa',
                        color4: '#f8ddb3',
                        color5: '#e7e4d3',
                        color6: '#f1efe2',
                        color7: '#9c9f83',
                        color8: '#ab7e5b',
                        color9: '#5b755d'
                    },
                    icons: {
                        alert: 'alert',
                        flag: 'flag',
                        blah: 'blah'
                    }
                }
            },
            dev: {
                files: {
                    'style-guide-base.html': 'templates/style-guide-base.html'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'scripts/*.js'
            ]
        },

        jscs: {
            options: {
                config: '.jscsrc',
                fix: true
            },
            src: 'scripts/*.js'
        }
    });

    // - - - T A S K S - - -

    grunt.registerTask('default', 'dev');

    grunt.registerTask('dev', [
        'sass',
        'nunjucks',
        'watch'
    ]);

    grunt.registerTask('build', [
        'nunjucks',
        'sass'
    ]);

    grunt.registerTask('lint', 'Run the JS linters.', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('test', 'Run the tests.', function (env) {
         'lint'
    });

}
