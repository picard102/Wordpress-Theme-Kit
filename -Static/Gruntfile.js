module.exports = function(grunt) {

 require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'style.css': 'scss/style.scss'
				}
			}
		},

		svgmin: {
			options: {
				plugins: [
				{ removeViewBox: false }, 
				{ removeUselessStrokeAndFill: true }, 
				{ cleanupIDs: false }
				]
			},
			dist: {
				expand: true,
				cwd: 'img/svg/raw/',
				src: ['*.svg'],
				dest: 'img/svg/compressed'
			}
		},

		svgstore: {
			options: {
				includedemo: true,
				cleanup: true,
				symbol: {
					viewBox: '0 0 100 100'
				}
			},
			default: {
				files: {
					'img/sprite.svg': ['img/svg/compressed/*.svg']
				},
			}
		},

		uglify: {
			build: {
				src: 'js/main.js',
				dest: 'js/main.min.js'
			}
		},

		imagemin: { // Task
			dynamic: { // Another target
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'img/raster/raw/', // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
					dest: 'img/raster/compressed/' // Destination path prefix
				}]
			}
		},

		scsslint: {
		     allFiles: [
                'scss/**/*.scss',  '!scss/vendors/**/*.scss',
            ],
            options: {
      			bundleExec: false,
      			config: 'scss/scss-lint.yml',
      			//reporterOutput: 'scss-lint-report.xml',
      			colorizeOutput: true,
      			maxBuffer: 900000,
      			force: false,
    		},
 		},

    jshint: {
	      options: {
		        curly: true,
		        eqeqeq: true,
		        eqnull: true,
		        browser: true,
		        globals: {
		          jQuery: true
		        },
	      },
	      uses_defaults: ['js/main.js'],
    },
    
    phplint: {
               all: ['*.php', '**/*.php', '!node_modules/**']
    },
                
		watch: {
			scripts: {
				files: ['js/*.js', 'js/**/*.js'],
				tasks: ['newer:uglify', 'jshint'],
				options: {
					spawn: false,
					livereload: 25711,
				}
			},
			images: {
				files: ['img/raster/raw/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin'],
				options: {
					spawn: false,
					livereload: 25711,
				}
			},
			php: {
				files: ['*.php', '**/*.php'],
				options: {
					spawn: false,
					livereload: 25711,
				}
			}, 
			svg: {
				files: ['img/svg/raw/*.svg'],
				tasks: ['svgmin', 'svgstore'],
				options: {
					spawn: false,
					livereload: 25711,
				}
			},
			sass: {
				files: ['scss/*.scss', 'scss/**/*.scss'],
				tasks: ['scsslint','sass'],
				options: {
					spawn: false,
					livereload: 25711,
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin'); 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-phplint');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['svgmin', 'scsslint', 'sass', 'jshint', 'svgstore', 'uglify', 'imagemin', 'phplint' ]);
	grunt.registerTask('dev', ['watch']);
};

