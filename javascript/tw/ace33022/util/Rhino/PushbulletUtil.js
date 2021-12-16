/**
 *
 * @description PushbulletUtil
 *
 * @version 2021/10/20 ace Initial
 *
 * @author ace
 *
 */

(function(root) {

	/**
	 *
	 * @description getDevice
	 *
	 * @return String String。
	 *
	 * @version 2021/10/20 ace Initial
	 *
	 * @author ace
	 *
	 * @comment
	 *  
	 */
	function getDevice(accessToken) {
	
		return new String(Packages.tw.ace33022.util.PushbulletUtil.getDevice(accessToken));
	}

	/**
	 *
	 * @description pushNote
	 *
	 * @return String String。
	 *
	 * @version 2021/10/20 ace Initial
	 *
	 * @author ace
	 *
	 * @comment
	 *  
	 */
	function pushNote(accessToken, iden, title, body) {
	
		return new String(Packages.tw.ace33022.util.PushbulletUtil.pushNote(accessToken, iden, title, body));
	}
	
	if (typeof define === 'function') {
	
		define([], function() { 
		
			return {
  
				getDevice: getDevice,
				pushNote: pushNote
			}
		});
	}
	else if (typeof exports !== 'undefined') {
	
		module.exports = pushNote;
		module.exports = getDevice;
	}
	else {
	
		if (typeof root.tw.ace33022.util.PushbulletUtil == 'undefined') root.tw.ace33022.util.PushbulletUtil = {};
		
		root.tw.ace33022.util.PushbulletUtil.getDevice = getDevice;
		root.tw.ace33022.util.PushbulletUtil.pushNote = pushNote;
	}
})(this);