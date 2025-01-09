/**
 *
 * @description Pushbullet
 *
 * @version 2021/10/20 ace 初始版本。
 *
 * @see <a href="https://docs.pushbullet.com/">Pushbullet API</a>
 * @see <a href="http://pueriletechie.blogspot.com/2014/09/google-apps-script-cyber-life-automation.html">Puerile Techie: Google Apps Script - cyber life automation</a>
 *
 * @see <a href="https://ifttt.com/pushbullet">Connect Pushbullet to hundreds of apps - IFTTT</a>
 * @see <a href="https://www.reddit.com/r/PushBullet/">Pushbullet</a>
 *
 * @author ace
 *
 * @description
 *
 * @comment 
 *
 * @todo
 *
 */
(function(root) {

	/**
	 *
	 * @description getDevice
	 *
	 * @return String String。
	 *
	 * @version 2021/10/20 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @comment
	 *  
	 */
	function getDevice(accessToken) {
	
		var result = '';
	
    var options = {
      
      "method": "get",
      "headers": {
        "Access-Token": accessToken
      }
    };
		
		if (typeof Packages != 'undefined') {
		
			result = new String(Packages.tw.ace33022.functions.Pushbullet.getDevice(accessToken));
		}
		else {
		
			result = UrlFetchApp.fetch('https://api.pushbullet.com/v2/devices', options).getContentText;
		}
		
		return result;
	}

	/**
	 *
	 * @description pushes
	 *
	 * @return String String。
	 *
	 * @version 2021/10/20 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @comment
	 *  
	 */
	function pushes(accessToken, iden, title, body) {
	
		var result = '';
		
    var options = {
      "method": "post",
      "payload": {
        "iden": iden,
        "type": "note",
        "title": title,
        "body": body
      },
      "headers": {
        "Access-Token": accessToken
      }
    };
		
		if (typeof Packages != 'undefined') {
		
			result = new String(Packages.tw.ace33022.functions.Pushbullet.pushes(accessToken, iden, title, body));
		}
		else {
		
			result = UrlFetchApp.fetch('https://api.pushbullet.com/v2/pushes', options).getContentText();
		}
		
		return result;
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getDevice: getDevice,
				pushes: pushes
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = pushNote;
		module.exports = pushes;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Pushbullet == 'undefined') root.tw.ace33022.functions.Pushbullet = {};
		
		root.tw.ace33022.functions.Pushbullet.getDevice = getDevice;
		root.tw.ace33022.functions.Pushbullet.pushes = pushes;
	}
})(this);