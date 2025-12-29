/*
 *
 * @description Google Apps Script
 *  
 * @version 2019/01/21 初始版本。
 *
 * @author ace
 *
 * @see {@link https://developers.google.com/apps-script/reference/|Reference Overview  |  Apps Script  |  Google Developers}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/|URL Fetch Service  |  Apps Script  |  Google Developers}
 *
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
 *
 * @see <a href="http://fred-zone.blogspot.tw/2012/05/javascript_22.html">簡單理解 JavaScript 的記憶體管理機制 ~ Fred's blog</a>
 * 
 */
 
/*
 *
 * @description UrlFetchApp
 *  
 * @version 2019/01/21 初始版本。
 *
 * @see {@link https://docs.oracle.com/javase/7/docs/|Java Platform Standard Edition 7 Documentation}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/lang/Character.html|Character (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/lang/String.html|String (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/lang/StringBuffer.html|StringBuffer (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/io/InputStream.html|InputStream (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/io/InputStreamReader.html|InputStreamReader (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/io/ByteArrayOutputStream.html|ByteArrayOutputStream (Java Platform SE 7 )}
 *
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/net/URL.html|URL (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/net/URLConnection.html|URLConnection (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/net/HttpURLConnection.html|HttpURLConnection (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/javax/net/ssl/HttpsURLConnection.html|HttpsURLConnection (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/javax/net/ssl/SSLContext.html|SSLContext (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/javax/net/ssl/TrustManager.html|TrustManager (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/javax/net/ssl/X509TrustManager.html|X509TrustManager (Java Platform SE 7 )}
 * @see {@link https://docs.oracle.com/javase/7/docs/api/javax/net/ssl/SSLHandshakeException.html|SSLHandshakeException (Java Platform SE 7 )}
 *
 * @see {@link https://docs.oracle.com/javase/7/docs/api/java/util/Map.html|Map (Java Platform SE 7 )}
 *
 * @see {@link https://www.tutorialspoint.com/java/java_characters.htm|Java Character Class}
 * @see {@link https://www.tutorialspoint.com/java/util/hashmap_size.htm|java.util.HashMap.size() Method Example}
 *
 * @see {@link https://docs.oracle.com/javase/tutorial/networking/urls/connecting.html|Connecting to a URL (The Java™ Tutorials > Custom Networking > Working with URLs)}
 * @see {@link https://docs.oracle.com/javase/tutorial/networking/urls/readingURL.html|Reading Directly from a URL (The Java™ Tutorials > Custom Networking > Working with URLs)}
 * @see {@link https://docs.oracle.com/javase/tutorial/networking/urls/readingWriting.html|Reading from and Writing to a URLConnection (The Java™ Tutorials > Custom Networking > Working with URLs)}
 *
 * @see {@link http://www.java2s.com/Tutorials/Java/URL_Connection_Address/How_to_use_java_net_URL.htm|How to use java.net.URL}
 * @see {@link http://www.java2s.com/Tutorials/Java/URL_Connection_Address/Work_with_HttpURLConnection.htm|Work with HttpURLConnection}
 * @see {@link http://www.java2s.com/Tutorials/Java/URL_Connection_Address/How_to_read_from_URL_Connection_in_Java.htm|How to read from URL Connection in Java}
 * @see {@link http://www.java2s.com/Tutorials/Java/URL_Connection_Address/How_to_read_HTTP_header_from_URL_using_URLConnection_in_Java.htm|How to read HTTP header from URL using URLConnection in Java}
 * @see {@link http://www.java2s.com/Tutorials/Java/URL_Connection_Address/How_to_read_content_from_a_URL_in_Java.htm|How to read content from a URL in Java}
 *
 * @see {@link https://www.tutorialspoint.com/java/java_url_processing.htm|Java URL Processing}
 * @see {@link https://www.geeksforgeeks.org/java-net-httpurlconnection-class-java/|Java.net.HttpURLConnection Class in Java - GeeksforGeeks}
 * @see {@link https://examples.javacodegeeks.com/core-java/net/url/java-net-url-example/|java.net.URL Example | Examples Java Code Geeks - 2019}
 * @see {@link https://www.mkyong.com/java/how-to-send-http-request-getpost-in-java/|How to send HTTP request GET/POST in Java – Mkyong.com}
 * @see {@link https://www.codejava.net/java-se/networking/how-to-use-java-urlconnection-and-httpurlconnection|How to use Java URLConnection and HttpURLConnection}
 * @see {@link https://blog.yslifes.com/archives/367|java HttpURLConnection來實作get及post動作 | 聰明的生活}
 * @see {@link https://www.cnblogs.com/shijiaqi1066/p/3753224.html|URLConnection类详解 - LaplaceDemon - 博客园}
 * @see {@link https://blog.csdn.net/iijse/article/details/6201101|利用URLConnection来发送POST和GET请求 - Ijse技术博客 - CSDN博客}
 * @see {@link https://my.oschina.net/huangcongmin12/blog/159345|Java 使用 URLConnection 模拟 Http Get和Post 提交 - 空云万里晴 - 开源中国}
 *
 * @see {@link https://tonylin.idv.tw/dokuwiki/doku.php/java:basic:urlconnection|URLConnection [阿兩的筆記本 Ryoutsu's Notebook]}
 * @see {@link https://kingori.co/minutae/2013/04/httpurlconnection-disconnect/|Do we need to call HttpURLConnection.disconnect()? • King'ori Maina}
 * @see {@link https://stackoverflow.com/questions/9150200/closing-urlconnection-and-inputstream-correctly|java - Closing URLConnection and InputStream correctly? - Stack Overflow}
 *
 * @see {@link https://www.javaworld.com.tw/jute/post/view?bid=5&id=266291|JWorld@TW Java論壇 - 偶爾在讀取 http input stream 時出現 Premature EOF 是 Java 的 bug 嗎？}
 * @see {@link https://stackoverflow.com/questions/13210108/reading-a-web-page-in-java-ioexception-premature-eof|io - Reading a web page in Java IOException Premature EOF - Stack Overflow}
 * @see {@link http://www.javaprogrammingforums.com/java-networking-tutorials/185-how-grab-html-source-code-website-url-index-page.html|How to Grab the HTML source code of a website URL index page?}
 *
 * @see {@link https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/315138/|Java HttpURLConnection超時和IO異常處理 | 程式前沿}
 * @see {@link https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-tw|HTTP 快取  |  Web  |  Google Developers}
 * @see {@link https://www.javaworld.com.tw/jute/post/view?bid=5&id=282317|JWorld@TW Java論壇 - 讀取已斷線的 socket 卻不會 catch IOException？}
 * @see {@link http://mrbearla.blogspot.com/2011/05/javaneturl.html|曾小魚的程式設計筆記: 用java.net.URL建立連線注意事項}
 * @see {@link https://magiclen.org/java-reader/|透過InputStreamReader讀取InputStream可能會失敗 | MagicLen}
 * @see {@link http://wannadoitnow.blogspot.com/2015/10/android-httpurlconnection-httprequest.html|Android - HttpURLConnection 基本教學 取得網頁資料(HTML, XML, JSON) - Min's capo - Tutorials. Easy, simple and quick}
 * @see {@link https://litotom.com/2016/05/11/java%E7%9A%84%E7%B6%B2%E8%B7%AF%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88/|Java的網路程式設計 - 綠豆湯}
 * @see {@link http://www.runoob.com/w3cnote/android-tutorial-httpurlconnection.html|7.1.3 Android HTTP请求方式:HttpURLConnection | 菜鸟教程}
 *
 * @see {@link https://stackoverflow.com/questions/39127819/cant-read-data-from-url-due-to-cloudflare|Can't read data from url due to cloudflare - Stack Overflow}
 *
 * @see {@link https://hype.codes/how-convert-inputstream-string-java|How to convert an InputStream to a String in Java? | Hype.Codes}
 * @see {@link https://www.baeldung.com/convert-input-stream-to-string|Java InputStream to String | Baeldung}
 *
 * @see {@link http://fannys23.pixnet.net/blog/post/43556945-%5Bjava%5D-%E8%99%95%E7%90%86%E7%84%A1%E6%B3%95%E9%80%8F%E9%81%8Essl%E6%8A%93%E5%8F%96%E7%B6%B2%E7%AB%99%E8%B3%87%E6%96%99%E7%9A%84%E5%95%8F%E9%A1%8C|[Java] 處理無法透過SSL抓取網站資料的問題 @ 小攻城師的戰場筆記 :: 痞客邦 ::}
 * @see {@link https://stackoverflow.com/questions/6659360/how-to-solve-javax-net-ssl-sslhandshakeexception-error|java - How to solve javax.net.ssl.SSLHandshakeException Error? - Stack Overflow}
 * @see {@link https://stackoverflow.com/questions/9619030/resolving-javax-net-ssl-sslhandshakeexception-sun-security-validator-validatore|java - Resolving javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed Error? - Stack Overflow}
 * @see {@link http://hant.ask.helplib.com/java/post_635651|如何解决 javax.net.ssl.SSLHandshakeException 错误？_java_帮酷编程问答}
 *
 * @author ace
 *
 * @todo Error message: javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
 *
 */
