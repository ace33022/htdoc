/**
 *
 * @description tw.ace33022.dao.db.vo.OptionPutLargeStayLog(選擇權賣權大額交易人未沖銷部位)
 *
 * @return {Object} tw.ace33022.dao.db.vo.OptionPutLargeStayLog
 *
 * @require underscore.js
 * @require tw.ace33022.dao.db.vo.OptionCallLargeStayLog
 * @require tw.ace33022.vo.OptionPutLargeStayLog
 * 
 * @version 2013/11/05 ace 初始版本。
 * @version 2015/03/18 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
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
	
		var serialVersionUID = new Number(1);	// 保留
  
		root._.extend(this, new ancestor(conn));
		// this.prototype = uber;	// 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		// this.setTableName('option_put_large_stay_log');
		this.setAccessVO(accessVO);
		this.setDAO(new Packages.tw.ace33022.dao.db.vo.OptionPutLargeStayLog(conn));
		
		this.doInsert = function(vo) {

			var javaVO = new Packages.tw.ace33022.vo.OptionPutLargeStayLog();

			javaVO.setValueFromJSONString(vo.toJSONString());
			
			return this.getDAO().doInsert(javaVO);
		}
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.db.vo.OptionCallLargeStayLog", "tw.ace33022.vo.OptionPutLargeStayLog", "underscore"], function(OptionCallLargeStayLog, OptionPutLargeStayLog) {
		
			ancestor = OptionCallLargeStayLog;
			accessVO = OptionPutLargeStayLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		require(RequireJSConfig.paths["underscore"] + '.js');
	
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.OptionCallLargeStayLog"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.OptionPutLargeStayLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
	
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');

			if (typeof root.tw.ace33022.dao.db.vo.OptionCallLargeStayLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.OptionCallLargeStayLog"] + '.js');
			if (typeof root.tw.ace33022.vo.OptionPutLargeStayLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.OptionPutLargeStayLog"] + '.js');
		}	
		
		ancestor = root.tw.ace33022.dao.db.vo.OptionCallLargeStayLog;
		accessVO = root.tw.ace33022.vo.OptionPutLargeStayLog;
		
		root.tw.ace33022.dao.db.vo.OptionPutLargeStayLog = result;
	}
})(this);