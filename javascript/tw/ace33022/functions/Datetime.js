/*
 * tw.ace33022.functions.Datetime
 *  
 * @version 2013/10/11 ace 初始版本。
 * @version 2013/11/23 ace 以require.js之方式改寫。
 * @version 2014/06/23 ace 新增函數dateTimeToDateTimeString。
 * @version 2014/11/27 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2015/01/22 ace moment.js無法使用Rhino的load載入，調整函數處理方式。
 * @version 2023/07/04 ace 名稱從DateTime調整為Datetime。
 * @version 2024/03/10 ace 增加Google Apps執行環境。
 *
 * @see <a href="http://requirejs.org/">require.js</a>
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *   
 * @author ace
 * 
 */
(function(root) {

	var moment;
	// var sprintf;

  /*
   * Datetime物件資料轉換成C8格式日期字串
   *  
   * @param {Date} value Date物件資料。
   *  
   * @return C8格式日期字串。
   * @type String
   * 
   * @version 2013/10/11 ace 初始版本。
	 * @version 2015/01/22 ace moment.js無法使用Rhino的load載入，調整函數處理方式。	 
   *   
   * @author ace
   * 
   */
  function doDatetimeToDateString(value) {

    var result = '';
		
    if (typeof Utilities != 'undefined') {
		
      // result = Utilities.formatString('%d%02d%02d', value.getFullYear(), value.getMonth() + 1, value.getDate())
      result = Utilities.formatDate(value, 'GMT+08:00', 'yyyyMMdd');
    }
		else if (typeof moment != 'undefined') {
		
			// @memo 2024/03/31 ace moment的年月日字串格式化與Google Apps Script的Utilities並不相同？
			// result = moment(value).format('yyyyMMdd');
			result = moment(value).format('YYYYMMDD');
		}
		else {
		
			result = root.sprintf('%d%02d%02d', value.getFullYear(), value.getMonth() + 1, value.getDate());
		}	
  
    return result;
  }
	
  /*
   * Datetime物件資料轉換成C6或C9格式時間字串
   *  
   * @param {Date} value Date物件。
   * @param {Boolean} c9 指定轉換成C6或C9格式時間字串。
   *  
   * @return 參數c9為布林值true，傳回C9格式時間字串；否則傳回C6格式字串。
   * @type String
   * 
   * @version 2013/10/11 ace 初始版本。   
	 * @version 2015/01/22 ace moment.js無法使用Rhino的load載入，調整函數處理方式。	 
   *   
   * @author ace
   * 
   */
  function doDatetimeToTimeString(value, c9) {

    var result = new String();
    var timeFormat = 'HHmmss';
  
		if ((typeof c9 !== 'undefined') && (c9 == true)) timeFormat = 'HHmmssSSS';
		
    if (typeof Utilities != 'undefined') {

      result = Utilities.formatDate(value, "GMT+08:00", timeFormat);
    }
		else if (typeof moment != 'undefined') {
		
			result = moment(value).format(timeFormat);
		}
		else {
		
			result = root.sprintf('%02d%02d%02d', value.getHours(), value.getMinutes(), value.getSeconds());
			
			if ((typeof c9 !== 'undefined') && (c9 == true)) result = root.sprintf('%02d%02d%02d%03d', value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
		}	
  
    return result;
  }

  /*
   * Datetime物件資料轉換成C14或C17格式日期時間字串
   * 
   * @param {Date} date Date物件。
   * @param {Boolean} c9 指定轉換成C14或C17格式日期時間字串。
   *  
   * @return 若參數c9為布林值true，傳回C17格式日期時間字串；否則傳回C14格式日期時間字串。
   * @type String
   * 
   * @version 2014/06/23 ace 初始版本。   
   *   
   * @author ace
   * 
   */
  function doDatetimeToDatetimeString(value, c9) {return new String(doDatetimeToDateString(value) + doDatetimeToTimeString(value, c9));}
	
  /*
   * C8格式日期字串轉換成Datetime物件
   *  
   * @param {String} value C8格式日期字串。
   *  
   * @return Date物件資料。
   * @type Date
   * 
   * @version 2016/04/26 ace 初始版本。  
   *   
   * @author ace
   * 
   */
	function doDateStringToDatetime(value) {
	
		// var result = 0;
	
		// var year = new Number((new String(value)).substr(0, 4));
		// var month = new Number((new String(value)).substr(4, 2)) - 1;
		// var day = new Number((new String(value)).substr(6, 2));
		
		// result = new Date(year, month, day);
		
		// return result;
		
		// return new Date(new Number((new String(value)).substr(0, 4)), new Number((new String(value)).substr(4, 2)) - 1, new Number((new String(value)).substr(6, 2)));
		return new Date(new Number((new String(value)).substring(0, 4)), new Number((new String(value)).substring(4, 6)) - 1, new Number((new String(value)).substring(6))); 
	}

  /*
   * 日期時間字串轉換成Datetime物件資料
   *  
   * @param {String} value 日期時間字串。
   *  
   * @return Date物件資料。
   * @type Date
   * 
   * @version 2016/05/15 ace 初始版本。  
   *   
   * @author ace
   * 
   */
	function doDatetimeStringToDatetime(value) {
	
		// var year = new Number((new String(value)).substr(0, 4));
		// var month = new Number((new String(value)).substr(4, 2)) - 1;
		// var day = new Number((new String(value)).substr(6, 2));
		// var hour = new Number((new String(value)).substr(8, 2));
		// var minutes = new Number((new String(value)).substr(10, 2));
		// var seconds = new Number((new String(value)).substr(12, 2));
		// var milliseconds = new Number((new String(value)).substr(14, 3));
		
		// return new Date(year, month, day, hour, minutes, seconds, milliseconds);
		
		// return new Date(new Number((new String(value)).substr(0, 4)), new Number((new String(value)).substr(4, 2)) - 1, new Number((new String(value)).substr(6, 2)), new Number((new String(value)).substr(8, 2)), new Number((new String(value)).substr(10, 2)), new Number((new String(value)).substr(12, 2)), new Number((new String(value)).substr(14, 3)));
		return new Date(new Number((new String(value)).substring(0, 4)), new Number((new String(value)).substring(4, 6)) - 1, new Number((new String(value)).substring(6, 8)), new Number((new String(value)).substring(8, 10)), new Number((new String(value)).substring(10, 12)), new Number((new String(value)).substring(12, 14)), new Number((new String(value)).substring(14, 17)));
	}

	if (typeof define == 'function') {

		define(["moment"], function(dmoment) {
		
			moment = dmoment;
			
			return {
	
				doDatetimeToDateString: doDatetimeToDateString,
				doDatetimeToTimeString: doDatetimeToTimeString,
				doDatetimeToDatetimeString: doDatetimeToDatetimeString,
				doDateStringToDatetime: doDateStringToDatetime,
				doDatetimeStringToDatetime: doDatetimeStringToDatetime
			};
		});	
	}
	else if (typeof exports !== 'undefined') {
	
		moment = require('moment/moment.js');
	
		exports.doDatetimeToDateString = doDatetimeToDateString;
		exports.doDatetimeToTimeString = doDatetimeToTimeString;
		exports.doDatetimeToDatetimeString = doDatetimeToDatetimeString;
		exports.doDateStringToDatetime = doDateStringToDatetime;
		exports.doDatetimeStringToDatetime = doDatetimeStringToDatetime;
	}
	else {
	
    if (typeof Packages != 'undefined') {

      if (typeof root.tw.ace33022.RequireJSConfig == 'undefined') throw new Error('tw.ace33022.RequireJSConfig is undefined.');
      
      // moment無法以Rhino的load載入。
      // if (typeof(global.moment) === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths['moment'] + '.js');
			
			// moment = global.moment;

      load(root.tw.ace33022.RequireJSConfig.baseUrl + root.tw.ace33022.RequireJSConfig.paths["sprintfjs"] + '.js');

      root.sprintf = window.sprintf;
    }
		
		if (typeof root.tw.ace33022.functions.Datetime == 'undefined') root.tw.ace33022.functions.Datetime = {};
		
		root.tw.ace33022.functions.Datetime.doDatetimeToDateString = doDatetimeToDateString;
		root.tw.ace33022.functions.Datetime.doDatetimeToTimeString = doDatetimeToTimeString;
		root.tw.ace33022.functions.Datetime.doDatetimeToDatetimeString = doDatetimeToDatetimeString;
		root.tw.ace33022.functions.Datetime.doDateStringToDatetime = doDateStringToDatetime;
		root.tw.ace33022.functions.Datetime.doDatetimeStringToDatetime = doDatetimeStringToDatetime;
	}
})(this);