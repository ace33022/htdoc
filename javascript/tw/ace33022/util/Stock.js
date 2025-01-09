/**
 *
 * @description StockUtil
 *
 * @version 2021/02/02 ace Initial
 *
 * @see <a href="https://www.taifex.com.tw/cht/index">臺灣期貨交易所</a>
 *
 * @see <a href="https://mis.taifex.com.tw/futures/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/disclaimer/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/RegularSession/EquityIndices/FuturesDomestic">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/RegularSession/EquityIndices/Options/">臺灣期貨交易所行情資訊網</a>
 * @see <a href="https://mis.taifex.com.tw/futures/AfterHoursSession/EquityIndices/Options/">臺灣期貨交易所行情資訊網</a>
 *
 * @see <a href="https://stackoverflow.com/questions/41383336/curl-doesnt-encode-utf-8">jquery - CURL doesn't encode UTF-8 - Stack Overflow</a>
 * @see <a href="https://stackoverflow.com/questions/6408904/send-request-to-curl-with-post-data-sourced-from-a-file">http - Send request to cURL with post data sourced from a file - Stack Overflow</a>
 * @see <a href="https://stackoverflow.com/questions/7172784/how-do-i-post-json-data-with-curl">rest - How do I POST JSON data with cURL? - Stack Overflow</a>
 *
 * @author ace
 *
 */

