/**
 *
 * @description Stock
 *
 * @version 2021/02/02 ace Initialize.
 * @version 2025/08/13 ace add getOptionMargin().
 *
 * @see <a href="https://www.taifex.com.tw/cht/index">臺灣期貨交易所</a>
 *
 * @see <a href="https://mis.taifex.com.tw/futures/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/disclaimer/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/RegularSession/EquityIndices/FuturesDomestic">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/RegularSession/EquityIndices/Options/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/AfterHoursSession/EquityIndices/Options/">臺灣期貨交易所行情資訊網</a>
 *
 * @see <a href="http://www.w3schools.com/js/js_try_catch.asp">JavaScript Try...Catch Statement</a>
 * @see <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error">Error</a>
 * @see <a href="https://developer.mozilla.org/zh_tw/Core_JavaScript_1.5_%E6%95%99%E5%AD%B8/%E4%BE%8B%E5%A4%96%E8%99%95%E7%90%86%E8%AA%9E%E6%B3%95/try...catch_%E8%AA%9E%E6%B3%95">try...catch 語法</a>
 * @see <a href="http://www.guan8.net/Java/468322.html">javascript中使用try{}catch{}語句 處理</a>
 * @see <a href="http://www.javascriptkit.com/javatutors/trycatch.shtml">Handling runtime errors in JavaScript using try/catch/finally</a>
 * @see <a href="http://www.javascriptkit.com/javatutors/trycatch2.shtml">The Error object and throwing your own errors</a>
 *
 * @see <a href="https://stackoverflow.com/questions/41383336/curl-doesnt-encode-utf-8">jquery - CURL doesn't encode UTF-8 - Stack Overflow</a>
 * @see <a href="https://stackoverflow.com/questions/6408904/send-request-to-curl-with-post-data-sourced-from-a-file">http - Send request to cURL with post data sourced from a file - Stack Overflow</a>
 * @see <a href="https://stackoverflow.com/questions/7172784/how-do-i-post-json-data-with-curl">rest - How do I POST JSON data with cURL? - Stack Overflow</a>
 *
 * @author ace
 *
 */
