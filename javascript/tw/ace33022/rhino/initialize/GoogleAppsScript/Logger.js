/**
 *
 * @description Logger
 *
 * @version 2021/03/18 ace Initial
 *
 * @see <a href="https://developers.google.com/apps-script/reference/base/logger">Class Logger  |  Apps Script  |  Google Developers</a>
 *
 * @author ace
 *
 */

(function(root) {

	if (typeof root.Logger === 'undefined') root.Logger = {};
	if (typeof root.console === 'undefined') {
	
		root.console = {};
		
		root.console.log = function(msg) {
		
			if (typeof Packages != null) print(msg);
		}
	}
	
	root.Logger["clear"] = function() {};
	root.Logger["getLog"] = function() {};
	// root.Logger["log"] = function(msg) { logger.debug(msg); };
	root.Logger["log"] = function(msg) { console.log(msg); };
})(this);