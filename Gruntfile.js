module.exports = function (grunt) {
  // load plugins
  [
    'grunt-cafe-mocha',
    'grunt-standard'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task)
  })

  // configure plugins
  grunt.initConfig({
    cafemocha: {
      all: { src: 'test/*.js', options: { ui: 'tdd' } }
    },
    standard: {
      options: { mocha: true },
      app: [ 'app.js' ]
    }
  })

  // register tasks
  grunt.registerTask('default', [ 'cafemocha', 'standard' ])
}

