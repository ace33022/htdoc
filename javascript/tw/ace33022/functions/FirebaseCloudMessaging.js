/**
 *
 * @description FirebaseCloudMessaging.gs
 *
 * @see <a href="https://docs.pushbullet.com/">Pushbullet API</a>
 * @see <a href="http://pueriletechie.blogspot.com/2014/09/google-apps-script-cyber-life-automation.html">Puerile Techie: Google Apps Script - cyber life automation</a>
 * 
 *
 * @version 2024/05/05 初始版本。
 *
 * @comment 
 *
 * @author ace
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
  function getToken(accessToken) {
    
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
		
			result = UrlFetchApp.fetch('https://api.pushbullet.com/v2/devices', options).getContentText();
		}
    
    return result;
  }

	/**
	 *
	 * @description send
	 *
	 * @return String String。
	 *
	 * @version 2024/05/05 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @comment
	 *  
	 */
  function send(authorizationCode, deviceToken, title, body, icon, image) {

    var result = {

      statusCode: 500,
      content: ""
    };

    var payload = {

      "message": {

        "token": deviceToken,
        "data": {

          "title": title,
          "body": body
        },
        "android": {
          "priority": "high"
        },
        "notification": {

          "title": title,
          "body": body
        }
      }
    };

    var httpResponse;

    if (icon) {

      payload["message"]["data"]["icon"] = icon;
      payload["message"]["notification"]["icon"] = icon;
    }
    
    if (image) {

      payload["message"]["data"]["image"] = image;
      payload["message"]["notification"]["image"] = image;
    }

    // console.log('payload: ' + JSON.stringify(payload));

		if (typeof Packages != 'undefined') {
		
			// result = new String(Packages.tw.ace33022.functions.Pushbullet.pushes(accessToken, iden, title, body));
		}
		else {
		
			httpResponse = UrlFetchApp.fetch('https://fcm.googleapis.com/v1/projects/stock-alarm-dc6af/messages:send', {

        "method": "post",
        "contentType": "application/json;charset=UTF-8",
        "headers": {
          "Authorization": "Bearer" + " " + authorizationCode
        },
        "payload": JSON.stringify(payload)
      });

      result["statusCode"] = httpResponse.getResponseCode();
      result["content"] = httpResponse.getContentText();
		}
    
    return result;
  }

	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getToken: getToken,
				send: send
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getToken;
		module.exports = send;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.FirebaseCloudMessaging == 'undefined') root.tw.ace33022.functions.FirebaseCloudMessaging = {};
		
		root.tw.ace33022.functions.FirebaseCloudMessaging.getToken = getToken;
		root.tw.ace33022.functions.FirebaseCloudMessaging.send = send;
	}
})(this);