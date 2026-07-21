/**
 *
 * @description InitalizeEnvironment(Rhino環境初始設定)
 *
 * @version 2011/08/22 ace 初始版本。
 * @version 2013/03/04 ace 新增alert函數對應print函數。
 * @version 2013/03/04 ace 新增window物件模擬瀏覽器部份功能。
 * @version 2013/03/13 ace 補強jQuery.ajax函數之POST功能。
 * @version 2013/10/05 ace 新增require函數對應load函數。
 * @version 2013/10/14 ace 新增載入require.js(https://github.com/micmath/Rhino-Require)。
 * @version 2013/11/21 ace 調整Content-type屬性之指定方式。
 * @version 2014/12/11 ace 新增全域變數JSLibDir。
 * @version 2015/02/25 ace 全域變數JSLibDir改以Configuration.JSLibDir取代。
 * @version 2015/11/13 ace 載入RequireJS時，新增定義requirejs函數。
 * @version 2015/11/21 ace 替換Configuration的logger物件。
 * @version 2026/04/21 ace 新增dirJavaScript區域變數紀錄獨立的JavaScript目錄，當JavaScript目錄不在WorkDir目錄下，可以設定對應的獨立目錄。
 * @version 2026/04/23 ace 新增setDirTool函數自行設定Tool目錄，若Tool程式不是位在dirWork路徑下，可彈性設定實際的Tool目錄。
 *
 * @author ace
 *
 * @see <a href="https://github.com/micmath/Rhino-Require">micmath/Rhino-Require · GitHub</a>
 *
 * @see <a href="http://logging.apache.org/">Welcome - Apache Logging Services</a>
 * @see <a href="http://logging.apache.org/log4j/1.2/">Apache log4j 1.2 -</a>
 * @see <a href="http://logging.apache.org/log4j/2.x/">Log4j – Log4j 2 Guide - Apache Log4j 2</a>
 *
 * @see <a href="http://docs.oracle.com/javase/8/docs/api/java/util/logging/package-summary.html">java.util.logging (Java Platform SE 8)</a>
 * @see <a href="http://docs.oracle.com/javase/8/docs/api/java/util/logging/Level.html">Level (Java Platform SE 8)</a>
 * @see <a href="http://docs.oracle.com/javase/8/docs/api/java/util/logging/ConsoleHandler.html">ConsoleHandler (Java Platform SE 8)</a>
 *
 * @see <a href="https://docs.oracle.com/javase/tutorial/essential/environment/properties.html">Properties (The Java™ Tutorials > Essential Classes > The Platform Environment)</a>
 * @see <a href="https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html">System Properties (The Java™ Tutorials > Essential Classes > The Platform Environment)</a>
 *
 * @see <a href="https://cyntech.wordpress.com/2009/01/09/how-to-use-commons-logging/">How to use Commons Logging</a>
 * @see <a href="http://java-logy.blogspot.tw/2007/11/commons-logging.html">Commons Logging</a>
 * @see <a href="http://stackoverflow.com/questions/6315699/why-are-the-level-fine-logging-messages-not-showing">java - Why are the Level.FINE logging messages not showing? - Stack Overflow</a>
 *
 * @see <a href="http://blog.xuite.net/chihho32/blog/9121126-%5BJAVA%5D+Log4J">[JAVA] Log4J</a>
 * @see <a href="http://www.ewdna.com/2009/11/javalog4j.html">Java：Log4j 的簡單教學</a>
 * @see <a href="http://www.ewdna.com/2011/10/logback-log4j.html">Logback, Log4j 設定檔自動產生器</a>
 * @see <a href="http://stanleyweblife.blogspot.tw/2013/04/jsplog4j.html">那些年的網頁大小事: [JSP]log4j 中文亂碼解決問題</a>
 *
 * @see <a href="http://singleant.iteye.com/blog/934593">java日志，需要知道的几件事</a>
 * @see <a href="http://lavasoft.blog.51cto.com/blog/62575/26134">Apache通用日志工具commons-logging和Log4j使用总结</a>
 *
 * @see <a href="http://www.tutorialspoint.com/java/lang/system_setproperty.htm">Java.lang.System.setProperty() Method Example</a>
 * @see <a href="http://eric1300460.pixnet.net/blog/post/27586127-logger%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%5Bjava%5D">Logger使用方法[JAVA]</a>
 *
 * @todo 2015/11/21 修改Rhino-Require可指定公用目錄取得共用函數。
 * 
 * @comment 2015/11/12 Rhino-Require預設讀取工作目錄做基準點，因此只可取得工作目錄下的node_modules目錄。
 *
 */

