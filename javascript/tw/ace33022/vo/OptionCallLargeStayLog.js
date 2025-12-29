/**
 *
 * @description tw.ace33022.vo.OptionCallLargeStayLog
 *
 * @return {Object} OptionCallLargeStayLog
 *
 * @require underscore.js
 * @require tw.ace33022.vo.OptionCallLargeStayAllLog
 *
 * @version 2013/11/01 初始版本。
 * @version 2015/03/18 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2015/04/02 JavaScript的資料型別並沒有所謂的null(用於表示物件)，JSON資料傳遞內容並沒有所謂的null資料；因此從資料表取得null資料不適合直接寫入要傳遞的JSON資料傳遞內容。
 * @version 2020/03/20 ace 名稱調整。
 *
 * @author ace
 *
 * @see <a href="https://developer.mozilla.org/zh-TW/docs/JavaScript">JavaScript</a>
 *
 */

(function(root) {
 
	var RequireJSConfig;
	
	var _;	// underscore.js
	
	var ancestor;
		
	var result = function() {

		var serialVersionUID = new Number(1);	// 保留
  
		var conMonth = '';        // 契約月份
  
		var uber = new ancestor();
		
		_.extend(this, uber);
		// this.prototype = uber;	// 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		// @version 2015/04/02 JavaScript的資料型別並沒有所謂的null(用於表示物件)，JSON資料傳遞內容並沒有所謂的null資料；因此從資料表取得null資料不適合直接寫入要傳遞的JSON資料傳遞內容。
		this.setConMonth = function(value) {if (value) conMonth = value; return value;}
  
		this.getConMonth = function() {return conMonth;}
  
		// JSON物件資料。
		this.toJSONObject = function() {
  
			var result = {
    
				'con_month': conMonth
			}
    
			return _.extend(result, uber.toJSONObject());
		}
  
		this.setValueFromJSONObject = function(value) {
  
			uber.setValueFromJSONObject(value);
    
			this.setConMonth(value["con_month"]);
		}
		
    this.getSchemaJSONObject = function() {

      var result = _.extend({}, uber.getSchemaJSONObject());

			result.$schema = '/json-schema/VO/OptionCallLargeStayLog';
			result.title = 'option_call_large_stay_log';
			
			result["properties"]["con_month"] = {"description": "契約月份", "type": "string", "maxLength": 6};

      return result;
    }
	}

	if (typeof define == 'function') {
	
		define(["tw.ace33022.vo.OptionCallLargeStayAllLog", "underscore"], function(OptionCallLargeStayAllLog) {
		
			_ = root._;
		
			ancestor = OptionCallLargeStayAllLog;
				
			return result;
		});
	}
	else if (typeof exports != 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
	
		_ = require(RequireJSConfig.paths["underscore"] + '.js');
		
		ancestor = require(RequireJSConfig.paths["tw.ace33022.vo.OptionCallLargeStayAllLog"] + '.js');
		
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load != 'undefined') {
	
			if (typeof root._ == 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
			
			if (typeof root.tw.ace33022.vo.OptionCallLargeStayAllLog == 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.OptionCallLargeStayAllLog"] + '.js');
		}
		
		_ = root._;
		
		ancestor = root.tw.ace33022.vo.OptionCallLargeStayAllLog;
			
		root.tw.ace33022.vo.OptionCallLargeStayLog = result;
	}
})(this);