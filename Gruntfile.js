var spec = require('./lib/spec')
var prompt = require('prompt')
prompt.start()

var modPath = '../../server_mods/com.wondible.pa.no_metal_commander/'
var stream = 'stable'
var media = require('./lib/path').media(stream)

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    copy: {
      mod: {
        files: [
          {
            src: [
              'modinfo.json',
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'com.wondible.pa.*/**',
              'ui/**',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
    },
    jsonlint: {
      all: {
        src: [
          'pa/ammo/**/*.json',
          'pa/tools/**/*.json',
          'pa/units/**/*.json'
        ]
      },
    },
    json_schema: {
      all: {
        files: {
          'lib/schema.json': [
            'pa/ammo/**/*.json',
            'pa/tools/**/*.json',
            'pa/units/**/*.json'
          ]
        },
      },
    },
    // copy files from PA, transform, and put into mod
    proc: {
      commander: {
        targets: [
          'pa_ex1/units/commanders/base_commander/base_commander.json'
        ],
        process: function(spec) {
          spec.wreckage_health_frac = 1
          spec.production.metal = 1
          spec.storage.metal = 5000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-json-schema');

  grunt.registerMultiTask('proc', 'Process unit files into the mod', function() {
    if (this.data.targets) {
      var specs = spec.copyPairs(grunt, this.data.targets, media)
      spec.copyUnitFiles(grunt, specs, this.data.process)
    } else {
      var specs = this.filesSrc.map(function(s) {return grunt.file.readJSON(media + s)})
      var out = this.data.process.apply(this, specs)
      grunt.file.write(this.data.dest, JSON.stringify(out, null, 2))
    }
  })

  // Default task(s).
  grunt.registerTask('default', ['proc', 'json_schema', 'jsonlint', 'copy:mod']);

};

