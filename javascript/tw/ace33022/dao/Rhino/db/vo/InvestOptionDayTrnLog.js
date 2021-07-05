/**
 *
 * @description tw.ace33022.dao.db.vo.InvestOptionDayTrnLog(投信每日選擇權交易統計資料)
 *
 * @return {Object} InvestOptionDayTrnLog
 *
 * @require underscore.js
 * @require tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog
 * @require tw.ace33022.vo.InvestOptionDayTrnLog
 *
 * @version 2013/11/01 ace 初始版本。
 * @version 2015/03/22 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
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
	
	var ancestor;
	var accessVO;
	
	var result = function(conn) {
	
		var serialVersionUID = new Number(1);     // 保留

		root._.extend(this, new ancestor(conn));
		this.prototype = this;		// 由於已複製父類別Ancestor，因此原型類別指向自己。
		
		// this.setTableName('invest_option_day_trn_log');
		this.setAccessVO(accessVO);
		this.setDAO(new Packages.tw.ace33022.dao.db.vo.InvestOptionDayTrnLog(conn));
		
		this.doInsert = function(vo) {

			var javaVO = new Packages.tw.ace33022.vo.InvestOptionDayTrnLog();

			javaVO.setValueFromJSONString(vo.toJSONString());
			
			return this.getDAO().doInsert(javaVO);
		}
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog", "tw.ace33022.vo.InvestOptionDayTrnLog", "underscore"], function(Ancestor, InvestOptionDayTrnLog) {
		
			ancestor = Ancestor;
			accessVO = InvestOptionDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		require(RequireJSConfig.paths["underscore"] + '.js');
	
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.InvestOptionDayTrnLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
		
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
		
			if (typeof root.tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog"] + '.js');
			if (typeof root.tw.ace33022.vo.InvestOptionDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.InvestOptionDayTrnLog"] + '.js');
		}	
		
		ancestor = root.tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog;
		accessVO = root.tw.ace33022.vo.InvestOptionDayTrnLog;
		
		root.tw.ace33022.dao.db.vo.InvestOptionDayTrnLog = result;
	}    
})(this);