/**
 *
 * @description Lottery
 *
 * @version 2024/03/10 ace 初始版本。
 *
 * @author ace
 *
 */
(function(root) {

  var LOTTERY539_API = "https://api.taiwanlottery.com/TLCAPIWeB/Lottery/Daily539Result";

  function getLottery539LatestPeriod() {
    
    var result = '';
    
    var httpResponse;
		
		if (typeof Packages != 'undefined') {
		
			result = Packages.tw.ace33022.functions.Lottery.getLottery539LatestPeriod();
		}
		else {
		
			httpResponse = UrlFetchApp.fetch(LOTTERY539_API + '?month=' + Utilities.formatDate(new Date(), 'GMT+08:00', 'yyyy-MM'));
		
			if (httpResponse.getResponseCode() == 200) {

				if (JSON.parse(httpResponse.getContentText())["rtCode"] == 0) {

					result = Utilities.formatString('%s', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["period"]);
				}
			}
		}

    return result;
  }

  function getLatestLottery539() {

    var result = '';
		
    var httpResponse;
		
		if (typeof Packages != 'undefined') {
		
			result = Packages.tw.ace33022.functions.Lottery.getLatestLottery539();
		}
		else {
		
			httpResponse = UrlFetchApp.fetch(LOTTERY539_API + '?month=' + Utilities.formatDate(new Date(), 'GMT+08:00', 'yyyy-MM'));
		
			if (httpResponse.getResponseCode() == 200) {

				if (JSON.parse(httpResponse.getContentText())["rtCode"] == 0) {

					if (JSON.parse(httpResponse.getContentText())["content"]["daily539Res"].length != 0) {

						// console.log(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]);
						
						result = {};

						result["period"] = (new String(JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["period"])).valueOf();
						result["num01"] = Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][0]);
						result["num02"] = Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][1]);
						result["num03"] = Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][2]);
						result["num04"] = Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][3]);
						result["num05"] = Utilities.formatString('%02d', JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["drawNumberAppear"][4]);
						result["prize01"] = JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539JackpotAssign"]["winnerCount"];
						result["prize02"] = JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539SecondAssign"]["winnerCount"];
						result["prize03"] = JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539ThirdAssign"]["winnerCount"];
						result["prize04"] = JSON.parse(httpResponse.getContentText())["content"]["daily539Res"][0]["d539FourthAssign"]["winnerCount"];
						
						result = JSON.stringify(result);
					}
				}
			}
		}

    return result;
  }

	if (typeof define === 'function') {
	
		define([], function() { 
		
			return {
  
				getLottery539LatestPeriod: getLottery539LatestPeriod,
				getLatestLottery539: getLatestLottery539
			}
		});
	}
	else if (typeof exports !== 'undefined') {
	
		module.exports = getLottery539LatestPeriod;
		module.exports = getLatestLottery539;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Lottery == 'undefined') root.tw.ace33022.functions.Lottery = {};
		
		root.tw.ace33022.functions.Lottery.getLottery539LatestPeriod = getLottery539LatestPeriod;
		root.tw.ace33022.functions.Lottery.getLatestLottery539 = getLatestLottery539;
	}
})(this);