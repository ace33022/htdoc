/**
 *
 * @description CommonUtil
 *
 * @version 2020/01/12 ace 初始版本。
 *
 * @author ace
 *
 */

(function(root) { 

	define(["jquery"], function() {
	
    /**
     *
     * @description getDefaultAjaxSetting
     *
		 * @param {object} settings 資料物件
     *
     * @version 2016/03/12 初始版本。
     *
     * @author ace
     *
     */
		function getDefaultAjaxSetting(setting) {
		
			// dataType: 'json' =>success回呼函數中取得之data參數為物件型態資料。
			// dataType: 'text' =>success回呼函數中取得之data參數為字串型態資料。
			
			var result = {};
			
			if (typeof setting !== 'undefined') result = setting;
			
			if (typeof result["contentType"] === 'undefined') result["contentType"] = "application/json; charset=utf-8";	// contentType: "text/json",
			if (typeof result["dataType"] === 'undefined') result["dataType"] = "json";

			// result["success"] = function(data, textStatus, jqXHR) { if (typeof setting["success"] === 'function') setting["success"](data, textStatus, jqXHR); };
			// result["error"] = function(jqXHR, textStatus, errorThrown) { if (typeof setting["error"] === 'function') setting["error"](jqXHR, textStatus, errorThrown); };
			// result["complete"] = function(jqXHR, textStatus) { if (typeof setting["complete"] === 'function') setting["complete"](jqXHR, textStatus); };
			
			return result;
		}
	
    /**
     *
     * @description Upload File
     *
		 * @param
     *
     * @version 2016/03/12 ace 初始版本。
     *
     * @author ace
     *
		 * @see {@link https://www.w3.org/TR/FileAPI/|File API}
		 *
		 * @see {@link https://tools.ietf.org/html/rfc822|RFC 822 - STANDARD FOR THE FORMAT OF ARPA INTERNET TEXT MESSAGES}
		 * @see {@link https://tools.ietf.org/html/rfc1867|RFC 1867 - Form-based File Upload in HTML}
		 * @see {@link https://tools.ietf.org/html/rfc2183|RFC 2183 - Communicating Presentation Information in Internet Messages: The Content-Disposition Header Field}
		 * @see {@link https://tools.ietf.org/html/rfc2388|RFC 2388 - Returning Values from Forms: multipart/form-data}
		 *
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/File|File - Web APIs | MDN}
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData|FormData - Web APIs | MDN}
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects|Using FormData Objects - Web APIs | MDN}
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest|Using XMLHttpRequest - Web APIs | MDN}
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications|Using files from web applications - Web APIs | MDN}
		 *
		 * @see {@link https://api.jquery.com/jquery.ajax/|jQuery.ajax() | jQuery API Documentation}
		 *
		 * @see {@link https://imququ.com/post/four-ways-to-post-data-in-http.html|四种常见的 POST 提交数据方式 | JerryQu 的小站}
		 * @see {@link http://jquery.malsup.com/form/|jQuery Form Plugin}
		 * @see {@link https://github.com/igstan/ajax-file-upload|GitHub - igstan/ajax-file-upload: Ajax file upload using pure JavaScript}
		 * @see {@link https://www.ibm.com/developerworks/cn/web/1101_hanbf_fileupload/|使用 JavaScript File API 实现文件上传}
		 * @see {@link http://igstan.ro/posts/2009-01-11-ajax-file-upload-with-pure-javascript.html|Ajax file upload with pure JavaScript — igstan.ro}
		 * @see {@link http://superlevin.ifengyuan.tw/form%E5%8A%A0%E4%B8%8Aenctypemultipartform-data%E4%BD%9C%E7%94%A8/|form加上enctype=multipart/form-data作用 – Levin's Blog-林壽山}
		 * @see {@link http://hayageek.com/jquery-ajax-form-submit/|jQuery AJAX Form Submit Example}
		 * @see {@link https://askie.today/using-formdata-and-setting-multipart-to-upload-file-by-ajax/|使用 JQuery 透過 FormData 上傳檔案 (headers 帶 boundary) - Askie's Coding Life}
     *
		 * @see {@link https://stackoverflow.com/questions/998098/getting-the-original-files-create-date-upon-upload|.net - Getting the original files create date upon upload - Stack Overflow}
		 * @see {@link https://stackoverflow.com/questions/8659808/how-does-http-file-upload-work|How does HTTP file upload work? - Stack Overflow}
		 * @see {@link https://stackoverflow.com/questions/21465578/jquery-file-upload-module-sending-extra-parameter|php - jquery file upload module sending extra parameter - Stack Overflow}
		 * @see {@link https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax|Sending multipart/formdata with jQuery.ajax - Stack Overflow}
		 *
		 * @see {@link https://www.tutorialspoint.com/servlets/servlets-file-uploading.htm|Servlets - File Uploading - Tutorialspoint}
		 * @see {@link https://www.javaworld.com.tw/jute/post/view?bid=6&id=56147|JWorld@TW Java論壇 - HTTP 檔案上傳機制解析}
		 * @see {@link https://stackoverflow.com/questions/29226853/cant-find-formdataparam-in-jersey-2-17|java - Can't find @FormDataParam in Jersey 2.17 - Stack Overflow}
		 *
		 * @see {@link https://isvincent.pixnet.net/blog/post/40384761-windows-7-%E6%AA%94%E6%A1%88%E4%B9%8B%E5%BB%BA%E7%AB%8B%E3%80%81%E4%BF%AE%E6%94%B9%E3%80%81%E5%AD%98%E5%8F%96%E6%99%82%E9%96%93|Windows 7-檔案之建立、修改、存取時間 @ 學不完．教不停．用不盡 :: 痞客邦 ::}
		 *
     */
		function uploadFile(setting) {
		
      requirejs(["tw.ace33022.util.DateTimeUtil"], function(DateTimeUtil) {
			
				var ajaxSetting = getDefaultAjaxSetting(setting);
				
        var formData = new FormData();
				
        formData.append('upload-file', setting["file"]);
        // formData.append('modification-date-parm', moment(file.lastModifiedDate).format('YYYYMMDDHHmmss'));
				formData.append('modification-date-parm', DateTimeUtil.doDateTimeToDateTimeString(setting["file"].lastModifiedDate, false));
        formData.append('creation-date-parm', '');
        formData.append('read-date-parm', '');
				
				ajaxSetting["type"] = "POST";
				ajaxSetting["dataType"] = "text";
				ajaxSetting["contentType"] = false;	// tell jQuery not to set contentType
				ajaxSetting["processData"] = false;	// tell jQuery not to process the data
				ajaxSetting["cache"] = false;
				ajaxSetting["data"] = formData;
				
				jQuery.ajax(ajaxSetting);
      });
    }
		
		return {

			"getDefaultAjaxSetting": getDefaultAjaxSetting,
			"uploadFile": uploadFile
		}
	});
})(this);