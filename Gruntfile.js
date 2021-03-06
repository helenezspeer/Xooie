module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      compile: {
        options: {
          baseUrl: "",
          paths: {
            jquery: "empty:",
            async: "empty:"
          },
          name: "xooie/xooie",
          include: [
            "xooie/widgets/carousel"/*,
            "xooie/widgets/dropdown",
            "xooie/widgets/accordion",
            "xooie/widgets/tab",
            "xooie/widgets/dialog"*/
          ],
          out: "source/javascripts/xooie-<%= pkg.version %>.js",
          optimize: "none"
        }
      },
      compile_min: {
        options: {
          baseUrl: "",
          paths: {
            jquery: "empty:",
            async: "empty:"
          },
          name: "xooie/xooie",
          include: [
            "xooie/widgets/carousel"/*,
            "xooie/widgets/dropdown",
            "xooie/widgets/accordion",
            "xooie/widgets/tab",
            "xooie/widgets/dialog"*/
          ],
          out: "source/javascripts/xooie-<%= pkg.version %>-min.js",
          optimize: "uglify"
        }
      },
      copy: {
        main: {
          src: ["source/javascripts/xooie-<%= pkg.version %>-min.js"], 
          dest: "../Front End Development/My Account/Desktop/includes_cui/scripts/xooie-plus-necessary-modules.js" 
        }
      }
    },
    jasmine: {
      test: {
        //src: "xooie/**/*.js",
        src: ['xooie/widgets/base.js', 'xooie/widgets/dropdown.js', 'xooie/widgets/carousel.js', 'xooie/addons/base.js', 'xooie/**.js'],
        options: {
          //specs: "spec/**/*.spec.js",
          specs: ['spec/widgets/base.spec.js', 'spec/widgets/dropdown.spec.js', 'spec/widgets/carousel.spec.js', 'spec/addons/base.spec.js', 'spec/**.js'],
          template: require("grunt-template-jasmine-requirejs"),
          vendor: ["lib/jquery.js","lib/require.js","lib/micro_tmpl.js","lib/jasmine-jquery.js"],
          helpers: "spec/helpers.js",
          templateOptions: {
            requireConfigFile: 'lib/config.js'
          }
        }
      }
    },
    jslint: {
      xooie: {
        src: ['xooie/**/*.js'],
        directives: {
          todo: true,
          nomen: true,
          nonew: true,
          indent: 2,
          predef: [
            'define',
            'require',
            'window',
            'document',
            'setTimeout',
            'clearTimeout',
            'setInterval',
            'clearInterval',
            'Mustache',
            '_'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jslint', 'jasmine']);
  grunt.registerTask('build', ['requirejs']);

};