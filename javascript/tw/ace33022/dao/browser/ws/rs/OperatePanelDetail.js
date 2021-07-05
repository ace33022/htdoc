/**
 *
 * OperatePanelDetail(控制面版明細資料)
 *
 * @author ace
 *
 * @version 2016/02/17 初始版本。
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
		
		this.setProgramCode('OperatePanelDetail');
		
		this["doGet"] = function(setting) {
		
			var ajaxSetting = setting;
			
			delete ajaxSetting["url"];
			
			if (typeof setting["ser_no"] !== 'undefined') ajaxSetting["url"] = uber.getURLPath() + '/' + setting["ser_no"];
			
			uber.doGet(ajaxSetting);
		};
		
		/*
		this.doPut = function(vo, successCallback, errorCallback, completeCallback) {
		
			uber.doPut(this.getURLPath() + '/' + vo.getOperatePanelCode() + '/' + vo.getSerNo(), vo.toJSONString(), successCallback, errorCallback, completeCallback);
		};
		
    this.doDelete = function(operatePanelCode, serNo, successCallback, errorCallback, completeCallback) {

			uber.doDelete(urlPath + '/' + operatePanelCode + '/' + serNo, successCallback, errorCallback, completeCallback);
    }
		*/
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