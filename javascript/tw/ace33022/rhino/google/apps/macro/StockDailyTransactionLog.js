/**
 *
 * @description StockDailyTransactionLog
 *
 * @version 2026/01/20 ace Initialize.
 *
 * @author ace
 *
 */
(function(root) {

	function getHttpClient() {
	
		// java.net.SocketTimeoutException: Read timed out
		// return Packages.tw.cod33022.functions.Net.getAllHostValidCloseableHttpClient("TLSv1.2");
		return Packages.tw.cod33022.functions.Net.getAllHostValidCloseableHttpClient("TLSv1.2", 443, 60000, 60000, 90000);
	}

	/**
	 *
	 * @description 每日臺指加權股價指數交易資料
	 *
	 * @version 2026/01/20 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getTWSEDayTrnLog(trnDate) {
		
		var result = {
		
			"code": 0,
			"message": "",
			"data": {}
		};
		
		var httpClient = getHttpClient();
		var httpGet = null;
		var httpResponse = null;
		
		try {
		
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Configuration["googleAppsMacroId"]["StockDailyTransactionLog"]: ' + Configuration["googleAppsMacroId"]["StockDailyTransactionLog"]);
		
			httpGet = new Packages.org.apache.http.client.methods.HttpGet('https://script.google.com/macros/s/' + Configuration["googleAppsMacroId"]["StockDailyTransactionLog"] + '/exec?subject=twse_day_trn_log&trn_date=' + trnDate);
			httpGet.setHeader('Content-Type', 'application/json; charset=UTF-8');
			
			httpResponse = httpClient.execute(httpGet);

			if (httpResponse.getStatusLine().getStatusCode() == 200) result = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(httpResponse.getEntity().getContent()));
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
	 * @version 2026/01/20 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
	function getOptionLargeStayLog(trnDate) {

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
		
		var httpClient = getHttpClient();
		var httpGet = null;
		var httpResponse = null;
		
		try {
		
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Configuration["googleAppsMacroId"]["StockDailyTransactionLog"]: ' + Configuration["googleAppsMacroId"]["StockDailyTransactionLog"]);
		
			httpGet = new Packages.org.apache.http.client.methods.HttpGet('https://script.google.com/macros/s/' + Configuration["googleAppsMacroId"]["StockDailyTransactionLog"] + '/exec?subject=option_large_stay_log&trn_date=' + trnDate);
			httpGet.setHeader('Content-Type', 'application/json; charset=UTF-8');
			
			httpResponse = httpClient.execute(httpGet);

			if (httpResponse.getStatusLine().getStatusCode() == 200) result = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(httpResponse.getEntity().getContent()));
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
			
				getTWSEDayTrnLog: getTWSEDayTrnLog,
				getOptionLargeStayLog: getOptionLargeStayLog
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getTWSEDayTrnLog;
		module.exports = getOptionLargeStayLog;
	}
	else {
	
		if (typeof root.tw.ace33022.rhino.google.apps.macro.StockDailyTransactionLog == 'undefined') root.tw.ace33022.rhino.google.apps.macro.StockDailyTransactionLog = {};
		
		root.tw.ace33022.rhino.google.apps.macro.StockDailyTransactionLog.getTWSEDayTrnLog = getTWSEDayTrnLog;
		root.tw.ace33022.rhino.google.apps.macro.StockDailyTransactionLog.getOptionLargeStayLog = getOptionLargeStayLog;
	}
})(this);