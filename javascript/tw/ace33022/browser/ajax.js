/*
 * 取得XMLHttpRequest物件。
 */
function getXMLHttpRequestObject() {

	/*
	 * 取得IE5、IE6等瀏覽程式之XMLHttpRequest物件。
	 */
	function getMSXMLHttpRequestObject() {
			
		var result = null;

		// 找出IE5、IE6等瀏覽程式最新版MSXML剖析器。
		var arrayMSXMLDesc = ["MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
		
		var index;
		
		for (index = 0; index < arrayMSXMLDesc.length; index++) {
		
			try {
			
				// 建立XMLHttpRequest物件。
				result = new ActiveXObject(arrayMSXMLDesc[index]);
				
				break;
			} 
			catch (e) {}
		}

		return result;
	}

	var result = null;

	if (window.XMLHttpRequest) {
	
		// IE7、Mozilla、Safari等瀏覽程式。
		result = new XMLHttpRequest();
	} 
	else if (window.ActiveXObject) {
	
		// IE5、IE6等瀏覽程式。
		result = getMSXMLHttpRequestObject();
	}

	return result;
}