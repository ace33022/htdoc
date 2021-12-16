
// Logger.log('TST00020');

load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/Configuration.js');

function main(param, param2) {

	var result = { 
	
		"code": "xyz", 
		"name": "許功蓋", 
		"remark": "測試", 
		"invalid_line_nums": [3, 5] 
	};
	
	var list1 = new Array();
	
	// var result = {};
	
	// Logger.log('param: ' + param);
	// Logger.log('param2: ' + param2);
	
	// Logger.log('result: ' + JSON.stringify(result));
	
	print('param: ' + param);
	print('param2: ' + param2);
	
	result = JSON.stringify(result);
	// print('result: ' + result);
	
	list1.push(1);
	list1.push(2);
	
	print(list1.length);
	print(list1);
	
	// print(tw.ace33022.util.StockUtil.getTWSEPoint());
	// print(tw.ace33022.util.StockUtil.getFuturePoint());
	
	// result = tw.ace33022.util.StockUtil.getFuturePoint();
	
	return result;
}