(function(root) {
	
	// var dirWork = function() {return Packages.java.lang.System.getenv('dirWork') != null ? Packages.java.lang.System.getenv('dirWork') : 'W:'}();
	var dirWork = function() {return Packages.java.lang.System.getProperty('dirWork') != null ? Packages.java.lang.System.getProperty('dirWork') : 'W:'}();
	var dirJavaScript = '';
	var dirTool = '';
	
	var propertiesLog4J = new Packages.java.util.Properties();
	
	// @version 2015/11/21 替換Configuration的logger物件。
	// var loggerName = 'org.mozilla.javascript.tools.shell.Main';
	
	// if (typeof Configuration["loggerName"] != 'undefined') loggerName = Configuration["loggerName"];
	
	// 設定console輸出資料為BIG5編碼格式。
	// Packages.java.lang.System.setOut(new Packages.java.io.PrintStream(Packages.java.lang.System.out, true, 'BIG5'));
	// Packages.java.lang.System.setErr(new Packages.java.io.PrintStream(Packages.java.lang.System.err, true, 'BIG5'));

	// 設定console輸出資料為UTF8編碼格式。
	Packages.java.lang.System.setOut(new Packages.java.io.PrintStream(Packages.java.lang.System.out, true, 'UTF8'));
	Packages.java.lang.System.setErr(new Packages.java.io.PrintStream(Packages.java.lang.System.err, true, 'UTF8'));
	
	// @memo 2026/03/31 ace 從Java(JVM)呼叫啟動時，基本環境並沒有print。
	if (typeof root.print == 'undefined') root.print = function(msg) {Packages.java.lang.System.out.println(msg);}
	
	// if (typeof root.alert == 'undefined') root.alert = function(msg) { Packages.javax.swing.JOptionPane.showMessageDialog(null, msg); }
	if (typeof root.alert == 'undefined') root.alert = root.print;
	
	// @memo 2026/03/31 ace 從Java(JVM)呼叫啟動時，基本環境並沒有load函數。
	if (typeof load == 'undefined') load = function(file) {Packages.tw.ace33022.functions.Rhino.load(context, scope, new Packages.java.io.File(file));}
			
	if (typeof print != 'undefined') print('java.lang.System.getProperty(\'dirWork\'): ' + Packages.java.lang.System.getProperty('dirWork'));
	
	if (dirWork == '') throw new Exception('Variable dirWork is empty.');
	
	// Packages.tw.ace33022.ReThink.initializeLog4J();
	Packages.tw.ace33022.ReThink.initializeEnvironment();
	
	// @memo 2026/03/30 ace 在Tomcat環境下，應該要取得ServletContext.getResource("/")的目錄，建立各自對應的執行環境？
	// @memo 2026/04/22 ace 新增setDirWork函數自行設定工作目錄，對於類似Tomcat環境，用來指定對應的工作路徑。
	root["setDirWork"] = function(value) {dirWork = value; return dirWork;}
	root["getDirWork"] = function() {return dirWork;}
	
	// @memo 2026/04/22 ace 新增setDirJavaScript函數自行設定JavaScript目錄，若JavaScript程式不是位在dirWork路徑下，可彈性設定實際的JavaScript目錄。
	// root["getDirJavaScript"] = function() {return root["getDirWork"]() + '/javascript';};
	root["setDirJavaScript"] = function(value) {dirJavaScript = value; return dirJavaScript;}
	root["getDirJavaScript"] = function() {return dirJavaScript != '' ? dirJavaScript : root["getDirWork"]() + '/javascript';};
	
	// @memo 2026/04/23 ace 新增setDirTool函數自行設定Tool目錄，若Tool程式不是位在dirWork路徑下，可彈性設定實際的Tool目錄。
	root["setDirTool"] = function(value) {dirTool = value; return dirTool;}
	root["getDirTool"] = function() {return dirTool != '' ? dirTool : root["getDirWork"]() + '/tool';};
	
	// @todo 2026/04/01 ace 路徑UserSpace應該讀取設定檔的設定資料？
	root["getDirUserSpace"] = function() {return getDirWork() + '/' + 'UserSpace';}
	
	// @todo 2026/04/01 ace 路徑temp應該讀取設定檔的設定資料？
	root["getDirTemp"] = function() {return 'O:/tmp';}
	
	root["getLog"] = function(loggerName) {return Packages.tw.ace33022.functions.Log.getLog(loggerName);}
	
  // @todo 2023/09/13 ace 在Tomcat環境下如何搭配使用ServletContext?
	root["logger"] = (function() {return root["getLog"]('org.mozilla.javascript.tools.shell.Main');})();
	
	if (typeof root["window"] == 'undefined') root["window"] = {};
	
	if (typeof root["window"]["document"] == 'undefined') root["document"] = {};
	
	if (typeof root["window"]["console"] == 'undefined') root["window"]["console"] = {};
	if (typeof root["window"]["console"]["log"] == 'undefined') root["window"]["console"]["log"] = print;
	
	if (typeof root["console"] == 'undefined') root["console"] = root["window"]["console"];
	
	if (typeof root["Logger"] == 'undefined') {

		root["Logger"] = {};
		root["Logger"]["log"] = function(value) {root.console.log(value);}	// 對應Google Apps Script語法。
	}
	
	// load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["js-logger"] + '.js');
	
	// importClass(Packages.javax.swing.JOptionPane); JOptionPane.showMessageDialog(null, 'Start Load');
	
	if (typeof module == 'undefined') {

		// CommonJS功能改由Rhino-Require處理。
		// module = {};
		// module.exports = {};
	}

	// json2.js中使用alert函數進行警告提示，在沒有定義alert的狀況下載入會造成例外狀況發生。
	// load(Configuration["dirJavaScript"] + '/tw/ace33022/json2.js');

	// load(Configuration["dirJavaScript"] + '/tw/ace33022/RequireJSConfig.js');
	
	// @version 2013/10/14 新增載入require.js(https://github.com/micmath/Rhino-Require)。
	// @version 2013/11/24 取消載入require.js(https://github.com/micmath/Rhino-Require)，與require.js(http://requirejs.org/)衝突。
	// @version 2013/11/24 是否使用require功能應該由各別程式自行指定。
	// load(root["getDirJavaScript"]() + 'tw/ace33022/rhino/require.js');

	if (typeof define == 'function') {

		// @version 2015/11/13 載入RequireJS時，新增定義requirejs函數。
		// requirejs = require;
			
		// requirejs.config(tw.ace33022.RequireJSConfig);
	}	
	else if (typeof exports != 'undefined') {

		// 沒有載入RequireJS時則載入Rhino-Require(會有node_modules目錄讀取問題)？
		// load(root["getDirJavaScript"]() + '/tw/ace33022/rhino/require.js');	
	}
})(this);

