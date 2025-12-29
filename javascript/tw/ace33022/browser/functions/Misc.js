
(function(root) {

	/**
	 *
	 * 紀錄環境設定資料。
	 *
	 * @author ace
	 *  
	 */
	function logEnvironmentSetting() {
	
		if (document.getElementsByTagName('head').length != 0) {

			if (document.getElementsByTagName('head')[0].getElementsByTagName('base').length != 0) {

				console.log('head.base.href: ' + document.getElementsByTagName('head')[0].getElementsByTagName('base')[0].getAttribute('href'));
			}
		}
	
		if ((location != null) && (typeof location != 'undefined')) {
		
			console.log(location);
			console.log('location: ' + location);
			console.log('location.toString(): ' + location.toString());
			console.log('location.protocol: ' + location.protocol);
			console.log('location.origin: ' + location.origin);
			console.log('location.port: ' + location.port);
			console.log('location.hostname: ' + location.hostname);
			console.log('location.pathname: ' + location.pathname);
			console.log('location.search: ' + location.search);
		}
	}

	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				logEnvironmentSetting: logEnvironmentSetting
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = logEnvironmentSetting;
	}
	else {
	
		root.tw.ace33022.browser.functions.Misc = {};
		
		root.tw.ace33022.browser.functions.Misc.logEnvironmentSetting = logEnvironmentSetting;
	}
})(this);