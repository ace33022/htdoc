/**
 *
 * @description Configuration
 *
 * @version 2015/11/13 ace 初始版本。
 * @version 2017/03/05 ace 新增Unveil.js(http://luis-almeida.github.io/unveil/)。
 * @version 2018/08/16 ace 新增requireJSFile屬性。
 * @version 2024/04/23 ace 新增loadLink函數。
 * @version 2024/04/23 ace favicon設定改以程式處理。
 * @version 2024/09/17 ace 新增傳入參數JavaScriptLibDir。
 * @version 2025/05/12 ace 增加shuffle函數到Array的原型鏈。
 * @version 2025/07/16 ace 新增googleAppsMacroId屬性。
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
 * @author ace
 *
 */
(function(root) {

	var result = {};
	
	if (typeof console != 'undefined') console.log('load Configuration');
	
	if (typeof process != 'undefined') {

		// nodeJS執行環境
		
		if (typeof console != 'undefined') console.log('Process Configuration...');
		
		// console.log('process.env.NODE_PATH: ' + process.env.NODE_PATH);
		// if (typeof process.env.NODE_PATH == 'undefined') throw new Error('NODE_PATH is undefined!');
		
		global.Logger = console;		// 模擬Google Apps Script的Logger物件。
		global.print = console.log;	// 模擬Rhino的print函數。
		
		if (typeof nw != 'undefined') {
		
			// NW.js執行環境
			
			// 採用HTML標籤引入資料時不會有module物件。
			if (typeof module == 'undefined') {
			
				try {
				
					if (typeof root.tw.ace33022.DefaultConfiguration != 'undefined') result = root.tw.ace33022.DefaultConfiguration;
				}
				catch (e) {
				
					// @memo 2026/03/31 ace 若是tw.ace33022.DefaultConfiguration不存在的狀況，是否要中斷程式執行？
					// if (typeof root.tw.ace33022.DefaultConfiguration == 'undefined') throw new Error('DefaultConfiguration is undefined!');
					if (typeof console != 'undefined') console.log('tw.ace33022.DefaultConfiguration is not exist.');
				}
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
	
		try {
		
			if (typeof root.tw.ace33022.DefaultConfiguration != 'undefined') result = root.tw.ace33022.DefaultConfiguration;
		}
		catch (e) {
		
			// @memo 2026/03/31 ace 若是tw.ace33022.DefaultConfiguration不存在的狀況，是否要中斷程式執行？
			// if (typeof root.tw.ace33022.DefaultConfiguration == 'undefined') throw new Error('DefaultConfiguration is undefined!');
			if (typeof console != 'undefined') console.log('tw.ace33022.DefaultConfiguration is not exist.');
		}
	}
	
	// Browser environment
	result["DAODir"] = 'tw/ace33022/dao/browser';
	result["dirDAO"] = 'tw/ace33022/dao/browser';
	result["BrowserUIDir"] = 'tw/ace33022/program/browser/bootstrap';
	
	result["pushbullet"] = new Object();
	result["pushbullet"]["token"] = 'o.auSaSfpkxFijkoAwoA93GsSkl2ojlrnf';
	// result["pushbullet"]["default_iden"] = 'ujDUuu4dFNQdjzWIEVDzOK';		// Xiaomi
	result["pushbullet"]["default_iden"] = 'ujDUuu4dFNQdjAiVsKnSTs';			// chrome
	
	// @version 2025/07/16 ace 新增googleAppsMacroId屬性。
	result["googleAppsMacroId"] = {};
	result["googleAppsMacroId"]["StockDailyTransactionLog"] = "AKfycbwD92sZCyWdzt19JfgXxQc89nH90710H006RMNYjj2TgOV0g9Mv8x9fXg28dosc1S--Yw";
	// result["googleAppsMacroId"]["optionPromptTrnLog"] = "AKfycbxM5opH9RxxGI7151aXmdslg95UmMU0nqtEeqowuXZLre-EhuiCQJip_g95zUcGGP4ACQ";
	result["googleAppsMacroId"]["optionPromptTrnLog"] = "AKfycbz2v7l_v4nDvP6snnMK4D7dQ5GuttX27tOd6F2BrpCV5opPw1ceIyydLDVUiLSoFdt3rg";
	result["googleAppsMacroId"]["sexyNovel"] = "AKfycbzdC0V6hzmQwoxMjro4em2SCzPJVFHCQhO8kL1JEf0Mokk7DbYJo8MmwngJttWYVLGi";
	result["googleAppsMacroId"]["reEditSexyNovel"] = "AKfycbync8PpBEcDH04b4Bh_QLFmS7pqDjdkNRwXs8LyHudetkX4l8FuoZL9DQUBPT1WTV8FHA";
	// result["googleAppsMacroId"]["checkJavPOPTaskSavedStatus"] = "AKfycbz5swxglVIE924rrUys18YDoKw7N555q6WMRPkdFxv3xgGGrVgSIaR35EQ9EKx1KHTHnQ";
	result["googleAppsMacroId"]["checkJavPOPTaskSavedStatus"] = "AKfycbzkqokyNfAarErbJ3SfJteDSSzPXzoyrw12pPF_ZQXtKiPFQssZQUIKHZbZw24e3KzQDg";
	
	// result["paths"]["videojs"] = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/6.2.0/video.min';
	// result["paths"]["videojs-hotkeys"] = 'https://cdn.sc.gl/videojs-hotkeys/0.2/videojs.hotkeys.min';
	// result["paths"]["videojs-hotkeys"] = result["JSLibDir"] + '/tw/ace33022/util/browser/videojs.hotkeys.min';
	
	if (result.isBrowserPlatform()) {
		
		result.isIndependentFavicon = function() {
		
			var result = 'N';
			var index;

			var metas = document.getElementsByTagName('meta');

			for (index = 0; index < metas.length; index++) {

				if (metas[index].getAttribute('name') == 'is-independent-favicon') {

					result = metas[index].getAttribute('content');
					break;
				}
			}

			return result;
		}
		
		result.loadManifest = function() {
		
			var result = 'N';
			var index;

			var metas = document.getElementsByTagName('meta');

			for (index = 0; index < metas.length; index++) {

				if (metas[index].getAttribute('name') == 'load-manifest') {

					result = metas[index].getAttribute('content');
					break;
				}
			}

			return result;
		}
		
		result.loadNWInjectEnd = function() {
		
			var result = 'N';
			var index;

			var metas = document.getElementsByTagName('meta');

			for (index = 0; index < metas.length; index++) {

				if (metas[index].getAttribute('name') == 'load-nw_inject_end') {

					result = metas[index].getAttribute('content');
					break;
				}
			}

			return result;
		}
		
		result.UIStyle = (function() {
		
			var result = 'bootstrap';
			var index;

			var metas = document.getElementsByTagName('meta');

			for (index = 0; index < metas.length; index++) {
			
				if (metas[index].getAttribute('name') == 'ui-style') {

					result = metas[index].getAttribute('content');
					break;
				}
			}
			
			console.log('UIStyle: ' + result);
			
			result = result == '' ? 'bootstrap' : result;
			
			return result;
		})();
		
		// @memo 2026/04/01 ace 放到網站時，改取cdn的函數庫。
		if ((result.location.protocol == 'http:') || (result.location.protocol == 'https:')) {
		
			if ((result.location.origin.indexOf('127.0.0.1') == -1) && (result.location.origin.indexOf('localhost') == -1)) {
			
				// result["JSLibDir"] = 'https://ace33022.github.io/htdoc/javascript';
				// result["JavaScriptLibDir"] = 'https://ace33022.github.io/htdoc/javascript';
				// result["dirJavaScript"] = 'https://ace33022.github.io/htdoc/javascript';
				result["getDirJavaScript"] = function() {return 'https://ace33022.github.io/htdoc/javascript';}

				result["requirejsFile"] = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require';
				result["fileRequirejs"] = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require';
				
				result["paths"]["underscore"] = 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min';
				result["paths"]["backbone"] = 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min';
				result["paths"]["tablesort"] = 'https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.0.2/tablesort.min';
				result["paths"]["tablesort.number"] = 'https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.0.2/sorts/tablesort.number.min';
				
				result["paths"]["jquery"] = 'https://code.jquery.com/jquery-1.12.3.min';

				result["paths"]["jquery.unveil"] = 'https://cdnjs.cloudflare.com/ajax/libs/unveil/1.3.0/jquery.unveil.min';

				result["paths"]["bootstrap"] = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min';
				
				result["paths"]["bootstrap-fileinput"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.3.8/js/fileinput.min';
				result["paths"]["bootstrap-datetimepicker"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min';
				result["paths"]["x-editable-bootstrap"] = 'https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap-editable/js/bootstrap-editable.min';
				result["paths"]["x-editable-bootstrap3"] = 'https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/js/bootstrap-editable.min';
					
				result["paths"]["jasny-rowlink"] = 'https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min';
				
				result["paths"]["bootbox"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min';
					
				result["paths"]["highcharts"] = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.1.9/highcharts.src';

				result["paths"]["moment"] = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment';
				result["paths"]["sprintfjs"] = 'https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.0.3/sprintf.min';
				result["paths"]["papaparse"] = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.4/papaparse.min';
				result["paths"]["filesaver"] = 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min';
				result["paths"]["md5"] = 'https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.7.0/js/md5.min';
				
				result["paths"]["js-logger"] = 'https://cdn.jsdelivr.net/npm/js-logger@1.6.1/src/logger.min';
				
				result["paths"]["wordcloud"] = 'https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.0.6/wordcloud2.min';

				result["paths"]["leaflet"] = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/leaflet';
				result["paths"]["leaflet.EasyButton"] = 'https://cdnjs.cloudflare.com/ajax/libs/Leaflet.EasyButton/2.3.0/easy-button.min';
				
				result["paths"]["toastr"] = 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min';
				result["paths"]["peerjs"] = 'https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.16/peer.min';
				
				// result["paths"]["firebase"] = 'https://www.gstatic.com/firebasejs/5.3.1/firebase';
				// result["paths"]["firebase-app"] = 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app';
				// result["paths"]["firebase-analytics"] = 'https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics';
				result["paths"]["firebase-database"] = 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database-compat.js';
				
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
			}
		}
		
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
		 * @comment 只要在註冊window.onload事件後才使用$(document).ready()，會導致$(document).ready()變的與$(window).load()的行為一樣，要等到網頁所有資源都下載完畢才會執行$(document).ready()中註冊的事件！
		 *
		 */
		window.addEventListener('load', function(event) {
		
			// All resources finished loading!
			
			var fileNwInjectEnd;
			
			console.log('window load triggered.');
			
			// result.loadJS(result["getDirJavaScript"]() + '/tw/ace33022/functions/Sort.js', function() {
			
				// @version 2025/05/12 ace 增加shuffle函數到Array的原型鏈。
				// Array.prototype.shuffle = root.tw.ace33022.functions.Sort.shuffle;
			// });
			
			if (result.loadNWInjectEnd().toUpperCase() == 'Y') {
			
				if ((result.location.protocol == 'http:') || (result.location.protocol == 'https:')) {
				
					// location.pathname: /program/sex00010
					if (location.pathname.startsWith('/program')) {
					
						fileNwInjectEnd = location.toString() + 'nw_inject_end.js';
						
						if (!location.toString().endsWith('/')) fileNwInjectEnd = location.toString() + '/' + 'nw_inject_end.js';
					}
					
					console.log('fileNwInjectEnd: ' + fileNwInjectEnd);
					
					// result.loadJS(result["getDirJavaScript"]() + '/tw/ace33022/RequireJSConfig.js', function() {result.loadJS(fileNwInjectEnd);});
					// result.loadJS('javascript/tw/ace33022/RequireJSConfig.js', function() {result.loadJS(fileNwInjectEnd);});
					result.loadJS(fileNwInjectEnd);
				}
				// else if ((result.location.protocol == 'chrome-extension:') || (result.location.protocol == 'file:')) {
				else {
				
					if (typeof nw != 'undefined') {
					
						// result["requirejsFile"] = document.getElementsByTagName('head')[0].getElementsByTagName('base')[0].getAttribute('href') + 'javascript/requirejs/require.js';
						
						// console.log('result["requirejsFile"]: ' + result["requirejsFile"]);
						
						// NW.js由inject_js_end屬性載入執行。
						// result.loadJS('javascript/tw/ace33022/RequireJSConfig.js');
					}
					else if (typeof nw == 'undefined') {
					
						fileNwInjectEnd = location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'nw_inject_end.js';
						
						console.log('fileNwInjectEnd: ' + fileNwInjectEnd);
						
						// result.loadJS(result["getDirJavaScript"]() + '/tw/ace33022/RequireJSConfig.js', function() {result.loadJS(fileNwInjectEnd);});
						// result.loadJS('javascript/tw/ace33022/RequireJSConfig.js', function() {result.loadJS(fileNwInjectEnd);});
						result.loadJS(fileNwInjectEnd);
					}
				}
			}
		});
			
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
		 * @comment 2026/04/01 ace 架構在載入nw_inject_end.js的模式下，index.html的DOM結構會很快速完成，屬於動態設定meta資料的部分置於此處完成。
		 *
		 **/
		document.addEventListener('DOMContentLoaded', function() {
			
			// DOM Ready!
			
			var cssFile = 'index.css';
			
			console.log('DOMContentLoaded triggered.');
			
			// console.log('typeof nw: ' + typeof nw);
			
			console.log('result["getDirJavaScript"](): ' + result["getDirJavaScript"]());
			
			console.log('base.href: ' + document.getElementsByTagName('head')[0].getElementsByTagName('base')[0].getAttribute('href'));
			
			// worker執行環境中並沒有window物件可以操作。
			// if (typeof WorkerGlobalScope == 'undefined') {}
				
			if ((result.location.protocol == 'http:') || (result.location.protocol == 'https:')) {
			
				/**
				 *
				 * @version 2024/04/23 ace favicon設定改以程式處理。
				 *
				 * @memo 2024/04/23 ace 改以程式載入favicon，可各別設定至各別程式有獨自的icon圖示。
				 *
				 */
				// console.log(location.origin + location.pathname + '/' + 'icon/favicon.ico');
				if (result.isIndependentFavicon() == 'Y') result.loadLink(location.origin + location.pathname + 'icon/favicon.ico', 'icon', 'image/png');
				
				if (result.loadManifest() == 'Y') result.loadLink(location.origin + location.pathname + 'manifest.json', 'manifest');
				
				// location.pathname: /program/sex00010
				if (location.pathname.startsWith('/program')) {
				
					if (location.pathname.endsWith('/')) {
					
						result.loadCSS(location.pathname + 'index.css');
					}
					else {
					
						result.loadCSS(location.pathname + '/' + 'index.css');
					}
				}
				
				if ((result.location.origin.indexOf('127.0.0.1') == -1) && (result.location.origin.indexOf('localhost') == -1)) {
				
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css');
					
					if (result["UIStyle"] == 'bootstrap') {
					
						result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');
						result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css');
					
						result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css');
						result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css');
					}
				}
				else {
				
					result.loadCSS('stylesheet/Font-Awesome/css/font-awesome.css');
				
					if (result["UIStyle"] == 'bootstrap') {
					
						result.loadCSS('javascript/bootstrap/bootstrap/dist/css/bootstrap.css');
						result.loadCSS('javascript/bootstrap/bootstrap/dist/css/bootstrap-theme.css');
					
						result.loadCSS('javascript/bootstrap/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
						result.loadCSS('javascript/bootstrap/jasny-bootstrap/dist/css/jasny-bootstrap.css');
					}
				}
			}
			// else if ((result.location.protocol == 'file:') || (result.location.protocol == 'chrome-extension:') || (typeof nw !== 'undefined')) {
			else {
			
				// nwJS的location.protocol也是定義成chrome-extension:。
				
				console.log('location.toString(): ' + result.location.toString());
				console.log('location.protocol: ' + result.location.protocol);
				console.log('location.origin: ' + result.location.origin);
				console.log('location.port: ' + result.location.port);
				console.log('location.hostname: ' + result.location.hostname);
				console.log('location.pathname: ' + result.location.pathname);
				console.log('location.search: ' + result.location.search);
				
				// console.log('index.css: ' + location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'index.css');
				
				if (location.protocol == 'file:') {
				
					cssFile = location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'index.css';
				}
				else if ((location.protocol == 'http:') || (location.protocol == 'https:')) {
				
					try {
					
						cssFile = location.toString() + 'index.css';
						
						console.log('index.css path: ' + cssFile);
						
						// @2025/01/02 cody location並非String物件，使用上必須先轉換物件後才可以執行endsWith函數，否則會造成location.endsWith is not a function的錯誤狀況。
						// console.log(location.endsWith('/'));
						if (!location.toString().endsWith('/')) cssFile = location.toString() + '/' + 'index.css';
						
						console.log('index.css path: ' + cssFile);
					}
					catch (e) {
						
						console.error(e.message);
					}
				}
				else if (location.protocol == 'chrome-extension:') {
				
					cssFile = location.origin + 'index.css';
					
					if (!location.origin.endsWith('/')) cssFile = location.origin + '/' + 'index.css';
				}
				
				console.log('cssFile: ' + cssFile);
				
				// result.loadCSS(location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'index.css');
				result.loadCSS(cssFile);
				
				result.loadCSS('stylesheet/Font-Awesome/css/font-awesome.css');
			
				if (result["UIStyle"] == 'bootstrap') {
				
					result.loadCSS('javascript/bootstrap/bootstrap/dist/css/bootstrap.css');
					result.loadCSS('javascript/bootstrap/bootstrap/dist/css/bootstrap-theme.css');
				
					result.loadCSS('javascript/bootstrap/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
					result.loadCSS('javascript/bootstrap/jasny-bootstrap/dist/css/jasny-bootstrap.css');
				}
			}
		});
	}

	if (result.isRhinoPlatform()) {
	
		// result["DAODir"] = 'tw/ace33022/dao/Rhino';
		result["dirDAO"] = 'tw/ace33022/rhino/dao';
		
		result["Database"] = new function() {

			var connection = null;
		
			var DBDRIVER = '';
			var DBURL = '';
			
			var DBUSER = '';
			var DBPASSWORD = '';
			
			var properties = new java.util.Properties();
			
			properties.put('charSet', 'Big5');
			properties.put('user', '');
			properties.put('password', '');
			
			DBDRIVER = 'org.sqlite.JDBC';
			
			java.lang.Class.forName(DBDRIVER);
			
			DBURL = 'jdbc:sqlite:' + result["getDirWork"]() + '/db/SQLite/base.sqlite3';
			// connection = java.sql.DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
			
			// DBURL = 'jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=' + 'W:\\MyDoc\\Stock\\SrcData\\Access\\Stock.mdb';
			// connection = java.sql.DriverManager.getConnection(DBURL, properties); 
			
			this.getConnection = function() { 
			
				if (connection == null) connection = java.sql.DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
				
				return connection;
			}
			
			this.close = function() {
			
				if (connection != null) {
				
					connection.close();
					connection = null;
				}
			}
		
			return this;
		};
		
		// @memo 2026/03/30 ace json2.js中使用alert函數進行警告提示，在沒有定義alert的狀況下載入會造成例外狀況發生。
		load(getDirJavaScript() + '/tw/ace33022/json2.js');
		
		// load(getDirJavaScript() + '/tw/ace33022/RequireJSConfig.js');
		
		// @memo 2025/08/07 ace rhitno的早期版本還沒有提供endsWith()函數。
		// if (!tw.ace33022.RequireJSConfig.baseUrl.endsWith('/')) tw.ace33022.RequireJSConfig.baseUrl += '/';
		// if (tw.ace33022.RequireJSConfig.baseUrl.substring(tw.ace33022.RequireJSConfig.baseUrl.length - 1) != '/') tw.ace33022.RequireJSConfig.baseUrl += '/';

		// Libre Office的Rhino版本進行load的順序有問題？改成各別檔案依需求增加判斷再載入。
		// for (var key in RequireJSConfig.paths) load(RequireJSConfig.baseUrl + RequireJSConfig.paths[key] + '.js');
		
		if (typeof root.UrlFetchApp == 'undefined') {
		
			if (typeof print != 'undefined') print('load UrlFetchApp...');
			
			load(getDirJavaScript() + '/tw/ace33022/rhino/google/apps/script/UrlFetchApp.js');
			
			root.UrlFetchApp = root.tw.ace33022.rhino.google.apps.script.UrlFetchApp;
		}
		
		// load(getDirJavaScript() + '/tw/ace33022/functions/Sort.js');
		
		// Array.prototype.shuffle = root.tw.ace33022.functions.Sort.shuffle;
	}
	
	// if (typeof process != 'undefined') {
	if (result.isNodePlatform()) {
	
		// nodeJS執行環境
		
		if ((typeof nw != 'undefined') && (typeof module == 'undefined')) {
		
			// NW.js執行環境
			
			// 採用HTML標籤引入資料時不會有module物件。
			root.Configuration = result;
			
			if (typeof root.tw == 'undefined') root.tw = {};
			if (typeof root.tw.ace33022 == 'undefined') root.tw.ace33022 = {};
			
			root.tw.ace33022.Configuration = result;
		}
		else {
		
			module.exports = result;
		}
	}
	else {
	
		root["Configuration"] = result;
		
		// @todo 2026/03/30 ace 是否仍需要tw.ace33022.Configuration？
		root.tw.ace33022.Configuration = result;
			
		// @memo 2025/09/03 ace Google Apps Script執行環境有獨立的context，與Rhino會共用context的方式不同，所以採用注入的方式設定AppsScript.Configuration，可以使用外部提供的Configuration。
    if (typeof AppsScript != 'undefined') {

      AppsScript.Configuration = result;
			
			if (typeof root.tw == 'undefined') root.tw = AppsScript.tw;
			
      // root.tw.ace33022.DefaultConfiguration = AppsScript.tw.ace33022.DefaultConfiguration;
    }
	}
})(this);