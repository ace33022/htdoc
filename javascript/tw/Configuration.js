/**
 *
 * @description Configuration
 *
 * @version 2015/11/13 ace 初始版本。
 * @version 2017/03/05 ace 新增Unveil.js(http://luis-almeida.github.io/unveil/)。
 * @version 2018/08/16 ace 新增requireJSFile屬性。
 *
 * @author ace
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web|Web technology for developers | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript|JavaScript | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference|JavaScript reference - JavaScript | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators|Expressions and operators - JavaScript | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof|typeof - JavaScript | MDN}
 *
 * @see {@link http://www.javascriptkit.com/|JavaScript Kit- Your comprehensive JavaScript, DHTML, CSS, and Ajax stop}
 * @see {@link http://www.javascriptkit.com/javatutors/|JavaScript Kit Advanced JavaScript Tutorials}
 * @see {@link http://www.javascriptkit.com/javatutors/trycatch2.shtml|The Error object and throwing your own errors}
 *
 * @memo 2021/07/02 ace Rhino沒有提供startsWith函數？
 *
 */

(function(root) {

	var result;
	
	if (typeof process !== 'undefined') {

		// nodeJS執行環境
		
		console.log('Process Configuration...');
		
		// console.log('process.env.NODE_PATH: ' + process.env.NODE_PATH);
		// if (typeof process.env.NODE_PATH == 'undefined') throw new Error('NODE_PATH is undefined!');
		
		if (typeof nw !== 'undefined') {
		
			// NW.js執行環境
			
			// 採用HTML標籤引入資料時不會有module物件。
			if (typeof module === 'undefined') {
			
				result = root.tw.ace33022.DefaultConfiguration;
			}
			else {
			
				// result = require(process.env.NODE_PATH + '/' + 'tw/ace33022/DefaultConfiguration.js');
				result = require('tw/ace33022/DefaultConfiguration.js');
			}
		}
		else {
		
			result = require('tw/ace33022/DefaultConfiguration.js');
		}
	}
	else {

		if (typeof Packages !== 'undefined') {

			// Rhino執行環境
			
			if (Packages.java.lang.System.getProperty('JSLibDir') == null) throw new Error('JSLibDir is undefined!');
			if (typeof print != 'undefined') print('JSLibDir:' + Packages.java.lang.System.getProperty('JSLibDir'));

			if (typeof print != 'undefined') print('load NameSpace...');
			load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/NameSpace.js');

			if (typeof print != 'undefined') print('load DefaultConfiguration...');
			load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/DefaultConfiguration.js');
		}

		if (typeof root.tw === 'undefined') throw new Error('NameSpace is undefined!');
		if (typeof root.tw.ace33022.DefaultConfiguration === 'undefined') throw new Error('DefaultConfiguration is undefined!');
		
		result = root.tw.ace33022.DefaultConfiguration;
	}
	
	if (typeof result === 'undefined') throw new Error('DefaultConfiguration is undefined!');

	/**
	 *
	 * @description window.onload
	 *
	 * @see {@link https://api.jquery.com/ready/|.ready() | jQuery API Documentation}
	 *
	 * @see {@link https://blog.miniasp.com/post/2007/11/24/14-rules-for-faster-front-end-performance-notes|The Will Will Web | 加速前端網頁效能的14條規則}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10092601|jQuery 筆記 (四) window.onload 與 $(document).ready - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://blog.miniasp.com/post/2010/07/24/jQuery-ready-vs-load-vs-window-onload-event|The Will Will Web | 使用 jQuery(document).ready() 與 window.onload 注意事項}
	 *
	 * @comment 只要在註冊 window.onload 事件後才使用 $(document).ready() 就會導致 $(document).ready() 變的與 $(window).load() 的行為一樣，要等到網頁所有資源都下載完畢才會執行 $(document).ready() 中註冊的事件！
	 *
	 */
	// All resources finished loading!
	// window.addEventListener('load', function(event) {});
	
	/**
	 *
	 * @description DOMContentLoaded
	 *
	 * @see {@link https://developer.mozilla.org/zh-TW/docs/Web/Events/DOMContentLoaded|DOMContentLoaded - Event reference | MDN}
	 *
	 * @see {@link https://api.jquery.com/ready/|.ready() | jQuery API Documentation}
	 *
	 * @see {@link https://wowtianwen.iteye.com/blog/2100913|原生JS实现document.ready - - ITeye博客}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10197335|重新認識 JavaScript 番外篇 (6) - 網頁的生命週期 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 */
	if ((typeof Packages === 'undefined') && (typeof document !== 'undefined')) {
	
		document.addEventListener('DOMContentLoaded', function() {
		
			// nwJS的location.protocol也是定義成chrome-extension:。
			if ((result.location.protocol == 'chrome-extension:') || (result.location.protocol == 'file:')) {
			
				// NW.js由inject_js_end屬性載入執行。
				if (typeof nw === 'undefined') result.loadJS(location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'nw_inject_end.js');
			}
			else if ((result.location.protocol == 'http:') || (result.location.protocol == 'https:')) {
				
				// if (result.loadNWInjectEnd() === 'Y') result.loadJS('nw_inject_end.js');
				// if (result.loadNWInjectEnd() === 'Y') result.loadJS(location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'nw_inject_end.js');
				if (result.loadNWInjectEnd() === 'Y') result.loadJS(location.origin + location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) + 'nw_inject_end.js');
			}
		});
	}

	// Browser environment
	// result["JSLibDir"] = 'javascript';
	result["DAODir"] = 'tw/ace33022/dao/browser';
	result["BrowserUIDir"] = 'tw/ace33022/program/browser/bootstrap';
	
	result["paths"]["tw.ace33022.util.InitReSetUtil"] = 'tw/ace33022/util/browser/InitReSetUtil';
	result["paths"]["tw.ace33022.util.CommonUtil"] = 'tw/ace33022/util/browser/CommonUtil';
	
	// result["paths"]["videojs"] = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/6.2.0/video.min';
	// result["paths"]["videojs-hotkeys"] = 'https://cdn.sc.gl/videojs-hotkeys/0.2/videojs.hotkeys.min';
	// result["paths"]["videojs-hotkeys"] = result["JSLibDir"] + '/tw/ace33022/util/browser/videojs.hotkeys.min';
	
	// if ((new String(result.location.protocol)).startsWith('http') || (result.location.protocol == 'chrome-extension:') || (result.location.protocol == 'file:')) {
	if ((result.location.protocol.indexOf('http') == 0) || (result.location.protocol == 'chrome-extension:') || (result.location.protocol == 'file:')) {
	
		// if ((new String(result.location.protocol)).startsWith('http')) {
		if (result.location.protocol.indexOf('http') == 0) {
		
			if ((result.location.origin.indexOf('127.0.0.1') === -1) && (result.location.origin.indexOf('localhost') === -1)) {
			
				// result["JSLibDir"] = 'https://ace33022.github.io/htdoc/javascript';

				// result["requirejsFile"] = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.js';
				result["requirejsFile"] = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require';
				
				result["paths"]["underscore"] = 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min';
				result["paths"]["backbone"] = 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min';
				result["paths"]["tablesort"] = 'https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.0.2/tablesort.min';
				result["paths"]["tablesort.number"] = 'https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.0.2/sorts/tablesort.number.min';
				
				result["paths"]["jquery"] = 'https://code.jquery.com/jquery-1.12.3.min';
				result["paths"]["bootstrap"] = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min';

				result["paths"]["jquery.unveil"] = 'https://cdnjs.cloudflare.com/ajax/libs/unveil/1.3.0/jquery.unveil.min';

				result["paths"]["bootbox"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min';
				result["paths"]["bootstrap-fileinput"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.3.8/js/fileinput.min';
				result["paths"]["bootstrap-datetimepicker"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min';
				result["paths"]["x-editable-bootstrap"] = 'https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap-editable/js/bootstrap-editable.min';
				result["paths"]["x-editable-bootstrap3"] = 'https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/js/bootstrap-editable.min';
					
				result["paths"]["jasny-rowlink"] = 'https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min';
					
				result["paths"]["highcharts"] = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.1.9/highcharts.src';

				result["paths"]["moment"] = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment';
				result["paths"]["sprintfjs"] = 'https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.0.3/sprintf.min';
				result["paths"]["papaparse"] = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.4/papaparse.min';
				result["paths"]["filesaver"] = 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min';
				result["paths"]["md5"] = 'https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.7.0/js/md5.min';
					
				result["paths"]["wordcloud"] = 'https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.0.6/wordcloud2.min';

				result["paths"]["leaflet"] = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/leaflet';
				result["paths"]["leaflet.EasyButton"] = 'https://cdnjs.cloudflare.com/ajax/libs/Leaflet.EasyButton/2.3.0/easy-button.min';
				
				result["paths"]["toastr"] = 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min';
				result["paths"]["peerjs"] = 'https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.16/peer.min';
				
				// result["paths"]["firebase"] = 'https://www.gstatic.com/firebasejs/live/3.0/firebase';
				result["paths"]["firebase"] = 'https://www.gstatic.com/firebasejs/5.3.1/firebase';
				
				result["packages"] = new Array();
				
				/**
				 *
				 * @see {@link https://stackoverflow.com/questions/36500713/loading-codemirror-with-requirejs-from-cdn|javascript - Loading CodeMirror with RequireJS from CDN - Stack Overflow}
				 *
				 */
				result["packages"].push({
				
					"name": "codemirror",
					"location": "https://cdn.jsdelivr.net/npm/codemirror@5.46.0",
					"main": "lib/codemirror"
				});
				
				result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
			
				result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');
				result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css');
			
				result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css');
				result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css');
				
				result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css');
			}
			else {
			
				if (typeof Packages === 'undefined') {
				
					result.loadCSS('stylesheet/Font-Awesome/css/font-awesome.css');
				
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap.css');
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap-theme.css');
				
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
					result.loadCSS(result["JSLibDir"] + '/bootstrap/jasny-bootstrap/dist/css/jasny-bootstrap.css');
				}
			}
		}
		else if ((result.location.protocol == 'chrome-extension:') || (result.location.protocol == 'file:')) {
			
			// worker執行環境中並沒有window物件可以操作。
			if (typeof WorkerGlobalScope === 'undefined') {
			
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
			
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css');
			
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css');
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css');
				
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css');
				
				result.loadCSS('stylesheet/Font-Awesome/css/font-awesome.css');
			
				result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap.css');
				result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap-theme.css');
			
				result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
				result.loadCSS(result["JSLibDir"] + '/bootstrap/jasny-bootstrap/dist/css/jasny-bootstrap.css');
			}
		}
	}
		
	if (typeof process !== 'undefined') {
	
		// nodeJS執行環境
		
		if ((typeof nw !== 'undefined') && (typeof module === 'undefined')) {
		
			// NW.js執行環境
			
			// 採用HTML標籤引入資料時不會有module物件。
			root.Configuration = result;
		}
		else {
		
			module.exports = result;
		}
	}
	else {
	
		root["Configuration"] = result;
		
		if (typeof Packages !== 'undefined') {
		
			result["JSLibDir"] = Packages.java.lang.System.getProperty('JSLibDir');
			result["DAODir"] = 'tw/ace33022/dao/Rhino';
			
			Packages.java.lang.System.setProperty(new Packages.java.lang.String('launch.configuration.ini'), new Packages.java.lang.String(Packages.java.lang.System.getenv('WEB-INFDir') + '/' + 'ReThink.ini'));
			
			root["Configuration"]["loggingPropertiesFile"] = Packages.java.lang.System.getenv('WEB-INFDir') + '/' + 'logging.properties';
			root["Configuration"]["log4jPropertiesFile"] = Packages.java.lang.System.getenv('WEB-INFDir') + '/' + 'log4j.properties';
		
			root["Configuration"]["Database"] = new function() {

				var conn;
			
				var DBDRIVER = '';
				var DBURL = '';
				
				var DBUSER = '';
				var DBPASSWORD = '';
				
				var properties = new java.util.Properties();
				
				properties.put('charSet', 'Big5');
				properties.put('user', '');
				properties.put('password', '');
				
				DBDRIVER = 'org.sqlite.JDBC';
				// DBDRIVER = 'sun.jdbc.odbc.JdbcOdbcDriver';
				java.lang.Class.forName(DBDRIVER);
				
				DBURL = 'jdbc:sqlite:' + 'W:/tool/package/LangEnv/Java/apache-tomcat/webapps/ROOT/WEB-INF/db/SQLite/base.sqlite3';
				conn = java.sql.DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
				
				// DBURL = 'jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=' + 'W:\\MyDoc\\Stock\\SrcData\\Access\\Stock.mdb';
				// conn = java.sql.DriverManager.getConnection(DBURL, properties); 
				
				this.getConnection = function() { return conn; }
				this.close = function() {if (conn != null) conn.close();}
			
				return this;
			};
			
			load(root["Configuration"]["JSLibDir"] + '/tw/ace33022/util/Rhino/InitEnv.js');
		}
	}
})(this);