/**
 *
 * @description 判斷是否有套利空間的選擇權。
 *
 * @version 2022/01/23 ace 初始版本。
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *
 * @comment
 *
 * @author ace
 *
 * @todo
 *
 */

function main() {

	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["moment"] + '.js');
	
	// load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/StockUtil.js');
	// load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/PushbulletUtil.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/Stock.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/Pushbullet.js');
	
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/vo/OptionCallTrnLog.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/vo/OptionPutTrnLog.js');
	
	var result = {
	
		"call": [],
		"put": []
	};
	
	var conMonth;
	
	var data;
	var index;
	var arrVO;
	
	try {
	
		conMonth = JSON.parse(tw.ace33022.util.Stock.getConMonth('TXO'));
		
		logger.debug('conMonth: ' + conMonth);
		
		for (index = 0; index < conMonth.length; index++) {
		
			data = JSON.parse(tw.ace33022.util.Stock.getOptionRealTimeTrnLog('TXO', conMonth[index]));
			
			// call option
			
			arrVO = new Array();
			
			data["call"].forEach(function(element, index) {
			
				var vo = new tw.ace33022.vo.OptionCallTrnLog();
				
				vo.setValueFromJSONObject(data["call"][index]);
				
				// 只保留有委買/賣數量的資料。
				if ((vo.getBestAskQty() != 0) && (vo.getBestBidQty() != 0)) arrVO.push(vo);
			});
			
			arrVO.forEach(function(source) {

				arrVO.forEach(function(target) {
				
					if (parseInt(source.getStrikePrice()) > parseInt(target.getStrikePrice())) {
					
						// if (parseInt(source.getBestBidPrice()) > parseInt(target.getBestAskPrice())) {	// 委買價 > 委賣價
						if ((parseInt(source.getBestBidPrice()) - parseInt(target.getBestAskPrice())) >= 2) {

							logger.debug('conMonth: ' + conMonth[index] + ' call ' + 'source' + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice() + '<=>' + ' target' + ' : ' + target.getStrikePrice() + ' : ' + target.getBestAskPrice());
							
							result["call"].push(source);
							result["call"].push(target);
						}
					}
				});
			});
			
			// put option
			
			arrVO = new Array();
			
			data["put"].forEach(function(element, index) {
			
				var vo = new tw.ace33022.vo.OptionCallTrnLog();
				
				vo.setValueFromJSONObject(data["put"][index]);
				
				// 只保留有委買/賣數量的資料。
				if ((vo.getBestAskQty() != 0) && (vo.getBestBidQty() != 0)) arrVO.push(vo);
			});
			
			arrVO.forEach(function(source) {

				arrVO.forEach(function(target) {
				
					if (parseInt(source.getStrikePrice()) < parseInt(target.getStrikePrice())) {
					
						// if (parseInt(source.getBestBidPrice()) > parseInt(target.getBestAskPrice())) {	// 委買價 > 委賣價
						if ((parseInt(source.getBestBidPrice()) - parseInt(target.getBestAskPrice())) >= 2) {

							logger.debug('conMonth: ' + conMonth[index] + ' put source' + ' : ' + source.getStrikePrice() + ' : ' + source.getBestBidPrice());
							logger.debug('conMonth: ' + conMonth[index] + ' put target' + ' : ' + target.getStrikePrice() + ' : ' + target.getBestAskPrice());
							
							result["put"].push(source);
							result["put"].push(target);
						}
					}
				});
			});
		}
		
		if ((result["call"].length != 0) || (result["put"].length != 0)) {
		
			logger.debug('result' + ' : ' + JSON.stringify(result));
			
			tw.ace33022.util.Pushbullet.pushNote('o.auSaSfpkxFijkoAwoA93GsSkl2ojlrnf', 'ujDUuu4dFNQsjvI38qoNgG', JSON.stringify(result), '');
		}
		
		if (arguments.length != 0) {
		
			logger.debug('arguments[0]: ' + arguments[0]);
			
		}
	} 
	catch (e) {
	
		logger.error('錯誤訊息：' + e);
	}
	finally {
	
	}
	
	return JSON.stringify(result);
}
