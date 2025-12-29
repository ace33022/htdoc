/**
 *
 * @module Require
 *
 * @version 2025/09/30 ace 初始版本。
 *
 * @see {@link https://openhome.cc/zh-tw/javascript/object/namespace/|JavaScript :: 名稱空間管理}
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @memo 2025/09/30 ace 此函數庫的主要目地為實驗性質，實際應用上可以採用RequireJS函數庫。
 * @memo 2025/09/30 ace 呼叫此函數庫後會建立全域變數define、require。
 *
 */

var define, require;

(function() {

	var modules = {};
	
	define = function(name, callback) {
	
		console.log('modules: ' + modules);
		console.log('name: ' + name);
	
		modules[name] = callback();
	}
	
	require = function(names, callback) {
	
		var dependencies = names.map(function(name) {return modules[name];});
		
		console.log('dependencies: ' + dependencies);
		
		callback.apply(undefined, dependencies);
	}
})();