(function(root) {

	// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
	// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
	
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
	
	// var cURLPath = 'W:/tool/package/LangEnv/Java/apache-tomcat/webapps/ROOT/WEB-INF/tool/package/Net/curl/bin/curl.exe';
	var cURLPath = 'T:/package/net/curl/bin/curl.exe';
	
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
	function getMarketType() {
	
		var result = '0';
		
		if (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) result = '1';
		
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
	 */
	function getCurrTaifexMYCode() {
	
		var date = new Date();
		
		date > tw.ace33022.util.DateTimeUtil.doDateTimeStringToDateTime(getCurrentTaifexCloseDate()) && date.setMonth(date.getMonth() + 1);
		
		return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"][date.getMonth()] + ('' + date.getFullYear())[3];
	}
	
	/**
	 *
	 * @description 取得當前期貨結算日期。
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
		
		Logger.debug('firstWeekBeforeDays: ' + firstWeekBeforeDays);	// 周三之前的天數。

		date.setDate(date.getDate() + 14 + firstWeekBeforeDays);
		
		Logger.debug('date: ' + date);
		
		// m = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 14, 30, 0), 
		return tw.ace33022.util.DateTimeUtil.doDateTimeToDateTimeString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0));
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
	function getConMonth() {
	
		function getData_1() {

			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;

			// 採用curl傳送資料時，因為命令列模式的編碼未必符合指定的編碼，造成傳送的資料格式錯誤的狀況。
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"RowSize\\": \\"全部\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"F\\" } ';
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"F\\" } ';
									 
			// Logger.debug('postData: ' + postData);

			process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '--data-binary' + ' ' + '"@K:/JavaScript/Rhino/EXA92100/doc/mis.taifex.com.tw/getCmdyMonthDDLItemByKindPostData.json"');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			Logger.debug('result: ' + result);
			
			return result;
		}
		
		function getData_2() {

			var result = '{}';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;

			// 採用curl傳送資料時，因為命令列模式的編碼未必符合指定的編碼，造成傳送的資料格式錯誤的狀況。
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"RowSize\\": \\"全部\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"F\\" } ';
			
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"TXF\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"F\\" } ';
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"TXO\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"O\\" } ';
			
			var postData;
			
			if (arguments.length != 0) {
			
				Logger.debug('arguments[0]: ' + arguments[0]);
				
				postData = '{ ' + '\\"AscDesc\\": \\"A\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\"' + ', \\"MarketType\\": \\"' + getMarketType() + '\\"' + ', \\"CID\\": \\"' + arguments[0] + '\\"' + ', \\"SymbolType\\": \\"' + arguments[0].substring(arguments[0].length - 1) + '\\"' + ' }';
				
				Logger.debug('postData: ' + postData);
				
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData + '"');
				
				result = '';
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
			}
			
			return result;
		}
		
		var result = new Array();
		
		// var arrConMonth = JSON.parse(getData_1())["RtData"]["Items"];
		var arrConMonth = JSON.parse(getData_2.apply(null, arguments))["RtData"]["Items"];
		var index;
		
		for (index = 0; index < arrConMonth.length; index++) {
		
			if (arrConMonth[index]["item"] != '現貨') result.push(arrConMonth[index]["item"]);
		}
		
		Logger.debug('result: ' + result);
		Logger.debug('JSON.stringify(result): ' + JSON.stringify(result));
		
		return JSON.stringify(result);
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
	 */
	function getQuoteDetail(postData) {
	
		function getData_1() {
		
			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;
			
			// logger.debug('postData: ' + postData);
			// logger.debug('for curl post data: ' + postData.replace(/"/g, '\\"'));
			Logger.debug('postData: ' + postData);
			Logger.debug('for curl post data: ' + postData.replace(/"/g, '\\"'));
			
			process = Packages.java.lang.Runtime.getRuntime().exec(cURLPath + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteDetail"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData.replace(/"/g, '\\"') + '"');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			return result;
		}
		
		var result = getData_1();
		
		if (result == '') result = '{}';
		
		return result;
	}

	/**
	 *
	 * @description getSAndFQuoteDetail
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
	function getSAndNearestFQuoteDetail(productCode) {
	
		var sendData = { "SymbolID": [] };
		
		sendData["SymbolID"].push(productCode + '-S');
		
		if (getMarketType() == '0') {
		
			sendData["SymbolID"].push(productCode + getCurrTaifexMYCode() + '-F');	// 一般交易時段行情。
		}
		else {
		
			sendData["SymbolID"].push(productCode + getCurrTaifexMYCode() + '-M');	// 盤後交易時段行情。
		}
		
		return getQuoteDetail(JSON.stringify(sendData));
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
	 * @comment 2022/08/10 ace "TXO": 台指選。
	 *                         "TFO": 金指選。
	 *                         "TEO": 電指選。
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
	 
	if (typeof define === 'function') {
	
		define([], function() { 
		
			return {
  
				getMarketType: getMarketType,
				getCurrTaifexMYCode: getCurrTaifexMYCode,
				getCurrentTaifexCloseDate: getCurrentTaifexCloseDate,
				getConMonth: getConMonth,
				getSAndNearestFQuoteDetail: getSAndNearestFQuoteDetail,
				getOptionRealTimeTrnLog: getOptionRealTimeTrnLog,
				getAllOptionRealTimeTrnLog: getAllOptionRealTimeTrnLog
			}
		});
	}
	else if (typeof exports !== 'undefined') {
	
		module.exports = getMarketType;
		module.exports = getCurrTaifexMYCode;
		module.exports = getCurrentTaifexCloseDate;
		module.exports = getConMonth;
		module.exports = getSAndNearestFQuoteDetail;
		module.exports = getOptionRealTimeTrnLog;
		module.exports = getAllOptionRealTimeTrnLog;
	}
	else {
	
		if (typeof root.tw.ace33022.util.StockUtil == 'undefined') root.tw.ace33022.util.StockUtil = {};
		
		root.tw.ace33022.util.StockUtil.getMarketType = getMarketType;
		root.tw.ace33022.util.StockUtil.getCurrTaifexMYCode = getCurrTaifexMYCode;
		root.tw.ace33022.util.StockUtil.getCurrentTaifexCloseDate = getCurrentTaifexCloseDate;
		root.tw.ace33022.util.StockUtil.getConMonth = getConMonth;
		root.tw.ace33022.util.StockUtil.getSAndNearestFQuoteDetail = getSAndNearestFQuoteDetail;
		root.tw.ace33022.util.StockUtil.getOptionRealTimeTrnLog = getOptionRealTimeTrnLog;
		root.tw.ace33022.util.StockUtil.getAllOptionRealTimeTrnLog = getAllOptionRealTimeTrnLog;
	}
})(this);