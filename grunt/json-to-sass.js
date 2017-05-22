/*
Compiles objects into a Sass file of variables, where the key is the variable
name. Nested object keys will become comments.

Source:
```
{
    "white": "white",
    "nested": {
        "red": "red"
    }
}
```

Compiled:
```
// Compiled from color config.
$white: white
// nested
$red: red
```

*/

/*jshint esversion: 6, es3: false */
module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('json-to-sass', 'Compile JSON into Sass variables', function () {
        const compileObjectToSass = function (object) {
            let sassString = '';
            for (let key in object) {
                let value = object[key];
                let valueType = typeof value;
                if (valueType === 'object') {
                    sassString += `\n// ${key}` + compileObjectToSass(value);
                } else if (valueType === 'string') {
                    sassString += `\n$${key}: ${value}`;
                } else {
                    grunt.warn(`json-to-sass: value must be object or string but was ${valueType}`);
                }
            }
            return sassString;
        };
        this.files.forEach((file) => {
            let sassString = `// Compiled from ${file.src}`;
            let src;
            try {
                src = JSON.parse(grunt.file.read(file.src));
                sassString += compileObjectToSass(src);
                grunt.file.write(file.dest, sassString);
            } catch (error) {
                grunt.log.error(`json-to-sass: cannot load src file ${file.src}`);
                grunt.fatal(error);
            }
        });
    });

};
