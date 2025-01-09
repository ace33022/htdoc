/**
 *
 * @description tw.ace33022.dao.Ancestor
 *
 * @version 2013/09/29 ace 初始版本。
 * @version 2014/11/26 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 *
 * @author ace
 *
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web">Web technology For developers | MDN</a>
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript | MDN</a>
 *
 */
(function(root) {

	var result = function() {

		var serialVersionUID = new Number(1);	// 保留
	}
	
	if (typeof define === 'function') {
	
		define([], function() {
		
			return result;
		});
	}
	else {
	
		root.tw.ace33022.dao.Ancestor = result;
	}
})(this);