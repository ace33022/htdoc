/**
 *
 * @description Lottery
 *
 * @version 2026/05/26 ace 初始版本。
 *
 * @author ace
 *
 */
(function(root) {

	function getLottery539() {
	
		console.log('arguments.length: ' + arguments.length);
		
		if (arguments.length != 0) console.log('arguments[0]: ' + arguments[0]);
		
		// @todo 2026/05/26 ace 是否先抓取Google Apps Script的API回傳資料？
		
		return (arguments.length == 0) ? Packages.tw.ace33022.functions.Lottery.getLottery539() : Packages.tw.ace33022.functions.Lottery.getLottery539(arguments[0]);
	}

	function getLottery649() {
	
		console.log('arguments.length: ' + arguments.length);
		
		if (arguments.length != 0) console.log('arguments[0]: ' + arguments[0]);
		
		// @todo 2026/05/27 ace 是否先抓取Google Apps Script的API回傳資料？
		
		return (arguments.length == 0) ? Packages.tw.ace33022.functions.Lottery.getLottery649() : Packages.tw.ace33022.functions.Lottery.getLottery649(arguments[0]);
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getLottery539: getLottery539,
				getLottery649: getLottery649
			}
		});
	}
	else if (typeof exports !== 'undefined') {
	
		module.exports = getLottery539;
		module.exports = getLottery649;
	}
	else {
	
		if (typeof root.tw.ace33022.rhino.functions.Lottery == 'undefined') root.tw.ace33022.rhino.functions.Lottery = {};
		
		root.tw.ace33022.rhino.functions.Lottery.getLottery539 = getLottery539;
		root.tw.ace33022.rhino.functions.Lottery.getLottery649 = getLottery649;
	}
})(this);