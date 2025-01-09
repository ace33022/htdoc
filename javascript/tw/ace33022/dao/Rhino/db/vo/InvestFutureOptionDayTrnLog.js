/**
 *
 * @description tw.ace33022.dao.db.vo.InvestFutureOptionDayTrnLog(投信每日期貨/選擇權交易統計資料)
 *
 * @return {Object} tw.ace33022.dao.db.vo.InvestFutureOptionDayTrnLog
 *
 * @require underscore.js
 * @require tw.ace33022.vo.InvestFutureOptionDayTrnLog
 * @require tw.ace33022.dao.vo.ForeignFutureOptionDayTrnLog
 * 
 * @version 2013/11/07 ace 初始版本。
 * @version 2015/03/10 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2020/04/07 ace 名稱調整。
 *
 * @author ace
 *
 * @see <a href="http://ejohn.org/">John Resig</a>
 * @see <a href="https://github.com/jeresig/env-js">jeresig/env-js</a>
 *
 */
(function(root) {

	var RequireJSConfig;
	
	var _;	// underscore.js
	
	var ancestor;
	var accessVO;
	
	var result = function(conn) {

		var serialVersionUID = new Number(1);	// 保留
		
		var uber = new ancestor(conn);
		
		_.extend(this, uber);
		// this.prototype = uber;	// 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		this.setTableName('invest_future_option_day_trn_log');
		this.setAccessVO(accessVO);
	}
	
	if (typeof define === 'function') {
	
		define(["tw.ace33022.vo.InvestFutureOptionDayTrnLog", "tw.ace33022.dao.vo.ForeignFutureOptionDayTrnLog", "underscore"], function(InvestFutureOptionDayTrnLog, ForeignFutureOptionDayTrnLog) {
		
			_ = root._;

			accessVO = InvestFutureOptionDayTrnLog;
			ancestor = ForeignFutureOptionDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports  !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		_ = require(RequireJSConfig.paths["underscore"] + '.js');
		
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.InvestFutureOptionDayTrnLog"] + '.js');
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.vo.ForeignFutureOptionDayTrnLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
	
		if (typeof load !== 'undefined') {
		
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
			
			if (typeof root.tw.ace33022.vo.InvestFutureOptionDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.InvestFutureOptionDayTrnLog"] + '.js');
			if (typeof root.tw.ace33022.dao.db.vo.ForeignFutureOptionDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.ForeignFutureOptionDayTrnLog"] + '.js');
		}
		
		_ = root._;
		
		accessVO = root.tw.ace33022.vo.InvestFutureOptionDayTrnLog;
		ancestor = root.tw.ace33022.dao.db.vo.ForeignFutureOptionDayTrnLog;
			
		root.tw.ace33022.dao.db.vo.InvestFutureOptionDayTrnLog = result;
	}    
})(this);