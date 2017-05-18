/*
    Helper module which sets the config for the grunt config used by other tasks
*/
module.exports = function (grunt, commonPath) {
    'use strict';

    var setGruntConfig = function () {
        grunt.config.merge({

            config: {
                paths: {
                    iconsDir: './icons',
                    jsonDir: './json',
                    sassDir: './sass',
                    cssDir: './styles',
                    generatedSassDir: './sass/generated',
                    templatesDir: './templates',
                    scriptsDir: './scripts'

                }
            }
        });
    };

    return {
        setGruntConfig: setGruntConfig
    };
};
