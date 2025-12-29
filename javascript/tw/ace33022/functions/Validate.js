
(function(root) { 

	/**
	 *
	 * E-mail address格式檢查
	 *
	 * @author ace
	 *  
	 * @see <a href="http://ithelp.ithome.com.tw/question/10027862?tag=ithome.article">合法 E-mail address 的正規化標示法</a>
	 * @see <a href="http://www.w3schools.com/js/js_obj_regexp.asp">JavaScript RegExp Object</a>
	 * @see <a href="http://blog.roodo.com/rocksaying/archives/2670695.html">Regular Expression (RegExp) in JavaScript</a>
	 * @see <a href="http://www.minwt.com/?p=1917">[JS]RegExp正規表法驗證表單的架構</a>
	 * 
	 * @description 合法 E-mail address 的條件：
	 *              一、必要且唯一的 @ 符號左邊是收件人名稱；右邊是收件位址。
	 *              二、收件人名稱與收件位址可以是英文、數字、特定符號( . - _ )，長度不限制。
	 *              三、收件位址以 . 符號分欄位，最靠近 @ 符號的第一欄(主機名稱)可以是英文、數字、特定符號( . - )；其餘欄位(主機位址)則限定只能是英文，合法欄位為 2 到 4 欄。
	 *          
	 *              結合以上樣式規定，合法 E-mail address 的正規化表示法為：
	 *              [A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4}
	 *           
	 *              針對這個正規化表示，由左至右再進一步解說：
	 *              1. [A-Z0-9._-]+ 為收件者名稱。其中的 + 符號代表 [A-Z0-9._-] 必須出現至少一次，但長度不限，而內容為英文、數字、特定符號( . - _ )。
	 *              2. 一個 @ 符號。
	 *              3. [A-Z0-9.-]+ ，同理，主機名稱的規則跟收件者名稱相同。
	 *              4. \.[A-Z]{2,4} 代表主機位址只接受英文字母，可以有2到4欄，以 . 符號做分界。
	 *   
	 *              原Regular Expression只用大寫英文字母判斷，一般e-mail都包含小寫英文字母，造成誤判現象，再修改表示法如下：
	 *              [A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}       
	 */
	function validateEmailAddress(emailAddress) {return /[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(emailAddress);}

	/**
	 *
	 * @description 統一編號驗證
	 *
	 * @see <a href="https://www.fia.gov.tw/">財政部財政資訊中心</a>
	 * @see <a href="https://www.fia.gov.tw/singlehtml/3?cntId=c4d9cff38c8642ef8872774ee9987283">營利事業統一編號檢查碼邏輯修正說明-財政部財政資訊中心</a>
	 * @see <a href="https://www.fia.gov.tw/download/ff9c37611e9e46dab952676d24dc0b67">附件-營利事業統一編號檢查碼邏輯修正說明</a>
	 *
	 * @see <a href="https://www.skrnet.com/skrjs/demo/js0161.htm">統一編號檢查實作</a>
	 * @see <a href="https://syj0905.github.io/javascript/20191119/2134109134/">JavaScript - 統一編號驗證實作 | Cloud F2E Blog</a>
	 * @see <a href="https://cynthiachuang.github.io/Check-Tax-ID-Number/">ID驗證系列｜公司統一編號驗 | 辛西亞的技能樹</a>
	 * @see <a href="https://yarnpkg.com/package?name=taiwan-id-validator">taiwan-id-validator | Yarn</a>
	 *
	 * @see <a href="https://www.webtech.tw/info.php?tid=JavaScript_%E7%9A%84%E9%99%A4%E6%B3%95">JavaScript 的除法 - 網頁設計教學站</a>
	 * 
	 * @version 2025/04/23 ace 初始版本。
	 *  
	 * @author ace
	 *
	 */
	function validateTaiwanUID(value) {

		var result = false;
		
		var sumWeight = 0;
		
		if (/\d{8}/.test(value)) {
		
			// console.log(value[0]);	// '0'
			// console.log(value.charCodeAt(0));	// 48
			
			sumWeight = parseInt(value[0]) + parseInt(value[2]) + parseInt(value[4]) + parseInt(value[7]);
			
			sumWeight += Math.floor((parseInt(value[1]) * 2) / 10);	// 取十位數
			sumWeight += (parseInt(value[1]) * 2) % 10;							// 取個位數
			
			sumWeight += Math.floor((parseInt(value[3]) * 2) / 10);	// 取十位數
			sumWeight += (parseInt(value[3]) * 2) % 10;							// 取個位數
			
			sumWeight += Math.floor((parseInt(value[5]) * 2) / 10);	// 取十位數
			sumWeight += (parseInt(value[5]) * 2) % 10;							// 取個位數
			
			if (!(value[6] == '7')) {
			
				sumWeight += Math.floor((parseInt(value[6]) * 4) / 10);	// 取十位數
				sumWeight += (parseInt(value[6]) * 4) % 10;							// 取個位數

				if ((sumWeight % 5) == 0) result = true;
			}
			else {
			
				if ((sumWeight % 5) == 0) result = true;

				if ((!result) && (((sumWeight + 1) % 5) == 0)) result = true;
			}
		}
		
		return result;
	}
	
	/**
	 *
	 * @description 發票格式檢查
	 *
	 * @version 2015/06/15 ace 初始版本。
	 *  
	 * @author ace
	 *
	 * @see <a href="http://www.w3schools.com/js/js_obj_regexp.asp">JavaScript RegExp Object</a>
	 * 
	 */
	function validateInvoiceNo(invoiceNo) {

		var result = {"return_value": 0};
	
		if (invoiceNo === '') {
		
			result["return_value"] = 1;
		}
		else if (!/^[A-Z]{2}[0-9]{8}/.test(invoiceNo)) {
		
			result["return_value"] = 2;
		}
	
		return result;
	}

	/**
	 *
	 * @description 自然人憑證格式檢查
	 *
	 * @version 2020/12/04 ace 初始版本。
	 *  
	 * @author ace
	 *
	 * @see <a href="http://www.w3schools.com/js/js_obj_regexp.asp">JavaScript RegExp Object</a>
	 * 
	 * @comment 2020/12/04 aee 自然人憑證格式(前二碼英文字，後14碼為數字，共16碼)。
	 * 
	 */
	function validateNaturalPersonCertificate(source) {return /^[a-zA-Z]{2}[0-9]{14}$/.test(source);}

	/**
	 *
	 * @description 手機載具條碼格式檢查
	 *
	 * @version 2020/12/04 ace 初始版本。
	 *  
	 * @author ace
	 *
	 * @see <a href="http://www.w3schools.com/js/js_obj_regexp.asp">JavaScript RegExp Object</a>
	 * 
	 * @comment 2020/12/04 aee 手機載具條碼格式(第1碼為/，後7碼為英數字，共8碼)。
	 * 
	 */
	function validateMobileVehicleCode(source) {return /^\/[a-z0-9]{7}$/.test(source);}
	
	if (typeof define === 'function') {
	
		define([], function() { 
		
			return {
  
				validateEmailAddress: validateEmailAddress,
				validateTaiwanUID: validateTaiwanUID,
				validateInvoiceNo: validateInvoiceNo,
				validateNaturalPersonCertificate: validateNaturalPersonCertificate,
				validateMobileVehicleCode: validateMobileVehicleCode
			}
		});
	}
	else if (typeof exports !== 'undefined') {
	
		module.exports = validateEmailAddress;
		module.exports = validateTaiwanUID;
		module.exports = validateInvoiceNo;
		module.exports = validNaturalPersonCertificate;
		module.exports = validateMobileVehicleCode;
	}
	else {
	
		root.tw.ace33022.functions.Validate = {};
		
		root.tw.ace33022.functions.Validate.validateEmailAddress = validateEmailAddress;
		root.tw.ace33022.functions.Validate.validateTaiwanUID = validateTaiwanUID;
		root.tw.ace33022.functions.Validate.validateInvoiceNo = validateInvoiceNo;
		root.tw.ace33022.functions.Validate.validateNaturalPersonCertificate = validateNaturalPersonCertificate;
		root.tw.ace33022.functions.Validate.validateMobileVehicleCode = validateMobileVehicleCode;
	}
})(this);