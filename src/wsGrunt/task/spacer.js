'use strict';
module.exports = function(grunt) {
  function isRemovale(file){
    file = file.toLowerCase();
    var removables = ["license", "support", "example", "examples", "test"];
    for (var index in removables){
      if (removables[index] == file){
        return true;
      }
    }
    var length = file.length;
    var matchExtension = file.substr(length - 3) == ".md" || 
    file.substr(length - 4) == ".txt";
    return length > 4 && matchExtension;
  }

  function isJS(file) {
    var ignores = ['cli.js', 'assert-shim.js', 'asi.js', 'blocks.js', 'comma.js'];
    for (var index in ignores){
      if (ignores[index] == file){
        return false;
      }
    }

    var length = file.length;
    var matchExtension = file.substr(length - 3) == ".js";
    return length > 4 && matchExtension;
  }

  function recursivePaths(path, removeable, minifiable){
    removeable = removeable || [];
    minifiable = minifiable || {};
    grunt.file.expand(path + '/*').forEach(function(sub_path){
      var file_name = sub_path.substr(sub_path.lastIndexOf('/')+1);
      if (isRemovale(file_name)){
        removeable.push(sub_path);
      }
      else if (grunt.file.isDir(sub_path)){
        recursivePaths(sub_path, removeable, minifiable);
      }
      else if (isJS(file_name)) {
        minifiable[sub_path] = [sub_path];
      }
    });

    return [removeable, minifiable];
  }

  var files = recursivePaths('node_modules');
  var task_name = "node_handler";
  grunt.config.set('clean.' + task_name, files[0]);
  grunt.task.run('clean:' + task_name);

  grunt.config.set('uglify.' + task_name, {
    options: {
      sourceMap: false,
    },
    files: files[1],
  });
  grunt.task.run('uglify:' + task_name);
};