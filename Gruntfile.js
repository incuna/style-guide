var fs = require('fs');

module.exports = function (grunt) {

    'use strict';

    var gruntConfig = require('./grunt/grunt-config')(grunt);

    gruntConfig.setGruntConfig();

    if (grunt.option('help')) {
        // Load all tasks so they can be viewed in the help: grunt -h or --help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load necessary tasks for each invocation of grunt.
        require('jit-grunt')(grunt, {
            'nunjucks': 'grunt-nunjucks-2-html',
            'json-to-sass': './grunt/json-to-sass.js',
            'json-to-sass-map': './grunt/json-to-sass-map.js'
        });
    }

    grunt.config.merge({
        watch: {
            sass: {
                files: [
                    '<%= config.paths.sassDir %>/**/*.sass'
                ],
                tasks: [
                    'sass'
                ]
            },
            nunjucks: {
                files: [
                    '<%= config.paths.templatesDir %>/**/*.html'
                ],
                tasks: [
                    'nunjucks'
                ]
            },
            json: {
                files: [
                    '<%= config.paths.jsonDir %>/**/*.json'
                ],
                tasks: [
                    'json-to-sass',
                    'json-to-sass-map',
                    'nunjucks',
                    'sass'
                ]
            },
            svgstore: {
                files: [
                    '<%= config.paths.iconsDir %>/**/*.svg'
                ],
                tasks: [
                    'icons',
                    'svgstore'
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
                    '<%= config.paths.sassDir %>'
                ]
            },
            dev: {
                files: {
                    '<%= config.paths.cssDir %>/style-guide.css': '<%= config.paths.sassDir %>/style-guide.sass'
                }
            }
        },

        nunjucks: {
            options: {
                data: {
                    colors: grunt.file.readJSON(grunt.template.process('<%= config.paths.jsonDir %>/colors.json')),
                    icons: grunt.file.readJSON(grunt.template.process('<%= config.paths.jsonDir %>/icons.json'))
                }
            },
            dev: {
                files: {
                    'index.html': '<%= config.paths.templatesDir %>/style-guide-base.html'
                }
            }
        },

        'json-to-sass': {
            main: {
                files: {
                    '<%= config.paths.generatedSassDir %>/_colors.sass': '<%= config.paths.jsonDir %>/colors.json'
                }
            }
        },

        'json-to-sass-map': {
            main: {
                files: {
                    '<%= config.paths.generatedSassDir %>/_colors-map.scss': '<%= config.paths.jsonDir %>/colors.json'
                }
            }
        },

        icons: {
            all: {}
        },

        svgstore: {
            options: {
                prefix: 'svg-', // This will prefix each ID
                svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
                    viewBox: '0 0 100 100',
                    xmlns: 'http://www.w3.org/2000/svg'
                }
            },
            main: {
                dest: '<%= config.paths.templatesDir %>/svgstore/svg-defs.svg',
                src: ['icons/**/*.svg']
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

        grunt.file.write(grunt.template.process('<%= config.paths.jsonDir %>/icons.json'), JSON.stringify(iconFilesObject));
    });

    // - - - T A S K S - - -

    grunt.registerTask('default', 'style-guide');

    grunt.registerTask('style-guide', [
        'create-colors',
        'create-icons',
        'sass',
        'nunjucks',
        'watch'
    ]);

    grunt.registerTask('style-guide-build', [
        'create-colors',
        'create-icons',
        'sass',
        'nunjucks'
    ]);

    grunt.registerTask('style-guide-lint', 'Run the JS linters.', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('style-guide-test', 'Run the tests.', function (env) {
         'lint'
    });

    grunt.registerTask('create-colors', [
        'json-to-sass',
        'json-to-sass-map'
    ]);

    grunt.registerTask('create-icons', [
        'icons',
        'svgstore'
    ]);

}
