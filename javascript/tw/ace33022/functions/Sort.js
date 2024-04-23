/**
 *
 * @module Sort
 *
 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Sort.php|[演算法] 排序演算法(Sort Algorithm)}
 *
 */

(function(root) {

	function swap(data, i, j) {
	
    var tmp = data[i];
    data[i] = data[j];
    data[j] = tmp;
	}

	/**
	 *
	 * @description 氣泡排序法(Bubble Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2023/10/11 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof|instanceof - JavaScript | MDN}
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Bubble/1.php|[演算法] 氣泡排序法(Bubble Sort)}
	 *
	 */
	function Bubble(data) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var isSwap = true;
		var count;
		var index;
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();
			
			for (count = 0; (count < result["value"].length - 1) && isSwap; count++) {
			
				isSwap = false;
				
				for (index = 0; index < result["value"].length - count - 1; index++) {
				
					if (result["value"][index] > result["value"][index + 1]) {
					
						isSwap = true;
						
						swap(result["value"], index, index + 1);
					}
					
					logger.debug('isSwap: ' + isSwap);
					logger.debug('value: ' + result["value"]);
				}
			}
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		logger.debug('result: ' + JSON.stringify(result));
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 快速排序法(Quick Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2023/10/15 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof|instanceof - JavaScript | MDN}
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Quick/Quick.php|[演算法] 快速排序法(Quick Sort)}
	 *
	 */
	function Quick(data) {
	
	}
	
	if (typeof define === 'function') {
	
		define([], function() { 
		
			return {
  
				"Bubble": Bubble,
				"Quick": Quick
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports.Bubble = Bubble;
		module.exports.Quick = Quick;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Sort == 'undefined') root.tw.ace33022.functions.Sort = {};
		
		root.tw.ace33022.functions.Sort.Bubble = Bubble;
		root.tw.ace33022.functions.Sort.Quick = Quick;
	}
})(this);