/**
 *
 * @module Math
 *
 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Sort.php|[演算法] 排序演算法(Sort Algorithm)}
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof|instanceof - JavaScript | MDN}
 *
 */

(function(root) {

	/**
	 *
	 * @description 最大公因數(Highest Common Factor, HCF)/最大公約數(Greatest Common Divisor, GCD)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Math
	 *
	 * @version 2025/11/10 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function gcd(value) {
	
		function doCalculate(number1, number2) {
		
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('number1: ' + number1 + ', number2: ' + number2);
			
			return number2 == 0 ? number1 : doCalculate(number2, number1 % number2);
		}

		var result = {
		
			"code": 0,
			"message": "",
			"value": 0
		};
		
		var isSwap = true;
		var count;
		var index;
		
		try {
		
			result["value"] = doCalculate(JSON.parse(value)["number1"], JSON.parse(value)["number2"]);
			
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				"gcd": gcd
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports.gcd = gcd;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Math == 'undefined') root.tw.ace33022.functions.Math = {};
		
		root.tw.ace33022.functions.Math.gcd = gcd;
	}
})(this);