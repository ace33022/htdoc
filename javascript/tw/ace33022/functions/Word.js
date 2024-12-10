/**
 *
 * @module Word
 *
 * @version 2024/12/10 ace initialize。
 *
 * @see {@link https://demo.tc/post/813|建立良好的開發習慣，幫 js 檔案加上註解（jsdoc , vsdoc） | demo小鋪}
 * @see {@link https://codeday.me/bug/20171206/103929.html|javascript – 如何使用jsdoc-toolkit记录匿名函数(closure) - 代码日志}
 * @see {@link http://hant.ask.helplib.com/javascript/post_737062|如何使用jsdoc工具箱记录匿名函数( 关闭)_javascript_帮酷编程问答}
 *
 */

(function(root) {

	/**
	 *
	 * @description 刪除字串前後的空白、不可列印控制字元。
	 *
	 * @param {String} source 來源字串。
	 *
	 * @return {String} 運算結果字串。
	 *
	 * @memberof module:StringUtils
	 *
	 * @version 2012/02/07 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://jsgears.com/thread-132-1-1.html|JavaScript Trim Function}
	 *
	 */
	function trim(source) {

		// return source.replace(/^\s*|\s*$/g, "");

		var start = -1;
		var end = source.length;

		while (source.charCodeAt(--end) < 33);
		while (source.charCodeAt(++start) < 33);

		return source.slice(start, end + 1);
	};
	
	/**
	 *
	 * 字元重複函數。
	 *  
	 * @author ace
	 * 
	 * @version 2010/10/14 ace 初始版本。   
	 *   
	 * @param {String} 重複字元。
	 * @param {Integer} 重複次數。    
	 *   
	 * @return 字元重複後之字串。 
	 * @type String 
	 *   
	 * @requires 
	 *     
	 * @see <a href="http://www.dotblogs.com.tw/wxvbbo/archive/2008/03/31/2368.aspx">利用JAVA SCRIPT來格式化日期</a> 
	 *
	 */
	function repeat(character, time) {

		var result = '';
		var count;
		
		for (count = 0; count < time; count++) result += character;

		return result; 
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				"repeat": repeat
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports.repeat = repeat;
	}
	else {
	
		root.tw.ace33022.functions.Word = {};
		
		root.tw.ace33022.functions.Word.repeat = repeat;
	}
})(this);