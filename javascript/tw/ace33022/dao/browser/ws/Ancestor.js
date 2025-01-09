/**
 *
 * @description tw.ace33022.dao.ws.Ancestor
 *
 * @version 2013/09/29 ace 初始版本。
 * @version 2014/11/26 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 *
 * @author ace
 *
 */
(function(root) {

	var ancestor;

	var result = function() {

		var serialVersionUID = new Number(1);	// 保留
		
		var uber = new ancestor();
		
		root._.extend(this, uber);
		
		// this.prototype = uber;  // 保留原型鍊。
		// this.prototype = this;  // 由於已複製父類別Ancestor，將原型類別指向自己。
	}
	
	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.Ancestor", "underscore"], function(Ancestor) {
		
			ancestor = Ancestor;
		
			return result;
		});
	}
	else {
	
		ancestor = root.tw.ace33022.dao.Ancestor;
	
		root.tw.ace33022.dao.ws.Ancestor = result;
	}
})(this);