module.exports = function(grunt) {

 var config = require('./src/wsGrunt/config');

 // Initialize grunt tasks
 require('time-grunt')(grunt);
 require('./src/wsGrunt/task/init')(grunt, config);

  // Load custom tasks
  grunt.registerTask("ejs", function() {
    require('./src/wsGrunt/task/ejs')(grunt, config);
  });  

  grunt.registerTask("sasss", function() {
    require('./src/wsGrunt/task/sass')(grunt, config);
  });  

  grunt.registerTask("script", function() {
    require('./src/wsGrunt/task/script')(grunt, config);
  });    

  grunt.registerTask("createTask", function() {
    require('./src/wsGrunt/task/createTask')(grunt, config);
  });

  grunt.registerTask("syntax", function() {
    require('./src/wsGrunt/task/syntax')(grunt, config);
  });

  grunt.registerTask("wsconnect", function() {
    require('./src/wsGrunt/task/wsconnect')();
  });
  
  grunt.registerTask("tests", function() {
    require('./src/wsGrunt/task/tests')(grunt, config);
  });

  grunt.registerTask("spacer", function() {
    require('./src/wsGrunt/task/spacer')(grunt, config);
  });

  grunt.registerTask("prodPrep", function() {
    require('./src/wsGrunt/task/prod')(grunt, config);
  });

  // Load all tasks
  require('matchdep').filterDev('grunt-*','package.json').forEach(grunt.loadNpmTasks);

  // Register the default task
  // To run the application use the command below
  // > grunt 
  grunt.registerTask('default', ['ejs', 'sasss', 'syntax', 'script', 'tests', 'wsconnect', 'watch']);
  grunt.registerTask('dev', ['default']);
  grunt.registerTask('prod', ['ejs', 'sasss', 'syntax', 'script', 'tests', 'prodPrep']);
};

