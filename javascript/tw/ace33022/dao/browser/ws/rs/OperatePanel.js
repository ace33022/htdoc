/**
 *
 * @description tw.ace33022.dao.ws.rs.OperatePanel
 *
 * @version 2016/02/17 ace 初始版本。
 *
 * @author ace
 *
 * @see <a href="https://developer.mozilla.org/zh-TW/docs/JavaScript">JavaScript</a>
 *
 */
(function(root) {

	var ancestor;

  var result = function() {

		var serialVersionUID = new Number(1);     // 保留

		var uber = new ancestor();
		
		root._.extend(this, uber);
		
		this.setProgramCode('OperatePanel');
		
		this.doPut = function(setting) { 
		
			setting["url"] = this.getURLPath() + '/' + setting["data"]["operate_panel_code"];
			
			uber.doPut(setting);
		};
  }

	if (typeof define === 'function') {

		define(["tw.ace33022.dao.ws.rs.Ancestor", "underscore"], function(Ancestor) {

			ancestor = Ancestor;

			return result;
		});
	}
	else {

		ancestor = root.tw.ace33022.dao.ws.rs.Ancestor;

		root.tw.ace33022.dao.ws.rs.OperatePanel = result;
	}
})(this);
