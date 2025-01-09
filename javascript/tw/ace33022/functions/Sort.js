/**
 *
 * @module Sort
 *
 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Sort.php|[演算法] 排序演算法(Sort Algorithm)}
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof|instanceof - JavaScript | MDN}
 *
 */

(function(root) {

	function swap(data, source, target) {
	
    var tmp = data[source];

		if (((typeof logger) != 'undefined') && (logger != null)) logger.debug('swap source[' + source + ']: ' + data[source] + '<=>' + 'target[' + target + ']: ' + data[target]);
		
    data[source] = data[target];
    data[target] = tmp;
	}
	
	/**
	 *
	 * @description 選擇排序法(Selection Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/09/22 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Selection/1.php|[演算法] 選擇排序法(Selection Sort)}
	 *
	 */
	function selection(data) {
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var min;
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			for (var i = 0; i < result["value"].length; i ++) {
			
				min = i;
				
				for (var j = i + 1; j < result["value"].length; j++) {
				
					if (result["value"][j] < result["value"][min]) min = j;	// 找出最小值。
				}
				
				if (i != min)	swap(result["value"], i, min);
				
				if (((typeof logger) != 'undefined') && (logger != null)) logger.debug('value: ' + result["value"]);
			}
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		// if (logger != null) logger.debug('result: ' + JSON.stringify(result));
		
		return JSON.stringify(result);
	};

	/**
	 *
	 * @description 插入排序法(Insertion Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/05 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Insertion/1.php|[演算法] 插入排序法(Insertion Sort)}
	 *
	 */
	function Insertion(data) {
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
    var i, j, tmp;
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			for (i = 1; i < result["value"].length; i++) {
			
				tmp = result["value"][i];
				// if (logger != null) logger.debug('i: ' + i);
				// if (logger != null) logger.debug('tmp: ' + tmp);
				// if (logger != null) logger.debug('result["value"]: ' + result["value"]);
				
				for (j = i; j > 0 && tmp < result["value"][j - 1]; j--) {	// i - 1之前屬於已排序之資料。
				
					// if (logger != null) logger.debug('j: ' + j);
					// if (logger != null) logger.debug('result["value"]: ' + result["value"]);
					
					result["value"][j] = result["value"][j - 1];
					
					// if (logger != null) logger.debug('result["value"]: ' + result["value"]);
				}
				
				result["value"][j] = tmp;
				
				// if (logger != null) logger.debug('after for j: ' + j);
				// if (logger != null) logger.debug('result["value"]: ' + result["value"]);
			}
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	};
	
	/**
	 *
	 * @description 希爾排序法(Shell Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/10 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Shell/Shell.php|[演算法] 希爾排序法(Shell Sort)}
	 *
	 * @memo 2024/10/10 ace 最後進入gap=1的狀況，就會變成基本的插入排序法，這樣的方式是否在多核心架構下才有意義？
	 *
	 */
	function Shell(data) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var i, j, tmp;
		var gap;
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			gap = parseInt(result["value"].length / 2);
					
			for ( ; gap > 0; gap = parseInt(gap / 2)) {
			
				if (logger != null) logger.debug('gap: ' + gap);
				
				// for (i = gap; i < data.length; i++) {	// 插入排序法。
				for (i = gap; i < data.length; i += gap) {	// 插入排序法。
				
					tmp = result["value"][i];
					
					if (logger != null) logger.debug('tmp: ' + tmp);
					
					for (j = i; j >= gap && tmp < result["value"][j - gap]; j -= gap) {
					
						result["value"][j] = result["value"][j - gap];
					}
					
					result["value"][j] = tmp;
					
					if (logger != null) logger.debug('value: ' + result["value"]);
				}   
			}			
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 氣泡排序法(Bubble Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2023/10/11 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Bubble/1.php|[演算法] 氣泡排序法(Bubble Sort)}
	 *
	 */
	function Bubble(data) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var isSwap = true;
		var count;
		var index;
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			for (count = 0; (count < result["value"].length - 1) && isSwap; count++) {
			
				isSwap = false;
				
				for (index = 0; index < result["value"].length - count - 1; index++) {
				
					if (result["value"][index] > result["value"][index + 1]) {	// 將較大數據往右移，由小到大排序。
					
						isSwap = true;
						
						swap(result["value"], index, index + 1);
					}
					
					if (logger != null) logger.debug('isSwap: ' + isSwap);
					if (logger != null) logger.debug('value: ' + result["value"]);
				}
			}
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 搖晃排序法(Shaker Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/10 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Shaker/Shaker.php|[演算法] 搖晃排序法(Shaker Sort)}
	 *
	 */
	function Shaker(data) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var left = 0;
    var right = data.length -1;
    var shift = 0;
		var index;
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			right = result["value"].length -1;
			
			while (left < right) {
			
        for (index = left; index < right; index++) {
				
					if (result["value"][index] > result["value"][index + 1]) {	// 將最大值往右排。
					
						swap(result["value"], index, index + 1);
						
						shift = index;
					}
        }
				
        right = shift;
				
        for (index = right; index > left; index--) {
				
					if (result["value"][index] < result["value"][index - 1]) {	// 將最小值往左排。
					
						swap(result["value"], index, index - 1);
						
						shift = index;
					}           
        }
				
        left = shift;
			}
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 快速排序法(Quick Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/09/22 初始版本。
	 *
	 * @author ace
	 *
	 */
	function Quick(data) {
	
		/**
		 *
		 * @description 快速排序法(Quick Sort)
		 *
		 * @param data array
		 * @param left number
		 * @param right number
		 *
		 * @memberof module:Sort
		 *
		 * @version 2024/09/22 初始版本。
		 *
		 * @author ace
		 *
		 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Quick/Quick.php|[演算法] 快速排序法(Quick Sort)}
		 *
		 * @memo 2024/10/05 ace 若要提高程式易讀性，可以考慮新增空白陣列儲存排序過程。
		 *
		 */
		function doQuick(data, left, right) {
		
			var i = left, j = right + 1;
			var pivot = data[left];	// 第一個數值為基準值(Pivot)。
			
			if (logger != null) logger.debug('data: ' + data);
			if (logger != null) logger.debug('left: ' + left);
			if (logger != null) logger.debug('right: ' + right);
			if (logger != null) logger.debug('pivot: ' + pivot);

			if (left < right) {
			
				while (true) {
				
					while (((i + 1) < data.length) && (data[++i] < pivot));	// 向右找大於Pivot數值的位置。
					while (((j - 1) > -1) && (data[--j] > pivot));					// 向左找小於Pivot數值的位置。
					
					if (logger != null) logger.debug('i: ' + i);
					if (logger != null) logger.debug('data[i]: ' + data[i]);
					if (logger != null) logger.debug('j: ' + j);
					if (logger != null) logger.debug('data[j]: ' + data[j]);
					
					if (i >= j) break;	// 若i、j的位置交叉，代表範圍內，Pivot右邊已無比Pivot小的數值，Pivot左邊已無比Pivot大的數值。
					
					if (i != j) swap(data, i, j);	// 將比Pivot大的數值換到右邊，比Pivot小的數值換到左邊。
					
					if (logger != null) logger.debug('data after swap: ' + data);
				}
				
				if (left != j) swap(data, left, j);    		// 將Pivot移到中間。此時j的左邊資料都已小於pivot。
				
				if (left < (j - 1)) doQuick(data, left, j - 1);		// 對左子串列再進行快速排序。
				if ((j + 1) < right) doQuick(data, j + 1, right);	// 對右子串列再進行快速排序。
			}
		}
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			// if (logger != null) logger.debug(result["value"]);
			
			doQuick(result["value"], 0, result["value"].length - 1);
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 合併排序法(Merge Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/05 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Merge/Merge.php|[演算法] 合併排序法(Merge Sort)}
	 *
	 */
	function Merge(data) {
	
		function doMerge(arrayLeft, arrayRight) {
		
			var result = new Array();
			
			var indexLeft = 0, indexRight = 0;
			
			var count;
			
			// 一一比對leftData和arrayRight每個元素的大小，將較小者依序填入result。
			for (count = 0; count < arrayLeft.length + arrayRight.length; count++) {
					
				if (indexLeft == arrayLeft.length) {	// 如果arrayLeft資料已填完就填入arrayRight的資料。

					result.push(arrayRight[indexRight++]);
				}
				else if (indexRight == arrayRight.length) {	// 如果arrayRight已填完就填入arrayLeft的資料。
					
					result.push(arrayLeft[indexLeft++]);
				}
				else if (arrayLeft[indexLeft] < arrayRight[indexRight]) {	// 如果arrayLeft < arrayRight則填入arrayLeft的資料。
					
					result.push(arrayLeft[indexLeft++]);
				}
				else {	// 如果arrayRight < arrayLeft則填入arrayLeft的資料。

					result.push(arrayRight[indexRight++]);
				}
			}
			
			return result;
		}
		
		function doSplit(data) {
		
			var arrayLeft = new Array(); 
			var arrayRight = new Array();
			
			var middle = 0;
			
			var index;
			
			if (data.length > 1) {
			
				middle = parseInt(data.length / 2);
		
				// 將資料分割成左右子串列。
				for (index = 0; index < middle; index++) arrayLeft[index] = data[index];
				for (index = middle; index < data.length; index++) arrayRight[index - middle] = data[index];
		
				arrayLeft = doSplit(arrayLeft);   // 對左子串列作資料分割。
				arrayRight = doSplit(arrayRight);	// 對右子串列作資料分割。
				
				return doMerge(arrayLeft, arrayRight); // 將左右子串列的結果合併。
			}
			
			return data;	// 如果資料只有1筆，直接回傳。
		}
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			result["value"] = doSplit(result["value"]);
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 基數排序法(Radix Sort)
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/10 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Radix/Radix.php|[演算法] 基數排序法(Radix Sort)}
	 *
	 * @memo 2024/10/10 ace 來源程式碼正確性待考量？
	 *
	 */
	function Radix(data) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var MAX = 100;      // 數的上限。
		var radix = 1;			// radix = 1、10、100,...
		
		var indexData = 0;
		
		var buckets = new Array(data.length);	// 桶子。
		var	count = new Array(data.length);   // 記錄每個桶子裝了幾個數值。
		
		try {
		
			if (!(data instanceof Array)) throw new Error('data is not Array instance.');
			
			result["value"] = data.slice();	// 複製一份陣列資料，避免修改原始資料。
			
			// buckets = new Array(result["value"].length);	// 桶子。
			// count = new Array(result["value"].length);   	// 記錄每個桶子裝了幾個數值。
			buckets = new Array(10);	// 桶子。(十進制)
			count = new Array(10);   	// 記錄每個桶子裝了幾個數值。(十進制)
			
			// 初始化桶子。
			for (var index = 0; index < buckets.length; index++) {
			
				buckets[index]  = new Array(buckets.length);
				count[index] = 0;
			}
					
			while (radix <= MAX) {	// 基數上限。
			
				// 分配
				for (var i = 0; i < result["value"].length; i++){
				
					var LSD = parseInt((result["value"][i] / radix)) % 10;  // 計算LSD(=那一個桶子)。
					buckets[LSD][count[LSD]] = result["value"][i];          // 將資料放到對應的桶子。
					count[LSD]++;
					
					// if (logger != null) logger.debug('LSD: ' + LSD);
				}
				
				radix *= 10;	// 更新基底：1->10、10->100。
		
				// 合併
				indexData = 0;
				for (var i = 0; i < result["value"].length; i++) {         // 將桶子內的資料合併。
				
					if (count[i] != 0) {                        // 如果桶子內有資料。
					
						for (var j =0 ; j < count[i]; j++) result["value"][indexData++] = buckets[i][j];
					}
					
					if (logger != null) logger.debug('value: ' + result["value"]);
					
					count[i] = 0;                             // 歸0，以便下一回合使用。
				}		
			}
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				"selection": selection,
				"Insertion": Insertion,
				"Shell": Shell,
				"Bubble": Bubble,
				"Shaker": Shaker,
				"Quick": Quick,
				"Merge": Merge,
				"Radix": Radix
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports.selection = selection;
		module.exports.Insertion = Insertion;
		module.exports.Shell = Shell;
		module.exports.Bubble = Bubble;
		module.exports.Shaker = Shaker;
		module.exports.Quick = Quick;
		module.exports.Merge = Merge;
		module.exports.Radix = Radix;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Sort == 'undefined') root.tw.ace33022.functions.Sort = {};
		
		root.tw.ace33022.functions.Sort.selection = selection;
		root.tw.ace33022.functions.Sort.Insertion = Insertion;
		root.tw.ace33022.functions.Sort.Shell = Shell;
		root.tw.ace33022.functions.Sort.Bubble = Bubble;
		root.tw.ace33022.functions.Sort.Shaker = Shaker;
		root.tw.ace33022.functions.Sort.Quick = Quick;
		root.tw.ace33022.functions.Sort.Merge = Merge;
		root.tw.ace33022.functions.Sort.Radix = Radix;
	}
})(this);