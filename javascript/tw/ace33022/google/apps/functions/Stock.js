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

    function getHTML(url) {

      function method01(url) {

        var result = '';

        var httpResponse = UrlFetchApp.fetch(url, {});

        if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();

        // console.log(httpResponse.getContentText());

        return result;
      }

      return method01(url);
    }

		var result = {
		
			"code": 0,
			"message": "",
			"data": {}
		};

    try {

      var vo = new tw.ace33022.vo.TWSEDayTrnLog();

      var year = trnDate.substring(0, 4);
      var month = trnDate.substring(4, 6);
      var day = trnDate.substring(6);
      var cyear = new String(parseInt(year) - 1911);

      var arrData;
      var index;

      var url = 'https://www.twse.com.tw/exchangeReport/FMTQIK?response=json&date=' + trnDate;

      vo.setTrnDate(trnDate);

      arrData = (JSON.parse(getHTML(url)))["data"];
			for (index = 0; index < arrData.length; index++) {
			
				if ((cyear + month + day) == (new String(arrData[index][0])).replace(new RegExp('/', 'gm'), '')) {
				
					vo.setTrnTotal((new String(arrData[index][2])).replace(new RegExp(',', 'gm'), '')); // 成交金額
					
					break;
				}
			}

      url = 'https://www.twse.com.tw/indicesReport/MI_5MINS_HIST?response=json&date=' + trnDate;

			arrData = (JSON.parse(getHTML(url)))["data"];
			for (index = 0; index < arrData.length; index++) {
			
				if ((cyear + month + day) == (new String(arrData[index][0])).replace(new RegExp('/', 'gm'), '')) {
				
					vo.setOpenPoint((new String(arrData[index][1])).replace(new RegExp(',', 'gm'), ''));  // 開盤指數
					vo.setHighPoint((new String(arrData[index][2])).replace(new RegExp(',', 'gm'), ''));  // 最高指數
					vo.setLowPoint((new String(arrData[index][3])).replace(new RegExp(',', 'gm'), ''));   // 最低指數
					vo.setClosePoint((new String(arrData[index][4])).replace(new RegExp(',', 'gm'), '')); // 收盤指數
					
					break;
				}
			}

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

        var result = '';

        var httpResponse = UrlFetchApp.fetch(url, {});

        if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();

        // console.log('result: ' + result);

        return result;
      }

      return method01(new String('https://www.twse.com.tw/fund/BFI82U?response=json&dayDate=' + trnDate));
    }
    
		var result = {
		
			"code": 0,
			"message": "",
			"data": {}
		};

    try {

      var vo = new tw.ace33022.vo.FoundationAmountDayTrnLog();

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

    function getHTML(trnDate) {

      function method01(url) {

        var result = '';

        var httpResponse = UrlFetchApp.fetch(url, {});

        if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();

        // console.log('result: ' + result);

        return result;
      }

      var url = new String('https://www.twse.com.tw/fund/MI_QFIIS?response=json&selectType=ALLBUT0999&date=' + trnDate);

      return method01(url).replace(/<.*>/g, '');
    }

    var arrData;
    var vo;

		var result = {
		
			"code": 0,
			"message": "",
			"data": []
		};

    arrData = (JSON.parse(getHTML(trnDate)))["data"];
    for (var index = 0; index < arrData.length; index++) {

      vo = new tw.ace33022.vo.ForeignHandedStockLog();

      vo.setTrnDate(trnDate);
      vo.setStockCode(new String(arrData[index][0]));
      vo.setPublishedQty(new Number((new String(arrData[index][3])).replace(new RegExp(',', 'gm'), '')));
      vo.setHandedQty(new Number((new String(arrData[index][5])).replace(new RegExp(',', 'gm'), '')));

      result["data"].push(vo.toJSONObject());
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

      function getHTML(trnDate, productCode) {

        var result = '';

				var year = trnDate.substr(0, 4);
				var month = trnDate.substr(4, 2);
				var day = trnDate.substr(6, 2);

        var options = {

          "method": "post",
          "contentType": "application/x-www-form-urlencoded",
          "payload": 'queryType=2' + '&' + 'marketCode=0' + '&' + 'dateaddcnt=' + '&' + 'commodity_id=' + productCode + '&' + 'commodity_id2=' + '&' + 'commodity_idt=' + productCode + '&' + 'commodity_id2t=' + '&' + 'commodity_id2t2=' + '&' + 'MarketCode=0' + '&' + 'queryDate=' + year + '/' + month + '/' + day
        };

        var httpResponse = UrlFetchApp.fetch('https://www.taifex.com.tw/cht/3/futDailyMarketReport', options);

        if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();

        // console.log('result: ' + result);

        return result;
      }

      var $ = Cheerio.load(getHTML(trnDate, productCode));

      // console.log($('table.w-1000:first').find('tbody').find('tr').length);

      $('table.w-1000:first').find('tbody').find('tr').each(function(index, element) {

        var tds = (Cheerio.load(element))('td');

        var vo;

        // console.log(tds.length);
        // console.log('index: ' + index);

        // console.log(tds.eq(0).text().trim());
        
        if (tds.eq(0).text().trim() == productCode) {

          vo = new tw.ace33022.vo.FutureDayTrnLog();

          vo.setTrnDate(trnDate);
          vo.setProductCode(productCode);

          if (tds.eq(1).text().trim() != '-') vo.setConMonth(tds.eq(1).text().trim());
          if (tds.eq(2).text().trim() != '-') vo.setOpenPoint(Number.parseFloat(tds.eq(2).text().trim()));
          if (tds.eq(3).text().trim() != '-') vo.setHighPoint(Number.parseFloat(tds.eq(3).text().trim()));
          if (tds.eq(4).text().trim() != '-') vo.setLowPoint(Number.parseFloat(tds.eq(4).text().trim()));
          if (tds.eq(5).text().trim() != '-') vo.setClosePoint(Number.parseFloat(tds.eq(5).text().trim()));
          if (tds.eq(11).text().trim() != '-') vo.setLastCalPoint(Number.parseFloat(tds.eq(11).text().trim()));
          // if (tds.eq(10).text().trim() != '-') vo.setTrnQty(Number.parseFloat(tds.eq(10).text().trim().replace(new RegExp(',', 'gm'), '')));
          // if (tds.eq(12).text().trim() != '-') vo.setStayQty(Number.parseFloat(tds.eq(12).text().trim().replace(new RegExp(',', 'gm'), '')));
          if (tds.eq(10).text().trim() != '-') vo.setTrnQty(Number.parseFloat(tds.eq(10).text().trim()));
          if (tds.eq(12).text().trim() != '-') vo.setStayQty(Number.parseFloat(tds.eq(12).text().trim()));

          result["data"].push(vo.toJSONObject());
        }
      });
    }

		var result = {
		
			"code": 0,
			"message": "",
			"data": []
		};

		try {
		
			addVO(result, trnDate, 'TX');		// 臺指期貨
			addVO(result, trnDate, 'MTX');	// 小型臺指期貨
			addVO(result, trnDate, 'TE');		// 電子期貨
			addVO(result, trnDate, 'TF');		// 金融期貨
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

        var options = {

          "method": "post",
          "contentType": "application/x-www-form-urlencoded",
          "payload": payload
        };

        // console.log(JSON.stringify(options));

        var httpResponse = UrlFetchApp.fetch(url, options);

        if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();

        // console.log('result: ' + result);

        return result;
      }
      
      // var url = new String('http://www.taifex.com.tw/chinese/3/7_12_3.asp');
      // var url = new String('http://www.taifex.com.tw/cht/3/futContractsDate');
      var url = new String('https://www.taifex.com.tw/cht/3/futContractsDate');

      var year = new String(trnDate.substr(0, 4));
      var month = new String(trnDate.substr(4, 2));
      var day = new String(trnDate.substr(6, 2));
      var payload = 'queryType=1' + '&' + 'goDay=' + '&' + 'doQuery=1' + '&' + 'dateaddcnt=' + '&' + 'queryDate=' + year + '/' + month + '/' + day  + '&' + 'commodityId=';

      return method01(url, payload);
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

			var html = getHTML(trnDate);

      // console.log(html);

			// 臺股期貨/電子期貨/金融期貨/小型臺指期貨
			["TX", "TE", "TF", "MTX"].forEach(function(productCode) {
			
				["foreign", "dealer", "invest"].forEach(function(foundation) {

          var po;

          // var $ = Cheerio.load(html);
          // var trs = $('table.w-1000:first').find('tbody').find('tr');
          var trs = (Cheerio.load(html))('table.w-1000:first').find('tbody').find('tr');

          var tr = 0;

          if (foundation == 'dealer') {

            po = new tw.ace33022.po.DealerFutureDayTrnLog();
            
            if (productCode == 'TX') tr = 0;        // 臺股期貨
            else if (productCode == 'TE') tr = 3;   // 電子期貨
            else if (productCode == 'TF') tr = 6;   // 金融期貨
            else if (productCode == 'MTX') tr = 9;	// 小型臺指期貨

            po.setTrnDate(trnDate);
            po.setProductCode(productCode);
              
            po.setBuyQty(parseFloat(new String(trs.eq(tr).find('td').eq(3).text().trim()).replace(/,/g, '')));         // 多方交易口數
            po.setBuyTotal(parseFloat(new String(trs.eq(tr).find('td').eq(4).text().trim()).replace(/,/g, '')));       // 多方交易金額
            po.setSellQty(parseFloat(new String(trs.eq(tr).find('td').eq(5).text().trim()).replace(/,/g, '')));        // 空方交易口數
            po.setSellTotal(parseFloat(new String(trs.eq(tr).find('td').eq(6).text().trim()).replace(/,/g, '')));      // 空方交易金額
            po.setStayBuyQty(parseFloat(new String(trs.eq(tr).find('td').eq(9).text().trim()).replace(/,/g, '')));     // 未平倉多方交易口數
            po.setStayBuyTotal(parseFloat(new String(trs.eq(tr).find('td').eq(10).text().trim()).replace(/,/g, '')));	// 未平倉多方交易金額
            po.setStaySellQty(parseFloat(new String(trs.eq(tr).find('td').eq(11).text().trim()).replace(/,/g, '')));   // 未平倉空方交易口數
            po.setStaySellTotal(parseFloat(new String(trs.eq(tr).find('td').eq(12).text().trim()).replace(/,/g, '')));	// 未平倉空方交易金額

            result["data"]["dealer"].push(po.toJSONObject());
          }
          else if (foundation == 'invest') {
          
            po = new tw.ace33022.po.InvestFutureDayTrnLog();
          
            if (productCode == 'TX') tr = 1;        // 臺股期貨
            else if (productCode == 'TE') tr = 4;   // 電子期貨
            else if (productCode == 'TF') tr = 7;  // 金融期貨
            else if (productCode == 'MTX') tr = 10;	// 小型臺指期貨

            po.setTrnDate(trnDate);
            po.setProductCode(productCode);
            
            po.setBuyQty(parseFloat(new String(trs.eq(tr).find('td').eq(1).text().trim()).replace(/,/g, '')));         // 多方交易口數
            po.setBuyTotal(parseFloat(new String(trs.eq(tr).find('td').eq(2).text().trim()).replace(/,/g, '')));       // 多方交易金額
            po.setSellQty(parseFloat(new String(trs.eq(tr).find('td').eq(3).text().trim()).replace(/,/g, '')));        // 空方交易口數
            po.setSellTotal(parseFloat(new String(trs.eq(tr).find('td').eq(4).text().trim()).replace(/,/g, '')));      // 空方交易金額
            po.setStayBuyQty(parseFloat(new String(trs.eq(tr).find('td').eq(7).text().trim()).replace(/,/g, '')));     // 未平倉多方交易口數
            po.setStayBuyTotal(parseFloat(new String(trs.eq(tr).find('td').eq(8).text().trim()).replace(/,/g, '')));	// 未平倉多方交易金額
            po.setStaySellQty(parseFloat(new String(trs.eq(tr).find('td').eq(9).text().trim()).replace(/,/g, '')));   // 未平倉空方交易口數
            po.setStaySellTotal(parseFloat(new String(trs.eq(tr).find('td').eq(10).text().trim()).replace(/,/g, '')));	// 未平倉空方交易金額

            result["data"]["invest"].push(po.toJSONObject());
          }
          else if (foundation == 'foreign') {
          
            po = new tw.ace33022.po.ForeignFutureDayTrnLog();
          
            if (productCode == 'TX') tr = 2;        // 臺股期貨
            else if (productCode == 'TE') tr = 5;   // 電子期貨
            else if (productCode == 'TF') tr = 8;  // 金融期貨
            else if (productCode == 'MTX') tr = 11;	// 小型臺指期貨

            po.setTrnDate(trnDate);
            po.setProductCode(productCode);

            po.setBuyQty(parseFloat(new String(trs.eq(tr).find('td').eq(1).text().trim()).replace(/,/g, '')));         // 多方交易口數
            po.setBuyTotal(parseFloat(new String(trs.eq(tr).find('td').eq(2).text().trim()).replace(/,/g, '')));       // 多方交易金額
            po.setSellQty(parseFloat(new String(trs.eq(tr).find('td').eq(3).text().trim()).replace(/,/g, '')));        // 空方交易口數
            po.setSellTotal(parseFloat(new String(trs.eq(tr).find('td').eq(4).text().trim()).replace(/,/g, '')));      // 空方交易金額
            po.setStayBuyQty(parseFloat(new String(trs.eq(tr).find('td').eq(7).text().trim()).replace(/,/g, '')));     // 未平倉多方交易口數
            po.setStayBuyTotal(parseFloat(new String(trs.eq(tr).find('td').eq(8).text().trim()).replace(/,/g, '')));	// 未平倉多方交易金額
            po.setStaySellQty(parseFloat(new String(trs.eq(tr).find('td').eq(9).text().trim()).replace(/,/g, '')));   // 未平倉空方交易口數
            po.setStaySellTotal(parseFloat(new String(trs.eq(tr).find('td').eq(10).text().trim()).replace(/,/g, '')));	// 未平倉空方交易金額

            result["data"]["foreign"].push(po.toJSONObject());
          }
        });
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
	 * @description 期貨大額交易人未沖銷部位資料
	 *
	 * @version 2015/01/22 ace 初始版本。
	 *
	 * @author ace
	 *
	 */
  function getFutureLargeStayLog(trnDate) {

    function getHTML(trnDate, productCode) {
    
      function method01(url, payload) {

        var result = '';

        var options = {

          "method": "post",
          "contentType": "application/x-www-form-urlencoded",
          "payload": payload
        };

        // console.log(JSON.stringify(options));

        var httpResponse = UrlFetchApp.fetch(url, options);

        if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();

        // console.log('result: ' + result);

        return result;
      }
      
      var url = new String('https://www.taifex.com.tw/cht/3/largeTraderFutQry');

      var year = new String(parseInt(trnDate.substring(0, 4), 10));
      var month = new String(parseInt(trnDate.substring(4, 6), 10));
      var day = new String(parseInt(trnDate.substring(6, 8), 10));

      var payload = 'datecount=&'
                  + 'contractId2=&'
                  + 'queryDate=' + year + '/' + month + '/' + day + '&'
                  + 'contractId=' + productCode;

      return method01(url, payload);
    }

    function addFutureLargeStayLog(result, html, trnDate, productCode) {

      var trs = (Cheerio.load(html))('table.w-730:first').find('tbody').find('tr');
    
      var index = 0;
      var conMonth = '';
      var temp;
      var po;

      if (trs.length != 0) {

        index = 0;
      
        po = new tw.ace33022.po.FutureLargeStayLog();
      
        po.setTrnDate(trnDate);
        po.setProductCode(productCode);
      
        conMonth = new String(trs.eq(index).find('td').eq(1).text().trim());  // 契約月份
        po.setConMonth(conMonth.replace(new RegExp('\n', 'gm'), '').replace(new RegExp('\t', 'gm'), '').replace(new RegExp(' ', 'gm'), ''));
      
        temp = new String(trs.eq(index).find('td').eq(2).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreFiveBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(2).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreFiveJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(4).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreTenBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(4).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreTenJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(6).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreFiveSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(6).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreFiveJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(8).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreTenSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(8).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreTenJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(10).text().trim());
        po.setStayQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        // 取得之到期月份屬於無效資料則略過。
        if (po.getConMonth() != '-') result["data"]["future_large_stay_log"].push(po.toJSONObject());
      
        // 2013/08/06 臺股期貨增加週別交易。
        if (productCode == 'TX') {

          index = 1;
      
          po = new tw.ace33022.po.FutureLargeStayLog();

          po.setTrnDate(trnDate);
          po.setProductCode(productCode);
      
          conMonth = new String(trs.eq(index).find('td').eq(0).text().trim());  // 契約月份
          po.setConMonth(conMonth.replace(new RegExp('\n', 'gm'), '').replace(new RegExp('\t', 'gm'), '').replace(new RegExp(' ', 'gm'), ''));
      
          temp = new String(trs.eq(index).find('td').eq(1).text().trim());
          temp = temp.substring(0, temp.indexOf('('));
          po.setPreFiveBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(1).text().trim());
          temp = temp.substring(temp.indexOf('(') + 1);
          temp = temp.substring(0, temp.indexOf(')'));
          po.setPreFiveJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(3).text().trim());
          temp = temp.substring(0, temp.indexOf('('));
          po.setPreTenBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(3).text().trim());
          temp = temp.substring(temp.indexOf('(') + 1);
          temp = temp.substring(0, temp.indexOf(')'));
          po.setPreTenJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(5).text().trim());
          temp = temp.substring(0, temp.indexOf('('));
          po.setPreFiveSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(5).text().trim());
          temp = temp.substring(temp.indexOf('(') + 1);
          temp = temp.substring(0, temp.indexOf(')'));
          po.setPreFiveJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(7).text().trim());
          temp = temp.substring(0, temp.indexOf('('));
          po.setPreTenSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(7).text().trim());
          temp = temp.substring(temp.indexOf('(') + 1);
          temp = temp.substring(0, temp.indexOf(')'));
          po.setPreTenJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          temp = new String(trs.eq(index).find('td').eq(9).text().trim());
          po.setStayQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
          result["data"]["future_large_stay_log"].push(po.toJSONObject());
        }
      }
    }

    function addFutureLargeStayAllLog(result, html, trnDate, productCode) {

      var trs = (Cheerio.load(html))('table.w-730:first').find('tbody').find('tr');
    
      var index = 1;
      var temp;
    
      if (trs.length != 0) {
      
        // 2013/08/06 臺股期貨增加週別交易。
        if (productCode == 'TX') index = 2;

        po = new tw.ace33022.po.FutureLargeStayAllLog();
      
        po.setTrnDate(trnDate);
        po.setProductCode(productCode);
      
        temp = new String(trs.eq(index).find('td').eq(1).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreFiveBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(1).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreFiveJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(3).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreTenBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(3).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreTenJurBuy(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(5).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreFiveSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(5).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreFiveJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(7).text().trim());
        temp = temp.substring(0, temp.indexOf('('));
        po.setPreTenSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(7).text().trim());
        temp = temp.substring(temp.indexOf('(') + 1);
        temp = temp.substring(0, temp.indexOf(')'));
        po.setPreTenJurSell(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        temp = new String(trs.eq(index).find('td').eq(9).text().trim());
        po.setStayQty(parseFloat(temp.replace(new RegExp(',', 'gm'), '')));
      
        result["data"]["future_large_stay_all_log"].push(po.toJSONObject());
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

      // 臺股期貨/電子期貨/金融期貨
      ["TX", "TE", "TF"].forEach(function(productCode) {
      
        var html = getHTML(trnDate, productCode);
        
        addFutureLargeStayLog(result, html, trnDate, productCode);
        addFutureLargeStayAllLog(result, html, trnDate, productCode);
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
		 * @see <a href="https://openhome.cc/Gossip/Encoding/URLEncoding.html">URL 編碼</a>
		 *
		 */
		function getHTML(trnDate, productCode) {
		
			function method01(url, payload) {
			
				var result = '';
			
        var options = {

          "method": "post",
          "contentType": "application/x-www-form-urlencoded",
          "payload": payload
        };

        // console.log(JSON.stringify(options));
				
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
			
			return method01(url, postData);
		}
			
		function addOptionDayTrnLog(arrayOptionCallDayTrnLog, arrayOptionPutDayTrnLog, trnDate, productCode) {
		
      var $ = Cheerio.load(getHTML(trnDate, productCode));
      var trs = $('.table_f').find('tbody').find('tr');

      var index;
      var vo;
      var trnType;
      var temp;

      // console.log(trs.length);

      for (index = 0; index < trs.length; index++) {

        // console.log(trs.eq(index).find('td').eq(0).text().trim().toUpperCase());

        if ((new String(trs.eq(index).find('td').eq(0).text())).trim().toUpperCase() == productCode) {

          trnType = (new String(trs.eq(index).find('td').eq(4).text())).toUpperCase();

					if (trnType == 'CALL') {
				
						vo = new tw.ace33022.vo.OptionCallDayTrnLog();
					}	
					else if (trnType == 'PUT') {
				
						vo = new tw.ace33022.vo.OptionPutDayTrnLog();
					}	

					vo.setTrnDate(trnDate);
					vo.setConMonth((new String(trs.eq(index).find('td').eq(1).text())).trim());
					vo.setProductCode(productCode);
					vo.setStrikePrice(new String(trs.eq(index).find('td').eq(3).text()));

          temp = (new String(trs.eq(index).find('td').eq(5).text())).trim();
					if (temp != '-') vo.setOpenPrice(parseFloat(temp));
				
          temp = (new String(trs.eq(index).find('td').eq(6).text())).trim();
					if (temp != '-') vo.setHighPrice(parseFloat(temp));
				
          temp = (new String(trs.eq(index).find('td').eq(7).text())).trim();
					if (temp != '-') vo.setLowPrice(parseFloat(temp));
				
          temp = (new String(trs.eq(index).find('td').eq(8).text())).trim();
					if (temp != '-') vo.setClosePrice(parseFloat(temp));
				
          temp = (new String(trs.eq(index).find('td').eq(9).text())).trim();
					if (temp != '-') vo.setLastCalPrice(parseFloat(temp));
				
          temp = (new String(trs.eq(index).find('td').eq(14).text())).trim();
					if (temp != '-') vo.setTrnQty(parseFloat(temp));
				
          temp = (new String(trs.eq(index).find('td').eq(15).text())).trim();
					if (temp != '-') vo.setStayQty(parseFloat(temp));

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
		
			addOptionDayTrnLog(result["data"]["option_call_day_trn_log"], result["data"]["option_put_day_trn_log"], trnDate, 'TXO');	// 臺指選擇權
			addOptionDayTrnLog(result["data"]["option_call_day_trn_log"], result["data"]["option_put_day_trn_log"], trnDate, 'TEO');	// 電子選擇權
			addOptionDayTrnLog(result["data"]["option_call_day_trn_log"], result["data"]["option_put_day_trn_log"], trnDate, 'TFO');	// 金融選擇權
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
		
      function method01(url, payload) {

				var result = '';
			
        var options = {

          "method": "post",
          "contentType": "application/x-www-form-urlencoded",
          "payload": payload
        };

        // console.log(JSON.stringify(options));
				
        var httpResponse = UrlFetchApp.fetch(url, options);
				
				if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();
			
				return result;
      }
				
			// var url = new String('http://www.taifex.com.tw/chinese/3/7_12_5.asp');
			// var url = new String('http://www.taifex.com.tw/cht/3/callsAndPutsDate');
			var url = new String('https://www.taifex.com.tw/cht/3/callsAndPutsDate');

			var year = trnDate.substr(0, 4);
			var month = trnDate.substr(4, 2);
			var day = trnDate.substr(6, 2);
			
			// var params = new String('goday=&syear=' + year + '&smonth=' + month + '&sday=' + day + '&COMMODITY_ID=');
			// var postData = new String('queryType=1&goDay=&doQuery=1&dateaddcnt=&queryDate=' + year + '/' + month + '/' + day + '&commodityId=');
      var postData = 'queryType=1&goDay=&doQuery=1&dateaddcnt=&queryDate=' + year + '/' + month + '/' + day + '&commodityId=';

			return method01(url, postData);
		}
		
		function addFoundationOptionDayTrnLog(arrayDealerOptin, arrayInvestOptin, arrayForeignOptin, html, productCode, foundation) {
		
      var $ = Cheerio.load(html);
      var trs = $('table').eq(0).find('tr');

			var tr = new Number(0);
			var vo;

      // console.log(trs.length);

			if (foundation == 'dealer') {
			
				vo = new tw.ace33022.vo.DealerOptionDayTrnLog();
			
				if (productCode == 'TXO') tr = 3;       // 臺指選擇權
				else if (productCode == 'TEO') tr = 9;  // 電子選擇權
				else if (productCode == 'TFO') tr = 15;	// 金融選擇權

				vo.setTrnDate(trnDate);
				vo.setProductCode(productCode);

				// CALL
				vo.setCallBuyQty(parseFloat(trs.eq(tr).find('td').eq(4).text().trim().replace(/,/g, '')));    // 買方交易口數
				vo.setCallBuyTotal(parseFloat(trs.eq(tr).find('td').eq(5).text().trim().replace(/,/g, '')));  // 買方交易金額
				vo.setCallSellQty(parseFloat(trs.eq(tr).find('td').eq(6).text().trim().replace(/,/g, '')));   // 賣方交易口數
				vo.setCallSellTotal(parseFloat(trs.eq(tr).find('td').eq(7).text().trim().replace(/,/g, ''))); // 賣方交易金額
				vo.setStayCallBuyQty(parseFloat(trs.eq(tr).find('td').eq(10).text().trim().replace(/,/g, '')));     // 買方未平倉口數
				vo.setStayCallBuyTotal(parseFloat(trs.eq(tr).find('td').eq(11).text().trim().replace(/,/g, '')));   // 買方未平倉金額
				vo.setStayCallSellQty(parseFloat(trs.eq(tr).find('td').eq(12).text().trim().replace(/,/g, '')));    // 賣方未平倉口數
				vo.setStayCallSellTotal(parseFloat(trs.eq(tr).find('td').eq(13).text().trim().replace(/,/g, '')));  // 賣方未平倉金額

				tr += 3;

				// PUT
				vo.setPutBuyQty(parseFloat(trs.eq(tr).find('td').eq(2).text().trim().replace(/,/g, '')));     // 買方交易口數
				vo.setPutBuyTotal(parseFloat(trs.eq(tr).find('td').eq(3).text().trim().replace(/,/g, '')));   // 買方交易金額
				vo.setPutSellQty(parseFloat(trs.eq(tr).find('td').eq(4).text().trim().replace(/,/g, '')));    // 賣方交易口數
				vo.setPutSellTotal(parseFloat(trs.eq(tr).find('td').eq(5).text().trim().replace(/,/g, '')));  // 賣方交易金額
				vo.setStayPutBuyQty(parseFloat(trs.eq(tr).find('td').eq(8).text().trim().replace(/,/g, '')));     // 買方未平倉口數
				vo.setStayPutBuyTotal(parseFloat(trs.eq(tr).find('td').eq(9).text().trim().replace(/,/g, '')));   // 買方未平倉金額
				vo.setStayPutSellQty(parseFloat(trs.eq(tr).find('td').eq(10).text().trim().replace(/,/g, '')));   // 賣方未平倉口數
				vo.setStayPutSellTotal(parseFloat(trs.eq(tr).find('td').eq(11).text().trim().replace(/,/g, ''))); // 賣方未平倉金額
				
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
				vo.setCallBuyQty(parseFloat(trs.eq(tr).find('td').eq(1).text().trim().replace(/,/g, '')));          // 買方交易口數
				vo.setCallBuyTotal(parseFloat(trs.eq(tr).find('td').eq(2).text().trim().replace(/,/g, '')));        // 買方交易金額
				vo.setCallSellQty(parseFloat(trs.eq(tr).find('td').eq(3).text().trim().replace(/,/g, '')));         // 賣方交易口數
				vo.setCallSellTotal(parseFloat(trs.eq(tr).find('td').eq(4).text().trim().replace(/,/g, '')));       // 賣方交易金額
				vo.setStayCallBuyQty(parseFloat(trs.eq(tr).find('td').eq(7).text().trim().replace(/,/g, '')));      // 買方未平倉口數
				vo.setStayCallBuyTotal(parseFloat(trs.eq(tr).find('td').eq(8).text().trim().replace(/,/g, '')));    // 買方未平倉金額
				vo.setStayCallSellQty(parseFloat(trs.eq(tr).find('td').eq(9).text().trim().replace(/,/g, '')));     // 賣方未平倉口數
				vo.setStayCallSellTotal(parseFloat(trs.eq(tr).find('td').eq(10).text().trim().replace(/,/g, '')));  // 賣方未平倉金額
	
				tr += 3;
	
				// PUT
				vo.setPutBuyQty(parseFloat(trs.eq(tr).find('td').eq(1).text().trim().replace(/,/g, '')));         	// 買方交易口數
				vo.setPutBuyTotal(parseFloat(trs.eq(tr).find('td').eq(2).text().trim().replace(/,/g, '')));       	// 買方交易金額
				vo.setPutSellQty(parseFloat(trs.eq(tr).find('td').eq(3).text().trim().replace(/,/g, '')));        	// 賣方交易口數
				vo.setPutSellTotal(parseFloat(trs.eq(tr).find('td').eq(4).text().trim().replace(/,/g, '')));      	// 賣方交易金額
				vo.setStayPutBuyQty(parseFloat(trs.eq(tr).find('td').eq(7).text().trim().replace(/,/g, '')));     	// 買方未平倉口數
				vo.setStayPutBuyTotal(parseFloat(trs.eq(tr).find('td').eq(8).text().trim().replace(/,/g, '')));   	// 買方未平倉金額
				vo.setStayPutSellQty(parseFloat(trs.eq(tr).find('td').eq(9).text().trim().replace(/,/g, '')));   	  // 賣方未平倉口數
				vo.setStayPutSellTotal(parseFloat(trs.eq(tr).find('td').eq(10).text().trim().replace(/,/g, '')));	  // 賣方未平倉金額
				
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
				vo.setCallBuyQty(parseFloat(trs.eq(tr).find('td').eq(1).text().trim().replace(/,/g, '')));          // 買方交易口數
				vo.setCallBuyTotal(parseFloat(trs.eq(tr).find('td').eq(2).text().trim().replace(/,/g, '')));        // 買方交易金額
				vo.setCallSellQty(parseFloat(trs.eq(tr).find('td').eq(3).text().trim().replace(/,/g, '')));         // 賣方交易口數
				vo.setCallSellTotal(parseFloat(trs.eq(tr).find('td').eq(4).text().trim().replace(/,/g, '')));       // 賣方交易金額
				vo.setStayCallBuyQty(parseFloat(trs.eq(tr).find('td').eq(7).text().trim().replace(/,/g, '')));      // 買方未平倉口數
				vo.setStayCallBuyTotal(parseFloat(trs.eq(tr).find('td').eq(8).text().trim().replace(/,/g, '')));    // 買方未平倉金額
				vo.setStayCallSellQty(parseFloat(trs.eq(tr).find('td').eq(9).text().trim().replace(/,/g, '')));     // 賣方未平倉口數
				vo.setStayCallSellTotal(parseFloat(trs.eq(tr).find('td').eq(10).text().trim().replace(/,/g, '')));  // 賣方未平倉金額
	
				tr += 3;
	
				// PUT
				vo.setPutBuyQty(parseFloat(trs.eq(tr).find('td').eq(1).text().trim().replace(/,/g, '')));         	// 買方交易口數
				vo.setPutBuyTotal(parseFloat(trs.eq(tr).find('td').eq(2).text().trim().replace(/,/g, '')));       	// 買方交易金額
				vo.setPutSellQty(parseFloat(trs.eq(tr).find('td').eq(3).text().trim().replace(/,/g, '')));        	// 賣方交易口數
				vo.setPutSellTotal(parseFloat(trs.eq(tr).find('td').eq(4).text().trim().replace(/,/g, '')));      	// 賣方交易金額
				vo.setStayPutBuyQty(parseFloat(trs.eq(tr).find('td').eq(7).text().trim().replace(/,/g, '')));     	// 買方未平倉口數
				vo.setStayPutBuyTotal(parseFloat(trs.eq(tr).find('td').eq(8).text().trim().replace(/,/g, '')));   	// 買方未平倉金額
				vo.setStayPutSellQty(parseFloat(trs.eq(tr).find('td').eq(9).text().trim().replace(/,/g, '')));   	  // 賣方未平倉口數
				vo.setStayPutSellTotal(parseFloat(trs.eq(tr).find('td').eq(10).text().trim().replace(/,/g, '')));	  // 賣方未平倉金額
				
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

			var html = getHTML(trnDate);

      // Logger.log(html);

			// 臺指選擇權, 電子選擇權, 金融選擇權
			["TXO", "TEO", "TFO"].forEach(function(productCode) {
			
        // 自營商、投信、外資
				["dealer", "invest", "foreign"].forEach(function(foundation) {addFoundationOptionDayTrnLog(result["data"]["dealer"], result["data"]["invest"], result["data"]["foreign"], html, productCode, foundation);});
			});
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
		
			function method01(url, payload) {
			
				var result = '';
			
        var options = {

          "method": "post",
          "contentType": "application/x-www-form-urlencoded",
          "payload": payload
        };

        // console.log(JSON.stringify(options));
				
        var httpResponse = UrlFetchApp.fetch(url, options);
				
				if (httpResponse.getResponseCode() == 200) result = httpResponse.getContentText();
			
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
		
		
			return method01(url, postData);
		}
		
		function addOptionLargeStayLog(arrayOptionCallLargeStayLog, arrayOptionPutLargeStayLog, html, trnDate, productCode, trnType) {
		
			// 選擇權大額交易人未沖銷部位資料

      var $ = Cheerio.load(getHTML(trnDate, productCode));
      var trs = $('.table_f').eq(0).find('tr');
			var tds;
		
			var index = new Number(0);
			var temp;
			
			var vo;

      // console.log(trs.length);

			if (trs.length != 0) {
			
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

        tds = trs.eq(index).find('td');

        vo.setTrnDate(trnDate);

        temp = '';  // 契約月份
				if (productCode == 'TXO') {
			
					temp = tds.eq(0).text().trim();
				}
				else {
			
					temp = tds.eq(1).text().trim();
				}

				// vo.setConMonth(temp.replace(new RegExp(' ', 'gm'), ''));
        vo.setConMonth(temp.replace(new RegExp(' ', 'gm'), '').replace(/\t/g, '').replace(/\n/g, ''));
			
				vo.setProductCode(productCode);
			
				if (productCode == 'TXO') {

          // temp = tds.eq(1).text().substring(0, tds.eq(1).text().indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(/,/g, '').trim();
          temp = tds.eq(1).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreFiveBuy(parseFloat(temp));
			
          temp = tds.eq(1).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreFiveJurBuy(parseFloat(temp));

          temp = tds.eq(3).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreTenBuy(parseFloat(temp));
			
          temp = tds.eq(3).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreTenJurBuy(parseFloat(temp));

          temp = tds.eq(5).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreFiveSell(parseFloat(temp));
			
          temp = tds.eq(5).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreFiveJurSell(parseFloat(temp));

          temp = tds.eq(7).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreTenSell(parseFloat(temp));
			
          temp = tds.eq(7).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreTenJurSell(parseFloat(temp));

          temp = tds.eq(9).text().replace(new RegExp(',', 'gm'), '');
          vo.setStayQty(parseFloat(temp));
				}
				else {
			
          temp = tds.eq(2).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreFiveBuy(parseFloat(temp));

          temp = tds.eq(2).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreFiveJurBuy(parseFloat(temp));

          temp = tds.eq(4).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreTenBuy(parseFloat(temp));

          temp = tds.eq(4).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreTenJurBuy(parseFloat(temp));

          temp = tds.eq(6).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreFiveSell(parseFloat(temp));

          temp = tds.eq(6).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreFiveJurSell(parseFloat(temp));

          temp = tds.eq(8).text();
          temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

          vo.setPreTenSell(parseFloat(temp));

          temp = tds.eq(8).text();
          temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

          vo.setPreTenJurSell(parseFloat(temp));

					temp = tds.eq(10).text().replace(new RegExp(',', 'gm'), '');
					vo.setStayQty(parseFloat(temp));
				}
				
				if (trnType == 'CALL') {
				
					arrayOptionCallLargeStayLog.push(vo.toJSONObject());
				}
				else if (trnType == 'PUT') {
				
					arrayOptionPutLargeStayLog.push(vo.toJSONObject());
				}
			}
		}

		function addOptionLargeStayAllLog(arrayOptionCallLargeStayLog, arrayOptionPutLargeStayLog, html, trnDate, productCode, trnType) {

			// 選擇權大額交易人未沖銷部位資料(全部月份)

      var $ = Cheerio.load(getHTML(trnDate, productCode));
      var trs = $('.table_f').eq(0).find('tr');
			var tds;

			var vo;
			
			var index = new Number(0);
			var temp;
		
			if (trs.length != 0) {
			
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
			
        tds = trs.eq(index).find('td');

				vo.setTrnDate(trnDate);
				vo.setProductCode(productCode);
			
        temp = tds.eq(1).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreFiveBuy(parseFloat(temp));

        temp = tds.eq(1).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreFiveJurBuy(parseFloat(temp));

        temp = tds.eq(3).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreTenBuy(parseFloat(temp));

        temp = tds.eq(3).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreTenJurBuy(parseFloat(temp));

        temp = tds.eq(5).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreFiveSell(parseFloat(temp));

        temp = tds.eq(5).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreFiveJurSell(parseFloat(temp));

        temp = tds.eq(7).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreTenSell(parseFloat(temp));

        temp = tds.eq(7).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreTenJurSell(parseFloat(temp));

				temp = new String(tds.eq(9).text().replace(new RegExp(',', 'gm'), ''));
				vo.setStayQty(parseFloat(temp));

				if (trnType == 'CALL') {
		
					arrayOptionCallLargeStayLog.push(vo.toJSONObject());
				}  
				else if (trnType == 'PUT') {
			
					arrayOptionPutLargeStayLog.push(vo.toJSONObject());
				}  
			}
		}

		function addWeekendOptionLargeStayLog(arrayOptionCallLargeStayLog, arrayOptionPutLargeStayLog, html, trnDate, productCode, trnType) {
		
			// 選擇權大額交易人周選擇權未沖銷部位資料

      var $ = Cheerio.load(getHTML(trnDate, productCode));
      var trs = $('.table_f').eq(0).find('tr');
			var tds;
		
			var index = 0;
			var temp;
			
			var vo;

      // console.log(trs.length);

			if (trs.length != 0) {
			
				if (trnType == 'CALL') {
				
					vo = new tw.ace33022.vo.OptionCallLargeStayLog();

          index = 3;
				}  
				else if (trnType == 'PUT') {
				
					vo = new tw.ace33022.vo.OptionPutLargeStayLog();

          index = 6;
				}

        tds = trs.eq(index).find('td');

        vo.setTrnDate(trnDate);
        vo.setConMonth('WEEKEND');
				vo.setProductCode(productCode);

        temp = tds.eq(2).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreFiveBuy(parseFloat(temp));
    
        temp = tds.eq(2).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreFiveJurBuy(parseFloat(temp));

        temp = tds.eq(4).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreTenBuy(parseFloat(temp));
    
        temp = tds.eq(4).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreTenJurBuy(parseFloat(temp));

        temp = tds.eq(6).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreFiveSell(parseFloat(temp));
    
        temp = tds.eq(6).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreFiveJurSell(parseFloat(temp));

        temp = tds.eq(8).text();
        temp = temp.substring(0, temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').trim();

        vo.setPreTenSell(parseFloat(temp));
    
        temp = tds.eq(8).text();
        temp = temp.substring(temp.indexOf('(')).replace(/\t/g, '').replace(/\n/g, '').replace(new RegExp(',', 'gm'), '').replaceAll('(', '').replaceAll(')', '').trim();

        vo.setPreTenJurSell(parseFloat(temp));

        temp = tds.eq(10).text().replace(new RegExp(',', 'gm'), '');
        vo.setStayQty(parseFloat(temp));

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

			// 臺指選擇權、電子選擇權、金融選擇權
			["TXO", "TEO", "TFO"].forEach(function(productCode) {
			
				var html = getHTML(trnDate, productCode);
				
				["CALL", "PUT"].forEach(function(trnType) {
				
					addOptionLargeStayLog(result["data"]["option_call_large_stay_log"], result["data"]["option_put_large_stay_log"], html, trnDate, productCode, trnType);
					addOptionLargeStayAllLog(result["data"]["option_call_large_stay_all_log"], result["data"]["option_put_large_stay_all_log"], html, trnDate, productCode, trnType);

          // 台指選擇權獨立提供周選擇權。
          if (productCode == 'TXO') {

					  addWeekendOptionLargeStayLog(result["data"]["option_call_large_stay_log"], result["data"]["option_put_large_stay_log"], html, trnDate, productCode, trnType);
          }
				});
			});
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
	
		// return (((new Date()).getHours() >= 14) || ((new Date()).getHours() <= 5)) ? '1' : '0';
		return tw.ace33022.functions.Stock.getMarketType();
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
	function getCurrTaifexMYCode() {return tw.ace33022.functions.Stock.getCurrTaifexMYCode();}

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
	 * @comment 2022/07/19 ace "TXO-Q"、"TXO-R"是選擇權的交易報價，但是跟現貨資料幾乎一致？用途待確認！
	 * @comment 2025/08/30 ace "-S"是現貨交易報價，例如"TXO-S"是期貨的現貨交易報價(加權指數報價)！
	 * @comment 2025/09/04 ace 期貨交易所提供的API可以一次查詢多筆資料，若是只查詢一項(比如台指期)的情況，回傳data資料是否採用陣列？！
	 * 
	 */
	function getQuoteDetail(productCode) {
	
		function getData01(postData) {
		
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
  function getQuoteListOption(parameter) {
	
		function getData01(productCode, conMonth, marketType) {
		
			var result = '';
			
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
		
			"code": 0,
			"message": "",
			"data": {}
		};
		
    try {

			/*
			[
				{"product_code": "TX", "con_month": ["202604", "202605"]},
				{"product_code": "TE", "con_month": ["202604"]}
			];
			*/

      JSON.parse(parameter).forEach(function(element, index) {

        var productCode = element["product_code"];

        if (typeof result["data"][productCode] == 'undefined') result["data"][productCode] = {"con_month": []};

        element["con_month"].forEach(function(element, index) {

          var conMonth = element;

          // Logger.log(productCode);
          // Logger.log(conMonth);

          result["data"][productCode]["con_month"].push(conMonth);
          result["data"][productCode][conMonth] = {"call": [], "put": []};

          JSON.parse(getData01(productCode + 'O', conMonth, getMarketType()))["RtData"]["QuoteList"].forEach(function(element, index) {

            var vo;

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
              
              result["data"][productCode][conMonth]["call"].push(vo.toJSONObject());
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
              
              result["data"][productCode][conMonth]["put"].push(vo.toJSONObject());
            }
          });
        });
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
	
		if (typeof root.tw.ace33022.google.apps.functions.Stock == 'undefined') root.tw.ace33022.google.apps.functions.Stock = {};
		
    root.tw.ace33022.google.apps.functions.Stock.getTWSEDayTrnLog = getTWSEDayTrnLog;
    root.tw.ace33022.google.apps.functions.Stock.getFoundationAmountDayTrnLog = getFoundationAmountDayTrnLog;
    root.tw.ace33022.google.apps.functions.Stock.getForeignHandedStockLog = getForeignHandedStockLog;
    root.tw.ace33022.google.apps.functions.Stock.getFutureDayTrnLog = getFutureDayTrnLog;
    root.tw.ace33022.google.apps.functions.Stock.getFoundationFutureDayTrnLog = getFoundationFutureDayTrnLog;
    root.tw.ace33022.google.apps.functions.Stock.getFutureLargeStayLog = getFutureLargeStayLog;
    root.tw.ace33022.google.apps.functions.Stock.getOptionDayTrnLog = getOptionDayTrnLog;
    root.tw.ace33022.google.apps.functions.Stock.getFoundationOptionDayTrnLog = getFoundationOptionDayTrnLog;
    root.tw.ace33022.google.apps.functions.Stock.getOptionLargeStayLog = getOptionLargeStayLog;
    root.tw.ace33022.google.apps.functions.Stock.getConMonth = getConMonth;
    root.tw.ace33022.google.apps.functions.Stock.getQuoteDetail = getQuoteDetail;
    root.tw.ace33022.google.apps.functions.Stock.getQuoteListOption = getQuoteListOption;
	}
})(this);