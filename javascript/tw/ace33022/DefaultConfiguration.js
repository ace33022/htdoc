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
		"RESTfulRelativePath": "ws/rs/",
		"requirejsFile": "javascript/requirejs/require.js"
	};
	
  var jsLibDir = 'javascript';
	var javaScriptLibDir = 'javascript';
	
	var Database = function() {return null;}
	
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

		if (typeof window != 'undefined') result = window.location;
		
		return result;
	}

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

		if (typeof console !== 'undefined') {

			// nodeJS執行環境
			out = console.log;
		}
		else if (typeof print !== 'undefined') {

			// Rhino執行環境
			out = print;
		}
		else {

			// LibreOffice沒有提供print函數。
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
	
	if (typeof root.tw == 'undefined') root.tw = {};
	if (typeof root.tw.ace33022 == 'undefined') root.tw.ace33022 = {};
	if (typeof root.tw.ace33022.util == 'undefined') root.tw.ace33022.util = {};
	if (typeof root.tw.ace33022.functions == 'undefined') root.tw.ace33022.functions = {};
	if (typeof root.tw.ace33022.vo == 'undefined') root.tw.ace33022.vo = {};
	if (typeof root.tw.ace33022.dao == 'undefined') root.tw.ace33022.dao = {};
	if (typeof root.tw.ace33022.dao.db == 'undefined') root.tw.ace33022.dao.db = {};
	if (typeof root.tw.ace33022.dao.db.vo == 'undefined') root.tw.ace33022.dao.db.vo = {};
	if (typeof root.tw.ace33022.dao.ws == 'undefined') root.tw.ace33022.dao.ws = {};
	if (typeof root.tw.ace33022.dao.ws.vo == 'undefined') root.tw.ace33022.dao.ws.vo = {};
	
	if (typeof process != 'undefined') {

    // nodeJS執行環境
		
		// console.log('Process DefaultConfiguration...');
		
		if (typeof nw != 'undefined') {
		
			// process.env.NODE_DIR = process.env.NODE_PATH;
		}
		else {
		
			// if (!process.env.NODE_DIR) throw new Error('NODE_DIR is undefined!');
		}

    // jsLibDir = process.env.NODE_DIR;
	}
	else {

    if (typeof Packages != 'undefined') {

      // Rhino執行環境
			
      jsLibDir = Packages.java.lang.System.getProperty('JSLibDir');
			javaScriptLibDir = Packages.java.lang.System.getProperty('JavaScriptLibDir');
    }
	}
	
	result["Database"] = new Database();
	result["location"] = new LocationInformation();
	result["logger"] = new logger();
	result["isGoogleAppsScriptPlatform"] = function() {
	
		var result = false;
		
		if (typeof ScriptApp != 'undefined') result = true;
		
		return result;
	}
	result["getCURLExeFile"] = function() {return 'T:/package/net/curl/bin/curl.exe';}
	
	result["paths"] = new Object();
	
	result["JSLibDir"] = jsLibDir;
	result["JSLibPath"] = jsLibDir + '/';
	result["JavaScriptLibDir"] = javaScriptLibDir;
	result["AceDir"] = 'tw/ace33022';
	result["VODir"] = result["AceDir"] + '/vo';
	result["DAODir"] = result["AceDir"] + '/dao/Rhino';
	result["BrowserUIDir"] = result["AceDir"] + '/program/browser';
		
	result["loggingPropertiesFile"] = jsLibDir + '/tw/ace33022/util/Rhino/logging.properties';
	result["log4jPropertiesFile"] = jsLibDir + '/tw/ace33022/util/Rhino/log4j.properties';
	
	result["userSpaceDir"] = 'W:/UserSpace';
	result["tempDir"] = 'O:/tmp';
	result["DelphiBaseDir"] = 'K:/ReThink/Pascal/ExecuteEnv';
	result["enableJVMExternalCLibrary"] = 1;	// @memo 2024/12/29 ace 控制JVM是否使用載入dll檔案執行功能(如果有對應的dll檔案與函數)。
		
	// if ((typeof Packages === 'undefined') && (typeof document !== 'undefined')) {}
	
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
		 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith">String.prototype.startsWith() - JavaScript | MDN</a> 
		 *
		 */
		String.prototype.startsWith = function(searchString, position) {
		
			var pos = position > 0 ? position | 0 : 0;
			
      return this.substring(pos, pos + searchString.length) == searchString;
		}
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