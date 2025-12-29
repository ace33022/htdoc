
(function(root) { 

	/**
	 *
	 * 取得Google Apps Script的執行路徑。
	 *
	 * @author ace
	 *  
	 */
	function getAppsMacroUrl(id) {return 'https://script.google.com/macros/s/' + id + '/exec';}

	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getAppsMacroUrl: getAppsMacroUrl
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getAppsMacroUrl;
	}
	else {
	
		root.tw.ace33022.functions.Google = {};
		
		root.tw.ace33022.functions.Google.getAppsMacroUrl = getAppsMacroUrl;
	}
})(this);