/**
 *
 * @description StockUtil
 *
 * @version 2021/02/02 ace Initial
 *
 * @see <a href="https://mis.taifex.com.tw/futures/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/disclaimer/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/RegularSession/EquityIndices/FuturesDomestic">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/RegularSession/EquityIndices/Options/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/AfterHoursSession/EquityIndices/Options/">臺灣期貨交易所行情資訊網</a>
 *
 * @author ace
 *
 */

(function(root) {

	// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
	// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
	
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
	
	var cURLPath = 'W:/tool/package/LangEnv/Java/apache-tomcat/webapps/ROOT/WEB-INF/tool/package/NetTool/curl/bin/curl.exe';
	
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
	 */
	function getCurrTaifexMYCode() {
	
		var date = new Date();
		
		date > tw.ace33022.util.DateTimeUtil.doDateTimeStringToDateTime(getCurrentTaifexCloseDate()) && date.setMonth(date.getMonth() + 1);
		
		return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"][date.getMonth()] + ('' + date.getFullYear())[3];
	}
	
	/**
	 *
	 * @description getCurrentTaifexCloseDate
	 *
	 * @return String DateTime String。
	 *
	 * @version 2021/03/14 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 2021/03/14 ace https://mis.taifex.com.tw/futures/_nuxt/8dcb1df.js
	 *  
	 */
	function getCurrentTaifexCloseDate() {
	
		var date;
		var cal, firstWeekBeforeDays;
	
		(date = new Date()).setDate(1);
		
		// n = (e = 0 == (f = new Date(d.getTime())).getDay() ? 7 : f.getDay()) < 3 ? 3 - e : 7 - (e - 3);
		// n += 14, 
		firstWeekBeforeDays = (cal = 0 == date.getDay() ? 7 : date.getDay()) < 3 ? 3 - cal : 7 - (cal - 3);
		
		logger.debug('firstWeekBeforeDays: ' + firstWeekBeforeDays);

		date.setDate(date.getDate() + 14 + firstWeekBeforeDays);
		
		logger.debug('date: ' + date);
		
		// m = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 14, 30, 0), 
		return tw.ace33022.util.DateTimeUtil.doDateTimeToDateTimeString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0));
	}
	
	/**
	 *
	 * @description getQuoteDetail
	 *
	 * @return String JSON String。
	 *
	 * @version 2021/02/05 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 2021/02/25 ace https://mis.taifex.com.tw/futures/api/getQuoteDetail
	 *  
	 */
	function getQuoteDetail(marketType) {
	
		var result = '';
		
		var errorMessage = '';

		var process;
		
		var inputBufferedReader, errorBufferedReaded;
		var temp;
		
		var symbolTXFF = 'TXF' + getCurrTaifexMYCode();
		
		// var postData = '{\\"SymbolID\\": [\\"TXF-S\\", \\"TXFB1-F\\", \\"TXO-Q\\"] }';	// 一般交易時段行情。
		var postData = '';
		
		
		if (marketType == '0') {
		
			postData = '{\\"SymbolID\\": [\\"TXF-S\\", \\"' + symbolTXFF + '-F' + '\\", \\"TXO-R\\"] }';	// 一般交易時段行情。
		}
		else {
		
			postData = '{\\"SymbolID\\": [\\"TXF-S\\", \\"' + symbolTXFF + '-M' + '\\", \\"TXO-R\\"] }';	// 盤後交易時段行情。
		}
		
		logger.debug('postData: ' + postData);
		
		process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteDetail"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData + '"');
		
		inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
		while ((temp = inputBufferedReader.readLine()) != null) result += temp;
		
		errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
		while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
		
		if (process.waitFor() !== 0) throw new Error(errorMessage);
		
		return result;
	}

	/**
	 *
	 * @description getTWSEPoint
	 *
	 * @return String 現貨指數。
	 *
	 * @version 2021/02/05 ace Initial
	 *
	 * @author ace
	 *  
	 */
	function getTWSEPoint() {
	
		var result = 0;
		
		var marketType = '0';
		
		var arrQuoteList;
		var index;
		
		if (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) marketType = '1';	// '0'：一般交易時段行情；'1'；盤後交易時段行情。
		
		arrQuoteList = JSON.parse(getQuoteDetail(marketType))["RtData"]["QuoteList"];
		
		for (index = 0; index < arrQuoteList.length; index++) {
		
			if (arrQuoteList[index]["SymbolID"] == 'TXF-S') {
			
				result = parseFloat(arrQuoteList[index]["CLastPrice"]);
				
				break;
			}
		}
		
		return result;
	}
	
	/**
	 *
	 * @description getFuturePoint
	 *
	 * @return String 期貨指數。
	 *
	 * @version 2021/02/05 ace Initial
	 *
	 * @author ace
	 *  
	 */
	function getFuturePoint() {
	
		var result = 0;
		
		var marketType = '0';
		// var symbolID = 'TXFB1-F';
		var symbolID = 'TXF' + getCurrTaifexMYCode() + '-';
		
		var arrQuoteList;
		var index;
		
		if (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) marketType = '1';	// '0'：一般交易時段行情；'1'；盤後交易時段行情。
		
		symbolID += marketType == '0' ? 'F' : 'M';
		
		logger.debug('symbolID: ' + symbolID);
		// logger.debug('getQuoteDetail: ' + getQuoteDetail(marketType));
		
		arrQuoteList = JSON.parse(getQuoteDetail(marketType))["RtData"]["QuoteList"];
		
		for (index = 0; index < arrQuoteList.length; index++) {
		
			if (arrQuoteList[index]["SymbolID"] == symbolID) {
			
				result = parseFloat(arrQuoteList[index]["CLastPrice"]);
				
				break;
			}
		}
		
		return result;
	}
	
	/**
	 *
	 * @description getConMonth
	 *
	 * @return String 契約月份。
	 *
	 * @version 2021/02/02 ace Initial
	 *
	 * @author ace
	 *  
	 */
	function getConMonth() {
	
		function getData() {

			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;
			
			var marketType = '0';
			
			var postData;
									 
			if (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) marketType = '1';	// 交易時段，'0'：盤中交易，'1'：盤後交易。
			
			postData = '{\\"AscDesc\\": \\"A\\", '
							 + ' \\"CID\\": \\"\\", '
							 + ' \\"ExpireMonth\\": \\"\\", '
							 + ' \\"KindID\\": \\"1\\", '	
							 + ' \\"MarketType\\": \\"' + marketType + '\\", '	// '0'：交易時間；'1'；盤後時間。
							 + ' \\"PageNo\\": \\"\\", '
							 // + ' \\"RowSize\\": \\"全部\\", '	// 中文字傳輸問題？！
							 + ' \\"SortColumn\\": \\"\\", '
							 + ' \\"SymbolType\\": \\"O\\" }';

			process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData + '"');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			return result;
		}
		
		var result = new Array();
		
		var arrConMonth = JSON.parse(getData())["RtData"]["Items"];
		var index;
		
		for (index = 0; index < arrConMonth.length; index++) {
		
			if (arrConMonth[index]["item"] != '現貨') result.push(arrConMonth[index]["item"]);
		}
		
		// return result;
		return JSON.stringify(result);
	}

	/**
	 *
	 * @description getOptionRealTimeTrnLog
	 *
	 * @param productCode 商品編號。
	 * @param conMonth 契約月份。
	 *
	 * @version 2021/02/02 ace Initial
	 *
	 * @author ace
	 *  
	 */
	function getOptionRealTimeTrnLog(productCode, conMonth) {
	
		function getData(productCode, conMonth, marketType) {
		
			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;
			
			var postData = '{\\"AscDesc\\": \\"A\\", '
									 + ' \\"CID\\": \\"' + productCode + '\\", '
									 + ' \\"ExpireMonth\\": \\"' + conMonth + '\\", '
									 + ' \\"KindID\\": \\"1\\", '	
									 + ' \\"MarketType\\": \\"' + marketType + '\\", '	// '0'：一般交易時段行情；'1'；盤後交易時段行情。
									 + ' \\"PageNo\\": \\"\\", '
									 // + ' \\"RowSize\\": \\"全部\\", '	// 中文字傳輸問題？！
									 + ' \\"SortColumn\\": \\"\\", '
									 + ' \\"SymbolType\\": \\"O\\" }';
			process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteListOption"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData + '"');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			return result;
		}
		
		var result = {};
		
		var marketType = '0';
		
		var index;
		
		var arrQuoteList;
		
		var arrOptionCall = new Array();
		var arrOptionPut = new Array();
		
		if (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) marketType = '1';	// '0'：一般交易時段行情；'1'；盤後交易時段行情。
		
		arrQuoteList = JSON.parse(getData(productCode, conMonth, marketType))["RtData"]["QuoteList"];
		
		for (index = 0; index < arrQuoteList.length; index++) {
		
			if (arrQuoteList[index]["CP"] == 'C') {

				vo = new tw.ace33022.vo.OptionCallTrnLog();
				
				vo.setProductCode(productCode);
				vo.setConMonth(conMonth);
				vo.setTrnDate(arrQuoteList[index]["CDate"]);
				vo.setStrikePrice(arrQuoteList[index]["StrikePrice"]);
				vo.setOpenPrice(arrQuoteList[index]["COpenPrice"]);
				vo.setHighPrice(arrQuoteList[index]["CHighPrice"]);
				vo.setLowPrice(arrQuoteList[index]["CLowPrice"]);
				vo.setClosePrice(arrQuoteList[index]["CLastPrice"]);
				vo.setLastCalPrice(arrQuoteList[index]["CLastPrice"]);
				vo.setTrnQty(arrQuoteList[index]["CTotalVolume"]);
				vo.setStayQty(arrQuoteList[index]["OpenInterest"]);
				vo.setBestAskPrice(arrQuoteList[index]["CBestAskPrice"]);
				vo.setBestAskQty(arrQuoteList[index]["CBestAskSize"]);
				vo.setBestBidPrice(arrQuoteList[index]["CBestBidPrice"]);
				vo.setBestBidQty(arrQuoteList[index]["CBestBidSize"]);
				
				arrOptionCall.push(vo);
			}
			else if (arrQuoteList[index]["CP"] == 'P') {
			
				vo = new tw.ace33022.vo.OptionPutTrnLog();
				
				vo.setProductCode(productCode);
				vo.setConMonth(conMonth);
				vo.setTrnDate(arrQuoteList[index]["CDate"]);
				vo.setStrikePrice(arrQuoteList[index]["StrikePrice"]);
				vo.setOpenPrice(arrQuoteList[index]["COpenPrice"]);
				vo.setHighPrice(arrQuoteList[index]["CHighPrice"]);
				vo.setLowPrice(arrQuoteList[index]["CLowPrice"]);
				vo.setClosePrice(arrQuoteList[index]["CLastPrice"]);
				vo.setLastCalPrice(arrQuoteList[index]["CLastPrice"]);
				vo.setTrnQty(arrQuoteList[index]["CTotalVolume"]);
				vo.setStayQty(arrQuoteList[index]["OpenInterest"]);
				vo.setBestAskPrice(arrQuoteList[index]["CBestAskPrice"]);
				vo.setBestAskQty(arrQuoteList[index]["CBestAskSize"]);
				vo.setBestBidPrice(arrQuoteList[index]["CBestBidPrice"]);
				vo.setBestBidQty(arrQuoteList[index]["CBestBidSize"]);
				
				arrOptionPut.push(vo);
			}
		}
		
		result["call"] = new Array();
		result["put"] = new Array();
		
		for (index = 0; index < arrOptionCall.length; index++) result["call"].push(arrOptionCall[index].toJSONObject());
		for (index = 0; index < arrOptionPut.length; index++) result["put"].push(arrOptionPut[index].toJSONObject());
		
		// return getData(productCode, conMonth, marketType);
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description getAllOptionRealTimeTrnLog
	 *
	 * @param productCode 商品編號。
	 *
	 * @version 2021/02/02 ace Initial
	 *
	 * @author ace
	 *  
	 */
	function getAllOptionRealTimeTrnLog(productCode) {
	
		function getData_1(productCode) {
		
			var result = {};
		
			var arrConMonth = JSON.parse(getConMonth());
			
			var index;
			
			var quoteList;
			
			result["call"] = new Array();
			result["put"] = new Array();
			
			for (index = 0; index < arrConMonth.length; index++) {
			
				quoteList = JSON.parse(getOptionRealTimeTrnLog(productCode, arrConMonth[index]));
				
				result["call"] = result["call"].concat(quoteList["call"]);
				result["put"] = result["put"].concat(quoteList["put"]);
			}
			
			return JSON.stringify(result);
		}
		
		function getData_2(productCode) {
		
			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;
			
			// process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://script.google.com/macros/s/AKfycbx1sNI2HiGWuK_o9oFB_JrTHR6saAA1hQ6IvwPkSHBv0mdX5kvWQyneDX_AGXwxJyl3/exec"' + ' -k -L ');
			process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://script.google.com/macros/s/AKfycbz9p6eDD50vIILu3_i_ehXPrDmNgzMkuCdDvMLbGQDST6UoaEiAZHh7E2ZEXuTQsuef/exec"' + ' -k -L ');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			return result;
		}
		
		// return getData_1(productCode);
		return getData_2(productCode);
	}
	 
	/**
	 *
	 * @description getOpportunityOption
	 *
	 * @param data 選擇權交易資料。
	 *
	 * @version 2021/02/22 ace Initial
	 *
	 * @author ace
	 *  
	 */
	function getOpportunityOption(optionTrnData) {
	
		var result = {};
	
		var trnData = JSON.parse(optionTrnData);
		
		var index;
		
		var vo;
		
		// result["call"] = new Array();
		// result["put"] = new Array();
		
		for (index = 0; index < trnData["call"]; index++) {
		
			vo = new tw.ace33022.vo.OptionCallTrnLog();
		
			// quoteList = JSON.parse(getOptionTrnLog(productCode, arrConMonth[index]));
			
			// result["call"] = result["call"].concat(quoteList["call"]);
			// result["put"] = result["put"].concat(quoteList["put"]);
		}
		
		return JSON.stringify(result);
	}
	
	if (typeof define === 'function') {
	
		define([], function() { 
		
			return {
  
				getCurrentTaifexCloseDate: getCurrentTaifexCloseDate,
				getTWSEPoint: getTWSEPoint,
				getFuturePoint: getFuturePoint,
				getConMonth: getConMonth,
				getOptionRealTimeTrnLog: getOptionRealTimeTrnLog,
				getAllOptionRealTimeTrnLog: getAllOptionRealTimeTrnLog
			}
		});
	}
	else if (typeof exports !== 'undefined') {
	
		module.exports = getCurrentTaifexCloseDate;
		module.exports = getTWSEPoint;
		module.exports = getFuturePoint;
		module.exports = getConMonthData;
		module.exports = getOptionRealTimeTrnLog;
		module.exports = getAllOptionRealTimeTrnLog;
	}
	else {
	
		if (typeof root.tw.ace33022.util.StockUtil == 'undefined') root.tw.ace33022.util.StockUtil = {};
		
		root.tw.ace33022.util.StockUtil.getCurrentTaifexCloseDate = getCurrentTaifexCloseDate;
		root.tw.ace33022.util.StockUtil.getTWSEPoint = getTWSEPoint;
		root.tw.ace33022.util.StockUtil.getFuturePoint = getFuturePoint;
		root.tw.ace33022.util.StockUtil.getConMonth = getConMonth;
		root.tw.ace33022.util.StockUtil.getOptionRealTimeTrnLog = getOptionRealTimeTrnLog;
		root.tw.ace33022.util.StockUtil.getAllOptionRealTimeTrnLog = getAllOptionRealTimeTrnLog;
	}
})(this);