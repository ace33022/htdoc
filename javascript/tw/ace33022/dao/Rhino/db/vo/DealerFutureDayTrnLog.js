/**
 *
 * @description DealerFutureDayTrnLog(自營商每日期貨交易統計資料)
 *
 * @require underscore
 * @require tw.ace33022.dao.db.vo.ForeignFutureDayTrnLog
 * @require tw.ace33022.vo.DealerFutureDayTrnLog
 * 
 * @version 2013/10/30 ace 初始版本。
 * @version 2014/12/26 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2015/01/09 ace Add method doSelectByProductCodeRangeTrnDateOrderByTrnDate。
 * @version 2020/03/28 ace 名稱調整。
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
		this.prototype = this;		// 由於已複製父類別Ancestor，因此原型類別指向自己。
		
		this.setTableName('dealer_future_day_trn_log');
		this.setAccessVO(accessVO);
	}
	
	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.db.vo.ForeignFutureDayTrnLog", "tw.ace33022.vo.DealerFutureDayTrnLog", "underscore"], function(Ancestor, DealerFutureDayTrnLog) {
		
			ancestor = Ancestor;
			accessVO = DealerFutureDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		require(RequireJSConfig.paths['underscore'] + '.js');
	
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.FutureDayTrnLog"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.DealerFutureDayTrnLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
		
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
		
			if (typeof root.tw.ace33022.dao.db.vo.ForeignFutureDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.ForeignFutureDayTrnLog"] + '.js');
			if (typeof root.tw.ace33022.vo.DealerFutureDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.DealerFutureDayTrnLog"] + '.js');
		}
		
		ancestor = root.tw.ace33022.dao.db.vo.ForeignFutureDayTrnLog;
		accessVO = root.tw.ace33022.vo.DealerFutureDayTrnLog;
		
		root.tw.ace33022.dao.db.vo.DealerFutureDayTrnLog = result;
	} 
})(this);