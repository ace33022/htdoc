/**
 *
 * @description tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog(外資每日選擇權交易統計資料)
 *
 * @return {Object} ForeignOptionDayTrnLog
 *
 * @require underscore.js
 * @require tw.ace33022.dao.db.vo.Ancestor
 * @require tw.ace33022.vo.ForeignOptionDayTrnLog
 *
 * @version 2013/11/01 ace 初始版本。
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

		var serialVersionUID = new Number(1);     // 保留

		root._.extend(this, new ancestor(conn));
		this.prototype = this;		// 由於已複製父類別Ancestor，因此原型類別指向自己。
		
		// this.setTableName('foreign_options_day_trn_logs');
		this.setAccessVO(accessVO);
		this.setDAO(new Packages.tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog(conn));

		this.doInsert = function(vo) {

			var javaVO = new Packages.tw.ace33022.vo.ForeignOptionDayTrnLog();

			javaVO.setValueFromJSONString(vo.toJSONString());
			
			return this.getDAO().doInsert(javaVO);
		}
		
		this.doDelete = function(trnDate, productCode) {
		
			return this.getDAO().doDelete(new Packages.java.lang.String(trnDate), new Packages.java.lang.String(productCode));
		}
		
		this.doSelectBetweenTrnDateOrderByTrnDate = function(beginTrnDate, endTrnDate, productCode) {return this.tranIteratorToVO(this.getDAO().doSelectBetweenTrnDateOrderByTrnDate(beginTrnDate, endTrnDate, productCode).iterator());}
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.db.vo.Ancestor", "tw.ace33022.vo.ForeignOptionDayTrnLog", "underscore"], function(Ancestor, ForeignOptionDayTrnLog) {
		
			ancestor = Ancestor;
			accessVO = ForeignOptionDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.ForeignOptionDayTrnLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
		
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
		
			if (typeof root.tw.ace33022.dao.db.vo.Ancestor === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
			if (typeof root.tw.ace33022.vo.ForeignOptionDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.ForeignOptionDayTrnLog"] + '.js');
		}
		
		ancestor = root.tw.ace33022.dao.db.vo.Ancestor;
		accessVO = root.tw.ace33022.vo.ForeignOptionDayTrnLog;
		
		root.tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog = result;
	}    
})(this);