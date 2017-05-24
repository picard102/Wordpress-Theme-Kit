var timer = require("grunt-timer");
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  timer.init(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

  /*=============================================
  =            SASS                             =
  =============================================*/

  /*==========  grunt sass - LibSass compile  ==========*/
    sass: {
      build: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed',
          sourceComments: false,
          includePaths: require('node-bourbon').includePaths
        },
        files: {'<%= pkg.path.buildpath %><%= pkg.name %>/style.css': '<%= pkg.path.srcpath %><%= pkg.path.scss %>/style.scss' }
      },
      dev: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded',
          sourceComments: false,
          includePaths: require('node-bourbon').includePaths
        },
        files: {'<%= pkg.path.buildpath %><%= pkg.name %>/style.css': '<%= pkg.path.srcpath %><%= pkg.path.scss %>/style.scss' }
      }
    },

  /*==========  grunt scsslint - Linting via scss-lint gem  ==========*/
    scsslint: {
      newerFiles: ['<%= scsslintCurrentFile %>'],
      dev: {
        src: [ '<%= pkg.path.srcpath %><%= pkg.path.scss %>/**/*.scss' ]
      },
        options: {
          config: '<%= pkg.path.srcpath %><%= pkg.path.scss %>/scss-lint.yml',
          colorizeOutput: true,
          maxBuffer: '30000000000'
        },

    },

  /*==========  grunt banner - Add theme info to css  ==========*/
    WPBuild: '/* \nTheme Name: <%= pkg.props.theme_name %>\n' +
        'Version: <%= pkg.version %>\n' +
        'Description: \n' +
        'Author: <%= pkg.props.author_name %>\n' +
        'Author URI: <%= pkg.props.author_url %>\n' +
        'Last Compiled: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n',

    WPDev: '/* \nTheme Name: <%= pkg.props.theme_name %> Dev\n' +
        'Version: <%= pkg.version %>\n' +
        'Description: \n' +
        'Author: <%= pkg.props.author_name %>\n' +
        'Author URI: <%= pkg.props.author_url %>\n' +
        'Last Compiled: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n',

    usebanner: {
      build: {
          options: {
            position: 'top',
            banner: '<%= WPBuild %>'
          },
          files: { src: [ '<%= pkg.path.buildpath %><%= pkg.name %>/style.css' ]  }
      },
      dev: {
          options: {
            position: 'top',
            banner: '<%= WPDev %>'
          },
          files: { src: [ '<%= pkg.path.buildpath %><%= pkg.name %>/style.css' ] }
      }
    },

  /*=============================================
  =            JS Functions                     =
  =============================================*/

  /*==========  JSHint - Check JS  ==========*/
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: { jQuery: true },
      },
      dev: ['<%= pkg.path.srcpath %><%= pkg.path.js %>/**/*.js'],
      newerFiles: ['<%= jslintCurrentFile %>'],
    },

  /*==========  JSHint - Check JS  ==========*/
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= pkg.path.srcpath %><%= pkg.path.js %>/scripts.js'],
        dest: '<%= pkg.path.buildpath %><%= pkg.name %>/built.js',
      },
    },

  /*==========  Uglify - compress JS  ==========*/
    uglify: {

      dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'build/built.js.map',
          beautify: true,
          banner: '/*! <%= pkg.name %>_Dev - v<%= pkg.version %> - '+'<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          '<%= pkg.path.buildpath %><%= pkg.name %>/built.js': ['<%= pkg.path.buildpath %><%= pkg.name %>/built.js']
        }
      },
      build: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '+'<%= grunt.template.today("yyyy-mm-dd") %> */',
          compress: { drop_console: true }
        },
        files: {
          '<%= pkg.path.buildpath %><%= pkg.name %>/built.js': ['<%= pkg.path.buildpath %><%= pkg.name %>/built.js']
        }
      }

    },

  /*=============================================
  =            SVG                              =
  =============================================*/

  /*==========  SVGMin - cleanup and compress svg  ==========*/
    svgmin: {
      options: {
        plugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: true },
        { cleanupIDs: true }
        ]
      },
      dist: {
        expand: true,
        cwd: '<%= pkg.path.srcpath %><%= pkg.path.svg %>',
        src: ['*.svg', 'icons/*.svg'],
        dest: '<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.svg %>'
      }
    },

  /*==========  SVGStore - generate svg sprite  ==========*/
    svgstore: {
      options: {
        includedemo: false,
        cleanup: true,
      },
      default: {
        files: {'<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.svg %>/svg-sprite.svg': ['<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.svg %>/icons/*.svg']},
      }
    },

  /*=============================================
  =            Image                            =
  =============================================*/

  /*==========  ImageMin - compress raster files  ==========*/
    imagemin: {
      dynamic: {
        options: { optimizationLevel: 4},
        files: [{
          expand: true,
          cwd: '<%= pkg.path.srcpath %><%= pkg.path.img %>',
          src: ['*.{png,jpg,gif}'],
          dest: '<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.img%>'
        }]
      }
    },

  /*==========  ImageOptim - compress raster files again  ==========*/
    imageoptim: {
      myTask: {
        src: ['<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.img%>/*.{png,jpg,gif}']
      }
    },

  /*=============================================
  =            Code Validation                  =
  =============================================*/

  /*==========  PHP Lint  ==========*/
    phplint: {
      newerFiles: ['<%= phplintCurrentFile %>'],
      all: {
        src: [  '<%= pkg.path.srcpath %>**/*.php' ]
      },

    },

  /*==========  PHP CS  ==========*/
    phpcs: {
      newerFiles: ['<%= phplintCurrentFile %>'],
      all: {
        src: [  '<%= pkg.path.srcpath %>/**/*.php']
      },
      options: {
        standard: 'Wordpress',
        errorSeverity: 5,
        warningSeverity: 6,
      }
    },

  /*=============================================
  =            Version Bump                     =
  =============================================*/
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
      }
    },

  /*=============================================
  =            Moves                            =
  =============================================*/

  /*==========  Clean - clean up folders for copying  ==========*/
    clean: {
      build: ['<%= pkg.path.buildpath %><%= pkg.name %>/*'],
      img: ['<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.img%>/*'],
      svg: ['<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.svg%>/*'],
      release: ['deploy/*']
    },

  /*==========  Copy - Copy files to build deploy folder  ==========*/
    copy: {
      build: {
        expand: true,
        cwd: '<%= pkg.path.srcpath %>',
        src: ['**', '!**/img/**', '!**/svg/**', '!**/scss/**', '!**/js/**'],
        dest: '<%= pkg.path.buildpath %><%= pkg.name %>/'
      },
      img: {
        expand: true,
        cwd: 'src/assets/img/',
        src: ['*.{png,jpg,gif}'],
        dest: '<%= pkg.path.buildpath %><%= pkg.name %>/<%= pkg.path.img%>/'
      },
      deploy: {
        expand: true,
        cwd: '<%= pkg.path.srcpath %>',
        src: ['**', '!**/img/**', '!**/svg/**', '!**/scss/**', '!**/js/**'],
        dest: 'deploy/'
      }
    },




  /*=============================================
  =            Cache Busters                    =
  =============================================*/

  replace: {

    package_v: {
      src: ['<%= pkg.path.buildpath %><%= pkg.name %>/**/*.php'],
      overwrite: true,
      replacements: [{
        from: '@package_version@',
        to: "<%= pkg.version %>"
      }]
    },

    hash: {
      src: ['<%= pkg.path.buildpath %><%= pkg.name %>/**/*.php'],
      overwrite: true,
      replacements: [{
        from: '@hash@',
        to: '<%= pkg.version %>'+'<%= grunt.template.today("yyyymmddHHMMss") %>-' + '<%= (Math.floor((Math.random()*100)+1).toString()) %>'
      }]
    },

    package: {
      src: ['<%= pkg.path.buildpath %><%= pkg.name %>/**/*.php'],
      overwrite: true,
      replacements: [{
        from: '@theme_folder@',
        to: "<%= pkg.name %>"
      }]
    },

    git_link: {
      src: ['<%= pkg.path.buildpath %><%= pkg.name %>/**/*.php'],
      overwrite: true,
      replacements: [{
        from: '@git_link@',
        to: "<%= pkg.props.git_link %><%= pkg.name %>"
      }]
    },

    author_name: {
      src: ['<%= pkg.path.buildpath %><%= pkg.name %>/**/*.php'],
      overwrite: true,
      replacements: [{
        from: '@author_name@',
        to: "<%= pkg.props.author_name %>"
      }]
    },

    author_email: {
      src: ['<%= pkg.path.buildpath %><%= pkg.name %>/**/*.php'],
      overwrite: true,
      replacements: [{
        from: '@author_email@',
        to: "<%= pkg.props.author_email %>"
      }]
    },

    author_url: {
      src: ['<%= pkg.path.buildpath %><%= pkg.name %>/**/*.php'],
      overwrite: true,
      replacements: [{
        from: '@author_url@',
        to: "<%= pkg.props.author_url %>"
      }]
    },

  },

  /*=============================================
  =            Watch Task                      =
  =============================================*/
    watch: {

      options: {
        livereload: 25710,
      },

      grunt: {
        files: ['Gruntfile.js']
      },
      scripts: {
        files: ['<%= pkg.path.srcpath %><%= pkg.path.js %>/*.js'],
        tasks: ['jshint:newerFiles','concat','uglify:dev','replace:hash'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['<%= pkg.path.srcpath %><%= pkg.path.img %>/*.{png,jpg,gif}'],
        tasks: ['newer:copy:img'],
      },
      svg: {
        files: ['<%= pkg.path.srcpath %><%= pkg.path.svg %>/**/*.svg'],
        tasks: ['newer:svgmin', 'svgstore'],
      },
      sass: {
        files: ['<%= pkg.path.srcpath %><%= pkg.path.scss %>/**/*.scss', '!<%= pkg.path.srcpath %><%= pkg.path.scss %>/style.scss'],
        tasks: ['scsslint:newerFiles','sass:dev','usebanner:dev', 'replace:hash'],
        options: {
          spawn: false,
        }
      },
      php: {
        files: ['<%= pkg.path.srcpath %>**/*.php'],
        tasks: ['phplint:newerFiles','copy:build','replace'],
        options: {
          spawn: false,
        }
      },
    }
  });




