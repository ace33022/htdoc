
// Logger.log("TST00010");

function main(param, param2) {

	/*
	var result = {
	
		"INDEX": {
		
			"FUNCTIONCODE":"C01",
			"REPLY":"1",
			"SELLDETAIL":"",
			"SELLERID":"53323726",
			"INVOICEHEADER":"HR",
			"INVOICESTART":"00000000",
			"INVOICEEND":"00000199",
			"INVOICENUMBER":"",
			"APPID":"0000000000000000",
			"EcrId":"",
			"SYSTIME":"2021-02-04 15:49:38",
			"ACCOUNT":"0000000000000000",
			"VERIONUPDATE":"",
			"MESSAGE":"",
			"POSID":"A0302",
			"APPVSERION":"",
			"ServerType":"",
			"SECURITY":"",
			"CHECKSUM":"",
			"TAXMONTH": "11002",
			"USERID":""
		}
	};
	*/
	
	var result = {
	
		"code": "xyz",
		"name": "許功蓋",
		"invalid_line_nums": [3, 5]
	};
	
	Logger.log('param: ' + param);
	Logger.log('param2: ' + param2);
	
	Logger.log('result: ' + JSON.stringify(result));
	
	return JSON.stringify(result);
}
