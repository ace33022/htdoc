/**
 *
 * @description UrlFetchApp
 *
 * @version 2024/03/22 ace 初始版本。
 *
 * @see {@link https://developer.mozilla.org/zh-TW/docs/JavaScript JavaScript}
 * @see <a href="http://requirejs.org/docs/api.html">REQUIREJS API</a>
 * @see <a href="https://gist.github.com/simme/9397874">gistfile1.js</a>
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
 * @see <a href="http://fred-zone.blogspot.tw/2012/05/javascript_22.html">簡單理解 JavaScript 的記憶體管理機制 ~ Fred's blog</a>
 *
 * @author
 *
 * @comment
 *
 */
(function(root) {	

	var RequireJSConfig;
	
	var result = function(url, option) {

		/**
		 * 
		 * @memo 2024/03/07 ace 在Google Apps環境下，採用Number、String產生的物件資料會回傳JSON物件？改採常數寫入則不會？
		 * 
		 */
		// var serialVersionUID = new Number(1);	// 保留
    var serialVersionUID = 1; // 保留
		
		if (options == null) {
		
			// 沒有option時預設為GET。
		}
	}

	if (typeof define === 'function') {

		define(["tw.ace33022.functions.Datetime"], function(Datetime) {
		
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
		
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;

		if (typeof load !== 'undefined') {

			// load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.util.DatetimeUtil"] + '.js');
			load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.functions.Datetime"] + '.js');
		}
		
		root.UrlFetchApp = result;
	}
})(this);