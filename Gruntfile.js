module.exports = function(grunt) {
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
                src : [
                    "js/column.js",
                    "js/row.js",
                    "js/base.js",
                    "js/table.js",
                    "js/xtable.js"
                ],
                dest : "dist/grid.js"
            }
        },
        uglify: {
            dist : {
                files : {
                    "dist/grid.min.js" : [ "dist/grid.js" ]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    "dist/grid.min.css": "dist/grid.css",
                    "dist/grid-jennifer.min.css": "dist/grid-jennifer.css",
                    "dist/grid-dark.min.css": "dist/grid-dark.css"
                }
            }
        },
        less: {
            dist: {
                files: {
                    "dist/grid.css" : [
                        "less/main.less"
                    ],
                    "dist/grid-jennifer.css" : [
                        "less/theme/jennifer.less"
                    ],
                    "dist/grid-dark.css" : [
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
