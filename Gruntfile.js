var css = require("css"),
    fs = require("fs");

module.exports = function(grunt) {

    var table_src = [
        "js/column.js",
        "js/row.js",
        "js/builder.js",
        "js/table.js",
        "js/xtable.js"
    ];

    grunt.initConfig({
        watch : {
            scripts : {
                files : [ "js/**" ],
                tasks : [ "js" ],
                options : {
                    spawn : false
                }
            },
            styles: {
                files: [ "less/**" ],
                tasks: [ "css" ],
                options: {
                    spawn : false
                }
            }
        },
        qunit: {
            options: {
                timeout: 10000
            },
            all: [ "test/*.html", "test/*/*.html" ]
        },
        concat : {
            // jui all 
            dist : {
                src : table_src,
                dest : "dist/jui-grid.js"
            }
        },
        uglify: {
            dist : {
                files : {
                    "dist/jui-grid.min.js" : [ "dist/jui-grid.js" ]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    "dist/jui-grid.min.css": "dist/jui-grid.css",
                    "dist/jui-grid-jennifer.min.css": "dist/jui-grid-jennifer.css",
                    "dist/jui-grid-dark.min.css": "dist/jui-grid-dark.css"
                }
            }
        },
        less: {
            dist: {
                files: {
                    "dist/jui-grid.css" : [
                        "less/main.less"
                    ],
                    "dist/jui-grid-jennifer.css" : [
                        "less/theme/jennifer.less"
                    ],
                    "dist/jui-grid-dark.css" : [
                        "less/theme/dark.less"
                    ]
                }
            }
        },
        pkg: grunt.file.readJSON("package.json")
    });

    require("load-grunt-tasks")(grunt);

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("js", [ "concat", "uglify" ]);
    grunt.registerTask("css", [ "less", "cssmin" ]);
    grunt.registerTask("test", [ "qunit" ]);
    grunt.registerTask("default", [ "css", "test", "js" ]);
};
