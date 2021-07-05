/**
 *
 * @description tw.ace33022.dao.ws.rs.BAS09030
 *
 * @version 2016/11/13 ace 初始版本。
 *
 * @author ace
 *
 * @see <a href="https://jquery.com/">jQuery</a>
 *
 */

(function(root) {

	var ancestor;
	
	var commonUtil, dateTimeUtil;

	var result = function() {

		var serialVersionUID = new Number(1);	// 保留

		var uber = new ancestor();
		
		root._.extend(this, uber);
		
		this.setProgramCode('BAS09030');
		
		this["doGet"] = function(setting) {
		
			var ajaxSetting = commonUtil.getDefaultAjaxSetting(setting);
			
			ajaxSetting["type"] = 'GET';
			
			if (typeof ajaxSetting["url"] === 'undefined') ajaxSetting["url"] = this["getURLPath"]();
			
			if (ajaxSetting["path"] !== '') ajaxSetting["url"] += ajaxSetting["path"];
			
			root.jQuery.ajax(ajaxSetting);
		};
		
    this["doPost"] = function(setting) {
		
			var ajaxSetting = commonUtil.getDefaultAjaxSetting(setting);

			var formData = new FormData();
			
			if (typeof ajaxSetting["url"] === 'undefined') ajaxSetting["url"] = this["getURLPath"]();
			
			if (ajaxSetting["path"] !== '') ajaxSetting["url"] += ajaxSetting["path"];
			
			formData.append('upload-file', setting["file"]);
			// formData.append('modification-date-parm', moment(file.lastModifiedDate).format('YYYYMMDDHHmmss'));
			formData.append('modification-date-parm', dateTimeUtil.doDateTimeToDateTimeString(new Date(), false));
			formData.append('creation-date-parm', '');
			formData.append('read-date-parm', '');
			
			ajaxSetting["type"] = "POST";
			ajaxSetting["dataType"] = "text";
			ajaxSetting["contentType"] = false;	// tell jQuery not to set contentType
			ajaxSetting["processData"] = false;	// tell jQuery not to process the data
			ajaxSetting["cache"] = false;
			ajaxSetting["data"] = formData;

			root.jQuery.ajax(ajaxSetting);
		}
  }

	if (typeof define === 'function') {

		define(["tw.ace33022.dao.ws.rs.Ancestor", "tw.ace33022.util.DateTimeUtil", "tw.ace33022.util.CommonUtil", "underscore"], function(Ancestor, DateTimeUtil, CommonUtil) {

			ancestor = Ancestor;
			
			commonUtil = CommonUtil;
			dateTimeUtil = DateTimeUtil;

			return result;
		});
	}
	else {

		ancestor = root.tw.ace33022.dao.ws.rs.Ancestor;
		
		commonUtil = tw.ace33022.util.CommonUtil;
		dateTimeUtil = tw.ace33022.util.DateTimeUtil;

		root.tw.ace33022.dao.ws.rs.BAS09030 = result;
	}
})(this);