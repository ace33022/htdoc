/**
 *
 * @description Stock
 *
 * @version 2021/02/02 ace Initialize
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

	if (typeof load != 'undefined') {
	
		// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
		// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
		
		load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.functions.Datetime"] + '.js');
		
		load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
		load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
	}
	
	// var cURLPath = 'T:/package/net/curl/bin/curl.exe';
	// var cURLPath = tw.ace33022.DefaultConfiguration.getCURLExeFile();
	
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
		
		date > tw.ace33022.functions.Datetime.doDatetimeStringToDatetime(getCurrentTaifexCloseDate()) && date.setMonth(date.getMonth() + 1);
		
		return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"][date.getMonth()] + ('' + date.getFullYear())[3];
	}
	
	/**
	 *
	 * @description 取得當前期貨結算日期。
	 *
	 * @return String Datetime String。
	 *
	 * @version 2021/03/14 ace Initial
	 *
	 * @author ace
	 *
	 * @comment 2021/03/14 ace https://mis.taifex.com.tw/futures/_nuxt/8dcb1df.js
	 *
	 */
	function getCurrentTaifexCloseDate() {
	
		var result;
	
		var date = new Date();
		
		var cal;
		var firstWeekBeforeDays = 0;
		
		console.log('arguments.length: ' + arguments.length);
		
		if (arguments.length != 0) {
		
			date = tw.ace33022.functions.Datetime.doDateStringToDatetime(arguments[0]);
		}
		
		result = tw.ace33022.functions.Datetime.doDatetimeToDatetimeString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0));
		
		date.setDate(1);
		
		console.log('date(1): ' + date);
		console.log('date(1).getDay(): ' + date.getDay());
		
		// n = (e = 0 == (f = new Date(d.getTime())).getDay() ? 7 : f.getDay()) < 3 ? 3 - e : 7 - (e - 3);
		// n += 14, 
		firstWeekBeforeDays = (cal = 0 == date.getDay() ? 7 : date.getDay()) <= 3 ? 3 - cal : 7 - (cal - 3);
		
		console.log('firstWeekBeforeDays: ' + firstWeekBeforeDays);	// 周三之前的天數。

		date.setDate(date.getDate() + 14 + firstWeekBeforeDays);
		
		console.log('date: ' + date);
		
		// m = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 14, 30, 0) 
		result = tw.ace33022.functions.Datetime.doDatetimeToDatetimeString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30, 0));
		
		if (tw.ace33022.functions.Datetime.doDatetimeStringToDatetime(result) < (new Date())) {
		
			// 超過本月份結算日期時間則取下月份結算日期時間。
			// result = getCurrentTaifexCloseDate(tw.ace33022.functions.Datetime.doDatetimeToDateString(new Date(date.getFullYear(), date.getMonth() + 1, 1)));
		}
		
		return result;
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

			var result = '{}';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;

			// 採用curl傳送資料時，因為命令列模式的編碼未必符合指定的編碼，造成傳送的資料格式錯誤的狀況。
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"RowSize\\": \\"全部\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"F\\" } ';
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"TXF\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"F\\" } ';
			// var postData = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"TXO\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"O\\" } ';
			
			var payload;
			
			logger.debug('arguments.length: ' + arguments.length);
			
			if (arguments.length != 0) {
			
        logger.debug('arguments[0]: ' + arguments[0]);
				
				payload = '{ ' + '\\"AscDesc\\": \\"A\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\"' + ', \\"MarketType\\": \\"' + getMarketType() + '\\"' + ', \\"CID\\": \\"' + arguments[0] + '\\"' + ', \\"SymbolType\\": \\"' + arguments[0].substring(arguments[0].length - 1) + '\\"' + ' }';
				
				logger.debug('payload: ' + payload);
				
				// process = Packages.java.lang.Runtime.getRuntime().exec(Configuration.getCURLExeFile() + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '--data-binary' + ' ' + '"@K:/JavaScript/Rhino/EXA92100/doc/mis.taifex.com.tw/getCmdyMonthDDLItemByKindPostData.json"');
				process = Packages.java.lang.Runtime.getRuntime().exec(Configuration.getCURLExeFile() + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + payload + '"');
				
				result = '';
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
			}
			
			logger.debug('result: ' + result);
			
			return result;
		}
		
		function getData_2() {

			var result = '{}';
			
      var payload = {

        "AscDesc": "A",
        "ExpireMonth": "",
        "KindID": "1",
        "PageNo": "",
        "SortColumn": "",
				"MarketType": getMarketType()
      };

      var options = {

        "method": "post",
        "contentType": "application/json;charset=UTF-8",
        "userAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
      };

      var httpResponse;

      console.log('arguments.length: ' + arguments.length);
			
			if (arguments.length != 0) {
			
        console.log('arguments[0]: ' + arguments[0]);

        payload["CID"] = arguments[0];
        payload["SymbolType"] = arguments[0].substring(arguments[0].length - 1);
				
        options["payload"] = JSON.stringify(payload);

				console.log('payload: ' + options["payload"]);

			  httpResponse = UrlFetchApp.fetch('https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind', options);
		
        if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();
			}

			return result;
		}
		
		var result = {
		
			"con_month": []
		};
		
		var arrayConMonth = new Array();
		
		console.log(tw.ace33022.DefaultConfiguration.isGoogleAppsScriptPlatform());
		
		if (typeof Packages != 'undefined') {
		
			arrayConMonth = JSON.parse(getData_1.apply(null, arguments))["RtData"]["Items"];
		}
		else if (tw.ace33022.DefaultConfiguration.isGoogleAppsScriptPlatform()) {
		
			arrayConMonth = JSON.parse(getData_2.apply(null, arguments))["RtData"]["Items"];
		}
		else {
		}
		
		arrayConMonth.forEach(function(element, index) {
		
			if (element["item"] != '現貨') result["con_month"].push(element["item"]);
		});
		
		console.log('JSON.stringify(result): ' + JSON.stringify(result));
		
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
	
		function getData_1(postData) {
		
			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;
			
			// logger.debug('postData: ' + postData);
			// logger.debug('for curl post data: ' + postData.replace(/"/g, '\\"'));
			console.log('postData: ' + postData);
			console.log('for curl post data: ' + postData.replace(/"/g, '\\"'));
			
			process = Packages.java.lang.Runtime.getRuntime().exec(tw.ace33022.DefaultConfiguration.getCURLExeFile() + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteDetail"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData.replace(/"/g, '\\"') + '"');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			return result;
		}
		
		function getData_2(postData) {
		
			var result = '';
			
      var option = {

        "method": "post",
        "contentType": "application/json;charset=UTF-8",
        "userAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
      };

      var httpResponse;
			
			console.log('postData: ' + postData);

      option["payload"] = postData;

      httpResponse = UrlFetchApp.fetch('https://mis.taifex.com.tw/futures/api/getQuoteDetail', option);

      if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();
			
			return result;
		}
		
		var result = '';
		
		if (typeof UrlFetchApp != 'undefined') {
		
			result = getData_2(postData);
		}
		else {
		
			result = getData_1(postData);
		}
		
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
	
		var sendData = {"SymbolID": []};
		
		if (getMarketType() == '0') {

			sendData["SymbolID"].push(productCode + '-S');
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
	
		function getData_1(productCode, conMonth, marketType) {
		
			var result = '';
			
			var errorMessage = '';

			var inputBufferedReader, errorBufferedReaded;
			var temp;
			
			var payload = '{\\"AscDesc\\": \\"A\\", '
								  + ' \\"CID\\": \\"' + productCode + '\\", '
									+ ' \\"ExpireMonth\\": \\"' + conMonth + '\\", '
									+ ' \\"KindID\\": \\"1\\", '	
									+ ' \\"MarketType\\": \\"' + marketType + '\\", '	// '0'：一般交易時段行情；'1'；盤後交易時段行情。
									+ ' \\"PageNo\\": \\"\\", '
									// + ' \\"RowSize\\": \\"全部\\", '	// 中文字傳輸問題？！
									+ ' \\"SortColumn\\": \\"\\", '
									+ ' \\"SymbolType\\": \\"O\\" }';
			var process = Packages.java.lang.Runtime.getRuntime().exec(tw.ace33022.DefaultConfiguration.getCURLExeFile() + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteListOption"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + payload + '"');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			// logger.debug(result);
			
			return result;
		}
		
		function getData_2(productCode, conMonth, marketType) {
		
			var result = JSON.stringify({});
			
      var options = {

        "method": "post",
        "contentType": "application/json;charset=UTF-8",
        "userAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
      };

      options["payload"] = JSON.stringify({
			
				"AscDesc": "A",
				"CID": productCode,
				"ExpireMonth": conMonth,
				"KindID": "1",
				"MarketType": marketType,
				"PageNo": "",
				"SortColumn": "",
				"SymbolType": "0"
			});

      // console.log(options);

      httpResponse = UrlFetchApp.fetch('https://mis.taifex.com.tw/futures/api/getQuoteListOption', options);

      // console.log(httpResponse);

      if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();
			
			return result;
		}
		
		var result = {
		
			"call": new Array(),
			"put": new Array()
		};
		
		var arrayQuoteList = new Array();
		
		var index;
		
		if (typeof Packages != 'undefined') {
		
			arrayQuoteList = JSON.parse(getData_1(productCode, conMonth, getMarketType()))["RtData"]["QuoteList"];
		}
		else if (tw.ace33022.DefaultConfiguration.isGoogleAppsScriptPlatform()) {
		
			arrayQuoteList = JSON.parse(getData_2(productCode, conMonth, getMarketType()))["RtData"]["QuoteList"];
		}
		
		for (index = 0; index < arrayQuoteList.length; index++) {
		
			if (arrayQuoteList[index]["CP"] == 'C') {

				vo = new tw.ace33022.vo.OptionCallTrnLog();
				
				vo.setProductCode(productCode);
				vo.setConMonth(conMonth);
				vo.setTrnDate(arrayQuoteList[index]["CDate"]);
				vo.setStrikePrice(arrayQuoteList[index]["StrikePrice"]);
				vo.setOpenPrice(arrayQuoteList[index]["COpenPrice"]);
				vo.setHighPrice(arrayQuoteList[index]["CHighPrice"]);
				vo.setLowPrice(arrayQuoteList[index]["CLowPrice"]);
				vo.setClosePrice(arrayQuoteList[index]["CLastPrice"]);
				vo.setLastCalPrice(arrayQuoteList[index]["CLastPrice"]);
				vo.setTrnQty(arrayQuoteList[index]["CTotalVolume"]);
				vo.setStayQty(arrayQuoteList[index]["OpenInterest"]);
				vo.setBestAskPrice(arrayQuoteList[index]["CBestAskPrice"]);
				vo.setBestAskQty(arrayQuoteList[index]["CBestAskSize"]);
				vo.setBestBidPrice(arrayQuoteList[index]["CBestBidPrice"]);
				vo.setBestBidQty(arrayQuoteList[index]["CBestBidSize"]);
				
				result["call"].push(vo.toJSONObject());
			}
			else if (arrayQuoteList[index]["CP"] == 'P') {
			
				vo = new tw.ace33022.vo.OptionPutTrnLog();
				
				vo.setProductCode(productCode);
				vo.setConMonth(conMonth);
				vo.setTrnDate(arrayQuoteList[index]["CDate"]);
				vo.setStrikePrice(arrayQuoteList[index]["StrikePrice"]);
				vo.setOpenPrice(arrayQuoteList[index]["COpenPrice"]);
				vo.setHighPrice(arrayQuoteList[index]["CHighPrice"]);
				vo.setLowPrice(arrayQuoteList[index]["CLowPrice"]);
				vo.setClosePrice(arrayQuoteList[index]["CLastPrice"]);
				vo.setLastCalPrice(arrayQuoteList[index]["CLastPrice"]);
				vo.setTrnQty(arrayQuoteList[index]["CTotalVolume"]);
				vo.setStayQty(arrayQuoteList[index]["OpenInterest"]);
				vo.setBestAskPrice(arrayQuoteList[index]["CBestAskPrice"]);
				vo.setBestAskQty(arrayQuoteList[index]["CBestAskSize"]);
				vo.setBestBidPrice(arrayQuoteList[index]["CBestBidPrice"]);
				vo.setBestBidQty(arrayQuoteList[index]["CBestBidSize"]);
				
				result["put"].push(vo.toJSONObject());
			}
		}
		
		return JSON.stringify(result);
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getMarketType: getMarketType,
				getCurrTaifexMYCode: getCurrTaifexMYCode,
				getCurrentTaifexCloseDate: getCurrentTaifexCloseDate,
				getConMonth: getConMonth,
				getSAndNearestFQuoteDetail: getSAndNearestFQuoteDetail,
				getOptionRealTimeTrnLog: getOptionRealTimeTrnLog
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getMarketType;
		module.exports = getCurrTaifexMYCode;
		module.exports = getCurrentTaifexCloseDate;
		module.exports = getConMonth;
		module.exports = getSAndNearestFQuoteDetail;
		module.exports = getOptionRealTimeTrnLog;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Stock == 'undefined') root.tw.ace33022.functions.Stock = {};
		
		root.tw.ace33022.functions.Stock.getMarketType = getMarketType;
		root.tw.ace33022.functions.Stock.getCurrTaifexMYCode = getCurrTaifexMYCode;
		root.tw.ace33022.functions.Stock.getCurrentTaifexCloseDate = getCurrentTaifexCloseDate;
		root.tw.ace33022.functions.Stock.getConMonth = getConMonth;
		root.tw.ace33022.functions.Stock.getSAndNearestFQuoteDetail = getSAndNearestFQuoteDetail;
		root.tw.ace33022.functions.Stock.getOptionRealTimeTrnLog = getOptionRealTimeTrnLog;
	}
})(this);