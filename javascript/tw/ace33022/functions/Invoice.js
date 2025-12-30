
(function(root) { 

	/**
	 *
	 * @description 發票號碼中獎項目
	 *
	 * @version 2017/02/05 ace 初始版本。
	 *  
	 * @author ace
	 *
	 * @comment 傳入的發票獎項陣列資料不再判斷年月，故傳入前應處理成只有對獎月份的陣列資料。
	 * 
	 */
	var getInvoicePrizeItem = function(invoiceNo, arrayInvoicePrizeLog) {

		var result = '';
			
		var index;
		var parizeItem;
		
		for (index = 0; index < arrayInvoicePrizeLog.length; index++) {
		
			if (arrayInvoicePrizeLog[index].getPrizeItem() == '0001') {
			
				prizeItem = parseInt(arrayInvoicePrizeLog[index].getPrizeItem());
				
				for (prizeItem; prizeItem <= 6; prizeItem++) {

					if (checkInvoicePrize(invoiceNo, arrayInvoicePrizeLog[index].getInvoiceNo().substring(prizeItem - 1), root.sprintf('%04d', prizeItem))) result = root.sprintf('%04d', prizeItem);
					
					if (result != '') break;
				}
			}
			else {

				if (checkInvoicePrize(invoiceNo, arrayInvoicePrizeLog[index].getInvoiceNo(), arrayInvoicePrizeLog[index].getPrizeItem())) result = arrayInvoicePrizeLog[index].getPrizeItem();	
			}
			
			if (result != '') break;
		}
			
		return result;
	};
	
	/**
	 *
	 * @description 發票號碼中獎比對
	 *
	 * @version 2016/03/29 ace 初始版本。
	 *  
	 * @author ace
	 *
	 */
	var checkInvoicePrize = function(invoiceNo, invoicePrizeNo, prizeItem) {
	
		var result = false;
		
		var no = invoiceNo;
	
		// 發票號碼10碼表示包含前置2個英文字母。
		if (no.length == 10) no = no.substring(2);
		
		if (prizeItem == '0100') {	// 特別獎
			
			if (invoicePrizeNo == no) result = true;
		}
		else if (prizeItem == '0000') {	// 特獎
			
			if (invoicePrizeNo == no) result = true;
		}
		else if (prizeItem == '0001') {	// 頭獎
			
			if (invoicePrizeNo == no) result = true;
		}
		else if (prizeItem == '0002') {
			
			if (invoicePrizeNo == no.substring(1)) result = true;	// 末7位號碼。
		}
		else if (prizeItem == '0003') {
			
			if (invoicePrizeNo == no.substring(2)) result = true;	// 末6位號碼。
		}
		else if (prizeItem == '0004') {
			
			if (invoicePrizeNo == no.substring(3)) result = true;	// 末5位號碼。
		}
		else if (prizeItem == '0005') {
			
			if (invoicePrizeNo == no.substring(4)) result = true;	// 末4位號碼。
		}
		else if (prizeItem == '0006') {
			
			if (invoicePrizeNo == no.substring(5)) result = true;	// 末3位號碼。
		}
		else if (prizeItem == '0101') {
			
			if (invoicePrizeNo == no.substring(5)) result = true;	// 增開六獎
		}
		
		return result;
	};
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getInvoicePrizeItem: getInvoicePrizeItem,
				checkInvoicePrize: checkInvoicePrize
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getInvoicePrizeItem;
		module.exports = checkInvoicePrize;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Invoice == 'undefined') root.tw.ace33022.functions.Invoice = {};
	
		root.tw.ace33022.functions.Invoice.gtInvoicePrizeItem = getInvoicePrizeItem;
		root.tw.ace33022.functions.Invoice.checkInvoicePrize = checkInvoicePrize;
	}
})(this);