module.exports = function(grunt) {

    // Configuring Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // All configurations go here

        // Configuring JShint to validate js files
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            // Specify which files we want to lint
            build: ['Gruntfile.js', 'mathsjokemachine.js']
        },

        // Configuring Uglify to minify js files
        uglify: {
            build: {
                // Specify which files we want uglified. Destination first.
                // If we want to minify multiple files into one, second argument goes into an array i.e. ['mathsjokemachine.js', 'mathsjokemachine2.js']
                files: {
                    'dist/mathsjokemachine.min.js': 'mathsjokemachine.js'
                }
            }
        },

        // Configuring SASS
        sass: {
            dist: {
                files: {
                    'dist/mathsjokemachine.css': 'mathsjokemachine.scss'
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/mathsjokemachine.html':'mathsjokemachine.html'
                }
            }
        }
    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');    

    grunt.registerTask('default',['jshint', 'uglify', 'sass','htmlmin']);
};