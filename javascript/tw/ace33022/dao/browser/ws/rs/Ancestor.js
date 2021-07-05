/**
 *
 * @description tw.ace33022.dao.ws.rs.Ancestor
 *
 * @version 2013/09/29 ace 初始版本。
 * @version 2014/11/26 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 *
 * @author ace
 *
 * @see <a href="https://jquery.com/">jQuery</a>
 * @see <a href="https://api.jquery.com/">jQuery API Documentation</a>
 *
 * @see <a href="https://stackoverflow.com/questions/1021062/use-success-or-complete-in-ajax-call/42229704">jquery - Use success() or complete() in AJAX call - Stack Overflow</a>
 *
 */
(function(root) {

	var ancestor;
	
	var commonUtil;
	
	var result = function() {

		// var serialVersionUID = new Number(1);	// 保留
		
		function init(setting) {
		
			ajaxSetting = commonUtil.getDefaultAjaxSetting(setting);
			
			if (typeof ajaxSetting["url"] === 'undefined') ajaxSetting["url"] = this["getURLPath"]();
			if ((typeof ajaxSetting["data"] !== 'undefined') && (typeof ajaxSetting["data"] !== 'string')) ajaxSetting["data"] = JSON.stringify(ajaxSetting["data"]);
		}
		
		var programCode;
		
		var uber = new ancestor();
		
		var ajaxSetting = {};
		
		root._.extend(this, uber);
		
		this["setProgramCode"] = function(value) { programCode = value; return value; }
		this["getProgramCode"] = function() { return programCode; }
		
		this["getURLPath"] = function() { return new String(root["Configuration"]["location"]["origin"]) + '/' + root["Configuration"]["RESTfulRelativePath"] + this["getProgramCode"]() };
		
		this["doGet"] = function(setting) {
		
			init.apply(this, [setting]);
			
			ajaxSetting["type"] = 'GET';
			
			root.jQuery.ajax(ajaxSetting);
		};
		
		this["doPost"] = function(setting) {
		
			init.apply(this, [setting]);
			
			ajaxSetting["type"] = 'POST';
			
			root.jQuery.ajax(ajaxSetting);
		};
		
		this["doPut"] = function(setting) {
		
			init.apply(this, [setting]);
			
			ajaxSetting["type"] = 'PUT';
			
			root.jQuery.ajax(ajaxSetting);
		};
		
		this["doDelete"] = function(setting) {
		
			init.apply(this, [setting]);
			
			ajaxSetting["type"] = 'DELETE';
			
			root.jQuery.ajax(ajaxSetting);
		};
	}
	
	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.ws.Ancestor", "tw.ace33022.util.CommonUtil", "jquery", "underscore"], function(Ancestor, CommonUtil) {
		
			ancestor = Ancestor;
			
			commonUtil = CommonUtil;
			
			return result;
		});
	}
	else {
	
		ancestor = root.tw.ace33022.dao.ws.Ancestor;
		
		commonUtil = tw.ace33022.util.CommonUtil;
		
		root.tw.ace33022.dao.ws.rs.Ancestor = result;
	}
})(this);