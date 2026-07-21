/**
 *
 * @description InitalizeEnvironment(Windwos JScript環境初始設定)
 *
 * @version 2025/01/19 ace 初始版本。
 *
 * @author ace
 *
 * @see <a href="https://zh.wikipedia.org/zh-tw/Windows_Script_Host">Windows Script Host - 維基百科，自由的百科全書</a>
 *
 */

(function(root) {
	
	root.EXIT_SUCCESS = 0;
	root.EXIT_FAILURE = 1;
	
	if (typeof root.console == 'undefined') root.console = {};
	
	if (typeof root.WScript != 'undefined') {
	
		root.console.log = function(message) {WScript.Stdout.WriteLine(message);}
	}
})(this);