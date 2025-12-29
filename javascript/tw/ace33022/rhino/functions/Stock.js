/**
 *
 * @description Stock
 *
 * @version 2021/02/02 ace Initialize.
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

	// if (typeof tw.ace33022.functions.Datetime == 'undefined') load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.functions.Datetime"] + '.js');
	
	// var cURLPath = 'T:/package/net/curl/bin/curl.exe';
	// var cURLPath = tw.ace33022.DefaultConfiguration.getCURLExeFile();
	// var cURLFile = tw["ace33022"]["Configuration"]["workDir"] + '/tool/package/net/curl/bin/curl.exe';
	var cURLExeFile = tw["ace33022"]["Configuration"]["workDir"] + '/tool/package/net/curl/bin/curl.exe';
	
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

		function getHTML(url) {
		
			function method01(url) {
			
				var result = '';
			
				var httpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				// var httpClient = Packages.tw.ace33022.functions.Net.getAllHostValidCloseableHttpClient();
				var response = httpClient.execute(new Packages.org.apache.http.client.methods.HttpGet(url));
				
				var bufferedReader;
				var temp;
			
				if (response.getEntity() == null) throw new Error('Get null TWSEDayTrnLog HttpEntity');
				
				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
				while ((temp = bufferedReader.readLine()) != null) result += temp;
				
				return result;
			}
			
			function method02(url) {
			
				var result = '';
				
				var temp;
				var httpUrlConnection;
				var inputStream, bufferedReader;
				
				try {
				
					httpUrlConnection = (new Packages.java.net.URL(url)).openConnection();
					
					httpUrlConnection.setDoOutput(true); 
					httpUrlConnection.setDoInput(true);
					
					httpUrlConnection.setRequestMethod("GET");
					httpUrlConnection.connect();
					
					inputStream = httpUrlConnection.getInputStream();
					if (httpUrlConnection.getResponseCode() >= 400) inputStream = httpUrlConnection.getErrorStream();  

					bufferedReader = new Packages.java.io.BufferedReader((new Packages.java.io.InputStreamReader(inputStream)));
					while ((temp = bufferedReader.readLine()) != null) result += temp;
				}
				finally {
				
					if (httpUrlConnection != null) httpUrlConnection.disconnect();
				}
				
				return result;
			}
			
			function method03(url) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
				
				return result;
			}
			
			// return method01(url);
			// return method02(url);
			return method03(url);
		}
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": {}
		};
		
		try {
		
			if (typeof tw.ace33022.vo.TWSEDayTrnLog == 'undefined')	load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.TWSEDayTrnLog"] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.dao.db.vo.TWSEDayTrnLog"] + '.js');

			var vo = new tw.ace33022.vo.TWSEDayTrnLog();
			// var dao = new tw.ace33022.dao.db.vo.TWSEDayTrnLog(conn);
			
			var url;
			
			var year = new String(trnDate.substr(0, 4));
			var month = new String(trnDate.substr(4, 2));
			var day = new String(trnDate.substr(6, 2));
			var cyear = new String(parseInt(year) - 1911);
			
			var arrData;
			var index;
			
			// 市場成交資訊
			// var url = 'http://www.twse.com.tw/ch/trading/exchange/FMTQIK/genpage/Report' + year + month + '/' + year + month + '_F3_1_2.php?STK_NO=&myear=' + year + '&mmon=' + month;
			
			// http://www.twse.com.tw/ch/trading/exchange/FMTQIK/FMTQIK.php
			// http://www.twse.com.tw/zh/page/trading/exchange/FMTQIK.html
			
			// var url = 'http://www.twse.com.tw/exchangeReport/FMTQIK?response=json&date=' + trnDate;
			url = 'https://www.twse.com.tw/exchangeReport/FMTQIK?response=json&date=' + trnDate;
			
			vo.setTrnDate(trnDate);
			
			arrData = (JSON.parse(getHTML(url)))["data"];
			for (index = 0; index < arrData.length; index++) {
			
				if ((cyear + month + day) == (new String(arrData[index][0])).replace(new RegExp('/', 'gm'), '')) {
				
					vo.setTrnTotal((new String(arrData[index][2])).replace(new RegExp(',', 'gm'), '')); // 成交金額
					
					break;
				}
			}
			
			// 加權股價指數
			// http://www.twse.com.tw/ch/trading/indices/MI_5MINS_HIST/MI_5MINS_HIST.php
			
			// http://www.twse.com.tw/zh/page/trading/indices/MI_5MINS_HIST.html
			// http://www.twse.com.tw/indicesReport/MI_5MINS_HIST?response=json&date=20170526&_=1495986783388
			
			// url = 'http://www.twse.com.tw/indicesReport/MI_5MINS_HIST?response=json&date=' + trnDate;
			url = 'https://www.twse.com.tw/indicesReport/MI_5MINS_HIST?response=json&date=' + trnDate;
			
			arrData = (JSON.parse(getHTML(url)))["data"];
			for (index = 0; index < arrData.length; index++) {
			
				if ((cyear + month + day) == (new String(arrData[index][0])).replace(new RegExp('/', 'gm'), '')) {
				
					// vo.setOpenPoint((new String(arrData[index][1])).replace(new RegExp(',', 'gm'), ''));  // 開盤指數
					// vo.setHighPoint((new String(arrData[index][2])).replace(new RegExp(',', 'gm'), ''));  // 最高指數
					// vo.setLowPoint((new String(arrData[index][3])).replace(new RegExp(',', 'gm'), ''));   // 最低指數
					// vo.setClosePoint((new String(arrData[index][4])).replace(new RegExp(',', 'gm'), '')); // 收盤指數
					vo.setOpenPoint(new Number((new String(arrData[index][1])).replace(new RegExp(',', 'gm'), '')));  // 開盤指數
					vo.setHighPoint(new Number((new String(arrData[index][2])).replace(new RegExp(',', 'gm'), '')));  // 最高指數
					vo.setLowPoint(new Number((new String(arrData[index][3])).replace(new RegExp(',', 'gm'), '')));   // 最低指數
					vo.setClosePoint(new Number((new String(arrData[index][4])).replace(new RegExp(',', 'gm'), ''))); // 收盤指數
					
					break;
				}
			}
			
			// print('TrnDate:' + vo.getTrnDate() + ', ' + 'TrnTotal:' + vo.getTrnTotal() + ', ' + 'OpenPoint: ' + vo.getOpenPoint() + ', ' + 'HighPoint:' + vo.getHighPoint() + ', ' + 'LowPoint:' + vo.getLowPoint());
			// print(vo.toJSONString());
			
			// dao.doDeleteByTrnDate(trnDate);
			// dao.doInsert(vo);
			
			result["data"] = vo.toJSONObject();
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
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

		function getHTML(trnDate) {
		
			function method01(url) {
			
				var result;
			
				var httpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				var response = httpClient.execute(new Packages.org.apache.http.client.methods.HttpGet(url));
				
				var bufferedReader;
				var temp;
				
				if (response.getEntity() == null) throw new Error('Get null FoundationAmountDayTrnLog HttpEntity');

				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
				while ((temp = bufferedReader.readLine()) != null) result += temp;
				
				return result;
			}
			
			function method02(url) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
				
				return result;
			}
			
			// var url = new String('http://www.twse.com.tw/ch/trading/fund/BFI82U/BFI82U.php');
			
			// http://www.twse.com.tw/zh/page/trading/fund/BFI82U.html
			// http://www.twse.com.tw/fund/BFI82U?response=json&dayDate=20170525&weekDate=20170522&monthDate=20170526&type=day&_=1495991066006
			// var url = new String('http://www.twse.com.tw/fund/BFI82U?response=json&dayDate=' + trnDate);
			// var url = new String('https://www.twse.com.tw/fund/BFI82U?response=json&dayDate=' + trnDate);
			
			// return method01(new String('https://www.twse.com.tw/fund/BFI82U?response=json&dayDate=' + trnDate));
			return method02(new String('https://www.twse.com.tw/fund/BFI82U?response=json&dayDate=' + trnDate));
		}

		var result = {
		
			"code": 0,
			"message": "",
			"data": {}
		};
		
		try {

			if (typeof tw.ace33022.vo.FoundationAmountDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.vo.FoundationAmountDayTrnLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.FoundationAmountDayTrnLog'] + '.js');
			
			var vo = new tw.ace33022.vo.FoundationAmountDayTrnLog();
			// var dao = new tw.ace33022.dao.db.vo.FoundationAmountDayTrnLog(conn);
			
			var arrData;
			var index;
			
			var buyTotal;
			var sellTotal;
			
			vo.setTrnDate(trnDate);
			
			arrData = (JSON.parse(getHTML(trnDate)))["data"];
			for (index = 0; index < arrData.length; index++) {

				buyTotal = parseInt((new String(arrData[index][1])).replace(new RegExp(',', 'gm'), ''));
				sellTotal = parseInt((new String(arrData[index][2])).replace(new RegExp(',', 'gm'), ''));
				
				if (index == 0) {	
					
					// 自營商(自行買賣)
					vo.setDealerBuy(buyTotal);
					vo.setDealerSell(sellTotal);
				}
				else if (index == 1) {	
				
					// 自營商(避險)
					vo.setDealerHedgeBuy(buyTotal);
					vo.setDealerHedgeSell(sellTotal);
				}
				else if (index == 2) {	
				
					// 投信
					vo.setInvestBuy(buyTotal);
					vo.setInvestSell(sellTotal);
				}
				else if (index == 3) {	
				
					// 外資及陸資
					vo.setForeignBuy(buyTotal);
					vo.setForeignSell(sellTotal);
				}
			}
			
			// dao.doDeleteByTrnDate(trnDate);
			// dao.doInsert(vo);
			
			result["data"] = vo.toJSONObject();
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
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

		/**
		 *
		 * @description getHTML
		 *
		 * @version 2020/04/16 ace 新增函數DealWithForeignHandedStocksLogs()取得外資及陸資持股資料。
		 *
		 * @author ace
		 *
		 * @see <a href="https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/536723/">由json字串生成json物件時的轉義問題 | 程式前沿</a>
		 * @see <a href="https://coder.tw/?p=7258">JavaScript String Replace All – 碼人日誌</a>
		 *
		 */
		function getHTML(trnDate) {
		
			function method01(url) {
			
				var result;
			
				var httpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				var response = httpClient.execute(new Packages.org.apache.http.client.methods.HttpGet(url));
				
				var bufferedReader;
				var temp;
				
				if (response.getEntity() == null) throw new Error('Get null ForeignHandedStockLog HttpEntity');

				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
				while ((temp = bufferedReader.readLine()) != null) result += temp;
				
				return result;
			}
			
			function method02(url) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
				
				return result;
			}
			
			// var url = new String('http://www.twse.com.tw/ch/trading/fund/MI_QFIIS/MI_QFIIS.php');
			
			// http://www.twse.com.tw/fund/MI_QFIIS?response=json&selectType=ALLBUT0999&date=20170525
			var url = new String('https://www.twse.com.tw/fund/MI_QFIIS?response=json&selectType=ALLBUT0999&date=' + trnDate);
			
			return method02(url).replace(/<.*>/g, '');
		}
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": []
		};
		
		try {
			
			load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.ForeignHandedStockLog"] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.ForeignHandedStockLog'] + '.js');

			var vo;
			// var dao = new tw.ace33022.dao.db.vo.ForeignHandedStockLog(conn);
			
			var index;
			var arrData;
			var html;

			// dao.doDeleteByTrnDate(trnDate);
			
			arrData = (JSON.parse(getHTML(trnDate)))["data"];
			for (index = 0; index < arrData.length; index++) {
			
				vo = new tw.ace33022.vo.ForeignHandedStockLog();
				
				vo.setTrnDate(trnDate);
				vo.setStockCode(new String(arrData[index][0]));
				vo.setPublishedQty(new Number((new String(arrData[index][3])).replace(new RegExp(',', 'gm'), '')));
				vo.setHandedQty(new Number((new String(arrData[index][5])).replace(new RegExp(',', 'gm'), '')));
				
				result["data"].push(vo.toJSONObject());
				
				/*
				try {
					
					dao.doInsert(vo);
				}
				catch (error) {
	 
					// 預防網頁提供之資料重複時造成寫入錯誤之狀況，但不將此例外錯誤再往外拋。
					console.log('證券代號：' + vo.getStockCode() + ' occured write error.');
					
					console.log(error.message); // 寫入過程錯誤訊息改以log檔記錄後再發佈。
				}
				*/
			} 
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
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

		function addVO(result, trnDate, productCode) {
		
			/**
			 *
			 * @description 取得網頁資料
			 *
			 * @version 2020/03/17 ace 初始版本。
			 *
			 * @author ace
			 *
			 */
			function getHTML(trnDate, productCode) {
			
				function method01() {
				
					var result = '';
				
					var HttpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
					var HttpPost = new Packages.org.apache.http.client.methods.HttpPost(url);
					var StringEntity = new Packages.org.apache.http.entity.StringEntity(postData, 'UTF-8');
					var BasicHeader = new Packages.org.apache.http.message.BasicHeader('Content-Type', 'application/x-www-form-urlencoded');
					var HttpResponse;
					
					var bufferedReader;
					
					var temp;
					
					StringEntity.setContentType(BasicHeader);
					HttpPost.setEntity(StringEntity);

					HttpResponse = HttpClient.execute(HttpPost);
					
					if (HttpResponse.getEntity() == null) throw new Error('Get null FutureDayTrnLog HttpEntity');
					
					bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
					while ((temp = bufferedReader.readLine()) != null) result += temp;
					
					return result;
				}
			
				function method02() {
				
					var result = '';
					
					var errorMessage = '';
				
					var process;
					
					var inputBufferedReader, errorBufferedReaded;
					var temp;
					
					// process = Packages.java.lang.Runtime.getRuntime().exec(cURLFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + Packages.java.net.URLEncoder.encode(postData) + '"');
					process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + postData + '"');
					
					inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
					while ((temp = inputBufferedReader.readLine()) != null) result += temp;
					
					errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
					while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
					
					if (process.waitFor() !== 0) throw new Error(errorMessage);
					
					return result;
				}
				
				// var url = new String('http://www.taifex.com.tw/chinese/3/3_1_1.asp');
				// var url = new String('http://www.taifex.com.tw/cht/3/futDailyMarketReport');
				var url = new String('https://www.taifex.com.tw/cht/3/futDailyMarketReport');
				
				var year = trnDate.substr(0, 4);
				var month = trnDate.substr(4, 2);
				var day = trnDate.substr(6, 2);
			
				var postData = 'queryType=2' + '&'
										 + 'marketCode=0' + '&'
										 + 'dateaddcnt=' + '&'
										 + 'commodity_id=' + productCode + '&'
										 + 'commodity_id2=' + '&'
										 + 'commodity_idt=' + productCode + '&'
										 + 'commodity_id2t=' + '&'
										 + 'commodity_id2t2=' + '&'
										 + 'MarketCode=0' + '&'
										 + 'queryDate=' + year + '/' + month + '/' + day;
				
				return method02();
			}
			
			if (typeof tw.ace33022.vo.FutureDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.FutureDayTrnLog"] + '.js');

			var doc;
			var content;
			var trs;
			var tds;
		
			var index;
			var temp;
			var vo;
			
			doc = org.jsoup.Jsoup.parse(getHTML(trnDate, productCode));
			content = doc.getElementsByClass('table_f').get(0);
			trs = content.getElementsByTag('tr');
		
			for (index = 1; index < trs.size(); index++) {
		
				tds = trs.get(index).getElementsByTag('td');
			
				// Java Strings and JavaScript Strings(https://developer.mozilla.org/en-US/docs/Scripting_Java#Java_Strings_and_JavaScript_Strings)
				// 在Rhino環境下，需特別留意使用的String物件是屬於Java或JavaScript，兩種語言對於String之處理方式並不同。由於JavaScript的String物件並無提供函數trim()，所以底下例子直接取用Java的String物件提供之函數trim()處理。
				// temp = new String(tds.get(0).text()); // 建立JavaScript的String物件。
				// temp = tds.get(0).text();             // 建立Java的String物件。
				temp = tds.get(0).text();
				if (temp.trim() == productCode) {
			
					vo = new tw.ace33022.vo.FutureDayTrnLog();
			
					vo.setTrnDate(trnDate);
					vo.setProductCode(productCode);
			
					temp = new String(tds.get(1).text());  // 契約月份
					vo.setConMonth(temp);
			
					temp = tds.get(2).text();
					// 底下的函數replace()語法屬於JavaScript的String物件用法。
					// temp = temp.replace(new RegExp(",", "gm"), "");
					if (temp.trim() != '-') vo.setOpenPoint(parseFloat(temp));

					temp = tds.get(3).text();
					// temp = temp.replace(new RegExp(",", "gm"), "");
					if (temp.trim() != '-') vo.setHighPoint(parseFloat(temp));

					temp = tds.get(4).text();
					// temp = temp.replace(new RegExp(",", "gm"), "");
					if (temp.trim() != '-') vo.setLowPoint(parseFloat(temp));
			
					temp = tds.get(5).text();
					// temp = temp.replace(new RegExp(",", "gm"), "");
					if (temp.trim() != '-') vo.setClosePoint(parseFloat(temp));
			
					temp = tds.get(11).text();
					// temp = temp.replace(new RegExp(",", "gm"), "");
					if (temp.trim() != '-') vo.setLastCalPoint(parseFloat(temp));
			
					temp = new String(tds.get(10).text());
					vo.setTrnQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(12).text());
					vo.setStayQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					result["data"].push(vo.toJSONObject());
				}
			}
		}
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": []
		};
		
		try {
		
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.FutureDayTrnLog'] + '.js');

			// var dao = new tw.ace33022.dao.db.vo.FutureDayTrnLog(conn);
			
			addVO(result, trnDate, 'TX');		// 臺指期貨
			addVO(result, trnDate, 'MTX');	// 小型臺指期貨
			addVO(result, trnDate, 'TE');		// 電子期貨
			addVO(result, trnDate, 'TF');		// 金融期貨
			
			// dao.doDeleteByTrnDate(trnDate); 
			// arrFuture.forEach(function(element) { dao.doInsert(element); });
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(e.message);
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

		function getHTML(trnDate) {
		
			function method01(url, payload) {
			
				var result = '';
			
				var HttpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				var HttpPost = new Packages.org.apache.http.client.methods.HttpPost(url);
				var StringEntity = new Packages.org.apache.http.entity.StringEntity(payload, 'UTF-8');
				var BasicHeader = new Packages.org.apache.http.message.BasicHeader('Content-Type', 'application/x-www-form-urlencoded');
				var HttpResponse;
				
				var temp;
				
				var bufferedReader;

				StringEntity.setContentType(BasicHeader);
				HttpPost.setEntity(StringEntity);
				
				HttpResponse = HttpClient.execute(HttpPost);

				if (HttpResponse.getEntity() == null) throw new Error('Get null FoundationFutureDayTrnLog HttpEntity');

				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
				while ((temp = bufferedReader.readLine()) != null) result += temp;
				
				return result;
			}

			function method02(url, payload) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				// process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + Packages.java.net.URLEncoder.encode(postData) + '"');
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + payload + '"');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
				
				return result;
			}
			
			// var url = new String('http://www.taifex.com.tw/chinese/3/7_12_3.asp');
			// var url = new String('http://www.taifex.com.tw/cht/3/futContractsDate');
			var url = new String('https://www.taifex.com.tw/cht/3/futContractsDate');

			var year = new String(trnDate.substr(0, 4));
			var month = new String(trnDate.substr(4, 2));
			var day = new String(trnDate.substr(6, 2));
			var payload = 'queryType=1' + '&'
									+ 'goDay=' + '&'
									+ 'doQuery=1' + '&'
									+ 'dateaddcnt=' + '&'
									+ 'queryDate=' + year + '/' + month + '/' + day  + '&'
									+ 'commodityId=';

			return method02(url, payload);
		}
		
		function addVO(result, html, trnDate, foundation, productCode) {
		
			
			return this;
		}
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": {
			
				"dealer": [],
				"invest": [],
				"foreign": []
			}
		};
		
		try {

			if (typeof tw.ace33022.vo.ForeignFutureDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.ForeignFutureDayTrnLog"] + '.js');
			if (typeof tw.ace33022.vo.DealerFutureDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.DealerFutureDayTrnLog"] + '.js');
			if (typeof tw.ace33022.vo.InvestFutureDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.InvestFutureDayTrnLog"] + '.js');
					
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.ForeignFutureDayTrnLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.DealerFutureDayTrnLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.InvestFutureDayTrnLog'] + '.js');
			
			// var arrDealerFuture  = new Array();
			// var arrInvestFuture  = new Array();
			// var arrForeignFuture = new Array();
			
			var html = getHTML(trnDate);

			// var dao;

			// 臺股期貨/電子期貨/金融期貨/小型臺指期貨
			["TX", "TE", "TF", "MTX"].forEach(function(productCode) {
			
				["foreign", "dealer", "invest"].forEach(function(foundation) {
				
					var vo;
					
					var doc = Packages.org.jsoup.Jsoup.parse(html);
					// var content = doc.getElementsByTag('table').get(3);
					var content = doc.getElementsByTag('table').get(0);
					var trs = content.getElementsByTag('tr');
					
					var tr = new Number(0);
					
					if (foundation == 'dealer') {
					
						vo = new tw.ace33022.vo.DealerFutureDayTrnLog();
						
						if (productCode == 'TX') tr = 3;        // 臺股期貨
						else if (productCode == 'TE') tr = 6;   // 電子期貨
						else if (productCode == 'TF') tr = 9;   // 金融期貨
						else if (productCode == 'MTX') tr = 12;	// 小型臺指期貨
						
						vo.setTrnDate(trnDate);
						vo.setProductCode(productCode);
						
						// vo.setBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(0).text()).replace(/,/g, '')));         	// 多方交易口數
						// vo.setBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));       	// 多方交易金額
						// vo.setSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));        	// 空方交易口數
						// vo.setSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));      	// 空方交易金額
						// vo.setStayBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(6).text()).replace(/,/g, '')));     	// 未平倉多方交易口數
						// vo.setStayBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));   	// 未平倉多方交易金額
						// vo.setStaySellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));    	// 未平倉空方交易口數
						// vo.setStaySellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));		// 未平倉空方交易金額
						
						vo.setBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));         // 多方交易口數
						vo.setBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));       // 多方交易金額
						vo.setSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(5).text()).replace(/,/g, '')));        // 空方交易口數
						vo.setSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(6).text()).replace(/,/g, '')));      // 空方交易金額
						vo.setStayBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));     // 未平倉多方交易口數
						vo.setStayBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));	// 未平倉多方交易金額
						vo.setStaySellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(11).text()).replace(/,/g, '')));   // 未平倉空方交易口數
						vo.setStaySellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(12).text()).replace(/,/g, '')));	// 未平倉空方交易金額
						
						result["data"]["dealer"].push(vo.toJSONObject());
					}
					else if (foundation == 'invest') {
					
						vo = new tw.ace33022.vo.InvestFutureDayTrnLog();
					
						if (productCode == 'TX') tr = 4;        // 臺股期貨
						else if (productCode == 'TE') tr = 7;   // 電子期貨
						else if (productCode == 'TF') tr = 10;  // 金融期貨
						else if (productCode == 'MTX') tr = 13;	// 小型臺指期貨

						vo.setTrnDate(trnDate);
						vo.setProductCode(productCode);
						
						vo.setBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));          // 多方交易口數
						vo.setBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));        // 多方交易金額
						vo.setSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));         // 空方交易口數
						vo.setSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));       // 空方交易金額
						vo.setStayBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));      // 未平倉多方交易口數
						vo.setStayBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));    // 未平倉多方交易金額
						vo.setStaySellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));     // 未平倉空方交易口數
						vo.setStaySellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));  // 未平倉空方交易金額
						
						result["data"]["invest"].push(vo.toJSONObject());
					}
					else if (foundation == 'foreign') {
					
						vo = new tw.ace33022.vo.ForeignFutureDayTrnLog();
					
						if (productCode == 'TX') tr = 5;        // 臺股期貨
						else if (productCode == 'TE') tr = 8;   // 電子期貨
						else if (productCode == 'TF') tr = 11;  // 金融期貨
						else if (productCode == 'MTX') tr = 14;	// 小型臺指期貨

						vo.setTrnDate(trnDate);
						vo.setProductCode(productCode);

						vo.setBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));          // 多方交易口數
						vo.setBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));        // 多方交易金額
						vo.setSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));         // 空方交易口數
						vo.setSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));       // 空方交易金額
						vo.setStayBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));      // 未平倉多方交易口數
						vo.setStayBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));    // 未平倉多方交易金額
						vo.setStaySellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));     // 未平倉空方交易口數
						vo.setStaySellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));  // 未平倉空方交易金額
						
						result["data"]["foreign"].push(vo.toJSONObject());
					}
					
				});
			});
			
			// 外資期貨資料。
			// dao = new tw.ace33022.dao.db.vo.ForeignFutureDayTrnLog(conn);
			// dao.doDeleteByTrnDate(trnDate);
			// arrForeignFuture.forEach(function(element) {dao.doInsert(element);});
			
			// 自營商期貨資料。
			// dao = new tw.ace33022.dao.db.vo.DealerFutureDayTrnLog(conn);
			// dao.doDeleteByTrnDate(trnDate);
			// arrDealerFuture.forEach(function(element) {dao.doInsert(element);});
			
			// 投信期貨資料。
			// dao = new tw.ace33022.dao.db.vo.InvestFutureDayTrnLog(conn);
			// dao.doDeleteByTrnDate(trnDate);
			// arrInvestFuture.forEach(function(element) {dao.doInsert(element);});
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
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

		function getHTML(trnDate, productCode) {
		
			function method01(url, postData) {
			
				var result = '';
			
				var HttpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				var HttpPost = new Packages.org.apache.http.client.methods.HttpPost(url);
				var StringEntity = new Packages.org.apache.http.entity.StringEntity(postData, 'UTF-8');
				var BasicHeader = new Packages.org.apache.http.message.BasicHeader('Content-Type', 'application/x-www-form-urlencoded');
				var HttpResponse;
				
				var temp;
				
				var bufferedReader;
				
				StringEntity.setContentType(BasicHeader);
				HttpPost.setEntity(StringEntity);

				HttpResponse = HttpClient.execute(HttpPost);

				if (HttpResponse.getEntity() == null) throw new Error('Get null FutureLargeStayLog HttpEntity');

				result = '';
				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
				while ((temp = BufferedReader.readLine()) != null) result += temp;
				
				return result;
			}
			
			function method02(url, postData) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				try {
				
					// process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + Packages.java.net.URLEncoder.encode(postData) + '"');
					process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + postData + '"');
					
					inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
					while ((temp = inputBufferedReader.readLine()) != null) result += temp;
					
					errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
					while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
					
					if (process.waitFor() !== 0) throw new Error(errorMessage);
					
					return result;
				}
				finally {
				
					if (process != null) process.destroy();
				}
			}
			
			// var url = new String('http://www.taifex.com.tw/chinese/3/7_8.asp');
			// var url = new String('http://www.taifex.com.tw/cht/3/largeTraderFutQry');
			var url = new String('https://www.taifex.com.tw/cht/3/largeTraderFutQry');
			
			var year = new String(parseInt(trnDate.substr(0, 4), 10));
			var month = new String(parseInt(trnDate.substr(4, 2), 10));
			var day = new String(parseInt(trnDate.substr(6, 2), 10));
		
			var postData = 'datecount=&'
									 + 'contractId2=&'
									 + 'queryDate=' + year + '/' + month + '/' + day + '&'
									 + 'contractId=' + productCode;
		
			return method02(url, postData);
		}
		
		function addFutureLargeStayLog(result, html, trnDate, productCode) {

			var doc = org.jsoup.Jsoup.parse(html);
			var content = doc.getElementsByClass('table_f').get(0);
			var trs = content.getElementsByTag('tr');
			var tds;
		
			var index = new Number(3);
			var conMonth = new String();
			var temp;
			var vo;
		
			if (trs.size() != 0) {
			
				tds = trs.get(index).getElementsByTag('td');
			
				vo = new tw.ace33022.vo.FutureLargeStayLog();
			
				vo.setTrnDate(trnDate);
			
				conMonth = new String(tds.get(1).text());  // 契約月份
				vo.setConMonth(conMonth.replace(new RegExp(' ', 'gm'), ''));
			
				vo.setProductCode(productCode);
			
				temp = new String(tds.get(2).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreFiveBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(2).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreFiveJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(4).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreTenBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(4).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreTenJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(6).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreFiveSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(6).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreFiveJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(8).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreTenSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(8).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreTenJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(10).text());
				vo.setStayQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				// 取得之到期月份屬於無效資料則略過。
				// if (vo.getConMonth() != '-') arrFuture.push(vo);
				if (vo.getConMonth() != '-') result["data"]["future_large_stay_log"].push(vo.toJSONObject());
			
				// 2013/08/06 臺股期貨增加週別交易。
				if (productCode == 'TX') {
			
					tds = trs.get(index + 1).getElementsByTag('td');
				
					vo = new tw.ace33022.vo.FutureLargeStayLog();

					vo.setTrnDate(trnDate);
			
					conMonth = new String(tds.get(0).text());  // 契約月份
					vo.setConMonth(conMonth.replace(new RegExp(' ', 'gm'), ''));
			
					vo.setProductCode(productCode);
			
					temp = new String(tds.get(1).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreFiveBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(1).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreFiveJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(3).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreTenBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(3).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreTenJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(5).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreFiveSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(5).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreFiveJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(7).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreTenSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(7).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreTenJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					temp = new String(tds.get(9).text());
					vo.setStayQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
					result["data"]["future_large_stay_log"].push(vo.toJSONObject());
				}
			}
		}
		
		function addFutureLargeStayAllLog(result, html, trnDate, productCode) {

			var doc = org.jsoup.Jsoup.parse(html);
			var content = doc.getElementsByClass('table_f').get(0);
			var trs = content.getElementsByTag('tr');
			var tds;
		
			var index = new Number(4);
			var temp;
			var vo;
		
			// 2013/08/06 臺股期貨增加週別交易。
			if (productCode == 'TX') index = 5;
		
			if (trs.size() != 0) {
			
				tds = trs.get(index).getElementsByTag('td');
			
				vo = new tw.ace33022.vo.FutureLargeStayAllLog();
			
				vo.setTrnDate(trnDate);
				vo.setProductCode(productCode);
			
				temp = new String(tds.get(1).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreFiveBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(1).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreFiveJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(3).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreTenBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(3).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreTenJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(5).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreFiveSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(5).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreFiveJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(7).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreTenSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(7).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreTenJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				temp = new String(tds.get(9).text());
				vo.setStayQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
			
				result["data"]["future_large_stay_all_log"].push(vo.toJSONObject());
			}
		}
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": {
			
				"future_large_stay_log": [],
				"future_large_stay_all_log": []
			}
		};
		
		try {
		
			if (typeof tw.ace33022.vo.FutureLargeStayLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.FutureLargeStayLog"] + '.js');
			if (typeof tw.ace33022.vo.FutureLargeStayAllLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.FutureLargeStayAllLog"] + '.js');

			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.dao.db.vo.FutureLargeStayLog"] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.dao.db.vo.FutureLargeStayAllLog"] + '.js');
	 
			// var arrFuture = new Array();
			// var arrFutureAll = new Array();
			
			// var dao;
			
			// 臺股期貨/電子期貨/金融期貨
			["TX", "TE", "TF"].forEach(function(productCode) {
			
				var html = getHTML(trnDate, productCode);
				
				addFutureLargeStayLog(result, html, trnDate, productCode);
				addFutureLargeStayAllLog(result, html, trnDate, productCode);
			});
			
			// dao = new tw.ace33022.dao.db.vo.FutureLargeStayLog(conn);
			// dao.doDeleteByTrnDate(trnDate);
			// arrFuture.forEach(function(element) {dao.doInsert(element);});

			// dao = new tw.ace33022.dao.db.vo.FutureLargeStayAllLog(conn);
			// dao.doDeleteByTrnDate(trnDate);
			// arrFutureAll.forEach(function(element) {dao.doInsert(element);});
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
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
	
		/**
		 *
		 * @description 取得網頁資料
		 *
		 * @version 2020/03/17 ace 初始版本。
		 *
		 * @author ace
		 *
		 * @see <a href="https://docs.oracle.com/javase/7/docs/api/java/net/URLEncoder.html">URLEncoder (Java Platform SE 7 )</a>
		 * @see <a href="https://docs.oracle.com/javase/7/docs/api/java/net/URLDecoder.html">URLDecoder (Java Platform SE 7 )</a>
		 * @see <a href="https://docs.oracle.com/javase/7/docs/api/java/io/InputStreamReader.html">InputStreamReader (Java Platform SE 7 )</a>
		 * @see <a href="https://docs.oracle.com/javase/7/docs/api/java/io/BufferedReader.html">BufferedReader (Java Platform SE 7 )</a>
		 *
		 * @see <a href="https://openhome.cc/Gossip/Encoding/URLEncoding.html">URL 編碼</a>
		 *
		 */
		function getHTML(trnDate, productCode) {
		
			function method01(url, postData) {
			
				var result = '';
			
				var HttpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				var HttpPost = new Packages.org.apache.http.client.methods.HttpPost(url);
				var StringEntity = new Packages.org.apache.http.entity.StringEntity(postData, 'UTF-8');
				var BasicHeader = new Packages.org.apache.http.message.BasicHeader('Content-Type', 'application/x-www-form-urlencoded');
				var HttpResponse;
				
				var temp;
				var bufferedReader;
			
				StringEntity.setContentType(BasicHeader);
				HttpPost.setEntity(StringEntity);
				
				HttpResponse = HttpClient.execute(HttpPost);

				if (HttpResponse.getEntity() == null) throw new Error('OptionDayTrnLog get null HttpEntity.');

				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
				
				while ((temp = bufferedReader.readLine()) != null) result += temp;
				
				return result;
			}
			
			/**
			 *
			 * @description 取得網頁資料
			 *
			 * @version 2020/03/17 ace 初始版本。
			 *
			 * @author ace
			 *
			 * @see <a href="https://docs.oracle.com/javase/7/docs/api/java/lang/Runtime.html">Runtime (Java Platform SE 7 )</a>
			 * @see <a href="https://docs.oracle.com/javase/7/docs/api/java/lang/ProcessBuilder.html">ProcessBuilder (Java Platform SE 7 )</a>
			 *
			 * @see <a href="http://yindingtsai.blogspot.com/2010/01/runtimeexec.html">光與影的對話: 如何正確的使用 Runtime.exec()</a>
			 *
			 * @comment 2020/03/18 ace 透過java.net.URLEncoder對post資料編碼會造成結果無法被Server接受？！cURL會將要post出去的資料進行編碼處理，所以不需要先行透過java.net.URLEncoder對post資料編碼。
			 *
			 * @todo 2020/03/18 ace 如何通過憑證檢查？目前暫時以-k參數略過檢查。
			 *
			 */
			function method02(url, postData) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				// process = Packages.java.lang.Runtime.getRuntime().exec(cURLFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + Packages.java.net.URLEncoder.encode(postData) + '"');
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + postData + '"');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
				
				return result;
			}
			
			function method03(url, payload) {
			
				if (typeof tw.ace33022.rhino.google.apps.script.UrlFetchApp == 'undefined') load(Packages.java.lang.System.getProperty('WorkDir') + '/javascript/tw/ace33022/rhino/google/apps/script/UrlFetchApp.js');
				
				var result = '';
			
        var options = {

          "method": "post",
          "contentType": "application/x-www-form-urlencoded",
          "payload": payload
        };

        // console.log(JSON.stringify(options));
				
				var UrlFetchApp = tw.ace33022.rhino.google.apps.script.UrlFetchApp;

        var httpResponse = UrlFetchApp.fetch(url, options);
				
				if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();
			
				return result;
			}
		
			// var url = new String('http://www.taifex.com.tw/chinese/3/3_2_2.asp');
			// var url = new String('http://www.taifex.com.tw/cht/3/optDailyMarketReport');
			var url = new String('https://www.taifex.com.tw/cht/3/optDailyMarketReport');
		
			var year = trnDate.substr(0, 4);
			var month = trnDate.substr(4, 2);
			var day = trnDate.substr(6, 2);
		
			/**
			 * 因POST方式中，參數commodity_name內存中文字("臺指選擇權(TXO)")，
			 * 使用java.net.URLEncoder.encode("臺指選擇權(TXO)")函數之結果:%BB%4F%AB%FC%BF%EF%BE%DC%C5%76%28TXO%29
			 * 從LiveHTTP headers取得之結果:%BBO%AB%FC%BF%EF%BE%DC%C5v%28TXO%29
			 * 轉換結果無法一至，且使用UrlEncodeFormEntity類別編碼後，%符號會再轉換成%25，無法轉換成對應之參數資料。
			 * 故不使用UrlEncodeFormEntity類別作處理，改以Stringentity類別處理參數資料，即可自行指定POST方式所需之參數資料。
			 **/
			var postData = 'queryType=2' + '&'
									 + 'marketCode=0' + '&'
									 + 'dateaddcnt=' + '&'
									 + 'commodity_id=' + productCode + '&'
									 + 'commodity_id2=' + '&'
									 + 'commodity_idt=' + productCode + '&'
									 + 'commodity_id2t=' + '&'
									 + 'commodity_id2t2=' + '&'
									 + 'MarketCode=0' + '&'
									 + 'queryDate=' + year + '/' + month + '/' + day;
			
			// return method02(url, postData);
			return method03(url, postData);
		}
			
		function addOptionDayTrnLog(arrayOptionCallDayTrnLog, arrayOptionPutDayTrnLog, trnDate, productCode) {
		
			var doc = org.jsoup.Jsoup.parse(getHTML(trnDate, productCode));
			var content = doc.getElementsByClass('table_f').get(0);
			var trs = content.getElementsByTag('tr');
			var tds;
		
			var trnType;
			var vo;
			
			var index;
			var temp;
			
			for (index = 1; index < trs.size(); index++) {
			
				tds = trs.get(index).getElementsByTag('td');
				
				if ((new String(tds.get(0).text())).toUpperCase() == productCode) {
					
					trnType = (new String(tds.get(4).text())).toUpperCase();
					
					if (trnType == 'CALL') {
				
						vo = new tw.ace33022.vo.OptionCallDayTrnLog();
					}	
					else if (trnType == 'PUT') {
				
						vo = new tw.ace33022.vo.OptionPutDayTrnLog();
					}	
			
					vo.setTrnDate(trnDate);
					vo.setConMonth(new String(tds.get(1).text()));
					vo.setProductCode(productCode);
					vo.setStrikePrice(new String(tds.get(3).text()));
				
					temp = tds.get(4).text();
					if (temp.trim() != '-') vo.setOpenPrice(parseFloat(temp));
				
					temp = tds.get(5).text();
					if (temp.trim() != '-') vo.setHighPrice(parseFloat(temp));
				
					temp = tds.get(6).text();
					if (temp.trim() != '-') vo.setLowPrice(parseFloat(temp));
				
					temp = tds.get(8).text();
					if (temp.trim() != '-') vo.setClosePrice(parseFloat(temp));
				
					temp = tds.get(7).text();
					if (temp.trim() != '-') vo.setLastCalPrice(parseFloat(temp));
				
					temp = tds.get(13).text();
					if (temp.trim() != '-') vo.setTrnQty(parseFloat(temp));
				
					temp = tds.get(14).text();
					if (temp.trim() != '-') vo.setStayQty(parseFloat(temp));
					
					if (trnType == 'CALL') {
				
						arrayOptionCallDayTrnLog.push(vo.toJSONObject());
					}	
					else if (trnType == 'PUT') {
				
						arrayOptionPutDayTrnLog.push(vo.toJSONObject());
					}	
				}
			}
		}

		var result = {
		
			"code": 0,
			"message": "",
			"data": {
			
				"option_call_day_trn_log": [],
				"option_put_day_trn_log": []
			}
		};
		
		try {
		
			if (typeof tw.ace33022.vo.OptionCallDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionCallDayTrnLog"] + '.js');
			if (typeof tw.ace33022.vo.OptionPutDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionPutDayTrnLog"] + '.js');
			
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.OptionCallDayTrnLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.OptionPutDayTrnLog'] + '.js');
			
			// var dao;
			
			// var arrCallOption = new Array();
			// var arrPutOption  = new Array();
			
			addOptionDayTrnLog(result["data"]["option_call_day_trn_log"], result["data"]["option_put_day_trn_log"], trnDate, 'TXO');	// 臺指選擇權
			addOptionDayTrnLog(result["data"]["option_call_day_trn_log"], result["data"]["option_put_day_trn_log"], trnDate, 'TEO');	// 電子選擇權
			addOptionDayTrnLog(result["data"]["option_call_day_trn_log"], result["data"]["option_put_day_trn_log"], trnDate, 'TFO');	// 金融選擇權
			
			// getOptionDayTrnLog('TXO');	// 臺指選擇權
			// getOptionDayTrnLog('TEO');	// 電子選擇權
			// getOptionDayTrnLog('TFO');	// 金融選擇權
			
			// arrCallOption.forEach(function(element) { print(element.getConMonth() + ':' + element.getStrikePrice() + ':' + element.getLastCalPrice()); });
			
			// dao = new tw.ace33022.dao.db.vo.OptionCallDayTrnLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrCallOption.forEach(function(element) {dao.doInsert(element);});
			
			// dao = new tw.ace33022.dao.db.vo.OptionPutDayTrnLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrPutOption.forEach(function(element) { dao.doInsert(element); });
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 三大法人每日選擇權交易資料
	 *
	 * @version 2012/08/08 ace 初始版本。
	 * @version 2012/08/08 ace 函數GetOptionDayTrnLogsHtml()更名為GetFoundationOptionDayTrnLogsHtml()。
	 * @version 2012/08/08 ace 函數DealWithOptionDayTrnLogs()更名為DealWithFoundationOptionDayTrnLogs()。
	 * @version 2020/03/23 ace 函數DealWithFoundationOptionDayTrnLogs()更名為DealWithFoundationOptionDayTrnLog()。
	 * @version 2024/05/04 ace 配合版型修改調整取得資料方式。
	 *
	 * @author ace
	 *
	 */
	function getFoundationOptionDayTrnLog(trnDate) {

		function getHTML(trnDate) {
		
			function method01(url, postData) {
			
				var result = '';
			
				var HttpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				var HttpPost = new Packages.org.apache.http.client.methods.HttpPost(url);
				var StringEntity = new Packages.org.apache.http.entity.StringEntity(postData, 'UTF-8');
				var BasicHeader = new Packages.org.apache.http.message.BasicHeader('Content-Type', 'application/x-www-form-urlencoded');
				var HttpResponse;
				
				var bufferedReader;
				
				StringEntity.setContentType(BasicHeader);
				HttpPost.setEntity(StringEntity);
				
				HttpResponse = HttpClient.execute(HttpPost);

				if (HttpResponse.getEntity() == null) throw new Error('FoundationOptionDayTrnLog get null HttpEntity');

				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'BIG5'));
				while ((temp = bufferedReader.readLine()) != null) result += temp;
				
				return result;
			}
		
			function method02(url, postData) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				// process = Packages.java.lang.Runtime.getRuntime().exec(cURLFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + Packages.java.net.URLEncoder.encode(postData) + '"');
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"'+ ' ' + '-d' + ' ' + '"' + postData + '"');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
				
				return result;
			}
				
			// var url = new String('http://www.taifex.com.tw/chinese/3/7_12_5.asp');
			// var url = new String('http://www.taifex.com.tw/cht/3/callsAndPutsDate');
			var url = new String('https://www.taifex.com.tw/cht/3/callsAndPutsDate');

			var year = trnDate.substr(0, 4);
			var month = trnDate.substr(4, 2);
			var day = trnDate.substr(6, 2);
			
			// var params = new String('goday=&syear=' + year + '&smonth=' + month + '&sday=' + day + '&COMMODITY_ID=');
			var postData = new String('queryType=1&goDay=&doQuery=1&dateaddcnt=&queryDate=' + year + '/' + month + '/' + day + '&commodityId=');

			return method02(url, postData);
		}
		
		function addFoundationOptionDayTrnLog(arrayDealerOptin, arrayInvestOptin, arrayForeignOptin, html, productCode, foundation) {
		
			var doc = org.jsoup.Jsoup.parse(html);
			// var content = doc.getElementsByTag('table').get(3);
			var content = doc.getElementsByTag('table').get(0);
			var trs = content.getElementsByTag('tr');

			var tr = new Number(0);
			var vo;
			
			if (foundation == 'dealer') {
			
				vo = new tw.ace33022.vo.DealerOptionDayTrnLog();
			
				if (productCode == 'TXO') tr = 3;       // 臺指選擇權
				else if (productCode == 'TEO') tr = 9;  // 電子選擇權
				else if (productCode == 'TFO') tr = 15;	// 金融選擇權

				vo.setTrnDate(trnDate);
				vo.setProductCode(productCode);
				
				// CALL
				// vo.setCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(0).text()).replace(/,/g, '')));        // 多方交易口數
				// vo.setCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));      // 多方交易金額
				// vo.setCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));       // 空方交易口數
				// vo.setCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));     // 空方交易金額
				// vo.setStayCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(6).text()).replace(/,/g, '')));    // 多方交易口數
				// vo.setStayCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));  // 多方交易金額
				// vo.setStayCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));   // 空方交易口數
				// vo.setStayCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));	// 空方交易金額
	
				vo.setCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));         // 多方交易口數
				vo.setCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(5).text()).replace(/,/g, '')));       // 多方交易金額
				vo.setCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(6).text()).replace(/,/g, '')));        // 空方交易口數
				vo.setCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));      // 空方交易金額
				vo.setStayCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));    // 多方交易口數
				vo.setStayCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(11).text()).replace(/,/g, '')));  // 多方交易金額
				vo.setStayCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(12).text()).replace(/,/g, '')));   // 空方交易口數
				vo.setStayCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(13).text()).replace(/,/g, '')));	// 空方交易金額
				
				tr += 3;
	
				// PUT
				// vo.setPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(0).text()).replace(/,/g, '')));         	// 多方交易口數
				// vo.setPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));       	// 多方交易金額
				// vo.setPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));        	// 空方交易口數
				// vo.setPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));      	// 空方交易金額
				// vo.setStayPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(6).text()).replace(/,/g, '')));     	// 多方交易口數
				// vo.setStayPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));   	// 多方交易金額
				// vo.setStayPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));   	// 空方交易口數
				// vo.setStayPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));	// 空方交易金額
				
				vo.setPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));         	// 多方交易口數
				vo.setPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));       	// 多方交易金額
				vo.setPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));        	// 空方交易口數
				vo.setPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(5).text()).replace(/,/g, '')));      	// 空方交易金額
				vo.setStayPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));     	// 多方交易口數
				vo.setStayPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));   	// 多方交易金額
				vo.setStayPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));   	// 空方交易口數
				vo.setStayPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(11).text()).replace(/,/g, '')));	// 空方交易金額
				
				arrayDealerOptin.push(vo.toJSONObject());
			}
			else if (foundation == 'invest') {
			
				vo = new tw.ace33022.vo.InvestOptionDayTrnLog();
			
				if (productCode == 'TXO') tr = 4;       // 臺指選擇權
				else if (productCode == 'TEO') tr = 10; // 電子選擇權
				else if (productCode == 'TFO') tr = 16;	// 金融選擇權

				vo.setTrnDate(trnDate);
				vo.setProductCode(productCode);
				
				// CALL
				vo.setCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));         // 多方交易口數
				vo.setCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));       // 多方交易金額
				vo.setCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));        // 空方交易口數
				vo.setCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));      // 空方交易金額
				vo.setStayCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));     // 多方交易口數
				vo.setStayCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));   // 多方交易金額
				vo.setStayCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));    // 空方交易口數
				vo.setStayCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));	// 空方交易金額
	
				tr += 3;
	
				// PUT
				vo.setPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));         	// 多方交易口數
				vo.setPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));       	// 多方交易金額
				vo.setPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));        	// 空方交易口數
				vo.setPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));      	// 空方交易金額
				vo.setStayPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));     	// 多方交易口數
				vo.setStayPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));   	// 多方交易金額
				vo.setStayPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));   	// 空方交易口數
				vo.setStayPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));	// 空方交易金額
				
				arrayInvestOptin.push(vo.toJSONObject());
			}
			else if (foundation == 'foreign') {
			
				vo = new tw.ace33022.vo.ForeignOptionDayTrnLog();
				
				if (productCode == 'TXO') tr = 5;       // 臺指選擇權
				else if (productCode == 'TEO') tr = 11; // 電子選擇權
				else if (productCode == 'TFO') tr = 17;	// 金融選擇權

				vo.setTrnDate(trnDate);
				vo.setProductCode(productCode);
				
				// CALL
				vo.setCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));         // 多方交易口數
				vo.setCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));       // 多方交易金額
				vo.setCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));        // 空方交易口數
				vo.setCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));      // 空方交易金額
				vo.setStayCallBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));     // 多方交易口數
				vo.setStayCallBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));   // 多方交易金額
				vo.setStayCallSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));    // 空方交易口數
				vo.setStayCallSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));	// 空方交易金額
	
				tr += 3;
	
				// PUT
				vo.setPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(1).text()).replace(/,/g, '')));         	// 多方交易口數
				vo.setPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(2).text()).replace(/,/g, '')));       	// 多方交易金額
				vo.setPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(3).text()).replace(/,/g, '')));        	// 空方交易口數
				vo.setPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(4).text()).replace(/,/g, '')));      	// 空方交易金額
				vo.setStayPutBuyQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(7).text()).replace(/,/g, '')));     	// 多方交易口數
				vo.setStayPutBuyTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(8).text()).replace(/,/g, '')));   	// 多方交易金額
				vo.setStayPutSellQty(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(9).text()).replace(/,/g, '')));   	// 空方交易口數
				vo.setStayPutSellTotal(parseFloat(new String(trs.get(tr).getElementsByTag('td').get(10).text()).replace(/,/g, '')));	// 空方交易金額
				
				arrayForeignOptin.push(vo.toJSONObject());
			}
			
			return this;
		}
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": {
			
				"dealer": [],
				"foreign": [],
				"invest": []
			}
		};
		
		try {

			if (typeof tw.ace33022.vo.ForeignOptionDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.ForeignOptionDayTrnLog"] + '.js');
			if (typeof tw.ace33022.vo.DealerOptionDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.DealerOptionDayTrnLog"] + '.js');
			if (typeof tw.ace33022.vo.InvestOptionDayTrnLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.InvestOptionDayTrnLog"] + '.js');
				
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.DealerOptionDayTrnLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.InvestOptionDayTrnLog'] + '.js');

			// var arrForeignOption = new Array();
			// var arrDealerOption  = new Array();
			// var arrInvestOption  = new Array();
			
			var html = getHTML(trnDate);
			
			var dao;
			
			// 臺指選擇權, 電子選擇權, 金融選擇權
			["TXO", "TEO", "TFO"].forEach(function(productCode) {
			
				["dealer", "invest", "foreign"].forEach(function(foundation) {addFoundationOptionDayTrnLog(result["data"]["dealer"], result["data"]["invest"], result["data"]["foreign"], html, productCode, foundation);});
			});
			
			// 寫入外資選擇權資料。
			// dao = new tw.ace33022.dao.db.vo.ForeignOptionDayTrnLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrForeignOption.forEach(function(element) {dao.doInsert(element);});
			
			// 寫入自營商選擇權資料。
			// dao = new tw.ace33022.dao.db.vo.DealerOptionDayTrnLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrDealerOption.forEach(function(element) {dao.doInsert(element);});
			
			// 寫入投信選擇權資料。
			// dao = new tw.ace33022.dao.db.vo.InvestOptionDayTrnLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrInvestOption.forEach(function(element) {dao.doInsert(element);});
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
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

		function getHTML(trnDate, productCode) {
		
			function method01(url, postData) {
			
				var result = '';
				
				var HttpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
				var HttpPost = new Packages.org.apache.http.client.methods.HttpPost(url);
				var StringEntity = new Packages.org.apache.http.entity.StringEntity(postData, 'UTF-8');
				var BasicHeader = new Packages.org.apache.http.message.BasicHeader('Content-Type', 'application/x-www-form-urlencoded');
				var HttpResponse;
				
				var temp;
				
				var bufferedReader;

				StringEntity.setContentType(BasicHeader);
				HttpPost.setEntity(StringEntity);
				
				HttpResponse = HttpClient.execute(HttpPost);

				if (HttpResponse.getEntity() == null) throw new Error('OptionLargeStayLog get null HttpEntity');

				bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
				while ((temp = bufferedReader.readLine()) != null) result += temp;
				
				return result;
			}
			
			function method02(url, postData) {
			
				var result = '';
				
				var errorMessage = '';
			
				var process;
				
				var inputBufferedReader, errorBufferedReaded;
				var temp;
				
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"' + url + '"' + ' ' + '-k -X POST -H "Content-Type: application/x-www-form-urlencoded"' + ' ' + '-d' + ' ' + '"' + postData + '"');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
				
				return result;
			}
			
			// var url = new String('http://www.taifex.com.tw/chinese/3/7_9.asp');
			// var url = new String('http://www.taifex.com.tw/cht/3/largeTraderOptQry');
			var url = new String('https://www.taifex.com.tw/cht/3/largeTraderOptQry');
		
			var year = new String(parseInt(trnDate.substr(0, 4), 10));
			var month = new String(parseInt(trnDate.substr(4, 2), 10));
			var day = new String(parseInt(trnDate.substr(6, 2), 10));
		
			/**
			 * 因POST方式中，參數commodity_name內存中文字("臺指選擇權(TXO)")，
			 * 使用java.net.URLEncoder.encode("臺指選擇權(TXO)")函數之結果:%BB%4F%AB%FC%BF%EF%BE%DC%C5%76%28TXO%29
			 * 從LiveHTTP headers取得之結果:%BBO%AB%FC%BF%EF%BE%DC%C5v%28TXO%29
			 * 轉換結果無法一至，且使用UrlEncodeFormEntity類別編碼後，%符號會再轉換成%25，無法轉換成對應之參數資料。
			 * 故不使用UrlEncodeFormEntity類別作處理，改以Stringentity類別處理參數資料，即可自行指定POST方式所需之參數資料。
			**/
			var postData = 'datecount=' + '&'
									 + 'contractId2=' + '&'
									 + 'contractId=' + productCode + '&'
									 + 'queryDate=' + year + '/' + month + '/' + day;
		
		
			return method02(url, postData);
		}
		
		function addOptionLargeStayLog(arrayOptionCallLargeStayLog, arrayOptionPutLargeStayLog, html, trnDate, productCode, trnType) {
		
			// 選擇權大額交易人未沖銷部位資料

			var doc = org.jsoup.Jsoup.parse(html);
			var content = doc.getElementsByClass('table_f').get(0);
			var trs = content.getElementsByTag('tr');
			var tds;
		
			var index = new Number(0);
			var temp;
			
			var vo;
		
			if (trs.size() != 0) {
			
				if (trnType == 'CALL') {
				
					vo = new tw.ace33022.vo.OptionCallLargeStayLog();
			
					if (productCode == 'TXO') {
				
						index = 4;
					}
					else {
				
						index = 3;
					}
				}  
				else if (trnType == 'PUT') {
				
					vo = new tw.ace33022.vo.OptionPutLargeStayLog();
			
					if (productCode == 'TXO') {
				
						index = 7;
					}
					else {
				
						index = 5;
					}
				}  
			
				tds = trs.get(index).getElementsByTag('td');
			
				vo.setTrnDate(trnDate);
			
				temp = new String();	// 契約月份
				if (productCode == 'TXO') {
			
					temp = new String(tds.get(0).text());
				}
				else {
			
					temp = new String(tds.get(1).text());
				}
				
				vo.setConMonth(temp.replace(new RegExp(' ', 'gm'), ''));
			
				vo.setProductCode(productCode);
			
				if (productCode == 'TXO') {
			
					temp = new String(tds.get(1).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreFiveBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(1).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreFiveJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(3).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreTenBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(3).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreTenJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(5).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreFiveSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(5).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreFiveJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(7).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreTenSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(7).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreTenJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(9).text());
					vo.setStayQty(temp.replace(new RegExp(',', 'gm'), ''));
				}
				else {
			
					temp = new String(tds.get(2).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreFiveBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(2).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreFiveJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(4).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreTenBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(4).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreTenJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(6).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreFiveSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(6).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreFiveJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(8).text());
					temp = temp.substr(0, temp.indexOf('(') - 1);
					vo.setPreTenSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(8).text());
					temp = temp.substring(temp.indexOf('(') + 1);
					temp = temp.substr(0, temp.indexOf(')'));
					vo.setPreTenJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
					temp = new String(tds.get(10).text());
					vo.setStayQty(temp.replace(new RegExp(',', 'gm'), ''));
				}
				
				if (trnType == 'CALL') {
				
					arrayOptionCallLargeStayLog.push(vo.toJSONObject());
				}
				else if (trnType == 'PUT') {
				
					arrayOptionPutLargeStayLog.push(vo.toJSONObject());
				}
			
				// 臺指週選擇權
				/*
				if (productCode === 'TXO') {
			
					if (trnType === 'CALL') {
					
						vo = new tw.ace33022.vo.OptionCallLargeStayLog();
				
						index = 3;
					}
					else if (trnType == 'PUT') {
				
						vo = new tw.ace33022.vo.OptionPutLargeStayLog();
						
						index = 6;
					}
				
					tds = trs.get(index).getElementsByTag('td');
				
					vo.setTrnDate(trnDate);
				
					temp = new String(tds.get(1).text());
					if (temp != '-') {
				
						vo.setConMonth(temp.replace(new RegExp(' ', 'gm'), ''));
			
						vo.setProductCode(productCode);
				
						temp = new String(tds.get(2).text());
						temp = temp.substr(0, temp.indexOf('(') - 1);
						vo.setPreFiveBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(2).text());
						temp = temp.substring(temp.indexOf('(') + 1);
						temp = temp.substr(0, temp.indexOf(')'));
						vo.setPreFiveJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(4).text());
						temp = temp.substr(0, temp.indexOf('(') - 1);
						vo.setPreTenBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(4).text());
						temp = temp.substring(temp.indexOf('(') + 1);
						temp = temp.substr(0, temp.indexOf(')'));
						vo.setPreTenJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(6).text());
						temp = temp.substr(0, temp.indexOf('(') - 1);
						vo.setPreFiveSell(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(6).text());
						temp = temp.substring(temp.indexOf('(') + 1);
						temp = temp.substr(0, temp.indexOf(')'));
						vo.setPreFiveJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(8).text());
						temp = temp.substr(0, temp.indexOf('(') - 1);
						vo.setPreTenSell(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(8).text());
						temp = temp.substring(temp.indexOf('(') + 1);
						temp = temp.substr(0, temp.indexOf(')'));
						vo.setPreTenJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
						temp = new String(tds.get(10).text());
						vo.setStayQty(temp.replace(new RegExp(',', 'gm'), ''));
				
						if (trnType === 'CALL') {
						
							arrOptionCall.push(vo);
						}
						else if (trnType == 'PUT') {
						
							arrOptionPut.push(vo);
						}
					}  
				}
				*/
			}
		}

		function addOptionLargeStayAllLog(arrayOptionCallLargeStayLog, arrayOptionPutLargeStayLog, html, trnDate, productCode, trnType) {

			// 選擇權大額交易人未沖銷部位資料(全部月份)

			var doc = org.jsoup.Jsoup.parse(html);
			var content = doc.getElementsByClass('table_f').get(0);
			var trs = content.getElementsByTag('tr');
			var tds;
		
			var vo;
			
			var index = new Number(0);
			var temp;
		
			if (trs.size() != 0) {
			
				if (trnType == 'CALL') {
			
					vo = new tw.ace33022.vo.OptionCallLargeStayAllLog();
					
					if (productCode == 'TXO') {
				
						index = 5;
					}
					else {
				
						index = 4;
					}
				}  
				else if (trnType == 'PUT') {
			
					vo = new tw.ace33022.vo.OptionPutLargeStayAllLog();
					
					if (productCode == 'TXO') {
				
						index = 8;
					}
					else {
				
						index = 6;
					}
				}  
			
				tds = trs.get(index).getElementsByTag('td');
			
				vo.setTrnDate(trnDate);
				vo.setProductCode(productCode);
			
				temp = new String(tds.get(1).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreFiveBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(1).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreFiveJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(3).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreTenBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(3).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreTenJurBuy(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(5).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreFiveSell(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(5).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreFiveJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(7).text());
				temp = temp.substr(0, temp.indexOf('(') - 1);
				vo.setPreTenSell(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(7).text());
				temp = temp.substring(temp.indexOf('(') + 1);
				temp = temp.substr(0, temp.indexOf(')'));
				vo.setPreTenJurSell(temp.replace(new RegExp(',', 'gm'), ''));
			
				temp = new String(tds.get(9).text());
				vo.setStayQty(temp.replace(new RegExp(',', 'gm'), ''));
			
				if (trnType == 'CALL') {
		
					arrayOptionCallLargeStayLog.push(vo.toJSONObject());
				}  
				else if (trnType == 'PUT') {
			
					arrayOptionPutLargeStayLog.push(vo.toJSONObject());
				}  
			}
		}

		var result = {
		
			"code": 0,
			"message": "",
			"data": {
			
				"option_call_large_stay_log": [],
				"option_put_large_stay_log": [],
				"option_call_large_stay_all_log": [],
				"option_put_large_stay_all_log": []
			}
		};
		
		try {

			if (typeof tw.ace33022.vo.OptionCallLargeStayLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionCallLargeStayLog"] + '.js');
			if (typeof tw.ace33022.vo.OptionPutLargeStayLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionPutLargeStayLog"] + '.js');
			if (typeof tw.ace33022.vo.OptionCallLargeStayAllLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionCallLargeStayAllLog"] + '.js');
			if (typeof tw.ace33022.vo.OptionPutLargeStayAllLog == 'undefined') load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionPutLargeStayAllLog"] + '.js');
				
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.OptionCallLargeStayLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.OptionCallLargeStayAllLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.OptionPutLargeStayLog'] + '.js');
			// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths['tw.ace33022.dao.db.vo.OptionPutLargeStayAllLog'] + '.js');
			
			// var dao;
			
			// var arrOptionCall = new Array();
			// var arrOptionCallAll = new Array();
			// var arrOptionPut  = new Array();
			// var arrOptionPutAll  = new Array();
			
			var html;
			
			// 臺指選擇權、電子選擇權、金融選擇權
			["TXO", "TEO", "TFO"].forEach(function(productCode) {
			
				html = getHTML(trnDate, productCode);
				
				["CALL", "PUT"].forEach(function(trnType) {
				
					addOptionLargeStayLog(result["data"]["option_call_large_stay_log"], result["data"]["option_put_large_stay_log"], html, trnDate, productCode, trnType);
					addOptionLargeStayAllLog(result["data"]["option_call_large_stay_all_log"], result["data"]["option_put_large_stay_all_log"], html, trnDate, productCode, trnType);
				});
			});
			
			// dao = new tw.ace33022.dao.db.vo.OptionCallLargeStayLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrOptionCall.forEach(function(element) {dao.doInsert(element);});
			
			// dao = new tw.ace33022.dao.db.vo.OptionPutLargeStayLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrOptionPut.forEach(function(element) {dao.doInsert(element);});
			
			// dao = new tw.ace33022.dao.db.vo.OptionCallLargeStayAllLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrOptionCallAll.forEach(function(element) {dao.doInsert(element);});
			
			// dao = new tw.ace33022.dao.db.vo.OptionPutLargeStayAllLog(conn);
			// dao.doDelete(trnDate, 'TXO');
			// dao.doDelete(trnDate, 'TEO');
			// dao.doDelete(trnDate, 'TFO');
			// arrOptionPutAll.forEach(function(element) {dao.doInsert(element);});
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
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
	 * @comment 2022/07/11 ace 取得傳送JSON資料的MarketType屬性資料(交易時段)，'0'：盤中交易，'1'：盤後交易。
	 * @comment 2025/08/21 ace 是否統一採用tw.ace33022.functions.Stock的共用函數？
	 *  
	 */
	function getMarketType() {
	
		if (typeof tw.ace33022.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/functions/Stock.js');
		
		return tw.ace33022.functions.Stock.getMarketType();
	
		// return (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) ? '1' : '0';
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
	
		if (typeof tw.ace33022.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/functions/Stock.js');
		
		var result = tw.ace33022.functions.Stock.getCurrentTaifexCloseDate();
		
		if (arguments.length != 0) result = tw.ace33022.functions.Stock.getCurrentTaifexCloseDate(arguments[0]);

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
	
		if (typeof tw.ace33022.functions.Stock == 'undefined') load(tw["ace33022"]["Configuration"]["dirJavaScriptLib"] + '/tw/ace33022/functions/Stock.js');
		
		return tw.ace33022.functions.Stock.getCurrTaifexMYCode();
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
	
		function getData01() {

			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;

			// 採用curl傳送資料時，因為命令列模式的編碼未必符合指定的編碼，造成傳送的資料格式錯誤的狀況。
			// var payload = '{ \\"AscDesc\\": \\"A\\", \\"CID\\": \\"\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", ' + '\\"MarketType\\": \\"' + getMarketType() + '\\", \\"PageNo\\": \\"\\", \\"RowSize\\": \\"全部\\", \\"SortColumn\\": \\"\\", \\"SymbolType\\": \\"F\\" } ';
			
			// var payload = '{ ' + '\\"AscDesc\\": \\"A\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\"' + ', \\"MarketType\\": \\"' + getMarketType() + '\\"' + ', \\"CID\\": \\"' + arguments[0] + '\\"' + ', \\"SymbolType\\": \\"' + arguments[0].substring(arguments[0].length - 1) + '\\"' + ' }';
			// var payload = '{ ' + '\\"AscDesc\\": \\"A\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\"' + ', \\"MarketType\\": \\"' + getMarketType() + '\\"' + ', \\"CID\\": \\"' + arguments[0] + '\\"' + ', \\"SymbolType\\": \\"' + arguments[0].substring(arguments[0].length - 1) + '\\"' + ' }';
			
			if (logger != null) logger.debug('arguments.length: ' + arguments.length);

			if (arguments.length != 0) {
			
        if (logger != null) logger.debug('arguments[0]: ' + arguments[0]);
				
				payload = '{ ' + '\\"AscDesc\\": \\"A\\", \\"ExpireMonth\\": \\"\\", \\"KindID\\": \\"1\\", \\"PageNo\\": \\"\\", \\"SortColumn\\": \\"\\"' + ', \\"MarketType\\": \\"' + getMarketType() + '\\"' + ', \\"CID\\": \\"' + arguments[0] + '\\"' + ', \\"SymbolType\\": \\"' + arguments[0].substring(arguments[0].length - 1) + '\\"' + ' }';
				
				if (logger != null) logger.debug('payload: ' + payload);
				
				// process = Packages.java.lang.Runtime.getRuntime().exec(Configuration.getCURLExeFile() + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '--data-binary' + ' ' + '"@K:/JavaScript/Rhino/EXA92100/doc/mis.taifex.com.tw/getCmdyMonthDDLItemByKindPostData.json"');
				// process = Packages.java.lang.Runtime.getRuntime().exec(Configuration.getCURLExeFile() + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + payload + '"');
				process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getCmdyMonthDDLItemByKind"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + payload + '"');
				
				inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
				while ((temp = inputBufferedReader.readLine()) != null) result += temp;
				
				errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
				while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
				
				if (process.waitFor() !== 0) throw new Error(errorMessage);
			}
			
			if (logger != null) logger.debug('result: ' + result);
			
			return result;
		}
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": []
		};
		
		var arrayConMonth = new Array();
		
		try {
		
			arrayConMonth = JSON.parse(getData01.apply(null, arguments))["RtData"]["Items"];
			
			arrayConMonth.forEach(function(element, index) {
			
				if (element["item"] != '現貨') result["data"].push(element["item"]);
			});
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
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
	 *
	 * @comment 2022/07/19 ace "TXO-Q"、"TXO-R"是選擇權的交易報價，但是跟現貨資料幾乎一致？用途待確認！
	 * @comment 2025/08/30 ace "-S"是現貨交易報價，例如"TXO-S"是期貨的現貨交易報價(加權指數報價)！
	 * @comment 2025/09/04 ace 期貨交易所提供的API可以一次查詢多筆資料，若是只查詢一項(比如台指期)的情況，回傳data資料是否採用陣列？！
	 * 
	 */
	function getQuoteDetail(productCode) {
	
		function getData01(postData) {
		
			var result = '';
			
			var errorMessage = '';

			var process;
			
			var inputBufferedReader, errorBufferedReaded;
			var temp;
			
			if (logger != null) logger.debug('postData: ' + postData);
			if (logger != null) logger.debug('for curl post data: ' + postData.replace(/"/g, '\\"'));
			
			// process = Packages.java.lang.Runtime.getRuntime().exec(tw.ace33022.DefaultConfiguration.getCURLExeFile() + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteDetail"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData.replace(/"/g, '\\"') + '"');
			process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteDetail"' + ' ' + '-k -X POST -H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + postData.replace(/"/g, '\\"') + '"');
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() != 0) throw new Error(errorMessage);
			
			return result;
		}
	
		var result = {
		
			"code": 0,
			"message": "",
			"data": []
		};
		
		var postData = {"SymbolID": []};
		var postResult = {};
		
		try {
		
			if (getMarketType() == '0') {

				postData["SymbolID"].push(productCode + '-S');
				postData["SymbolID"].push(productCode + getCurrTaifexMYCode() + '-F');	// 一般交易時段行情。
			}
			else {
			
				postData["SymbolID"].push(productCode + '-S');
				postData["SymbolID"].push(productCode + getCurrTaifexMYCode() + '-M');	// 盤後交易時段行情。
			}
			
			postResult = JSON.parse(getData01(JSON.stringify(postData)));
			
			// if (logger != null) logger.debug('postResult: ' + JSON.stringify(postResult));
			
			result["data"] = postResult["RtCode"];
			result["message"] = postResult["RtMsg"];
			
			if (result["data"] == '0') result["data"] = postResult["RtData"]["QuoteList"];
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description getQuoteListOption
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
	function getQuoteListOption(productCode, conMonth) {
	
		function getMethod01(productCode, conMonth, marketType) {
		
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
			// var process = Packages.java.lang.Runtime.getRuntime().exec(tw.ace33022.DefaultConfiguration.getCURLExeFile() + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteListOption"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + payload + '"');
			var process = Packages.java.lang.Runtime.getRuntime().exec(cURLExeFile + ' ' + '-k -X POST' + ' ' + '"https://mis.taifex.com.tw/futures/api/getQuoteListOption"' + ' ' + '-H "Content-Type: application/json;charset=UTF-8" -H "User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"' + ' ' + '-d' + ' ' + '"' + payload + '"');
			
			if (logger != null) logger.debug(payload);
			
			inputBufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getInputStream()));
			while ((temp = inputBufferedReader.readLine()) != null) result += temp;
			
			errorBufferedReaded = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(process.getErrorStream()));
			while ((temp = errorBufferedReaded.readLine()) != null) errorMessage += temp;
			
			if (process.waitFor() !== 0) throw new Error(errorMessage);
			
			if (logger != null) logger.debug(result);
			
			return result;
		}
		
		// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
		// load(tw.ace33022.RequireJSConfig.baseUrl + tw.ace33022.RequireJSConfig.paths["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
		if (typeof tw.ace33022.vo.OptionCallTrnLog == 'undefined') load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionCallTrnLog"] + '.js');
		if (typeof tw.ace33022.vo.OptionPutTrnLog == 'undefined') load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.vo.OptionPutTrnLog"] + '.js');
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": {
			
				"call": [],
				"put": []
			}
		};
		
		try {
		
			var arrayQuoteList = JSON.parse(getMethod01(productCode, conMonth, getMarketType()))["RtData"]["QuoteList"];
			
			arrayQuoteList.forEach(function(element, index) {
			
				if (element["CP"] == 'C') {
				
					vo = new tw.ace33022.vo.OptionCallTrnLog();
					
					vo.setProductCode(productCode);
					vo.setConMonth(conMonth);
					vo.setTrnDate(element["CDate"]);
					vo.setStrikePrice(element["StrikePrice"]);
					vo.setOpenPrice(element["COpenPrice"]);
					vo.setHighPrice(element["CHighPrice"]);
					vo.setLowPrice(element["CLowPrice"]);
					vo.setClosePrice(element["CLastPrice"]);
					vo.setLastCalPrice(element["CLastPrice"]);
					vo.setTrnQty(element["CTotalVolume"]);
					vo.setStayQty(element["OpenInterest"]);
					vo.setBestAskPrice(element["CBestAskPrice"]);
					vo.setBestAskQty(element["CBestAskSize"]);
					vo.setBestBidPrice(element["CBestBidPrice"]);
					vo.setBestBidQty(element["CBestBidSize"]);
					
					result["data"]["call"].push(vo.toJSONObject());
				}
				else if (element["CP"] == 'P') {
				
					vo = new tw.ace33022.vo.OptionPutTrnLog();
					
					vo.setProductCode(productCode);
					vo.setConMonth(conMonth);
					vo.setTrnDate(element["CDate"]);
					vo.setStrikePrice(element["StrikePrice"]);
					vo.setOpenPrice(element["COpenPrice"]);
					vo.setHighPrice(element["CHighPrice"]);
					vo.setLowPrice(element["CLowPrice"]);
					vo.setClosePrice(element["CLastPrice"]);
					vo.setLastCalPrice(element["CLastPrice"]);
					vo.setTrnQty(element["CTotalVolume"]);
					vo.setStayQty(element["OpenInterest"]);
					vo.setBestAskPrice(element["CBestAskPrice"]);
					vo.setBestAskQty(element["CBestAskSize"]);
					vo.setBestBidPrice(element["CBestBidPrice"]);
					vo.setBestBidQty(element["CBestBidSize"]);
					
					result["data"]["put"].push(vo.toJSONObject());
				}
			});
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
			
			// throw new Error(error.message);
		}
		
		return JSON.stringify(result);
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
				getConMonth: getConMonth,
				getQuoteDetail: getQuoteDetail,
				getQuoteListOption: getQuoteListOption
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
		module.exports = getConMonth;
		module.exports = getQuoteDetail;
		module.exports = getQuoteListOption;
	}
	else {
	
		if (typeof root.tw.ace33022.rhino.functions.Stock == 'undefined') root.tw.ace33022.rhino.functions.Stock = {};
		
		root.tw.ace33022.rhino.functions.Stock.getTWSEDayTrnLog = getTWSEDayTrnLog;
		root.tw.ace33022.rhino.functions.Stock.getFoundationAmountDayTrnLog = getFoundationAmountDayTrnLog;
		root.tw.ace33022.rhino.functions.Stock.getForeignHandedStockLog = getForeignHandedStockLog;
		root.tw.ace33022.rhino.functions.Stock.getFutureDayTrnLog = getFutureDayTrnLog;
		root.tw.ace33022.rhino.functions.Stock.getFoundationFutureDayTrnLog = getFoundationFutureDayTrnLog;
		root.tw.ace33022.rhino.functions.Stock.getFutureLargeStayLog = getFutureLargeStayLog;
		root.tw.ace33022.rhino.functions.Stock.getOptionDayTrnLog = getOptionDayTrnLog;
		root.tw.ace33022.rhino.functions.Stock.getFoundationOptionDayTrnLog = getFoundationOptionDayTrnLog;
		root.tw.ace33022.rhino.functions.Stock.getOptionLargeStayLog = getOptionLargeStayLog;
		root.tw.ace33022.rhino.functions.Stock.getConMonth = getConMonth;
		root.tw.ace33022.rhino.functions.Stock.getQuoteDetail = getQuoteDetail;
		root.tw.ace33022.rhino.functions.Stock.getQuoteListOption = getQuoteListOption;
	}
})(this);