(function(root) {

	/**
	 *
	 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/http-response|Class HTTPResponse  |  Apps Script  |  Google for Developers}
	 *
	 */
	var HTTPResponse = function(url, params) {
	
		var BUFFER_SIZE = 1024;
	
		// var buffer = Packages.java.lang.reflect.Array.newInstance(Packages.java.lang.Character.TYPE, BUFFER_SIZE);
		// var buffer = Packages.java.lang.reflect.Array.newInstance(Packages.java.lang.Byte.TYPE, BUFFER_SIZE);
		
		var httpUrlConnection;
		
		var temp;
		
		var dataOutputStream;
		
		var responseCode = 0;
		var contentText = '';
		
		var headers = {};
		var allHeaders = {};
		
		try {
		
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Create HTTPResponse');
		
			this["getResponseCode"] = function() {return responseCode;}
			
			// this["getAs"] = function() {return '';}
			// this["getBlob"] = function() {return '';}
			// this["getContent"] = function() {return '';}
			this["getContentText"] = function(charset) {return contentText;}
			
			// this["getHeaders"] = function() {return headers;}
			// this["getAllHeaders"] = function() {return allHeaders;}
			
			httpUrlConnection = (new Packages.java.net.URL(url)).openConnection();
			
			httpUrlConnection.setRequestProperty('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36');
			// httpUrlConnection.setRequestProperty('Accept', 'application/json');
			// httpUrlConnection.setRequestProperty('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7');
      // httpUrlConnection.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"); 
			httpUrlConnection.setRequestProperty('Accept-Encoding', 'gzip,deflate');
      // httpUrlConnection.setRequestProperty("Accept-Language", "zh-tw,en-us;q=0.7,en;q=0.3"); 
			httpUrlConnection.setRequestProperty('Accept-Language', 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7');
			// httpUrlConnection.setRequestProperty("Accept-Charse", "Big5,utf-8;q=0.7,*;q=0.7"); 
			httpUrlConnection.setRequestProperty('Charset', 'UTF-8');
			httpUrlConnection.setRequestProperty('Connection', 'keep-alive');
			// httpUrlConnection.setRequestProperty("Cookie", cookie); 
			// httpUrlConnection.setRequestProperty("Referer", referer); 
			
			httpUrlConnection.setUseCaches(false);
			httpUrlConnection.setConnectTimeout(10 * 1000);	// 連線超時限制(10秒)
			httpUrlConnection.setReadTimeout(60 * 1000);		// 讀取超時限制(60秒)
			// Packages.java.net.HttpURLConnection.setFollowRedirects(true); 
			httpUrlConnection.setAllowUserInteraction(true);
			httpUrlConnection.setInstanceFollowRedirects(true);
			
			httpUrlConnection.setDoInput(true);
			httpUrlConnection.setDoOutput(true); 
			
			httpUrlConnection.setRequestMethod('GET');
			
			if (typeof params != 'undefined') {
			
				if (typeof params["method"] != 'undefined') httpUrlConnection.setRequestMethod(params["method"].toUpperCase());
				
				if (typeof params["contentType"] != 'undefined') httpUrlConnection.setRequestProperty('Content-Type', params["contentType"]);
				
				// @todo 2025/11/28 cody Google Apps Script UrlFetchApp物件的fetch方法參數，視需要再補齊相關功能！
				// if (typeof params["headers"] != 'undefined') httpUrlConnection.setRequestProperty('Content-Type', params["contentType"]);
				// if (typeof params["validateHttpsCertificates"] != 'undefined') httpUrlConnection.setRequestProperty('Content-Type', params["contentType"]);
				// if (typeof params["followRedirects"] != 'undefined') httpUrlConnection.setRequestProperty('Content-Type', params["contentType"]);
				// if (typeof params["muteHttpExceptions"] != 'undefined') httpUrlConnection.setRequestProperty('Content-Type', params["contentType"]);
				// if (typeof params["escaping"] != 'undefined') httpUrlConnection.setRequestProperty('Content-Type', params["contentType"]);
			}
			
			httpUrlConnection.connect();
			
			if (typeof params != 'undefined') {
				
				if (typeof params["payload"] != 'undefined') {
				
					// payload = Packages.java.net.URLEncoder.encode(params["payload"], Packages.java.nio.charset.StandardCharsets.UTF_8)
					// payload = (new Packages.java.lang.String(params["payload"])).getBytes(Packages.java.nio.charset.StandardCharsets.UTF_8);
					// payload = (new Packages.java.lang.String(Packages.java.net.URLEncoder.encode(params["payload"]))).getBytes(Packages.java.nio.charset.StandardCharsets.UTF_8);
					
					// if ((typeof logger != 'undefined') && (logger != null)) logger.debug(params["payload"]);
					// if ((typeof logger != 'undefined') && (logger != null)) logger.debug(payload);
					
					// httpUrlConnection.setRequestProperty("Content-Length", String.valueOf(params["payload"].getBytes().length)); 
					
					dataOutputStream = new Packages.java.io.DataOutputStream(httpUrlConnection.getOutputStream());
					// dataOutputStream.writeBytes(Packages.java.net.URLEncoder.encode(params["payload"], Packages.java.nio.charset.StandardCharsets.UTF_8));
					dataOutputStream.writeBytes(params["payload"]);
					dataOutputStream.flush();
					dataOutputStream.close();
				}
			}
			
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug(httpUrlConnection.getContentEncoding());
			
			responseCode = httpUrlConnection.getResponseCode();
			
			if (httpUrlConnection.getResponseCode() == 200) {
			
				// inputStream = httpUrlConnection.getInputStream();
				inputStream = new Packages.java.util.zip.GZIPInputStream(httpUrlConnection.getInputStream());
			}
			else {
			
				inputStream = httpUrlConnection.getErrorStream();  
			}

			// bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(inputStream));
			// bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(inputStream, 'UTF-8'));
			// bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(inputStream, Packages.java.nio.charset.StandardCharsets.UTF_8));
			bufferedReader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(inputStream));
			
			while ((temp = bufferedReader.readLine()) != null) contentText += temp;
		}
		catch(error) {
		
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug(error.message);
		}
		finally {
		
			// bufferedReader.close();
			if ((typeof inputStream != 'undefined') && (inputStream != null)) inputStream.close();

			if ((typeof httpUrlConnection != 'undefined') && (httpUrlConnection != null)) httpUrlConnection.disconnect();
		}
	};

	/**
	 *
	 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app|Class UrlFetchApp  |  Apps Script  |  Google for Developers}
	 *
	 */
	var UrlFetchApp = {
	
		"fetch": function(url, params) {return new HTTPResponse(url, params);},
		"fetchAll": function(requests) {return requests;},
		"getRequest": function(url, params) {return new HTTPResponse(url, params);}
	};

	if (typeof define == 'function') {
	
		define([], function() {
		
			return {
			
				UrlFetchApp: UrlFetchApp
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports = UrlFetchApp;
	}
	else {
	
		if (typeof root.tw.ace33022.rhino == 'undefined') root.tw.ace33022.rhino = {};
		if (typeof root.tw.ace33022.rhino.google == 'undefined') root.tw.ace33022.rhino.google = {};
		if (typeof root.tw.ace33022.rhino.google.apps == 'undefined') root.tw.ace33022.rhino.google.apps = {};
		if (typeof root.tw.ace33022.rhino.google.apps.script == 'undefined') root.tw.ace33022.rhino.google.apps.script = {};
		if (typeof root.tw.ace33022.rhino.google.apps.script.UrlFetchApp == 'undefined') root.tw.ace33022.rhino.google.apps.script.UrlFetchApp = UrlFetchApp;
	}
})(this);