/**
 *
 * @description Ancestor
 *
 * @version 2013/05/01 初始版本。
 * @version 2013/09/25 類別名稱異動為Ancestor。
 * @version 2013/11/23 以require.js之方式改寫。
 * @version 2014/06/09 新增函數getSchemaJSONObject。
 * @version 2014/08/14 JSON資料格式調整。
 * @version 2014/11/26 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2015/04/02 JavaScript的資料型別並沒有所謂的null(用於表示物件)，JSON資料傳遞內容並沒有所謂的null資料；因此從資料表取得null資料不適合直接寫入要傳遞的JSON資料傳遞內容。
 *
 * @author ace
 *
 * @see {@link https://developer.mozilla.org/zh-TW/docs/JavaScript JavaScript}
 * @see <a href="http://requirejs.org/docs/api.html">REQUIREJS API</a>
 * @see <a href="https://gist.github.com/simme/9397874">gistfile1.js</a>
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
 * @see <a href="http://fred-zone.blogspot.tw/2012/05/javascript_22.html">簡單理解 JavaScript 的記憶體管理機制 ~ Fred's blog</a>
 *
 * @comment 2015/04/11 JSDoc無法產生立即函數內的函數說明手冊，可藉由在立即函數前先宣告空內容的變數來應對產生手冊；但會造成佔用全域變數的命名空間。
 *
 */

// var Ancestor = function() {};