grunt.event.on('watch', function(action, filepath) {
    // Determine task based on filepath
    var get_ext = function(path) {
        var ret = '';
        var i = path.lastIndexOf('.');
        if ( -1 !== i && i <= path.length ) {
            ret = path.substr(i + 1);
        }
        return ret;
    };

    switch ( get_ext(filepath) ) {
        // SCSS
        case 'scss' :
          grunt.config.set('scsslintCurrentFile', filepath);
          //grunt.task.run('scsslint:newerFiles:[' + filepath + ']');
          break;

        // PHP
        case 'php' :
          grunt.config.set('phplintCurrentFile', filepath);
          break;


        // JS
        case 'js' :
          grunt.config.set('jslintCurrentFile', filepath);
          break;
    }
});




  grunt.registerTask('style', ['scsslint:dev','sass:dev','usebanner:dev']);
  grunt.registerTask('script', ['jshint:dev', 'concat', 'uglify:dev']);
  grunt.registerTask('svg', ['svgmin', 'svgstore']);
  grunt.registerTask('img', ['imagemin', 'imageoptim']);

  grunt.registerTask('devwatch', ['watch']);

  grunt.registerTask('dev', ['bump-only:prepatch','clean:build','scsslint:dev','sass:dev','usebanner:dev','jshint:dev','concat','uglify:dev','svgmin','svgstore','copy:img','phplint:all','phpcs:all','copy:build','replace']);

  grunt.registerTask('build', ['bump-only:minor','clean:build','scsslint:dev','sass:build','usebanner:build','jshint:dev','concat','uglify:build','svgmin','svgstore','imagemin','imageoptim','phplint:all','copy:build','replace','bump-commit']);


};

