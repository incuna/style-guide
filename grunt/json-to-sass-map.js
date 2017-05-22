/*
Compiles objects into an scss map $colors-map
for use in style guide to create color swatches
*/

/*jshint esversion: 6, es3: false */
module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('json-to-sass-map', 'Compile JSON into a Sass map', function () {
        const compileObjectToSassMap = function (object) {
            let sassString = `\n$colors-map: (`;
            for (let key in object) {
                let value = object[key];
                let valueType = typeof value;
                if (valueType === 'object') {
                    sassString += `compileObjectToSassMap(value);`;
                } else if (valueType === 'string') {
                    sassString += `\n    ${key}: ${value},`;
                } else {
                    grunt.warn(`json-to-sass-map: value must be object or string but was ${valueType}`);
                }
            }
            sassString += `\n);`;
            return sassString;
        };
        this.files.forEach((file) => {
            let sassString = `// Compiled from ${file.src}`;
            let src;
            try {
                src = JSON.parse(grunt.file.read(file.src));
                sassString += compileObjectToSassMap(src);
                grunt.file.write(file.dest, sassString);
            } catch (error) {
                grunt.log.error(`json-to-sass-map: cannot load src file ${file.src}`);
                grunt.fatal(error);
            }
        });
    });

};
