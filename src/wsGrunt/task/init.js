'use strict';
module.exports = function(grunt, config) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),
		uglify : {},
		surround : {},
		replace : {},
		cssmin : {},
		sass : {},
		copy : {},
		watch : {},
		cmq: {
			options: {
				log: false
			}
		},
		clean: {
			dist: [config.DESTINATION],
			node : ["node"]
		},
		jshint: {
			options: {
				"boss": true,
				"curly": true,   
				"eqeqeq": false,  
				"eqnull": true, 
				"immed": true,  
				"latedef": false, 
				"newcap": false, 
				"noarg": true,  
				"sub": true,    
				"undef": true,   
				"unused": true,
				"node": true, 
				"-W117": true     
			}
		}
	});
};
