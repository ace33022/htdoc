
function main() {

	// load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/Configuration.js');
	
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["moment"] + '.js');
	
	// load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/rhino/StockUtil.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/functions/rhino/Stock.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/functions/rhino/Pushbullet.js');
	
	var result = {};
	
	var productCode;
	var type;
	var arrQuoteList;
	
	var trigger = false;
	var alertMessage = '';
	
	var index;
	
	logger.debug('arguments.length: ' + arguments.length);
	
	if (arguments.length != 0) {
	
		try {
		
			logger.debug('arguments[0]: ' + arguments[0]);
			
			result = JSON.parse(arguments[0]);
			
			for (productCode in result) {
			
				trigger = false;
			
				logger.debug('productCode: ' + productCode);
				
				// logger.debug('Quote result: ' + tw.ace33022.functions.Stock.getSAndNearestFQuoteDetail(productCode));
				
				arrQuoteList = JSON.parse(tw.ace33022.functions.Stock.getSAndNearestFQuoteDetail(productCode))["RtData"]["QuoteList"];
				
				for (index = 0; index < arrQuoteList.length; index++) {
				
					logger.info(arrQuoteList[index]["SymbolID"] + ' => ' + 'LastPrice: ' + arrQuoteList[index]["CLastPrice"] + ' | ' + 'OpenPrice: ' + arrQuoteList[index]["COpenPrice"] + ' | ' + 'HighPrice: ' + arrQuoteList[index]["CHighPrice"] + ' | ' + 'LowPrice: ' + arrQuoteList[index]["CLowPrice"]);
					
					type = arrQuoteList[index]["SymbolID"].substring(arrQuoteList[index]["SymbolID"].length - 1);
					
					result[productCode][type]["now_point"] = parseFloat(arrQuoteList[index]["CLastPrice"]);
					
					if (result[productCode][type]["previous_point"] == undefined) result[productCode][type]["previous_point"] = result[productCode][type]["now_point"];
					if (result[productCode][type]["logged_peak_high_point"] == undefined) result[productCode][type]["logged_peak_high_point"] = result[productCode][type]["peak_high_point"];
					if (result[productCode][type]["logged_peak_low_point"] == undefined) result[productCode][type]["logged_peak_low_point"] = result[productCode][type]["peak_low_point"];
					
					// for (var key in result[productCode]) logger.debug(key + ' : ' + result[productCode][key] + ' : ' + typeof result[productCode][key]);
					if (Math.abs(result[productCode][type]["now_point"] - result[productCode][type]["previous_point"]) >= Math.abs(result[productCode][type]["alarm_difference_point"])) {
					
						trigger = true;
						
						// alertMessage += productCode + '指數 - ' + result[productCode][type]["now_point"] + ' - 點數波動超過' + result[productCode][type]["alarm_difference_point"] + '點\n';
						alertMessage += arrQuoteList[index]["SymbolID"] + '指數 - ' + result[productCode][type]["now_point"] + ' - 點數波動超過' + result[productCode][type]["alarm_difference_point"] + '點\n';
					}
					
					if (result[productCode][type]["now_point"] > result[productCode][type]["logged_peak_high_point"]) {
					
						trigger = true;
						
						// alertMessage += productCode + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過動態高點 - ' + result[productCode][type]["logged_peak_high_point"] + '\n';
						alertMessage += arrQuoteList[index]["SymbolID"] + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過動態高點 - ' + result[productCode][type]["logged_peak_high_point"] + '\n';
						
						// 超過動態高點，更新動態高點。
						// result[productCode]["logged_peak_high_point"] = result[productCode]["now_point"] + result[productCode]["alarm_difference_point"] * 3;
						result[productCode][type]["logged_peak_high_point"] = result[productCode][type]["now_point"] + result[productCode][type]["alarm_difference_point"];
					
						// 超過動態高點，更新動態低點。
						// result[productCode]["logged_peak_low_point"] = result[productCode]["now_point"];
						result[productCode][type]["logged_peak_low_point"] = result[productCode][type]["now_point"]  - result[productCode][type]["alarm_difference_point"];
					}
					else if (result[productCode][type]["now_point"] > result[productCode][type]["peak_high_point"]) {
					
						// 此處的判斷是否可排除不合理數據？
						if (result[productCode][type]["peak_high_point"] > result[productCode][type]["logged_peak_high_point"])	{

							trigger = true;
							
							// alertMessage += productCode + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過監控高點 - ' + result[productCode][type]["peak_high_point"] + '\n';
							alertMessage += arrQuoteList[index]["SymbolID"] + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過監控高點 - ' + result[productCode][type]["peak_high_point"] + '\n';
						}
					}
					else if (result[productCode][type]["now_point"] < result[productCode][type]["logged_peak_low_point"]) {
					
						trigger = true;
						
						// alertMessage += productCode + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過動態低點 - ' + result[productCode][type]["logged_peak_low_point"] + '\n';
						alertMessage += arrQuoteList[index]["SymbolID"] + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過動態低點 - ' + result[productCode][type]["logged_peak_low_point"] + '\n';
						
						// 超過動態低點，更新動態高點。
						// result[productCode]["logged_peak_high_point"] = result[productCode]["now_point"];
						result[productCode][type]["logged_peak_high_point"] = result[productCode][type]["now_point"] + result[productCode][type]["alarm_difference_point"];
					
						// 超過動態低點，更新動態低點。
						// result[productCode]["logged_peak_low_point"] = result[productCode]["now_point"] - result[productCode]["alarm_difference_point"] * 3;
						result[productCode][type]["logged_peak_low_point"] = result[productCode][type]["now_point"] - result[productCode][type]["alarm_difference_point"];
					}
					else if (result[productCode]["now_point"] < result[productCode]["peak_low_point"]) {
					
						trigger = true;
						
						// 此處的判斷是否可排除不合理數據？
						// alertMessage += productCode + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過監控低點 - ' + result[productCode][type]["peak_low_point"] + '\n';
						alertMessage += arrQuoteList[index]["SymbolID"] + '指數 - ' + result[productCode][type]["now_point"] + ' - 超過監控低點 - ' + result[productCode][type]["peak_low_point"] + '\n';
					}
					
					logger.debug('result: ' + JSON.stringify(result));
					
					result[productCode][type]["previous_point"] = result[productCode][type]["now_point"];
					
					// if (trigger == true) tw.ace33022.functions.Pushbullet.pushes('o.auSaSfpkxFijkoAwoA93GsSkl2ojlrnf', 'ujDUuu4dFNQsjvI38qoNgG', moment(new Date()).format('YYYY/MM/DD HH:mm') + ' - ' + productCode + '期貨指數 - ' + result[productCode]["now_point"], '');
					// if (trigger == true) tw.ace33022.functions.Pushbullet.pushes('o.auSaSfpkxFijkoAwoA93GsSkl2ojlrnf', 'ujDUuu4dFNQsjvI38qoNgG', moment(new Date()).format('YYYY/MM/DD HH:mm') + ' - ' + alertMessage, '');
					if ((result[productCode][type]["alarm"] == 'y') && (trigger == true)) tw.ace33022.functions.Pushbullet.pushes('o.auSaSfpkxFijkoAwoA93GsSkl2ojlrnf', 'ujDUuu4dFNQsjvI38qoNgG', moment(new Date()).format('HH:mm') + ' - ' + alertMessage, '');
				}
			}
		} 
		catch (e) {
		
			logger.error('錯誤訊息：' + e);
		}
		finally {
		
		}
	}
	
	result = JSON.stringify(result);
	
	return result;
}
