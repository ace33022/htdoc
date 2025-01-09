/**
 *
 * @description OptionsPutTrnLogs(選擇權賣權交易行情)
 *
 * @return {Object} OptionCallDayTrnLog
 *
 * @require underscore.js
 * @require Ancestor.js
 *
 * @version 2021/01/31 ace 初始版本。
 *
 * @author ace
 *
 */
 
(function(root) {
 
	var RequireJSConfig;
	
	var _;	// underscore.js
	
	var ancestor;
	
	var result = function() {

		var serialVersionUID = new Number(1);	// 保留
  
		var uber = new ancestor();
		
		_.extend(this, uber);
		// this.prototype = uber;  // 保留原型鍊。
		this.prototype = this;  // 由於已複製父類別Ancestor，因此原型類別指向自己。
		
    this.getSchemaJSONObject = function() {

      var result = _.extend({}, uber.getSchemaJSONObject());

			result.$schema = '/json-schema/vo/option_put_trn_log';
			result.title = 'option_put_trn_log';

      return result;
    }
	}

	if (typeof define === 'function') {
	
		define(['tw.ace33022.vo.OptionCallTrnLog', 'underscore'], function(OptionCallTrnLog) {
		
			_ = root._;
		
			ancestor = OptionCallTrnLog;
				
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
	
		_ = require(RequireJSConfig.paths['underscore'] + '.js');
		
		ancestor = require(RequireJSConfig.paths['tw.ace33022.vo.OptionCallTrnLog'] + '.js');
		
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
    /**
     *
     * @see <a href="https://underscorejs.org/">Underscore.js</a>
     * @see <a href="https://github.com/jashkenas/underscore">jashkenas/underscore: JavaScript's utility _ belt</a>
     * @see <a href="https://github.com/simula-innovation/gas-underscore">simula-innovation/gas-underscore: Underscore for Google Apps Script</a>
     *
     * @memo ID:1PcEHcGVC1njZd8SfXtmgQk19djwVd2GrrW1gd7U5hNk033tzi6IUvIAV
     * 
     * @comment 2024/07/25 ace 引用Google Apps Script的Underscore資料庫。
     * 
     **/
    if (typeof Underscore != 'undefined') {

      if (typeof root._ == 'undefined') root._ = Underscore.load();
    }
		
		if (typeof load !== 'undefined') {
	
			if (typeof root._ == 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths['underscore'] + '.js');
			
			if (typeof root.tw.ace33022.vo.OptionCallTrnLog == 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths['tw.ace33022.vo.OptionCallTrnLog'] + '.js');
		}
		
		_ = root._;
		
		ancestor = root.tw.ace33022.vo.OptionCallTrnLog;
		
		root.tw.ace33022.vo.OptionPutTrnLog = result;
	}
})(this);