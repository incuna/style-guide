var fs = require('fs');

module.exports = function (grunt) {

    'use strict';

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks for each invocation of grunt.
        require('jit-grunt')(grunt, {
            'nunjucks': 'grunt-nunjucks-2-html',
            'json-to-sass': './scripts/json-to-sass.js',
            'json-to-sass-map': './scripts/json-to-sass-map.js'
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
            },
            json: {
                files: [
                    'json/**/*.json'
                ],
                tasks: [
                    'json-to-sass',
                    'json-to-sass-map',
                ]
            },
            icons: {
                files: [
                    'icons/*.svg'
                ],
                tasks: [
                    'icons'
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
                    colors: grunt.file.readJSON(grunt.template.process('json/colors.json')),
                    icons: grunt.file.readJSON(grunt.template.process('json/icons.json'))
                }
            },
            dev: {
                files: {
                    'style-guide-base.html': 'templates/style-guide-base.html'
                }
            }
        },

        'json-to-sass': {
            main: {
                files: {
                    './sass/generated/_colors.sass': './json/colors.json'
                }
            }
        },

        'json-to-sass-map': {
            main: {
                files: {
                    './sass/generated/_colors-map.scss': './json/colors.json'
                }
            }
        },

        icons: {
            all: {}
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

    grunt.registerMultiTask('icons', function () {
        var iconsDirContent = fs.readdirSync(grunt.template.process('icons'));

        var svgFilesRegex = /\.svg$/;
        var iconFiles = iconsDirContent
            .filter((filename) => svgFilesRegex.test(filename))
            .map((filename) => filename.replace(svgFilesRegex, ''));

        var iconFilesObject = {};

        iconFiles.forEach((icon) => {
            iconFilesObject[icon] = icon;
        });

        grunt.file.write(grunt.template.process('json/icons.json'), JSON.stringify(iconFilesObject));
    });
    // - - - T A S K S - - -

    grunt.registerTask('default', 'dev');

    grunt.registerTask('dev', [
        'icons',
        'json-to-sass',
        'json-to-sass-map',
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
