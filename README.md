# Incuna style guide

## Setup instructions
**This is a Swig project (http://paularmstrong.github.io/swig/ + https://github.com/larsonjj/grunt-swig-templates)**

- Clone the project
- Run `npm install` and `bower install` to install requirements

## Running
- Run `grunt`
- View `index.html` in your browser 

## Templates
Make sure you only work on templates in the `templates/` folder, do not work directly on `style-guide/index.html` this template is compiled by swig and your changes will be lost.

# Github page
http://incuna.github.io/style-guide/

This repo has a github page with a demo version of the style guide. To update the github page merge `master` into `gh-pages` branch.
Please do not work directly on the `gh-pages` branch. Changes should be merged into master first then pushed to the github page.

## Committed files
Because we have a github page set up we need to commit our compiled files. If you make any sass changes you will need to commit the newly compiled `main.css` and if you make template changes you'll need to commit the compiled `index.html` (from the root directory)
