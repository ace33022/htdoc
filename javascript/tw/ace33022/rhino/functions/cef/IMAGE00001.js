/**
 *
 * @description IMAGE00001
 *
 * @version 2026/05/26 ace 初始版本。
 *
 * @author ace
 *
 */
(function(root) {

	var result = {
	
		"code": 1,
		"message": "",
		"path": "",
		"classification": "",
		"data": []
	};
	
	function doQuery(request) {
	
		var method = JSON.parse(request)["method"];
	
		// 對照cef的doQuery運作，依照傳入參數決定呼叫內容？
		console.log(request);
		
		if (method == 'getImageFileList') {
		
			return getImageFileList(JSON.parse(request)["categoryName"]);
		}
	}
		
	function getImageFileList() {
	
		var path;
		var index;
		
		try {
		
			console.log('arguments.length: ' + arguments.length);
			
			if (arguments.length != 0) console.log('arguments[0]: ' + arguments[0]);
			
			path = new Packages.java.io.File(arguments[0]);
			
			// console.log(path.getAbsolutePath());
			
			// console.log((new Packages.java.io.File(arguments[0])).list().length);
			
			for (index = 0; index < path.list().length; index++) {
			
				// console.log(path.list()[index]);
				
				// result["data"].push(path.getAbsolutePath() + '/' + path.list()[index]);
				result["data"].push(arguments[0] + '/' + path.list()[index]);
			}
			
			result["code"] = 0;
		}
		catch (e) {
		
			result["message"] = e.message;
		}
		
		// console.log(JSON.stringify(result));
		
		return JSON.stringify(result);
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				doQuery: doQuery,
				getImageFileList: getImageFileList
			}
		});
	}
	else if (typeof exports !== 'undefined') {
	
		module.exports = doQuery;
		module.exports = getImageFileList;
	}
	else {
	
		if (typeof root.tw.ace33022.rhino.functions.cef.IMAGE00001 == 'undefined') root.tw.ace33022.rhino.functions.cef.IMAGE00001 = {};
		
		root.tw.ace33022.rhino.functions.cef.IMAGE00001.doQuery = doQuery;
		root.tw.ace33022.rhino.functions.cef.IMAGE00001.getImageFileList = getImageFileList;
	}
})(this);