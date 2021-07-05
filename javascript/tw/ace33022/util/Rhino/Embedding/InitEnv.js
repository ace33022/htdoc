
Packages.java.lang.System.setOut(new Packages.java.io.PrintStream(Packages.java.lang.System.out, true, 'BIG5'));

if (typeof print === 'undefined') print = function(msg) { Packages.java.lang.System.out.println(msg); }
if (typeof load === 'undefined') load = function(file) { 

	var fileURI;

	if (typeof file === 'string') {

		fileURI = (new Packages.java.net.URL(file)).toURI();
	}
	else {
	
		fileURI = file;
	}
	
	Packages.tw.ace33022.util.RhinoUtil.load(context, scope, new Packages.java.io.File(fileURI)); 
}

if (typeof alert === 'undefined') alert = print;

load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/util/Rhino/GoogleAppsScriptEmulate/Base/Logger.js');
load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/json2.js');