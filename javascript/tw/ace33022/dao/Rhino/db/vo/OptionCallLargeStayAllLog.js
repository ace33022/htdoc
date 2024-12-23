/**
 *
 * @description tw.ace33022.dao.db.vo.OptionCallLargeStayAllLog(選擇權買權大額交易人未沖銷部位(全部月份))
 *
 * @return {Object} tw.ace33022.dao.db.vo.OptionCallLargeStayAllLog
 *
 * @require underscore.js
 * @require tw.ace33022.dao.db.vo.Ancestor
 * @require tw.ace33022.vo.OptionCallLargeStayAllLog
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
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		// this.setTableName('option_call_large_stay_all_log');
		this.setAccessVO(accessVO);
		this.setDAO(new Packages.tw.ace33022.dao.db.vo.OptionCallLargeStayAllLog(conn));
  
		this.doInsert = function(vo) {

			var javaVO = new Packages.tw.ace33022.vo.OptionCallLargeStayAllLog();

			javaVO.setValueFromJSONString(vo.toJSONString());
			
			return this.getDAO().doInsert(javaVO);
		}
		
		this.doDelete = function(trnDate, productCode) { 
		
			return this.getDAO().doDelete(new Packages.java.lang.String(trnDate), new Packages.java.lang.String(productCode)); 
		}
		
		this.doSelectBetweenTrnDateOrderByTrnDate = function(beginTrnDate, endTrnDate, productCode) { return this.tranIteratorToVO(this.getDAO().doSelectBetweenTrnDateOrderByTrnDate(beginTrnDate, endTrnDate, productCode).iterator()); }
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.db.vo.Ancestor", "tw.ace33022.vo.OptionCallLargeStayAllLog", "underscore"], function(Ancestor, OptionCallLargeStayAllLog) {
		
			ancestor = Ancestor;
			accessVO = OptionCallLargeStayAllLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
		
		require(RequireJSConfig.paths["underscore"] + '.js');
	
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.OptionCallLargeStayAllLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
	
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
		
			if (typeof root.tw.ace33022.dao.db.vo.Ancestor === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
			if (typeof root.tw.ace33022.vo.OptionCallLargeStayAllLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.OptionCallLargeStayAllLog"] + '.js');
		}	
		
		ancestor = root.tw.ace33022.dao.db.vo.Ancestor;
		accessVO = root.tw.ace33022.vo.OptionCallLargeStayAllLog;
		
		root.tw.ace33022.dao.db.vo.OptionCallLargeStayAllLog = result;
	}
})(this);