(function(root) {

	/**
	 *
	 * @description 每日臺指加權股價指數交易資料
	 *
	 * @version 2015/01/22 ace 初始版本。
	 * @version 2016/09/01 ace 成交金額資料取得方式調整。
	 * @version 2024/05/04 ace 配合改版，修正取得交易資料問題。
	 *
	 * @author ace
	 *
	 */
	function getTWSEDayTrnLog(trnDate) {
	
		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getTWSEDayTrnLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getTWSEDayTrnLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 三大法人買賣金額統計資料
	 *
	 * @version 2015/01/22 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getFoundationAmountDayTrnLog(trnDate) {
	
		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getFoundationAmountDayTrnLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getFoundationAmountDayTrnLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 外資及陸資持股資料
	 *
	 * @version 2012/10/12 ace 新增函數DealWithForeignHandedStocksLogs()取得外資及陸資持股資料。
	 *
	 * @author ace
	 *
	 */
	function getForeignHandedStockLog(trnDate) {
	
		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getForeignHandedStockLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getForeignHandedStockLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 每日期貨交易資料
	 *
	 * @version 2015/01/22 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getFutureDayTrnLog(trnDate) {
	
		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getFutureDayTrnLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getFutureDayTrnLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 三大法人每日期貨交易資料
	 *
	 * @version 2015/01/22 ace 初始版本。
	 * @version 2024/05/04 ace 配合改版，修正取得外資期貨交易資料問題。
	 *
	 * @author ace
	 *
	 */
	function getFoundationFutureDayTrnLog(trnDate) {
	
		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getFoundationFutureDayTrnLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getFoundationFutureDayTrnLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 期貨大額交易人未沖銷部位資料
	 *
	 * @version 2015/01/22 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getFutureLargeStayLog(trnDate) {

		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getFutureLargeStayLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getFutureLargeStayLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	
	/**
	 *
	 * @description 每日選擇權交易資料
	 *
	 * @version 2015/01/22 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getOptionDayTrnLog(trnDate) {

		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getOptionDayTrnLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				// result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getOptionDayTrnLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 三大法人每日選擇權交易資料
	 *
	 * @version 2012/08/08 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getFoundationOptionDayTrnLog(trnDate) {

		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getFoundationOptionDayTrnLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				// result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getFoundationOptionDayTrnLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 選擇權大額交易人未沖銷部位資料
	 *
	 * @version 2012/08/08 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getOptionLargeStayLog(trnDate) {

		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getOptionLargeStayLog(trnDate));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				// result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getOptionLargeStayLog(trnDate));
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description getMarketType
	 *
	 * @return String String。
	 *
	 * @version 2022/07/11 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 取得傳送JSON資料的MarketType屬性資料(交易時段)，'0'：盤中交易，'1'：盤後交易。
	 *  
	 */
	function getMarketType() {return (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) ? '1' : '0';}
	
	/**
	 *
	 * @description 取得當前月份的期貨結算日期。
	 *
	 * @return String Datetime String。
	 *
	 * @version 2021/03/14 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 2021/03/14 ace https://mis.taifex.com.tw/futures/_nuxt/8dcb1df.js
	 * @comment 2025/08/25 ace 純粹計算系統時間或傳入時間月份的該月份結算日期。判斷系統時間日期已超過結算日期的部分應由呼叫此函數前進行處理？！
	 *
	 */
	function getCurrentTaifexCloseDate() {
	
    if (typeof Configuration != 'undefined') {

      if (Configuration.isRhinoPlatform()) {
      
        if (typeof tw.ace33022.functions.Datetime == 'undefined') load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.functions.Datetime"] + '.js');
      }
    }
		
		var date = new Date();
		
		var result = tw.ace33022.functions.Datetime.doDatetimeToDatetimeString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0));
		
		var cal;
		var firstWeekBeforeDays = 0;
		
		console.log('arguments.length: ' + arguments.length);
		
		if (arguments.length != 0) {
		
			date = tw.ace33022.functions.Datetime.doDateStringToDatetime(arguments[0]);
			
			result = tw.ace33022.functions.Datetime.doDatetimeToDatetimeString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0));
		}
		
		date.setDate(1);
		
		console.log('date: ' + date);
		console.log('date.getDate(): ' + date.getDate());
		console.log('date.getDay(): ' + date.getDay());
		
		// n = (e = 0 == (f = new Date(d.getTime())).getDay() ? 7 : f.getDay()) < 3 ? 3 - e : 7 - (e - 3);
		// n += 14, 
		firstWeekBeforeDays = (cal = 0 == date.getDay() ? 7 : date.getDay()) <= 3 ? 3 - cal : 7 - (cal - 3);
		
		console.log('firstWeekBeforeDays: ' + firstWeekBeforeDays);	// 周三之前的天數。

		date.setDate(date.getDate() + 14 + firstWeekBeforeDays);
		
		console.log('date: ' + date);
		
		// m = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 14, 30, 0) 
		result = tw.ace33022.functions.Datetime.doDatetimeToDatetimeString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0));
		
		if ((arguments.length == 0) && (tw.ace33022.functions.Datetime.doDatetimeStringToDatetime(result) < (new Date()))) {
		
			// 超過本月份結算日期時間則取下月份結算日期時間。
			// result = getCurrentTaifexCloseDate(tw.ace33022.functions.Datetime.doDatetimeToDateString(new Date(date.getFullYear(), date.getMonth() + 1, 1)));
		}
		
		return result;
	}
	
	/**
	 *
	 * @description getCurrTaifexMYCode
	 *
	 * @return String String。
	 *
	 * @version 2021/03/14 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 2021/03/14 ace https://mis.taifex.com.tw/futures/_nuxt/8dcb1df.js
	 *
	 * @todo 2025/08/26 ace 如何動態載入Datetime.js檔案？
	 *
	 */
	function getCurrTaifexMYCode() {
	
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.functions.Datetime == 'undefined') load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.functions.Datetime"] + '.js');
			}
		}
	
		var date = new Date();
		
		date > tw.ace33022.functions.Datetime.doDatetimeStringToDatetime(getCurrentTaifexCloseDate()) && date.setMonth(date.getMonth() + 1);
		
		return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"][date.getMonth()] + ('' + date.getFullYear())[3];
	}
	
	/**
	 *
	 * @description getConMonth
	 *
	 * @return String 契約月份的JSON資料。
	 *
	 * @version 2021/02/02 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 2022/07/13 ace 回傳改採用JSON字串資料格式，以利Java呼叫。
	 * @comment 2022/07/13 ace 部份商品沒有盤後交易。
	 * @comment 2022/07/13 ace "SymbolType":"O": Option；"F": Future。
	 * @comment 2022/07/13 ace "CID": 商品代碼。
	 *                         "TXF": 台指期。
	 *                         "MXF": 小台指期。
	 *                         "FXF": 金融期。
	 *                         "ZFF": 小金融期。
	 *                         "EXF": 電子期。
	 *                         "ZEF": 小電子期。
	 *                         "TXO": 台指選。
	 *                         "TFO": 金指選。
	 *                         "TEO": 電指選。
	 * @comment 20220/07/13 ace 選項"RowSize": "全部"沒有指定並不影響呼叫getCmdyMonthDDLItemByKind的回傳結果。
	 *  
	 */
	function getConMonth(productCode) {
	
		var result = {};
		
		if (typeof Configuration != 'undefined') {
		
			if (tw.ace33022.DefaultConfiguration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["DefaultConfiguration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getConMonth(productCode));
			}
			else if (tw.ace33022.DefaultConfiguration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(tw.ace33022.google.apps.functions.Stock.getConMonth(productCode));
			}
			else {
			
				// Browser environment
				// 127.0.0.1(localhost)
				// github host
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description getQuoteDetail
	 *
	 * @return String 期貨指數。
	 *
	 * @version 2021/02/05 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 2022/07/15 ace "TXF": 台指期。
	 *                         "MXF": 小台指期。
	 *                         "FXF": 金融期。
	 *                         "ZFF": 小金融期。
	 *                         "EXF": 電子期。
	 *                         "ZEF": 小電子期。
	 * @comment 2022/07/19 ace "TXO-Q"、"TXO-R"是選擇權的交易報價，但是跟現貨資料幾乎一致？用途待確認！
	 * 
	 */
	function getQuoteDetail(productCode) {
	
		var result = {};
		
		if (typeof Configuration != 'undefined') {
	
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				result = JSON.parse(tw.ace33022.rhino.functions.Stock.getQuoteDetail(productCode));
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {
			
				result = JSON.parse(root.tw.ace33022.google.apps.functions.Stock.getQuoteDetail(productCode));
			}
			else {
			}
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description getOptionPromptTrnLog
	 *
	 * @param productCode 商品編號。
	 * @param conMonth 契約月份。
	 *
	 * @version 2021/02/02 ace Initial
	 *
	 * @author ace
	 *  
	 * @comment 2022/08/10 ace "TXO": 台指選。
	 *                         "TFO": 金指選。
	 *                         "TEO": 電指選。
	 * @comment 2025/08/30 ace 配合計算保證金的需求，傳入的productCode只需要TX/TF/TE代碼。
	 */
	function getOptionPromptTrnLog(productCode, conMonth) {
	
		var result = {
		
			"code": 1,
			"message": "initialize state",
			"data": {
			
				"con_month": []
			}
		};
		
		var quoteDetail = {};
		var quoteListOption;
		
		var conMonthResult;
		
		var sPrice = 0;	// 現貨價格。
		
		console.log('arguments.length: ' + arguments.length);
		
		if (typeof Configuration != 'undefined') {
		
			if (Configuration.isRhinoPlatform()) {
			
				if (typeof tw.ace33022.rhino.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/rhino/functions/Stock.js');
				
				if (arguments.length == 1) {
				
					conMonthResult = getConMonth(productCode + 'O');
					
					// console.log(conMonthResult);
					result["code"] = JSON.parse(conMonthResult)["code"];
					result["message"] = JSON.parse(conMonthResult)["message"];
					
					JSON.parse(conMonthResult)["data"].forEach(function(element, index) {
					
						if (result["code"] == 0) {
						
							result["data"]["con_month"].push(element);
							result["data"][element] = {};
							
							quoteListOption = tw.ace33022.rhino.functions.Stock.getQuoteListOption(productCode + 'O', element);
							
							result["code"] = JSON.parse(quoteListOption)["code"];
							result["message"] = JSON.parse(quoteListOption)["message"];
							
							if (result["code"] == 0) result["data"][element] = JSON.parse(quoteListOption)["data"];
						}
					});
				}
				else if (arguments.length == 2) {
				
					result["data"]["con_month"].push(conMonth);
					result["data"][conMonth] = {};
				
					// result = JSON.parse(tw.ace33022.rhino.functions.Stock.getQuoteListOption(productCode, conMonth));
					// result = JSON.parse(tw.ace33022.rhino.functions.Stock.getQuoteListOption(productCode + 'O', conMonth));
					// result["data"][conMonth] = JSON.parse(tw.ace33022.rhino.functions.Stock.getQuoteListOption(productCode + 'O', conMonth));
					
					quoteListOption = tw.ace33022.rhino.functions.Stock.getQuoteListOption(productCode + 'O', conMonth);
					result["code"] = JSON.parse(quoteListOption)["code"];
					result["message"] = JSON.parse(quoteListOption)["message"];
					
					if (result["code"] == 0) result["data"][conMonth] = JSON.parse(quoteListOption)["data"];
				}
			}
			else if (Configuration.isGoogleAppsScriptPlatform()) {

				if (arguments.length == 1) {
				
					conMonthResult = getConMonth(productCode + 'O');
					
					// console.log(conMonthResult);
					result["code"] = JSON.parse(conMonthResult)["code"];
					result["message"] = JSON.parse(conMonthResult)["message"];
					
					JSON.parse(conMonthResult)["data"].forEach(function(element, index) {
					
						if (result["code"] == 0) {
						
							result["data"]["con_month"].push(element);
							result["data"][element] = {};
							
							quoteListOption = tw.ace33022.google.apps.functions.Stock.getQuoteListOption(productCode + 'O', element);
							
							result["code"] = JSON.parse(quoteListOption)["code"];
							result["message"] = JSON.parse(quoteListOption)["message"];
							
							if (result["code"] == 0) result["data"][element] = JSON.parse(quoteListOption)["data"];
						}
					});
				}
				else if (arguments.length == 2) {
				
					result["data"]["con_month"].push(conMonth);
					result["data"][conMonth] = {};
				
					quoteListOption = tw.ace33022.google.apps.functions.Stock.getQuoteListOption(productCode + 'O', conMonth);
					result["code"] = JSON.parse(quoteListOption)["code"];
					result["message"] = JSON.parse(quoteListOption)["message"];
					
					if (result["code"] == 0) result["data"][conMonth] = JSON.parse(quoteListOption)["data"];
				}
			}
			else {
			
				// SYS09110
			}
		}
		
		if (result["code"] == 0) quoteDetail = JSON.parse(getQuoteDetail(productCode + 'F'));
		
		// 計算保證金
		if (quoteDetail["code"] == 0) {
		
			quoteDetail["data"].forEach(function(element, index) {if (element["SymbolID"] == productCode + 'F' + '-S') sPrice = new Number(element["CLastPrice"]);});
			
			console.log('sPrice: ' + sPrice);
			
			result["data"]["con_month"].forEach(function(conMonth, index) {
			
				result["data"][conMonth]["call"].forEach(function(element, index) {
					
					element["margin_price"] = getOptionMargin(productCode + 'O', 'CALL', sPrice, new Number(element["strike_price"]), new Number(element["best_bid_price"]));
				});
				
				result["data"][conMonth]["put"].forEach(function(element, index) {
					
					element["margin_price"] = getOptionMargin(productCode + 'O', 'PUT', sPrice, new Number(element["strike_price"]), new Number(element["best_bid_price"]));
				});
			});
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 選擇權保證金。
	 *
	 * @param productCode 商品代碼。
	 * @param premiumPoint 權利金點數。
	 * @param strikePrice 履約價。
	 *
	 * @return Number 選擇權保證金。
	 *
	 * @version 2025/08/13 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getOptionMargin(productCode, optionType, targetPoint, strikePrice, premiumPoint) {
	
		var SETTING_OPTION_PREMIUM = {
		
			"TXO": {
			
				"UNIT_PRICE": 50,
				"ORIGINAL_DEPOSIT_A": 77000,
				"ORIGINAL_DEPOSIT_B": 39000
			}
		};

		var result = 0;
		
		var outPriceValue = 0;	// 價外值。
		
		var unitPrice = SETTING_OPTION_PREMIUM[productCode]["UNIT_PRICE"];
		var aOriginalDeposit = SETTING_OPTION_PREMIUM[productCode]["ORIGINAL_DEPOSIT_A"];
		var bOriginalDeposit = SETTING_OPTION_PREMIUM[productCode]["ORIGINAL_DEPOSIT_B"];
			
		console.log('unitPrice: ' + unitPrice);
		console.log('aOriginalDeposit: ' + aOriginalDeposit);
		console.log('bOriginalDeposit: ' + bOriginalDeposit);
		
		console.log('strikePrice: ' + strikePrice);
		console.log('premiumPoint: ' + premiumPoint);
		
		if (optionType == 'CALL') {
		
			outPriceValue = Math.max((strikePrice - targetPoint) * unitPrice, 0);
			
			if ((strikePrice - targetPoint) >= 500) {
			
				aOriginalDeposit *= 1.2;
				bOriginalDeposit *= 1.2;
			}
			else if ((strikePrice - targetPoint) >= 1000) {
			
				aOriginalDeposit *= 1.5;
				bOriginalDeposit *= 1.5;
			}
		}
		else if (optionType == 'PUT') {
		
			outPriceValue = Math.max((targetPoint - strikePrice) * unitPrice, 0);
			
			if ((targetPoint - strikePrice) >= 500) {
			
				aOriginalDeposit *= 1.2;
				bOriginalDeposit *= 1.2;
			}
			else if ((targetPoint - strikePrice) >= 1000) {
			
				aOriginalDeposit *= 1.5;
				bOriginalDeposit *= 1.5;
			}
		}
		
		console.log('outPriceValue: ' + outPriceValue);
		
		result = (premiumPoint * unitPrice) + Math.max(aOriginalDeposit - outPriceValue, bOriginalDeposit);
		
		return result;
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getTWSEDayTrnLog: getTWSEDayTrnLog,
				getFoundationAmountDayTrnLog: getFoundationAmountDayTrnLog,
				getForeignHandedStockLog: getForeignHandedStockLog,
				getFutureDayTrnLog: getFutureDayTrnLog,
				getFoundationFutureDayTrnLog: getFoundationFutureDayTrnLog,
				getFutureLargeStayLog: getFutureLargeStayLog,
				getOptionDayTrnLog: getOptionDayTrnLog,
				getFoundationOptionDayTrnLog: getFoundationOptionDayTrnLog,
				getOptionLargeStayLog: getOptionLargeStayLog,
				getMarketType: getMarketType,
				getCurrentTaifexCloseDate: getCurrentTaifexCloseDate,
				getCurrTaifexMYCode: getCurrTaifexMYCode,
				getConMonth: getConMonth,
				getQuoteDetail: getQuoteDetail,
				getOptionPromptTrnLog: getOptionPromptTrnLog,
				getOptionMargin: getOptionMargin
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getTWSEDayTrnLog;
		module.exports = getFoundationAmountDayTrnLog;
		module.exports = getForeignHandedStockLog;
		module.exports = getFutureDayTrnLog;
		module.exports = getFoundationFutureDayTrnLog;
		module.exports = getFutureLargeStayLog;
		module.exports = getOptionDayTrnLog;
		module.exports = getFoundationOptionDayTrnLog;
		module.exports = getOptionLargeStayLog;
		module.exports = getMarketType;
		module.exports = getCurrentTaifexCloseDate;
		module.exports = getCurrTaifexMYCode;
		module.exports = getConMonth;
		module.exports = getQuoteDetail;
		module.exports = getOptionPromptTrnLog;
		module.exports = getOptionMargin;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Stock == 'undefined') root.tw.ace33022.functions.Stock = {};
		
		root.tw.ace33022.functions.Stock.getTWSEDayTrnLog = getTWSEDayTrnLog;
		root.tw.ace33022.functions.Stock.getFoundationAmountDayTrnLog = getFoundationAmountDayTrnLog;
		root.tw.ace33022.functions.Stock.getForeignHandedStockLog = getForeignHandedStockLog;
		root.tw.ace33022.functions.Stock.getFutureDayTrnLog = getFutureDayTrnLog;
		root.tw.ace33022.functions.Stock.getFoundationFutureDayTrnLog = getFoundationFutureDayTrnLog;
		root.tw.ace33022.functions.Stock.getFutureLargeStayLog = getFutureLargeStayLog;
		root.tw.ace33022.functions.Stock.getOptionDayTrnLog = getOptionDayTrnLog;
		root.tw.ace33022.functions.Stock.getFoundationOptionDayTrnLog = getFoundationOptionDayTrnLog;
		root.tw.ace33022.functions.Stock.getOptionLargeStayLog = getOptionLargeStayLog;
		root.tw.ace33022.functions.Stock.getMarketType = getMarketType;
		root.tw.ace33022.functions.Stock.getCurrentTaifexCloseDate = getCurrentTaifexCloseDate;
		root.tw.ace33022.functions.Stock.getCurrTaifexMYCode = getCurrTaifexMYCode;
		root.tw.ace33022.functions.Stock.getConMonth = getConMonth;
		root.tw.ace33022.functions.Stock.getQuoteDetail = getQuoteDetail;
		root.tw.ace33022.functions.Stock.getOptionPromptTrnLog = getOptionPromptTrnLog;
		root.tw.ace33022.functions.Stock.getOptionMargin = getOptionMargin;
	}
})(this);