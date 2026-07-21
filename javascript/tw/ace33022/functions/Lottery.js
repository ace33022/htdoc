/**
 *
 * @description Lottery
 *
 * @version 2026/05/26 ace 初始版本。
 *
 * @see <a href="https://stackoverflow.com/questions/3914557/passing-arguments-forward-to-another-javascript-function">Passing arguments forward to another javascript function - Stack Overflow</a>
 *
 * @author ace
 *
 */
(function(root) {

	function getLottery539() {
	
		var result = '{"code": 1, "message": "Context execute platform is not found."}';
		
		// console.log('arguments.length: ' + arguments.length);
	
		if (typeof Configuration != 'undefined') {
	
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Lottery == 'undefined') load(getDirJavaScript() + '/tw/ace33022/rhino/functions/Lottery.js');
				
				result = tw.ace33022.rhino.functions.Lottery.getLottery539.apply(null, arguments);
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = tw.ace33022.google.apps.functions.Lottery.getLottery539.apply(null, arguments);
			}
		}
		
		return result;
	}
	
	function getLottery649() {
	
		var result = '{"code": 1, "message": "Context execute platform is not found."}';
		
		// console.log('arguments.length: ' + arguments.length);
	
		if (typeof Configuration != 'undefined') {
	
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Lottery == 'undefined') load(getDirJavaScript() + '/tw/ace33022/rhino/functions/Lottery.js');
				
				result = tw.ace33022.rhino.functions.Lottery.getLottery649.apply(null, arguments);
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = tw.ace33022.google.apps.functions.Lottery.getLottery649.apply(null, arguments);
			}
		}
		
		return result;
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getLottery539: getLottery539,
				getLottery649: getLottery649
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getLottery539;
		module.exports = getLottery649;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Lottery == 'undefined') root.tw.ace33022.functions.Lottery = {};
		
		root.tw.ace33022.functions.Lottery.getLottery539 = getLottery539;
		root.tw.ace33022.functions.Lottery.getLottery649 = getLottery649;
	}
})(this);