(function(root) {	

	var RequireJSConfig;
	
	var datetimeToDateString;
	var datetimeToTimeString;

	var result = function() {

		/**
		 * 
		 * @memo 2024/03/07 ace 在Google Apps環境下，採用Number、String產生的物件資料會回傳JSON物件？改採常數寫入則不會？
		 * 
		 */
		// var serialVersionUID = new Number(1);	// 保留
    var serialVersionUID = 1; // 保留
		
		// var rowId = new Number(0);							// 流水號
		// var invalidFlag = new String('0');			// 作廢旗標('1':表示作廢。)
		// var insertDate = new String('');      	// 建立日期
		// var insertTime = new String('');      	// 建立時間
		// var insertUserAccount = new String('');	// 建立人員帳號
		// var updateDate = new String('');      	// 異動日期
		// var updateTime = new String('');      	// 異動時間
		// var updateUserAccount = new String(''); // 異動人員帳號

		var rowId = 0;							// 流水號
		var invalidFlag = '0';			// 作廢旗標('1':表示作廢。)
		var insertDate = '';      	// 建立日期
		var insertTime = '';      	// 建立時間
		var insertUserAccount = '';	// 建立人員帳號
		var updateDate = '';      	// 異動日期
		var updateTime = '';      	// 異動時間
		var updateUserAccount = ''; // 異動人員帳號

		this.setRowId = function(value) {if (value) rowId = value; return value;}
		this.setInvalidFlag = function(value) {if (value) invalidFlag = value; return value;}
		this.setInsertDate = function(value) {if (value) insertDate = value; return value;}
		this.setInsertTime = function(value) {if (value) insertTime = value; return value;}
		this.setInsertUserAccount = function(value) {if (value) insertUserAccount = value; return value;}
		this.setUpdateDate = function(value) {if (value) updateDate = value; return value;}
		this.setUpdateTime = function(value) {if (value) updateTime = value; return value;}
		this.setUpdateUserAccount = function(value) {if (value) updateUserAccount = value; return value;}
		
		this.getRowId = function() {return rowId;}
		this.getInvalidFlag = function() {return invalidFlag;}
		this.getInsertDate = function() {return insertDate;}
		this.getInsertTime = function() {return insertTime;}
		this.getInsertUserAccount = function() {return insertUserAccount;}
		this.getUpdateDate = function() {return updateDate;}
		this.getUpdateTime = function() {return updateTime;}
		this.getUpdateUserAccount = function() {return updateUserAccount;}
	
		// JSON物件資料。
		this.toJSONObject = function() {

			return {

				"row_id": rowId,
				"invalid_flag": invalidFlag,
				"insert_date": insertDate,
				"insert_time": insertTime,
				"insert_user_account": insertUserAccount,
				"update_date": updateDate,
				"update_time": updateTime,
				"update_user_account": updateUserAccount
			};
		}

		this.toJSONString = function() { return JSON.stringify(this.toJSONObject()); }

		this.setValueFromJSONObject = function(value) {

			this.setRowId(value["row_id"]);
			this.setInvalidFlag(value["invalid_flag"]);
			this.setInsertDate(value["insert_date"]);
			this.setInsertTime(value["insert_time"]);
			this.setInsertUserAccount(value["insert_user_account"]);
			this.setUpdateDate(value["update_date"]);
			this.setUpdateTime(value["update_time"]);
			this.setUpdateUserAccount(value["update_user_account"]);
			
			return this;
		}

		this.setValueFromJSONString = function(value) { this.setValueFromJSONObject(JSON.parse(value)); }

		this.getSchemaJSONObject = function() {
		
			var result = {};

			result["title"] = 'ancestor';
			result["type"] = 'object';
			result["required"] = ["row_id"];

			result["properties"] = {};
			
			result["properties"]["row_id"] = {"description": "The unique identifier for a consumptions", "type": "integer"};

			result["properties"]["invalid_flag"] = {"description": "作廢旗標", "type": "string", "maxLength": 1};
			result["properties"]["insert_date"] = {"description": "新增日期", "type": "string", "maxLength": 8};
			result["properties"]["insert_time"] = {"description": "新增時間", "type": "string", "maxLength": 9};
			result["properties"]["insert_user_account"] = {"description": "新增人員帳號", "type": "string", "maxLength": 32};
			result["properties"]["update_date"] = {"description": "異動日期", "type": "string", "maxLength": 8};
			result["properties"]["update_time"] = {"description": "異動時間", "type": "string", "maxLength": 9};
			result["properties"]["update_user_account"] = {"description": "異動人員帳號", "type": "string", "maxLength": 32};
			
			return result;
		}
	
		var setUpdateDatetime = function(date) {

			updateDate = datetimeToDateString(date);
			updateTime = datetimeToTimeString(date, true);
		}
		
		this.setNowUpdateDateTime = function() {setUpdateDatetime(new Date());}

		this.initInsertDateTime = function() {

			var date = new Date();

			insertDate = datetimeToDateString(date);
			insertTime = datetimeToTimeString(date, true);
			
			setUpdateDatetime(date);
		}
		
		this.initInsertDateTime();
	}

	if (typeof define == 'function') {

		define(["tw.ace33022.functions.Datetime"], function(Datetime) {
		
			datetimeToDateString = Datetime.doDatetimeToDateString;
			datetimeToTimeString = Datetime.doDatetimeToTimeString;
			
			return result;
		});
	}
	else if (typeof exports != 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
		
		datetimeToDateString = require(RequireJSConfig.paths["tw.ace33022.functions.Datetime"] + '.js').doDatetimeToDateString;
		datetimeToTimeString = require(RequireJSConfig.paths["tw.ace33022.functions.Datetime"] + '.js').doDatetimeToTimeString;
		
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;

		if (typeof load != 'undefined') {

			// load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.util.DatetimeUtil"] + '.js');
			if (typeof tw.ace33022.functions.Datetime == 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.functions.Datetime"] + '.js');
		}
		
		// datetimeToDateString = root.tw.ace33022.util.DatetimeUtil.doDatetimeToDateString;
		// datetimeToTimeString = root.tw.ace33022.util.DatetimeUtil.doDatetimeToTimeString;
		datetimeToDateString = root.tw.ace33022.functions.Datetime.doDatetimeToDateString;
		datetimeToTimeString = root.tw.ace33022.functions.Datetime.doDatetimeToTimeString;
		
		// 模擬Java方式的命名空間。
		root.tw.ace33022.po.Ancestor = result;
	}
})(this);