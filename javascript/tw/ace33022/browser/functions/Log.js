/**
 *
 * @module Log
 *
 * @version 2021/07/11 ace 初始版本。
 *
 * @see {@link https://demo.tc/post/813|建立良好的開發習慣，幫 js 檔案加上註解（jsdoc , vsdoc） | demo小鋪}
 * @see {@link https://codeday.me/bug/20171206/103929.html|javascript – 如何使用jsdoc-toolkit记录匿名函数(closure) - 代码日志}
 * @see {@link http://hant.ask.helplib.com/javascript/post_737062|如何使用jsdoc工具箱记录匿名函数( 关闭)_javascript_帮酷编程问答}
 *
 */
(function(root) {

	/**
	 *
	 * 紀錄環境設定資料。
	 *
	 * @author ace
	 *  
	 */
	function logEnvironmentStatus() {
	
		if (document.getElementsByTagName('head').length != 0) {

			if (document.getElementsByTagName('head')[0].getElementsByTagName('base').length != 0) {

				console.log('head.base.href: ' + document.getElementsByTagName('head')[0].getElementsByTagName('base')[0].getAttribute('href'));
			}
		}
	
		if ((location != null) && (typeof location != 'undefined')) {
		
			console.log(location);
			console.log('location: ' + location);
			console.log('location.toString(): ' + location.toString());
			console.log('location.protocol: ' + location.protocol);
			console.log('location.origin: ' + location.origin);
			console.log('location.port: ' + location.port);
			console.log('location.hostname: ' + location.hostname);
			console.log('location.pathname: ' + location.pathname);
			console.log('location.search: ' + location.search);
		}
	}

	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				logEnvironmentStatus: logEnvironmentStatus
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports.logEnvironmentStatus = logEnvironmentStatus;
	}
	else {
	
		root.tw.ace33022.browser.functions.Log = {};
		
		root.tw.ace33022.browser.functions.Log.logEnvironmentStatus = logEnvironmentStatus;
	}
})(this);