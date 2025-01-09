
function main() {

	// load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/Configuration.js');
	
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["moment"] + '.js');
	
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/StockUtil.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/PushbulletUtil.js');
	
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/vo/OptionCallTrnLog.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/vo/OptionPutTrnLog.js');
	
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/underscore/underscore.js');
	
	function checkCondition() {
	
		var result = false;
	
		return result;
	}
	
	var result = this;
	
	// Get all or get needed?
	var conMonth = new Array();
	// var conMonth = JSON.parse(tw.ace33022.util.StockUtil.getConMonth());
	
	var monitorCondition = {};
	
	var trigger = false;
	
	var data;
	var index;
	
	var arrCallVO = new Array();
	var arrPutVO = new Array();
	
	Logger.setLevel(Logger.DEBUG);
	
	Logger.debug('arguments.length: ' + arguments.length);
	
	if (arguments.length != 0) {
	
		try {
		
			Logger.debug('arguments[0]: ' + arguments[0]);
			
			monitorCondition = JSON.parse(arguments[0]);

			monitorCondition["option"]["txo"]["call"].forEach(function(element, index) { if (_.indexOf(conMonth, element["con_month"]) == -1) conMonth.push(element["con_month"]); });
			monitorCondition["option"]["txo"]["put"].forEach(function(element, index) { if (_.indexOf(conMonth, element["con_month"]) == -1) conMonth.push(element["con_month"]); });
			
			Logger.debug('conMonth: ' + conMonth);
			
			for (index = 0; index < conMonth.length; index++) {
			
				data = JSON.parse(tw.ace33022.util.StockUtil.getOptionRealTimeTrnLog('TXO', conMonth[index]));
				
				data["call"].forEach(function(element, index) {
				
					var vo = new tw.ace33022.vo.OptionCallTrnLog();
					
					vo.setValueFromJSONObject(data["call"][index]);
					
					// 只保留有委買/賣數量的資料。
					// if ((vo.getBestAskQty() != 0) && (vo.getBestBidQty() != 0)) arrCallVO.push(vo);
					arrCallVO.push(vo);
				});
				
				data["put"].forEach(function(element, index) {
				
					var vo = new tw.ace33022.vo.OptionPutTrnLog();
					
					vo.setValueFromJSONObject(data["put"][index]);
					
					// 只保留有委買/賣數量的資料。
					// if ((vo.getBestAskQty() != 0) && (vo.getBestBidQty() != 0)) arrPutVO.push(vo);
					arrPutVO.push(vo);
				});
			}
			
			if (typeof monitorCondition["option"] != 'undefined') {
			
				for (var productKey in monitorCondition["option"]) {
				
					Logger.debug('productKey: ' + productKey);
					
					for (var kind in monitorCondition["option"][productKey]) {
					
						Logger.debug('kind: ' + kind);
						
						if (kind == 'call') {
						}
						else if (kind == 'put') {
						}
					}
				}
			}
			
			monitorCondition["option"]["txo"]["call"].forEach(function(element, index) {
			
				arrCallVO.forEach(function(source) {
				
					if ((element["con_month"] == source.getConMonth()) && (element["strike_price"] == source.getStrikePrice())) {
					
						Logger.debug(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice() + ' : ' + source.getBestAskPrice());
						
						if (typeof element["best_ask_price"] != 'undefined') {
						
							if (element["price_condition"] == 'ge') {
							
								if (source.getBestAskPrice() >= element["best_ask_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestAskPrice() + ' : ' + 'ge');
								}
							}
							else if (element["price_condition"] == 'le') {
							
								if (source.getBestAskPrice() <= element["best_ask_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestAskPrice() + ' : ' + 'le');
								}
							}
						}
						else if (typeof element["best_bid_price"] != 'undefined') {
						
							if (element["price_condition"] == 'ge') {
							
								if (source.getBestBidPrice() >= element["best_bid_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice() + ' : ' + 'ge');
								}
							}
							else if (element["price_condition"] == 'le') {
							
								if (source.getBestBidPrice() <= element["best_bid_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice() + ' : ' + 'le');
								}
							}
						}
					}
				});
			});
			

			monitorCondition["option"]["txo"]["put"].forEach(function(element, index) {
			
				arrPutVO.forEach(function(source) {
				
					if ((element["con_month"] == source.getConMonth()) && (element["strike_price"] == source.getStrikePrice())) {
					
						Logger.debug(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice() + ' : ' + source.getBestAskPrice());
						
						if (typeof element["best_ask_price"] != 'undefined') {
						
							if (element["price_condition"] == 'ge') {
							
								if (source.getBestAskPrice() >= element["best_ask_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestAskPrice() + ' : ' + 'ge');
								}
							}
							else if (element["price_condition"] == 'le') {
							
								if (source.getBestAskPrice() <= element["best_ask_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestAskPrice() + ' : ' + 'le');
								}
							}
						}
						else if (typeof element["best_bid_price"] != 'undefined') {
						
							if (element["price_condition"] == 'ge') {
							
								if (source.getBestBidPrice() >= element["best_bid_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice() + ' : ' + 'ge');
								}
							}
							else if (element["price_condition"] == 'le') {
							
								if (source.getBestBidPrice() <= element["best_bid_price"]) {
								
									Logger.info(source.getProductCode() + ' : ' + source.getConMonth() + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice() + ' : ' + 'le');
								}
							}
						}
					}
				});
			});
			
			// if (trigger == true) tw.ace33022.util.PushbulletUtil.pushNote('o.auSaSfpkxFijkoAwoA93GsSkl2ojlrnf', 'ujDUuu4dFNQsjvI38qoNgG', moment(new Date()).format('YYYY/MM/DD HH:mm') + ' - 台股期貨指數 - ' + result["now_point"], '');
		} 
		catch (e) {
		
			Logger.error('錯誤訊息：' + e);
		}
		finally {
		
		}
	}
	
	return result;
}
