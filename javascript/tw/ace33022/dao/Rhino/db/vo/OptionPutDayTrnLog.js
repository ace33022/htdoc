/**
 *
 * @description OptionPutDayTrnLog(選擇權賣權每日交易行情)
 *
 * @return {Object} OptionPutDayTrnLog
 *
 * @version 2013/11/01 ace 初始版本。
 * @version 2015/03/13 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2020/03/20 ace 名稱調整。
 *
 * @see <a href="http://ejohn.org/">John Resig</a>
 * @see <a href="https://github.com/jeresig/env-js">jeresig/env-js</a>
 *
 * @author ace
 *
 */
 
(function(root) {

	var RequireJSConfig;
	
	var ancestor;
	var accessVO;
	
	var result = function(conn) {

		var serialVersionUID = new Number(1);     // 保留
  
		root._.extend(this, new ancestor(conn));
    this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		// this.setTableName('option_put_day_trn_log');
		this.setAccessVO(accessVO);
		this.setDAO(new Packages.tw.ace33022.dao.db.vo.OptionPutDayTrnLog(conn));
		
		this.doInsert = function(vo) {

			var javaVO = new Packages.tw.ace33022.vo.OptionPutDayTrnLog();

			javaVO.setValueFromJSONString(vo.toJSONString());
			
			return this.getDAO().doInsert(javaVO);
		}
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.db.vo.OptionCallDayTrnLog", "tw.ace33022.vo.OptionPutDayTrnLog", "underscore"], function(Ancestor, OptionPutDayTrnLog) {
		
			ancestor = Ancestor;
			accessVO = OptionPutDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		require(RequireJSConfig.paths["underscore"] + '.js');
	
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.OptionCallDayTrnLog"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.OptionPutDayTrnLog"] + '.js');
			
		module.exports = result;
	}
	else {

		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
		
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
			
			if (typeof root.tw.ace33022.dao.db.vo.OptionCallDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.OptionCallDayTrnLog"] + '.js');
			if (typeof root.tw.ace33022.vo.OptionPutDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.OptionPutDayTrnLog"] + '.js');
		}
		
		ancestor = root.tw.ace33022.dao.db.vo.OptionCallDayTrnLog;
		accessVO = root.tw.ace33022.vo.OptionPutDayTrnLog;
		
		root.tw.ace33022.dao.db.vo.OptionPutDayTrnLog = result;
	}
})(this);