/**
 *
 * @description ForeignFutureOptionDayTrnLog(外資每日期貨/選擇權交易統計資料)
 *
 * @require underscore.js
 * @require tw.ace33022.vo.Ancestor
 *
 * @version 2013/11/06 ace 初始版本。
 * @version 2015/03/10 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2015/04/02 ace JavaScript的資料型別並沒有所謂的null(用於表示物件)，JSON資料傳遞內容並沒有所謂的null資料；因此從資料表取得null資料不適合直接寫入要傳遞的JSON資料傳遞內容。
 * @version 2020/04/07 ace 名稱調整。
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

		var trnDate = '';           // 交易日期
		var futureBuyQty = 0;     	// 期貨多方交易口數
		var optionBuyQty = 0;     	// 選擇權多方交易口數
		var futureSellQty = 0;    	// 期貨空方交易口數
		var optionSellQty = 0;    	// 選擇權空方交易口數
		var futureStayBuyQty = 0; 	// 期貨多方未平倉口數
		var optionStayBuyQty = 0; 	// 選擇權多方未平倉口數
		var futureStaySellQty = 0;	// 期貨空方未平倉口數
		var optionStaySellQty = 0;	// 選擇權空方未平倉口數
		
		var uber = new ancestor();
		
		_.extend(this, uber);
		// this.prototype = uber; // 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
		
		// @version 2015/04/02 JavaScript的資料型別並沒有所謂的null(用於表示物件)，JSON資料傳遞內容並沒有所謂的null資料；因此從資料表取得null資料不適合直接寫入要傳遞的JSON資料傳遞內容。
		this.setTrnDate = function(value) { if (value) trnDate = value; return value; }
		this.setFutureBuyQty = function(value) { if (value) futureBuyQty = value; return value; }
		this.setOptionBuyQty = function(value) { if (value) optionBuyQty = value; return value; }
		this.setFutureSellQty = function(value) { if (value) futureSellQty = value; return value; }
		this.setOptionSellQty = function(value) { if (value) optionSellQty = value; return value; }
		this.setFutureStayBuyQty = function(value) { if (value) futureStayBuyQty = value; return value; }
		this.setOptionStayBuyQty = function(value) { if (value) optionStayBuyQty = value; return value; }
		this.setFutureStaySellQty = function(value) { if (value) futureStaySellQty = value; return value; }
		this.setOptionStaySellQty = function(value) { if (value) optionStaySellQty = value; return value; }
		
		this.getTrnDate = function() { return trnDate; }
		this.getFutureBuyQty = function() { return futureBuyQty; }
		this.getOptionBuyQty = function() { return optionBuyQty; }
		this.getFutureSellQty = function() { return futureSellQty; }
		this.getOptionSellQty = function() { return optionSellQty; }
		this.getFutureStayBuyQty = function() { return futureStayBuyQty; }
		this.getOptionStayBuyQty = function() { return optionStayBuyQty; }
		this.getFutureStaySellQty = function() { return futureStaySellQty; }
		this.getOptionStaySellQty = function() { return optionStaySellQty; }
  
		// JSON物件資料。
		this.toJSONObject = function() {
  
			var result = {
    
				"trn_date": trnDate,
				"futures_buy_qty": futureBuyQty,
				"options_buy_qty": optionBuyQty,
				"futures_sell_qty": futureSellQty,
				"options_sell_qty": optionSellQty,
				"futures_stay_buy_qty": futureStayBuyQty,
				"options_stay_buy_qty": optionStayBuyQty,
				"futures_stay_sell_qty": futureStaySellQty,
				"options_stay_sell_qty": optionStaySellQty
			};
    
			return _.extend(result, uber.toJSONObject());
		}
  
		this.setValueFromJSON = function(value) {
  
			uber.setValueFromJSON(value);
    
			this.setTrnDate(value[trn_date]);
			this.setFutureBuyQty(value[futures_buy_qty]);
			this.setOptionBuyQty(value[options_buy_qty]);
			this.setFutureSellQty(value[futures_sell_qty]);
			this.setOptionSellQty(value[options_sell_qty]);
			this.setFutureStayBuyQty(value[futures_stay_buy_qty]);
			this.setOptionStayBuyQty(value[options_stay_buy_qty]);
			this.setFutureStaySellQty(value[futures_stay_sell_qty]);
			this.setOptionStaySellQty(value[options_stay_sell_qty]);
		}
		
    this.getSchemaJSONObject = function() {

      var result = _.extend({}, uber.getSchemaJSONObject());

			result.$schema = '/json-schema/VO/ForeignFutureOptionDayTrnLog';
			result.title = 'foreign_future_option_day_trn_log';
			
      result["properties"]["trn_date"] = {"description": "交易日期", "type": "string", "maxLength": 8};
      result["properties"]["future_buy_qty"] = {"description": "期貨多方交易口數", "type": "number"};
			result["properties"]["option_buy_qty"] = {"description": "選擇權多方交易口數", "type": "number"};
      result["properties"]["future_sell_qty"] = {"description": "期貨空方交易口數", "type": "number"};
			result["properties"]["option_sell_qty"] = {"description": "選擇權空方交易口數", "type": "number"};
      result["properties"]["future_stay_buy_qty"] = {"description": "期貨多方未平倉口數", "type": "number"};
			result["properties"]["option_stay_buy_qty"] = {"description": "選擇權多方未平倉口數", "type": "number"};
      result["properties"]["future_stay_sell_qty"] = {"description": "期貨空方未平倉口數", "type": "number"};
			result["properties"]["option_stay_sell_qty"] = {"description": "選擇權空方未平倉口數", "type": "number"};

      return result;
    }
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.vo.Ancestor", "underscore"], function(Ancestor) {
		
			_ = root._;
		
			ancestor = Ancestor;
				
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
	
		_ = require(RequireJSConfig.paths["underscore"] + '.js');
		
		ancestor = require(RequireJSConfig.paths["tw.ace33022.vo.Ancestor"] + '.js');
		
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {

			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');

			if (typeof root.tw.ace33022.vo.Ancestor === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.Ancestor"] + '.js');
		}
		
		_ = root._;
			
		ancestor = root.tw.ace33022.vo.Ancestor;
		
		root.tw.ace33022.vo.ForeignFutureOptionDayTrnLog = result;
	}
})(this);