/*
Logger.useDefaults({

  "defaultLevel": Logger.INFO,
  "formatter": function(messages, context) {

		load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["moment"] + '.js');
		
		// for (var prop in context) print(prop + " = " + context[prop]);
		// for (var prop in context["level"]) print(prop + " = " + context["level"][prop]);
		
		// print(messages);
		// messages.unshift(moment(new Date()).format('YYYY/MM/DD HH:mm:ss'), '-', '[' + context.level.value + ']');
		// messages.unshift(moment(new Date()).format('YYYY/MM/DD HH:mm:ss'), '-', '[' + context["level"]["name"] + ']');
		messages.unshift(moment(new Date()).format('YYYY/MM/DD HH:mm:ss'), '[' + context["level"]["name"] + ']', '-');
  },
});
*/

(function(window, undefined) {

  // todo: 補強jQuery物件之相關操作。
  // todo: 取回資料流應依contentType指定之編碼格式。
  
  // var jQuery = function(selector, context) {}
  
  var jQuery = {}
  
  jQuery.ajax = function(obj) {
  
    // Hypertext Transfer Protocol -- HTTP/1.1(http://www.ietf.org/rfc/rfc2616.txt)
    
    var HttpRequest;
    var HttpClient = new Packages.org.apache.http.impl.client.DefaultHttpClient();
    var StringEntity;
    
    var strHtml = new String();
    var strTemp = new String();
    
    var BufferedReader;
    
    if (obj.type.toUpperCase() == 'GET') {
    
      HttpRequest = new Packages.org.apache.http.client.methods.HttpGet(obj.url);
    }
    else if (obj.type.toUpperCase() == 'POST') {

      HttpClient.setRedirectStrategy(new Packages.org.apache.http.impl.client.LaxRedirectStrategy());
      
      HttpRequest = new Packages.org.apache.http.client.methods.HttpPost(obj.url);
      
      // @version 2013/11/21 調整Content-type屬性之指定方式。
      // HttpRequest.setHeader('Content-type', 'application/x-www-form-urlencoded; text/html; charset=utf-8');
      HttpRequest.setHeader('Content-type', obj.contentType);
      
      StringEntity = new Packages.org.apache.http.entity.StringEntity(obj.data, 'UTF-8');
      // @version 2013/11/21 調整Content-type屬性之指定方式。
      // StringEntity.setContentType('application/x-www-form-urlencoded; text/html; charset=utf-8');
      // StringEntity.setContentType(obj.contentType);
      
      HttpRequest.setEntity(StringEntity);
    }
    
    HttpResponse = HttpClient.execute(HttpRequest);
     
    BufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(HttpResponse.getEntity().getContent(), 'UTF-8'));
    while ((strTemp = BufferedReader.readLine()) != null) strHtml = strHtml + strTemp;
      
    obj.success(strHtml);
  }

  window.jQuery = window.$ = jQuery;
})(this);