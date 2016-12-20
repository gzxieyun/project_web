/*! * Mui's Gruntfile
 */

/* jshint node: true */
module.exports = function(grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	RegExp.quote = function(string) {
		return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Metadata.
		meta: {
			distPath: 'dist/',
			jsPath: 'js/',
			cssPath: 'css/',
			htmlPath: 'template/',
			appName: 'app'
		},

		banner: '/*!\n' +
			' * =====================================================\n' +
			' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
			' * =====================================================\n' +
			' */\n',

		clean: {
			all: ['<%= meta.distPath %>'],
			sourceMap: ['<%= meta.distPath %>css/*.map'],
			oldFiles:['<%= meta.jsPath %><%= meta.appName %>*.js','<%= meta.cssPath %><%= meta.appName %>*.*']
		},

		concat: {
			options: {
				banner: '<%= banner %>'
			},
			allJs: {
				src: [
					//项目js
					'<%= meta.jsPath %>**/*.js',
					'!<%= meta.jsPath %><%= meta.appName %>-<%= pkg.version %>.js'
				],
				dest: '<%= meta.jsPath %><%= meta.appName %>-<%= pkg.version %>.js'
			},
			allCss: {
				src: [
					//项目scss
					'<%= meta.cssPath %>**/*.less',
					'!<%= meta.cssPath %><%= meta.appName %>.less',
					//外部lib样式
					'<%= meta.cssPath %>module/**/*.css',
				],
				dest: '<%= meta.cssPath %><%= meta.appName %>.less'
			}
		},

		//sass=》css
		sass: {
			options: {
				banner: '<%= banner %>',
				style: 'expanded',
				unixNewlines: true
			},
			dist: {
				files: {
					'<%= meta.cssPath %><%= meta.appName %>-<%= pkg.version %>.css': '<%= meta.cssPath %><%= meta.appName %>.scss',
				}
			}
		},
		less:{
			options:{
				strictImports:true,
				strictUnits:true,
				syncImport:true
			},
			dev:{
				options:{
					banner:'<%=banner%>',
					compress:false
				},
				files:{'<%= meta.cssPath %>project.css': '<%= meta.cssPath %>project.less'}
			}
	    },
		//对css样式进行优化排序，格式化
		csscomb: {
			options: {
				config: '.csscomb.json'
			},
			dist: {
				files: {
					'<%= meta.cssPath %>project.css': '<%= meta.cssPath %>project.css'
				}
			},
		},
		//兼容性自动化工具
		autoprefixer: {
			options: {
				browsers: [
			      'Android 2.3',
			      'Android >= 4',
			      'Chrome >= 35',
			      'Firefox >= 31',
			      'Explorer >= 9',
			      'iOS >= 7',
			      'Opera >= 12',
			      'Safari >= 7.1'
			    ],
				safe: true
			},
			build: {
				files: {
					'<%= meta.cssPath %>project.css': '<%= meta.cssPath %>project.css'
				}
			}
		},
		//css压缩
		cssmin: {
			options: {
				banner: '', // set to empty; see bellow
				keepSpecialComments: '*', // set to '*' because we already add the banner in sass
				sourceMap: false
			},
			compress: {
				src: '<%= meta.cssPath %><%= meta.appName %>-<%= pkg.version %>.css',
				dest: '<%= meta.distPath %><%= meta.cssPath %><%= meta.appName %>-<%= pkg.version %>.css'
			}
		},
		//css代码检测（暂不使用）
		csslint: {
			options: {
				csslintrc: 'sass/.csslintrc'
			},
			src: [
				'<%= meta.cssPath %><%= meta.appName %>-<%= pkg.version %>.css'
			]
		},

		//js代码检测
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			grunt: {
				src: ['Gruntfile.js', 'grunt/*.js']
			},
			src: {
				src: ['<%= meta.jsPath %>**/*.js','!<%= meta.jsPath %>lib/**/*.js', '!<%= meta.jsPath %><%= meta.appName %>-<%= pkg.version %>.js']
			}
		},
		//js风格检查工具（暂不使用）
		jscs: {
			options: {
				config: 'js/.jscsrc'
			},
			grunt: {
				src: '<%= jshint.grunt.src %>'
			},
			src: {
				src: '<%= jshint.src.src %>'
			},
			docs: {
				src: '<%= jshint.docs.src %>'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				compress: {},
				mangle: true,
				preserveComments: false
			},
			muiJs: {
				src: '<%= meta.jsPath %><%= meta.appName %>-<%= pkg.version %>.js',
				dest: '<%= meta.distPath %><%= meta.jsPath %><%= meta.appName %>-<%= pkg.version %>.js'
			}
		},

		copy: {
			// minJs:{
			// 	src:'<%= meta.jsPath %><%= meta.appName %>-<%= pkg.version %>.js',
			// 	dest:'examples/hello-mui/js/mui.min.js'
			// },
			// fonts: {
			// 	expand: true,
			// 	cwd: '<%= meta.muiPath %>fonts/',
			// 	src: 'mui*.ttf',
			// 	dest: 'fonts/'
			// },
			mini:{
				expand:true,
				cwd:'.',
				src:['template/**/*.*','fonts/**/*.*','img/**/*.*','*.html','js/**/*.*','img-temp/**/*.*','css/project.css','css/animate.min.css','images/**/*'],
				// src:['fonts/**/*.*','*.html','js/**/*.*','img-temp/**/*.*','css/project.scss','images/**/*'],
				dest:'<%= meta.distPath %>'
			}
		},

		// 通过connect任务，创建一个静态服务器
		connect: {
			options: {
				// 服务器端口号
				port: 8010,
				// 服务器地址(可以使用主机名localhost，也能使用IP)
				hostname: 'localhost',
				// 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。

				open: true
			},
			build: {
				options: {
					livereload: 35279
				}
			}
		},

		// 通过watch任务，来监听文件是否有更改
		watch: {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				}
			},
			css: {
				files: ['<%= meta.cssPath %>**/*.less','!<%= meta.cssPath %><%= meta.appName %>.less'],
				tasks: ['compile-css'],
				options: {
					spawn: false
				}
			},
			client: {
				// 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload: 35279
				},
				files: ['<%= meta.cssPath %>**/*.less','<%= meta.jsPath %>**/*.js','<%= meta.htmlPath %>**/*.html','*.html']
			}
		}

	});

	// 引入grunt插件
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});
	require('time-grunt')(grunt);

	//引入自定义grunt插件，用于更换指定文件的版本号
	// grunt.loadTasks('my_grunts/grunt-files-rename/tasks');

	// 任务定义
	grunt.registerTask('cleanAll', ['clean']);
	grunt.registerTask('compile-css', ['less', 'autoprefixer', 'csscomb']);
	grunt.registerTask('compile-js', ['concat:allJs','jshint']);
	grunt.registerTask('compile', ['compile-css', 'compile-js']);
	grunt.registerTask('default', ['clean:oldFiles','compile']);
	grunt.registerTask('server', ['compile-css','connect','watch']);

	//输出压缩文件
	grunt.registerTask('dist', ['clean','compile-css','copy:mini']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};