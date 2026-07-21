/**
 *
 * @description Lottery
 *
 * @version 2026/05/26 ace 初始版本。
 *
 * @author ace
 *
 */
(function(root) {

  var URL_LOTTERY539 = "https://api.taiwanlottery.com/TLCAPIWeB/Lottery/Daily539Result";
	var URL_LOTTERY649 = "https://api.taiwanlottery.com/TLCAPIWeB/Lottery/Lotto649Result";
	
	function getLottery539() {
	
		var result = {
		
			"code": 1,
			"message": "",
			"data": []
		};

		var vo;

		var httpResponse;
		
		if (arguments.length == 0) {
		
			// @memo 2026/05/26 ace 取最新期數彩券資料。
			httpResponse = UrlFetchApp.fetch(URL_LOTTERY539 + '?period&month=' + Utilities.formatDate(new Date(), 'GMT+08:00', 'yyyy-MM') + '&endMonth&pageNum=1&pageSize=200');
		}
		else {
		
			httpResponse = UrlFetchApp.fetch(URL_LOTTERY539 + '?period=' + arguments[0] + '&month&endMonth&pageNum=1&pageSize=200');
		}

		if (httpResponse.getResponseCode() == 200) {

			// console.log(httpResponse.getContentText());

			if (JSON.parse(httpResponse.getContentText())["rtCode"] == 0) {

				if (JSON.parse(httpResponse.getContentText())["content"]["daily539Res"].length != 0) {

					vo = new tw.ace33022.vo.Lottery539Log();

					vo.setPeriod((new String(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["period"])).valueOf());
					vo.setDrawDate(Utilities.formatDate(Utilities.parseDate(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["lotteryDate"], 'GMT+08:00', 'yyyy-MM-dd\'T\'HH:mm:ss'), 'GMT+08:00', 'yyyyMMdd'));
					vo.setNum01(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][0]));
					vo.setNum02(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][1]));
					vo.setNum03(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][2]));
					vo.setNum04(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][3]));
					vo.setNum05(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][4]));
					vo.setPrize01(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539JackpotAssign"]["winnerCount"]);
					vo.setPrize02(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539SecondAssign"]["winnerCount"]);
					vo.setPrize03(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539ThirdAssign"]["winnerCount"]);
					vo.setPrize04(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539FourthAssign"]["winnerCount"]);

					result["data"].push(vo.toJSONObject());

					result["code"] = 0;
				}
			}
		}

		return JSON.stringify(result);
	}

	function getLottery649() {
	
		var result = {
		
			"code": 1,
			"message": "",
			"data": []
		};

		var vo;

		var httpResponse;
		
		if (arguments.length == 0) {
		
			// @memo 2026/05/26 ace 取最新期數彩券資料。
			httpResponse = UrlFetchApp.fetch(URL_LOTTERY649 + '?period&month=' + Utilities.formatDate(new Date(), 'GMT+08:00', 'yyyy-MM') + '&endMonth&pageNum=1&pageSize=200');
		}
		else {
		
			httpResponse = UrlFetchApp.fetch(URL_LOTTERY649 + '?period=' + arguments[0] + '&month&endMonth&pageNum=1&pageSize=200');
		}

		if (httpResponse.getResponseCode() == 200) {

			// console.log(httpResponse.getContentText());

			if (JSON.parse(httpResponse.getContentText())["rtCode"] == 0) {

				if (JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"].length != 0) {

					vo = new tw.ace33022.vo.Lottery649Log();

					vo.setPeriod((new String(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["period"])).valueOf());
					vo.setDrawDate(Utilities.formatDate(Utilities.parseDate(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["lotteryDate"], 'GMT+08:00', 'yyyy-MM-dd\'T\'HH:mm:ss'), 'GMT+08:00', 'yyyyMMdd'));
					vo.setNum01(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["drawNumberAppear"][0]));
					vo.setNum02(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["drawNumberAppear"][1]));
					vo.setNum03(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["drawNumberAppear"][2]));
					vo.setNum04(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["drawNumberAppear"][3]));
					vo.setNum05(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["drawNumberAppear"][4]));
					vo.setNum06(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["drawNumberAppear"][5]));
					vo.setNumSpecial(Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["drawNumberAppear"][6]));
					vo.setPrize01(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["jackpotAssign"]["winnerCount"]);
					vo.setPrize02(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["secondAssign"]["winnerCount"]);
					vo.setPrize03(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["thirdAssign"]["winnerCount"]);
					vo.setPrize04(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["fourthAssign"]["winnerCount"]);
					vo.setPrize05(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["fifthAssign"]["winnerCount"]);
					vo.setPrize06(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["sixthAssign"]["winnerCount"]);
					vo.setPrize07(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["seventhAssign"]["winnerCount"]);
					vo.setPrizeNormal(JSON.parse(httpResponse.getContentText())["content"]["lotto649Res"][0]["normalAssign"]["winnerCount"]);

					result["data"].push(vo.toJSONObject());

					result["code"] = 0;
				}
			}
		}

		return JSON.stringify(result);
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				getLottery539: getLottery539,
				getLottery649: getLottery649
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = getLottery539;
		module.exports = getLottery649;
	}
	else {
	
		if (typeof root.tw.ace33022.google.apps.functions.Lottery == 'undefined') root.tw.ace33022.google.apps.functions.Lottery = {};
		
		root.tw.ace33022.google.apps.functions.Lottery.getLottery539 = getLottery539;
		root.tw.ace33022.google.apps.functions.Lottery.getLottery649 = getLottery649;
	}
})(this);