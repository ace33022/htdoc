/**
 *
 * SizeGroupsDetail
 *
 * @version 2017/06/10 初始版本。
 *
 * @author ace
 *
 *
 * @see <a href="https://developer.mozilla.org/zh-TW/docs/JavaScript">JavaScript</a>
 *
 */

(function(root) {
 
	var RequireJSConfig;
	
	var ancestor;

  var result = function() {

    var serialVersionUID = new Number(1);	// 保留
  
		var sizeGroupCode = new String('');	// 群組代碼
		var sizeCode = new String('');			// 代碼
	
		var uber = new ancestor();
  
    root._.extend(this, uber);
    // this.prototype = uber; // 保留原型鍊。
    this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		this.setSizeGroupCode = function(value) {if (typeof value != 'undefined') sizeGroupCode = value; return value;}
		this.setSizeCode = function(value) {if (typeof value != 'undefined') sizeCode = value; return value;}
		
	  this.getSizeGroupCode = function() {return sizeGroupCode;}
    this.getSizeCode = function() {return sizeCode;}
		
    // JSON物件資料。
    this.toJSONObject = function() {
  
      var result = {
    
				"size_group_code": this.getSizeGroupCode(),
				"size_code": this.getSizeCode()
      };
    
      return root._.extend(result, uber.toJSONObject());
    }
  
    this.setValueFromJSONObject = function(value) {
  
      uber.setValueFromJSONObject(value);
    
		  this.setSizeGroupCode(value["size_group_code"]);
      this.setSizeCode(value["size_code"]);
    }
    
    this.getSchemaJSONObject = function() {

      var result = root._.extend({}, uber.getSchemaJSONObject());

			result.$schema = '/json-schema/vo/size_groups_detail';
			result.title = 'size_groups_detail';
			
			result.properties["size_group_code"] = {"description": "群組代碼", "type": "string", "maxLength": 2};
			result.properties["size_code"] = {"description": "代碼", "type": "string", "maxLength": 2};
			
      return result;
    }
  }
  
	if (typeof define == 'function') {
	
		define(["tw.ace33022.vo.Ancestor", "underscore"], function(Ancestor) {
		
			ancestor = Ancestor;
				
			return result;
		});
	}
	else if (typeof exports != 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
	
		require(RequireJSConfig.paths["underscore"] + '.js');
		
		ancestor = require(RequireJSConfig.paths["tw.ace33022.vo.Ancestor"] + '.js');
		
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load != 'undefined') {
	
			if (typeof root._ == 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
			
			if (typeof root.tw.ace33022.vo.Ancestor == 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.Ancestor"] + '.js');
		}
		
		ancestor = root.tw.ace33022.vo.Ancestor;
		
		root.tw.ace33022.vo.SizeGroupsDetail = result;
	}
})(this);