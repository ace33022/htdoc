
function main() {

	// load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/Configuration.js');
	
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["moment"] + '.js');
	
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/StockUtil.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/PushbulletUtil.js');
	
	var result = {};
	
	var check_point = {
	
		"peak_high_point": 17177,
		"peak_low_point": 17000
	};

	var point = tw.ace33022.util.StockUtil.getFuturePoint();
	var trigger = false;
	
	// Logger.log('Active SYS09010.');
	
	Logger.log('台股指數: ' + point);
	// logger.debug('台股指數: ' + point);
	
	if (point >= check_point["peak_high_point"]) trigger = true;
	if (point <= check_point["peak_low_point"]) trigger = true;
	
	if (trigger == true) result = tw.ace33022.util.PushbulletUtil.pushNote('o.auSaSfpkxFijkoAwoA93GsSkl2ojlrnf', 'ujDUuu4dFNQsjvI38qoNgG', moment(new Date()).format('YYYY/MM/DD HH:mm') + ' - 台股指數 - ' + point, '');
	
	result = JSON.stringify(result);
	
	return result;
}
