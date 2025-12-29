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

	var characterCode;
	
	/**
	 *
	 * @description 將encodeURI編碼的中文字UTF8碼對照encodedUTF8ToBIG5Map轉換成BIG5碼。
	 *
	 * @param {String} source 來源字串。
	 *
	 * @return {String} 結果字串。
	 *
	 * @memberof module:StringUtils
	 *
	 * @version 2017/02/20 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://www.w3schools.com/jsref/jsref_escape.asp|JavaScript escape() Function}
	 * @see {@link https://www.w3schools.com/jsref/jsref_unescape.asp|JavaScript unescape() Function}
	 * @see {@link https://www.w3schools.com/jsref/jsref_encodeuri.asp|JavaScript encodeURI() Function}
	 * @see {@link https://www.w3schools.com/jsref/jsref_decodeuri.asp|JavaScript decodeURI() Function}
	 * @see {@link https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp|JavaScript encodeURIComponent() Function}
	 * @see {@link https://www.w3schools.com/jsref/jsref_decodeuricomponent.asp|JavaScript decodeURIComponent() Function}
	 *
	 * @see {@link http://www.findbestopensource.com/product/utf8tobig5|Utf8tobig5 - A Javascript code which encode utf8 to big5}
	 * @see {@link https://code.google.com/archive/p/utf8tobig5/|Google Code Archive - Long-term storage for Google Code Project Hosting.}
	 *
	 */
	function encodeUTF8ToBig5(source) {

		function encodeUTF8ToBig5SUB(source, table) {

			if (source[0] == "%") {
		
				// var temp = source.substring(0, 3).toLowerCase();
				var temp = source.substring(0, 3).toUpperCase();
			
				if (table[temp]) {
		 
					var r = table[temp];
				
					if (typeof r == 'string') {
			 
						return {
				 
							"left": source.substring(3),
							"result": r
						};   
					} 
					else {
				
						return encodeUTF8ToBig5SUB(source.substring(3), r);
					}
				}	 
				else {
		 
					return {
			 
						"left": source.substring(3),
						"result": temp
					};
				}
			} 
			else {
		
				return {
			
					"left": source.substring(1),
					"result": source[0]
				};
			}
		};
		
		var result = '';
		var left = source;
	
		var cr;

		while (left.length > 0) {
	
			cr = encodeUTF8ToBig5SUB(left, characterCode.UTF8ToBIG5);
		
			left = cr.left;
			result += cr.result;
		}

		return result;
	};
	
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
	
		define(["tw.ace33022.util.map.CharacterCode"], function(CharacterCode) { 
		
			characterCode = CharacterCode;
		
			return {
  
				"encodeUTF8ToBig5": encodeUTF8ToBig5,
				"repeat": repeat
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		characterCode = require('tw/ace33022/util/map/CharacterCode.js');
	
		module.exports.encodeUTF8ToBig5 = encodeUTF8ToBig5;
		module.exports.repeat = repeat;
	}
	else {
	
		load(root.tw.ace33022.RequireJSConfig.baseUrl + root.tw.ace33022.RequireJSConfig.paths["tw.ace33022.util.map.CharacterCode"] + '.js');
		
		characterCode = root.tw.ace33022.util.map.CharacterCode;
	
		if (typeof root.tw.ace33022.functions.Word == 'undefined') root.tw.ace33022.functions.Word = {};
		
		root.tw.ace33022.functions.Word.encodeUTF8ToBig5 = encodeUTF8ToBig5;
		root.tw.ace33022.functions.Word.repeat = repeat;
	}
})(this);