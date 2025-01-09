
function main() {

	// load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/Configuration.js');
	
	load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["moment"] + '.js');
	
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/StockUtil.js');
	load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/PushbulletUtil.js');
	
	var result = {};
	var index;
	
	Logger.setLevel(Logger.DEBUG);
	// Logger.setLevel(Logger.INFO);
	
	Logger.debug('arguments.length: ' + arguments.length);
	
	if (arguments.length != 0) {
	
		try {
		
			for (index = 0; index < arguments.length; index++) {
			
				Logger.debug('index[' + index + ']: ' + arguments[index]);
				Logger.debug('typeof: ' + typeof arguments[index]);
			}
		} 
		catch (e) {
		
			Logger.error('錯誤訊息：' + e);
		}
		finally {
		
		}
	}
	
	result = JSON.stringify(result);
	
	return result;
}
