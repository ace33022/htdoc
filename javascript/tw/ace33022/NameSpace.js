/**
 *
 * @description 命名空間設定。
 *
 * @version 2016/04/12 ace 初始版本。
 *
 * @author ace
 *
 * @comment ace 針對不執行requirejs的環境，設定對應的命名空間。
 *
 */
(function(root) {

	if (typeof root.tw == 'undefined') root.tw = {};
	if (typeof root.tw.ace33022 == 'undefined') root.tw.ace33022 = {};

	if (typeof root.tw.ace33022.vo == 'undefined') root.tw.ace33022.vo = {};
	if (typeof root.tw.ace33022.dao == 'undefined') root.tw.ace33022.dao = {};
	if (typeof root.tw.ace33022.dao.db == 'undefined') root.tw.ace33022.dao.db = {};
	if (typeof root.tw.ace33022.dao.db.vo == 'undefined') root.tw.ace33022.dao.db.vo = {};
	if (typeof root.tw.ace33022.dao.db.program == 'undefined') root.tw.ace33022.dao.db.program = {};
	if (typeof root.tw.ace33022.dao.ws == 'undefined') root.tw.ace33022.dao.ws = {};
	if (typeof root.tw.ace33022.dao.ws.vo == 'undefined') root.tw.ace33022.dao.ws.vo = {};
	if (typeof root.tw.ace33022.dao.ws.program == 'undefined') root.tw.ace33022.dao.ws.program = {};

	if (typeof root.tw.ace33022.util == 'undefined') root.tw.ace33022.util = {};
	if (typeof root.tw.ace33022.util.DateTimeUtil == 'undefined') root.tw.ace33022.util.DateTimeUtil = {};
	if (typeof root.tw.ace33022.util.InitDataUtil == 'undefined') root.tw.ace33022.util.InitDataUtil = {};
})(this);