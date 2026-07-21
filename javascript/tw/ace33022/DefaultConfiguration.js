/**
 *
 * @description DefaultConfiguraton
 *
 * @version 2015/11/13 ace 初始版本。
 * @version 2015/11/21 ace 新增logger物件。
 * @version 2015/11/21 ace 新增log4jPropertiesFile屬性。
 * @version 2015/11/21 ace 新增loggingPropertiesFile屬性。
 * @version 2018/08/13 ace 新增requirejsFile屬性。
 * @version 2021/07/11 ace 新增String物件預設函數。
 * @version 2022/10/17 ace 合併NameSpace原有功能，減少另外建立檔案處理命名空間的問題。
 * @version 2024/12/29 ace 新增enableJVMExternalCLibrary屬性。
 * @version 2025/04/21 ace 新增GoogleAppsScriptMacroUrl屬性。
 *
 * @author ace
 *
 */
(function(root) {

	var result = {

		"DateFormatString": "yyyyMMdd",
		"dateFormatString": "yyyyMMdd",
		"SaveDateFormatString": "yyyyMMdd",
		"ShowDateFormatString": "yyyy/MM/dd",
		"TimeFormatString": "HHmmss",
		"timeFormatString": "HHmmss",
		"SaveTimeFormatString": "HHmmss",
		"ShowTimeFormatString": "HH:mm:ss",
		
		"stringDateFormat": "yyyyMMdd",
		"stringTimeFormat": "HHmmss",
		"stringDateShowFormat": "yyyyMMdd",
		"stringTimeShowFormat": "HH:mm:ss",
		"stringDateSaveFormat": "yyyyMMdd",
		"stringTimeSaveFormat": "HHmmss",
		
		"dir_user_space": "W:/UserSpace",
		"dirUserSpace": "W:/UserSpace",
		"sexy_novel_directory_name": "SexyNovel",
		"dirNameSexyNovel": "SexyNovel",
		
		"RESTfulRelativePath": "ws/rs/",
		"requirejsFile": "javascript/requirejs/require.js",
		"requirejsConfigFile": "javascript/tw/ace33022/RequireJSConfig.js"
	};
	
	/**
	 *
	 * @description logger
	 *
	 * @version 2019/02/15 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://logging.apache.org/|Welcome - Apache Logging Services}
	 * @see {@link http://logging.apache.org/log4j/1.2/|Apache log4j 1.2 -}
	 * @see {@link http://logging.apache.org/log4j/2.x/|Log4j – Apache Log4j 2 - Apache Log4j 2}
	 *
	 * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/logging/package-summary.html|java.util.logging (Java Platform SE 8 )}
	 * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/logging/Level.html|Level (Java Platform SE 8 )}
	 * @see {@link https://docs.oracle.com/javase/8/docs/api/java/util/logging/ConsoleHandler.html|ConsoleHandler (Java Platform SE 8 )}
	 *
	 */
	var logger = function() {

		var out;

		if (typeof console != 'undefined') {

			// nodeJS執行環境
			out = console.log;
		}
		else if (typeof print != 'undefined') {

			// Rhino執行環境
			out = print;
		}
		else {

			// LibreOffice沒有print函數。
			out = function(value) {};
		}

		this.trace = function(value) {out(value)};	// (the least serious)
		this.debug = function(value) {out(value)};
		this.info = function(value) {out(value)};
		this.warn = function(value) {out(value)};
		this.error = function(value) {out(value)};
		this.fatal = function(value) {out(value)};	// (the most serious)

		return this;
	}
	
	/**
	 *
	 * 連線主機資訊。
	 *
	 * @description 設定DAO元件的連線主機資訊，在瀏覽器環境使用window.location物件，在nwJS環境則可自行指定對應的主機資訊。
	 *
	 * @version 2015/11/13 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/location|Window.location - Web APIs | MDN}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/location|Document.location - Web APIs | MDN}
	 * @see {@link https://developer.mozilla.org/zh-TW/docs/Web/API/Location|Location - Web APIs | MDN}
	 *
	 * @todo 2015/10/28 主機資訊設定資料讀取外部設定檔？
	 * @todo 2015/10/28 nwJS環境下發生物件屬性是function時，取值會直接回傳該function程式碼，而非執行結果！？
	 *
	 * @comment 2015/10/28 nwJS環境下發生物件屬性是function時，取值會直接回傳該function程式碼，而非執行結果。目前的處理方式採用立即函數處理，等查明原因後再改寫？
	 *
	 */
	var LocationInformation = function() {
	
		var result = this;

		var protocol =  'http:';
		var hostname = '127.0.0.1';
		var port = 8080;

		this.protocol = (function() {return protocol})();
		this.hostname = (function() {return hostname})();
		this.port = (function() {return port})();

		this.host = (function() {return hostname + ':' + new String(port)})();
		this.origin = (function() {return protocol + '//' + hostname + ':' + new String(port)})();
		
		this.toString = function() {return protocol + '//' + hostname + ':' + new String(port)};
		
		if (typeof window != 'undefined') result = window.location;
		
		return result;
	}
	
	if (typeof console != 'undefined') console.log('load DefaultConfiguration');
	
	if (!String.prototype.startsWith) {
	
		/**
		 *
		 * This method lets you determine whether or not a string begins with another string. This method is case-sensitive.
		 *  
		 * @author ace
		 * 
		 * @version 2021/07/11 ace 初始版本。   
		 *   
		 * @param {String} The characters to be searched for at the start of this string.
		 * @param {Integer} The position in this string at which to begin searching for searchString. Defaults to 0.
		 *   
		 * @return true if the given characters are found at the beginning of the string; otherwise, false.
		 * @type Boolean
		 *   
		 * @requires 
		 *     
		 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">String</a> 
		 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith">String.prototype.startsWith() - JavaScript | MDN</a> 
		 * @see <a href="https://mozilla.github.io/rhino/compat/engines.html">Rhino ES2015/ES6, ES2016 and ES2017 support</a> 
		 *
		 */
		String.prototype.startsWith = function(searchString, position) {
		
			var startsPosition = position > 0 ? position || 0 : 0;
			
      return this.substring(startsPosition, startsPosition + searchString.length) == searchString;
		}
	}

	if (!String.prototype.endsWith) {
	
		/**
		 *
		 * This method lets you determine whether or not a string ends with another string. This method is case-sensitive.
		 *  
		 * @author ace
		 * 
		 * @version 2025/09/01 ace 初始版本。   
		 *   
		 * @param {String} The characters to be searched for at the end of str. Cannot be a regex. All values that are not regexes are coerced to strings, so omitting it or passing undefined causes endsWith() to search for the string "undefined", which is rarely what you want.
		 * @param {Integer} The end position at which searchString is expected to be found (the index of searchString's last character plus 1). Defaults to str.length.
		 *   
		 * @return true if the given characters are found at the end of the string, including when searchString is an empty string; otherwise, false.
		 * @type Boolean
		 *   
		 * @requires 
		 * 
		 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">String</a> 
		 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith">String.prototype.endsWith()</a> 
		 * @see <a href="https://mozilla.github.io/rhino/compat/engines.html">Rhino ES2015/ES6, ES2016 and ES2017 support</a> 
		 *
		 */
		String.prototype.endsWith = function(searchString, position) {
		
			var endPosition = position > 0 ? position || this.length - searchString.length : this.length - searchString.length;
			
      return this.substring(endPosition) == searchString;
		}
	}
	
	/**
	 *
	 * 字串左邊補空白函數。
	 *  
	 * @author ace
	 * 
	 * @version 2010/10/14 ace 初始版本。   
	 *   
	 * @param {Integer} 字串延長後長度。
	 *   
	 * @return 延長後的字串。 
	 * @type String 
	 *   
	 * @requires 
	 *     
	 * @see <a href="http://www.dotblogs.com.tw/wxvbbo/archive/2008/03/31/2368.aspx">利用JAVA SCRIPT來格式化日期</a> 
	 *
	 */
	String.prototype.paddingLeft = function(totalLength) {
	
		var result = this;
	
		if (!isNaN(parseInt(totalLength)) && ((totalLength - this.length) > 1)) {
		
			result = (function(character, time) {
			
				var result = '';
				var count;
				
				for (count = 0; count < time; count++) result += character;

				return result; 
			})(' ', totalLength - this.length) + result;
		}
		
		return result;
	}

	/**
	 *
	 * 字串右邊補空白函數。
	 *  
	 * @author ace
	 * 
	 * @version 2010/10/14 ace 初始版本。   
	 *   
	 * @param {Integer} 字串延長後長度。
	 * @param {String} 若字串長度未達參數length指定之長度，則以此字元延長。    
	 *   
	 * @return 延長後的字串。 
	 * @type String 
	 *   
	 * @requires 
	 *     
	 * @see <a href="http://www.dotblogs.com.tw/wxvbbo/archive/2008/03/31/2368.aspx">利用JAVA SCRIPT來格式化日期</a> 
	 *
	 */
	String.prototype.paddingRight = function(totalLength) {
	
		var result = this;

		if (!isNaN(parseInt(totalLength)) && ((totalLength - this.length) > 1)) {
		
			result += (function(character, time) {
			
				var result = '';
				var count;
				
				for (count = 0; count < time; count++) result += character;

				return result; 
			})(' ', totalLength - this.length);
		}
		
		return result;
	}
	
	/**
	 *
	 * 格式化日期。
	 *  
	 * @author ace
	 * 
	 * @version 2010/10/14 ace 初始版本。   
	 * @version 2010/10/14 ace 增加毫秒(milliseconds)字串格式。   
	 * @version 2011/09/22 ace 參考Delphi之FormatDataTime函數，月份格式改以"mm"字串判斷，分鐘格式改以"nn"字串判斷。
	 *   
	 * @param {String} 格式化日期字串樣式。   
	 *   
	 * @return 經過格式化之字串。 
	 * @type String 
	 *   
	 * @requires 
	 *     
	 * @see <a href="http://www.dotblogs.com.tw/wxvbbo/archive/2008/03/31/2368.aspx">利用JAVA SCRIPT來格式化日期</a>  
	 *
	 */
	Date.prototype.formatDate = function(format) {

		var date = this;
		
		var month = date.getMonth() + 1;
		var hours = date.getHours();
		
		if (!format) format = 'mm/dd/yyyy'; // default format

		// 日期資料。     
		if (format.indexOf('yyyy') > -1) {
		
			format = format.replace('yyyy', date.getFullYear().toString());     
		}         
		else if (format.indexOf('yy') > -1) {
		
			format = format.replace('yy', date.getFullYear().toString().substr(2, 2));      
		}         
		 
		format = format.replace('mm', month.toString().padL(2, '0'));    
		format = format.replace('dd', date.getDate().toString().padL(2, '0'));

		// 時間資料。     
		if (format.indexOf('t') > -1) {
		
			if (hours > 11) {
			
				format = format.replace('t', 'pm');
			}
			else {
			
				format = format.replace('t', 'am');
			}
		}     
		 
		if (format.indexOf('HH') > -1) format = format.replace('HH', hours.toString().padL(2, '0'));
		 
		if (format.indexOf('hh') > -1) {
		
			if (hours > 12) hours -= 12;         
			if (hours == 0) hours = 12;
			format = format.replace('hh', hours.toString().padL(2, '0'));
		}     
		 
		if (format.indexOf('nn') > -1) format = format.replace('nn', date.getMinutes().toString().padL(2, '0'));
		if (format.indexOf('ss') > -1) format = format.replace('ss', date.getSeconds().toString().padL(2, '0'));
		
		if (format.indexOf('zzz') > -1) {
		
			format = format.replace('zzz', date.getMilliseconds().toString().padL(3, '0'));
		}         
		else if (format.indexOf('z') > -1) {
		
			format = format.replace('z', date.getMilliseconds().toString());
		}         
		 
		return format; 
	}
	
	result["isBrowserPlatform"] = function() {return (typeof Window != 'undefined') ? true : false;}
	result["isRhinoPlatform"] = function() {return (typeof Packages != 'undefined') ? true : false;}
	result["isGoogleAppsScriptPlatform"] = function() {return (typeof ScriptApp != 'undefined') ? true : false;}
	result["isNodePlatform"] = function() {return (typeof process != 'undefined') ? true : false;}
	
	result["enableJVMExternalCLibrary"] = 1;	// @memo 2024/12/29 ace 控制JVM是否使用載入dll檔案執行功能(如果有對應的dll檔案與函數)。
	
	// Namespace
	if (typeof root.tw == 'undefined') root.tw = {};
	if (typeof root.tw.ace33022 == 'undefined') root.tw.ace33022 = {};
	
  if (typeof root.tw.ace33022.po == 'undefined') root.tw.ace33022.po = {};
	if (typeof root.tw.ace33022.vo == 'undefined') root.tw.ace33022.vo = {};
  if (typeof root.tw.ace33022.bo == 'undefined') root.tw.ace33022.bo = {};
	
	if (typeof root.tw.ace33022.util == 'undefined') root.tw.ace33022.util = {};
	if (typeof root.tw.ace33022.functions == 'undefined') root.tw.ace33022.functions = {};
	
	if (typeof root.tw.ace33022.dao == 'undefined') root.tw.ace33022.dao = {};
	if (typeof root.tw.ace33022.dao.db == 'undefined') root.tw.ace33022.dao.db = {};
  if (typeof root.tw.ace33022.dao.db.po == 'undefined') root.tw.ace33022.dao.db.po = {};
	if (typeof root.tw.ace33022.dao.db.vo == 'undefined') root.tw.ace33022.dao.db.vo = {};
	if (typeof root.tw.ace33022.dao.db.program == 'undefined') root.tw.ace33022.dao.db.program = {};
	if (typeof root.tw.ace33022.dao.ws == 'undefined') root.tw.ace33022.dao.ws = {};
	if (typeof root.tw.ace33022.dao.ws.vo == 'undefined') root.tw.ace33022.dao.ws.vo = {};
	if (typeof root.tw.ace33022.dao.ws.program == 'undefined') root.tw.ace33022.dao.ws.program = {};
	
	if (typeof root.tw.ace33022.rhino == 'undefined') root.tw.ace33022.rhino = {};
	if (typeof root.tw.ace33022.rhino.functions == 'undefined') root.tw.ace33022.rhino.functions = {};
	if (typeof root.tw.ace33022.rhino.functions.cef == 'undefined') root.tw.ace33022.rhino.functions.cef = {};
	if (typeof root.tw.ace33022.rhino.google == 'undefined') root.tw.ace33022.rhino.google = {};
	if (typeof root.tw.ace33022.rhino.google.apps == 'undefined') root.tw.ace33022.rhino.google.apps = {};
	if (typeof root.tw.ace33022.rhino.google.apps.script == 'undefined') root.tw.ace33022.rhino.google.apps.script = {};
	if (typeof root.tw.ace33022.rhino.google.apps.macro == 'undefined') root.tw.ace33022.rhino.google.apps.macro = {};
	
	if (typeof root.tw.ace33022.google == 'undefined') root.tw.ace33022.google = {};
	if (typeof root.tw.ace33022.google.apps == 'undefined') root.tw.ace33022.google.apps = {};
	if (typeof root.tw.ace33022.google.apps.functions == 'undefined') root.tw.ace33022.google.apps.functions = {};
	
	// result["paths"] = new Object();
	result["paths"] = {};
	
	if (result["logger"] == null) result["logger"] = new logger();
	// result["Database"] = (function() {return null;})();
	result["location"] = new LocationInformation();
	
	// @memo 2026/03/26 ace 啟動Rhino執行環境的方式可透過命令列與Java函數。特別是從Tomcat進行呼叫，就不會設定dirWork參數。改成由呼叫環境呼叫Configuration.setDirWor()設定工作路徑，後續取得JavaScript等需要的環境。
	// result["setDirWork"] = function(value) {dirWork = value; return value;}
	// @memo 2026/04/01 ace 在DefaultConfiguration/Configuration的getDirWork()函數屬於通用模式，將依照不同執行環境取得相應的路徑設定。
	result["getDirWork"] = function() {
	
		var dirWork = '';
		
		if (result["isRhinoPlatform"]()) dirWork = root["getDirWork"]();
		if (result["isBrowserPlatform"]()) dirWork = document.getElementsByTagName('head')[0].getElementsByTagName('base')[0].getAttribute('href');

		return dirWork;
	}
	result["getDirJavaScript"] = function() {return result["isRhinoPlatform"]() ? root["getDirJavaScript"]() : result["getDirWork"]() + 'javascript';}
	result["getDirTool"] = function() {return result["isRhinoPlatform"]() ? root["getDirTool"]() : result["getDirWork"]() + 'tool';}
	
	result["JSLibDir"] = 'javascript';
	result["JavaScriptLibDir"] = 'javascript';
	result["dirJavaScriptLib"] = 'javascript';
	result["dirJavaScript"] = 'javascript';
	
	if (result["isRhinoPlatform"]()) {

		// Rhino執行環境
		
		result["JSLibDir"] = result["dirJavaScriptLib"];
		result["JavaScriptLibDir"] = result["dirJavaScriptLib"];
		result["dirJavaScriptLib"] = getDirJavaScript();
		result["dirJavaScript"] = getDirJavaScript();
	}
	else if (result["isBrowserPlatform"]()) {
	
		/**
		 *
		 * @description loadLink
		 *
		 * @version 2024/04/20 ace 初始版本。
		 *
		 * @author ace
		 *
		 */
		result.loadLink = function(sourceFile, rel, type) {
		
			var link = document.createElement('link');
			
			link.setAttribute('href', sourceFile);
			link.setAttribute('rel', rel);
			
			if (typeof type != 'undefined') link.setAttribute('type', type);
			
			document.head.appendChild(link);
		}
	
		/**
		 *
		 * @description loadCSS
		 *
		 * @param {String} CSS檔案連結。
		 *
		 * @version 2019/02/15 ace 初始版本。
		 *
		 * @author ace
		 *
		 * @see {@link https://stackoverflow.com/questions/10457870/is-there-any-way-to-load-css-and-javascript-from-a-string|html - Is there any way to load css and javascript from a string? - Stack Overflow}
		 *
		 */
		result.loadCSS = function(sourceFile) {result.loadLink(sourceFile, 'stylesheet', 'text/css');}
		
		/**
		 *
		 * @description loadJS
		 *
		 * @version 2019/02/15 ace 初始版本。
		 *
		 * @author ace
		 *
		 * @see {@link http://rocksaying.tw/archives/11847511.html|跨網站載入與執行 JavaScript 的方式 - 石頭閒語}
		 * @see {@link https://hype.codes/how-include-js-file-another-js-file|How to include JS file to another JS file? | Hype.Codes}
		 * @see {@link https://stackoverflow.com/questions/3248384/document-createelementscript-synchronously|javascript - document.createElement("script") synchronously - Stack Overflow}
		 *
		 */
		result.loadJS = function() {
			
			function removeAfterLoaded() {
			
				var eleScripts = document.getElementsByTagName('head')[0].getElementsByTagName('script');
				var index;
				
				for (index = 0; index < eleScripts.length ; index++) {
				
					// 將此節點自 DOM 中移除。(ps.需等待瀏覽器進行垃圾回收，回收效率並不高。)
					if (objJS == eleScripts[index]) document.getElementsByTagName('head')[0].removeChild(this); 
				}
			};
			
			var script = document.createElement('script');
			var callback;
			var sourceFile;
			
			script.setAttribute('type', 'text/javascript');
			
			if (arguments.length == 3) {
			
				sourceFile = arguments[1];
				if (!sourceFile.endsWith('.js')) sourceFile += '.js';
			
				script.setAttribute('charset', arguments[0]);
				// script.setAttribute('src', arguments[1]);
				
				callback = arguments[2];
			}
			else {
			
				sourceFile = arguments[0];
				
				if (!sourceFile.endsWith('.js')) sourceFile += '.js';
				
				// this.substring(startsPosition, startsPosition + searchString.length) == searchString;
				
				// script.setAttribute('src', arguments[0]);
				
				callback = arguments[1];
			}
			
			script.setAttribute('src', sourceFile);
			
			script.onload = function() {if (typeof callback == 'function') callback();};
			
			document.head.appendChild(script);
		}
	}
	
	result["AceDir"] = 'tw/ace33022';
	result["VODir"] = result["AceDir"] + '/vo';
	result["DAODir"] = result["AceDir"] + '/dao/Rhino';
	result["BrowserUIDir"] = result["AceDir"] + '/program/browser';
	
	if (typeof process != 'undefined') {

		// nodeJS執行環境
		
		if ((typeof nw != 'undefined') && (typeof module == 'undefined')) {
		
			// NW.js執行環境
			
			// 採用HTML標籤引入資料時不會有module物件。
			root.tw.ace33022.DefaultConfiguration = result;
		}
		else {
		
			module.exports = result;
		}
	}
	else {
		
		root.tw.ace33022.DefaultConfiguration = result;
	}
})(this);