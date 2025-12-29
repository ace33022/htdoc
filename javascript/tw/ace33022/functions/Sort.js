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

		if (((typeof logger) != 'undefined') && (logger != null)) logger.debug('swap source[' + source + ']: ' + data[source] + ' <=> ' + 'target[' + target + ']: ' + data[target]);
		
    data[source] = data[target];
    data[target] = tmp;
	}
	
	/**
	 *
	 * @description 氣泡排序法(Bubble Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2023/10/11 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Bubble/1.php|[演算法] 氣泡排序法(Bubble Sort)}
	 *
	 * @memo 2025/10/21 ace 平均時間複雜度：O(n^2)。
	 *
	 */
	function bubble(value) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		var isSwap = true;
		var count;
		var index;
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			// count用來紀錄已排序完成的數量。
			for (count = 0; isSwap && (count < result["value"].length - 1); count++) {
			
				isSwap = false;
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('count: ' + count);
				
				for (index = 0; index < result["value"].length - count - 1; index++) {
				
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('index: ' + index);
				
					if (result["value"][index] > result["value"][index + 1]) {	// 將較大數據往右移，由小到大排序。
					
						isSwap = true;
						
						// swap(result["value"], index, index + 1);
						[result["value"][index], result["value"][index + 1]] = [result["value"][index + 1], result["value"][index]];	// swap
					}
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('value: ' + result["value"]);
				}
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('isSwap: ' + isSwap);
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('value: ' + result["value"]);
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
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/10 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Shaker/Shaker.php|[演算法] 搖晃排序法(Shaker Sort)}
	 * @see {@link https://magiclen.org/cocktail-sort/#:~:text=%E9%9B%9E%E5%B0%BE%E9%85%92%E6%8E%92%E5%BA%8F(Cocktail%20Sort)%E6%BC%94%E7%AE%97%E6%B3%95%E5%8F%88%E7%A8%B1%E7%82%BA%E6%90%96%E6%99%83%E6%8E%92%E5%BA%8F(Shaker%20Sort)%E6%BC%94%E7%AE%97%E6%B3%95%E3%80%81%E9%9B%99%E5%90%91%E6%B0%A3%E6%B3%A1%E6%8E%92%E5%BA%8F(Bidirectional%20Bubble%20Sort)%E6%BC%94%E7%AE%97%E6%B3%95%EF%BC%8C%E9%A1%A7%E5%90%8D%E6%80%9D%E7%BE%A9%EF%BC%8C%E5%AE%83%E6%98%AF%E6%B0%A3%E6%B3%A1%E6%8E%92%E5%BA%8F(Bubble%20Sort)%E6%BC%94%E7%AE%97%E6%B3%95%E7%9A%84%E8%AE%8A%E9%AB%94%EF%BC%8C%E5%B0%87%E5%8E%9F%E6%9C%AC%E5%96%AE%E5%90%91%E8%B5%B0%E8%A8%AA%E7%9A%84%E6%B0%A3%E6%B3%A1%E6%8E%92%E5%BA%8F%E6%94%B9%E7%82%BA%E9%9B%99%E5%90%91%EF%BC%8C%E7%94%A8%E4%BB%A5%E8%A7%A3%E6%B1%BA%E4%BD%BF%E7%94%A8%E6%B0%A3%E6%B3%A1%E6%8E%92%E5%BA%8F%E6%B3%95%E6%99%82%EF%BC%8C%E5%BA%8F%E5%88%97%E4%B8%AD%E6%9C%AA%E6%8E%92%E5%BA%8F%E7%9A%84%E4%B8%80%E7%AB%AF%E5%85%B6%E5%AF%A6%E5%B7%B2%E7%B6%93%E5%A4%A7%E8%87%B4%E6%8E%92%E5%BA%8F%E5%A5%BD%EF%BC%8C%E5%8D%BB%E5%8F%88%E4%B8%8D%E8%83%BD%E5%84%98%E5%BF%AB%E6%8A%8A%E5%AE%83%E5%AE%8C%E6%88%90%E7%9A%84%E6%83%85%E5%BD%A2%E3%80%82|雞尾酒排序(Cocktail Sort)演算法，雙向的氣泡排序法 | MagicLen}
	 *
	 * @memo 2025/11/01 ace 平均時間複雜度：O(n^2)。
	 * @memo 2025/11/01 ace 氣泡排序法(Bubble Sort)的變化應用，但是最差的情況下並未改善平均時間複雜度！
	 *
	 */
	function shaker(value) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var left = 0;
    var right = 0;
		
    var shift = 0;
		var index;
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			// right = result["value"].length - 1;
			right = result["value"].length;
			
			while (left < right) {
			
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('while repeat left: ' + left);
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('while repeat right: ' + right);
			
        for (index = left; index < right; index++) {
				
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('index: ' + index);
				
					if (result["value"][index] > result["value"][index + 1]) {	// 將最大值往右排。
					
						// swap(result["value"], index, index + 1);
						[result["value"][index], result["value"][index + 1]] = [result["value"][index + 1], result["value"][index]];	// swap
						
						shift = index;
					}
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('shift: ' + shift);
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"]: ' + result["value"]);
        }
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('left last shift: ' + shift);
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"]: ' + result["value"]);
				
        right = shift;
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('left: ' + left);
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('right: ' + right);
				
        for (index = right; index > left; index--) {
				
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('index: ' + index);
				
					if (result["value"][index] < result["value"][index - 1]) {	// 將最小值往左排。
					
						// swap(result["value"], index, index - 1);
						[result["value"][index], result["value"][index - 1]] = [result["value"][index - 1], result["value"][index]];	// swap
						
						shift = index;
					}
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('shift: ' + shift);
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"]: ' + result["value"]);
        }
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('left last shift: ' + shift);
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"]: ' + result["value"]);
				
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
	 * @description 選擇排序法(Selection Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/09/22 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Selection/1.php|[演算法] 選擇排序法(Selection Sort)}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10276719|【Day22】[演算法]-選擇排序法Selection Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10218442|排序 2 : 選擇排序 Selection Sort & 插入排序 Insertion Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 * @memo 2025/10/21 ace 平均時間複雜度：O(n^2)。
	 * @memo 2025/10/21 ace 每輪比較完才交換位置；泡沫排序則是兩兩比較則交換位置。
	 *
	 */
	function selection(value) {
	
		function method_loop(array) {
		
			var indexMin;
		
			for (var index = 0; index < array.length; index++) {
			
				indexMin = index;
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('array: ' + array);
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('index: ' + index + ' => value: ' + array[index]);
				
				for (var indexToFind = index + 1; indexToFind < array.length; indexToFind++) {
				
					if (array[indexToFind] < array[indexMin]) indexMin = indexToFind;	// 找出最小值。
				}
				
				if (index != indexMin) swap(array, index, indexMin);
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('after swap array: ' + array);
			}
			
			return array;
		}
		
		function method_recursion(array, indexSorted) {
		
			var indexMin = indexSorted;
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('array: ' + array);
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('indexSorted: ' + indexSorted);
			
			if (indexSorted == (array.length - 1)) return array;
			
			for (var indexToFind = indexSorted + 1; indexToFind < array.length; indexToFind++) {
			
				if (array[indexToFind] < array[indexMin]) indexMin = indexToFind;	// 找出最小值。
			}
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('indexMin: ' + indexMin);
			
			[array[indexSorted], array[indexMin]] =  [array[indexMin], array[indexSorted]];
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('after swap array: ' + array);
			
			return method_recursion(array, indexSorted + 1);
		}
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		// var indexMin;
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			// result["value"] = method_loop(result["value"]);
			result["value"] = method_recursion(result["value"], 0);
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		// if (logger != null) logger.debug('result: ' + JSON.stringify(result));
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 插入排序法(Insertion Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/05 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Insertion/1.php|[演算法] 插入排序法(Insertion Sort)}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10277360|【Day23】[演算法]-插入排序法Insertion Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10218442|排序 2 : 選擇排序 Selection Sort & 插入排序 Insertion Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 * @memo 2025/10/21 ace O(n^2)。
	 *
	 */
	function insertion(value) {
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		var indexSource;
		var indexSorted;
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			for (var indexSource = 1; indexSource < result["value"].length; indexSource++) {	// 從第二個元素[1]後當作未排序來源。
			
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('insertion indexSource: ' + indexSource);
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('insertion indexSource value: ' + result["value"][indexSource]);
			
				for (indexSorted = indexSource; indexSorted > 0; indexSorted--) {	// indexSource之前屬於已排序資料。
				
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('insertion indexSorted: ' + indexSorted);
					
					if (result["value"][indexSorted] > result["value"][indexSorted - 1]) break;	// 來源資料已在排序好的資料中找到位置。
				
					// if (result["value"][indexSorted] < result["value"][indexSorted - 1]) swap(result["value"], indexSorted - 1, indexSorted);
					// if (result["value"][indexSorted] < result["value"][indexSorted - 1]) [result["value"][indexSorted - 1], result["value"][indexSorted]] = [result["value"][indexSorted], result["value"][indexSorted - 1]];	// swap
					
					[result["value"][indexSorted - 1], result["value"][indexSorted]] = [result["value"][indexSorted], result["value"][indexSorted - 1]];	// swap
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('insertion: ' + result["value"]);
				}
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('insertion indexSource[' + indexSource + '] after sort: ' + result["value"]);
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
	 * @description 希爾排序法(Shell Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/10 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Shell/Shell.php|[演算法] 希爾排序法(Shell Sort)}
	 *
	 * @memo 2025/10/25 ace 插入排序法(Insertion Sort)的改良，透過減少資料搬移次數提升效率。
	 * @memo 2025/10/25 ace 時間複雜度會因選用的GAP有所不同。
	 * @memo 2025/10/25 ace 最後進入gap=1的狀況，就會變成基本的插入排序法，這樣的方式是否在多核心架構下才有意義？
	 *
	 * @memo 2025/10/25 ace 平均時間複雜度：O(n^2)。
	 *
	 */
	function shell(value) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		var gap;
		var indexSource;
		var indexSorted;
		var tmp;
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('length: ' + result["value"].length);
			
			for (gap = parseInt(result["value"].length / 2); gap > 0; gap = parseInt(gap / 2)) {
			
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('gap: ' + gap);
			
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('value: ' + result["value"]);
				
				for (indexSource = gap; indexSource < result["value"].length; indexSource += gap) {	// 插入排序法。
				
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('indexSource: ' + indexSource);
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"][' + indexSource + ']: ' + result["value"][indexSource]);
					
					tmp = result["value"][indexSource];	// 比較的起始點須先暫存，後續會被已排序好的資料中較大值覆蓋。
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('tmp: ' + tmp);
					
					for (indexSorted = indexSource; (indexSorted >= gap) && (tmp < result["value"][indexSorted - gap]); indexSorted -= gap) {	// 已經比排序好的最後一個資料還小就不需要再交換。
					
						if ((typeof logger != 'undefined') && (logger != null)) logger.debug('indexSorted: ' + indexSorted);
						if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"][' + indexSorted + ']: ' + result["value"][indexSorted]);
						if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"][' + (indexSorted - gap) + ']: ' + result["value"][indexSorted - gap]);
					
						result["value"][indexSorted] = result["value"][indexSorted - gap];	// 將較大的值往後移。
						
						if ((typeof logger != 'undefined') && (logger != null)) logger.debug('insertion assigned value: ' + result["value"]);
					}
					
					result["value"][indexSorted] = tmp;
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('after asign value: ' + result["value"]);
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
	 * @description 合併排序法(Merge Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/05 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Merge/Merge.php|[演算法] 合併排序法(Merge Sort)}
	 * @see {@link https://kopu.chat/%e5%90%88%e4%bd%b5%e6%8e%92%e5%ba%8f-merge-sort/|合併排序 (Merge Sort) - 寫點科普 Lynn}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10218895|排序 3: 合併排序 Merge Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10278179|【Day25】[演算法]-合併排序法Merge Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 * @memo 2025/10/27 ace 平均時間複雜度：O(nlogn)。
	 *
	 */
	function merge(value) {
	
		function doMerge(arrayLeft, arrayRight) {
		
			var result = new Array();
			
			var indexLeft = 0, indexRight = 0;
			
			while (indexLeft < arrayLeft.length && indexRight < arrayRight.length) {
	
				if (arrayLeft[indexLeft] < arrayRight[indexRight]) {
				
					result.push(arrayLeft[indexLeft++]);
				}
				else {
				
					result.push(arrayRight[indexRight++]);
				}
			}
			
			// 將左、右邊陣列剩餘數量加入，兩個陣列會只剩一個陣列還有資料，以下只會有一個迴圈會執行。
			while (indexLeft < arrayLeft.length) result.push(arrayLeft[indexLeft++]);
			while (indexRight < arrayRight.length) result.push(arrayRight[indexRight++]);
			
			return result;
		}
		
		function doSplit(data) {
		
			var result = data;
		
			// var arrayLeft = new Array(); 
			// var arrayRight = new Array();
			
			var middle = 0;
			
			// var index;
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('data: ' + data);
			
			if (data.length > 1) {
			
				middle = parseInt(data.length / 2);
				
				// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('middle: ' + middle);
		
				// 將資料分割成左右子串列。
				// for (index = 0; index < middle; index++) arrayLeft[index] = data[index];
				// for (index = middle; index < data.length; index++) arrayRight[index - middle] = data[index];
				
				// arrayLeft = data.slice(0, middle);
				// arrayRight = data.slice(middle, data.length);
		
				// arrayLeft = doSplit(data.slice(0, middle));   					// 對左子串列作資料分割。
				// arrayRight = doSplit(data.slice(middle, data.length));	// 對右子串列作資料分割。
				
				// return doMerge(arrayLeft, arrayRight); // 將左右子串列的結果合併。
				result = doMerge(doSplit(data.slice(0, middle)), doSplit(data.slice(middle, data.length))); // 將左右子串列的結果合併。
			}
			
			return result;
		}
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
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
	 * @description 快速排序法(Quick Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/09/22 ace 初始版本。
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Quick/Quick.php|[演算法] 快速排序法(Quick Sort)}
	 * @see {@link https://kopu.chat/%e5%bf%ab%e9%80%9f%e6%8e%92%e5%ba%8f-quick-sort/|快速排序 (Quick Sort) - 寫點科普 Lynn}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10278644|【Day26】[演算法]-快速排序法Quick Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10219567|排序 4: 快速排序 Quick Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 * @author ace
	 *
	 * @memo 2025/10/27 ace 又稱分割交換排序法。
	 *
	 * @memo 2025/10/27 ace 平均時間複雜度：O(nlogn)。
	 *
	 */
	function quick(value) {
	
		/**
		 *
		 * @description 快速排序法(Quick Sort)
		 *
		 * @param data array
		 * @param left number
		 * @param right number
		 *
		 * @version 2024/09/22 初始版本。
		 *
		 * @author ace
		 *
		 */
		function doSort(data, pointerLeft, pointerRight) {
		
			var pivot = data[pointerLeft];	// 第一個數值為基準值(Pivot)。
			
			var indexLeft = pointerLeft, indexRight = pointerRight + 1;
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('data: ' + data);
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('pointerLeft: ' + pointerLeft);
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('pointerRight: ' + pointerRight);
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('pivot: ' + pivot);

			if (pointerLeft < pointerRight) {
			
				while (true) {
				
					while (((indexLeft + 1) <= pointerRight) && (data[++indexLeft] < pivot));		// 向右找大於Pivot數值的位置。
					while (((indexRight - 1) >= pointerLeft) && (data[--indexRight] > pivot));	// 向左找小於Pivot數值的位置。
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('indexLeft: ' + indexLeft);
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('data[indexLeft]: ' + data[indexLeft]);
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('indexRight: ' + indexRight);
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('data[indexRight]: ' + data[indexRight]);
					
					if (indexLeft >= indexRight) break;	// 若indexLeft、indexRight的位置交叉，代表範圍內數值已排序完成。
					
					if (indexLeft != indexRight) swap(data, indexLeft, indexRight);	// 將比Pivot大的數值換到右邊，比Pivot小的數值換到左邊。
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('data after index swap: ' + data);
				}
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('break out pivot compare.');
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('indexRight: ' + indexRight);
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('data[indexRight]: ' + data[indexRight]);
				if (pointerLeft != indexRight) swap(data, pointerLeft, indexRight);    		// 此時indexRight的左邊資料都已小於pivot，將Pivot移到indexRight。
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('data after pivot swap: ' + data);
				
				if (pointerLeft < (indexRight - 1)) doSort(data, pointerLeft, indexRight - 1);		// 對左子串列再進行快速排序。
				if ((indexRight + 1) < pointerRight) doSort(data, indexRight + 1, pointerRight);	// 對右子串列再進行快速排序。
			}
		}
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			doSort(result["value"], 0, result["value"].length - 1);
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description 桶排序法(Bucket Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2025/10/29 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://ithelp.ithome.com.tw/articles/10279536|【Day28】[演算法]-桶排序法Bucket Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10304456|Day 20 你會分類你要先講 - Bucket Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10201707|[[演算法] 桶子排序法 (Bucket Sort) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天]}
	 *
	 * @memo 2025/10/27 ace 平均時間複雜度：O(n+k)，k為桶子數量。
	 * @memo 2025/10/29 ace 以10個數值區間作為各個桶子的分類。
	 *
	 */
	function bucket(value) {
	
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var min = 0;
		var max = 0;
		
		// var bucketSize = 5;
		
		var arrayBucket;
		var index;
		
		try {
		
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			min = (function (array) {
			
				var result = array[0];
				
				array.forEach(function(element) {result = element < result ? element : result;});
				
				return result;
			})(result["value"]);
			
			max = (function (array) {
			
				var result = array[0];
				
				array.forEach(function(element) {result = element > result ? element : result;});
				
				return result;
			})(result["value"]);
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('min: ' + min);
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('max: ' + max);
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('parseInt(max / 10) + 1: ' + (parseInt(max / 10) + 1));

			// @memo 2025/10/29 ace 以最大值決定桶子數量。
			arrayBucket = new Array(parseInt(max / 10) + 1);
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('arrayBucket.length: ' + arrayBucket.length);
			
			// @memo 2025/10/29 ace 無法使用forEach健力第二維陣列？
			// arrayBucket.forEach(function (element) {element = new Array();});
			
			for (index = 0; index < arrayBucket.length; index++) arrayBucket[index] = new Array();
			
			// for (index = 0; index < arrayBucket.length; index++) if ((typeof logger != 'undefined') && (logger != null)) logger.debug(index + ' : ' + typeof arrayBucket[index]);
			
			result["value"].forEach(function (element) {
			
				// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('parseInt(' + element + ' / 10): ' + parseInt(element / 10));
				// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Math.floor(' + element + ' / 10): ' + Math.floor(element / 10));
				
				arrayBucket[Math.floor(element / 10)].push(element);
			});
			
			// arrayBucket.forEach(function (element) {if ((typeof logger != 'undefined') && (logger != null)) logger.debug('element: ' + element);});
			// for (index = 0; index < arrayBucket.length; index++) if ((typeof logger != 'undefined') && (logger != null)) logger.debug(index + ' : ' + arrayBucket[index].toString());
			
			result["value"].length = 0;
			
			arrayBucket.forEach(function (element) {
			
				var sortResult = [];

				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('before sort element: ' + element);
				
				// element.sort();
				
				sortResult = merge(JSON.stringify({"data": element}));
				
				// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('sortResult: ' + sortResult);
				
				if (JSON.parse(sortResult)["code"] == 0) element = JSON.parse(sortResult)["value"];
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('after sort element: ' + element);
				
				result["value"] = result["value"].concat(element);
			});
			
			// @memo 2025/10/29 ace Array.forEach()函數內回寫的element資料並不會改變原資料內容。
			// arrayBucket.forEach(function (element) {if ((typeof logger != 'undefined') && (logger != null)) logger.debug('element: ' + element);});
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
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2024/10/10 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://notepad.yehyeh.net/Content/Algorithm/Sort/Radix/Radix.php|[演算法] 基數排序法(Radix Sort)}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10279960|【Day29】[演算法]-基數排序法Radix Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10303968|Day 19 排序新理解 - Radix Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10202713|[演算法] 基數排序法 (Radix Sort) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://hackmd.io/@Aquamay/H1nxBOLcO/https%3A%2F%2Fhackmd.io%2F%40Aquamay%2FBkm5b_Jsu|基數排序法(Radix Sort) - HackMD}
	 *
	 * @memo 2025/10/29 ace O(n+k)，k為桶子數量。
	 * @memo 2025/11/01 ace MSD(Most Significant Digit)。
	 * @memo 2025/11/01 ace LSD(Least Significant Digit)。
	 *
	 */
	function radix(value) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		var min = 0;
		var max = 0;
		
		var arrayBucket;
		var indexDigit;
		
		try {
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			min = (function (array) {
			
				var result = array[0];
				
				array.forEach(function(element) {result = element < result ? element : result;});
				
				return result;
			})(result["value"]);
			
			max = (function (array) {
			
				var result = array[0];
				
				array.forEach(function(element) {result = element > result ? element : result;});
				
				return result;
			})(result["value"]);
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('min: ' + min);
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('max: ' + max);
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('min.toString().length: ' + min.toString().length);
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('max.toString().length: ' + max.toString().length);
			
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Math.pow(10, 3): ' + Math.pow(10, 3));
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Math.pow(2, 3): ' + Math.pow(2, 3));
			
			for (indexDigit = 0; indexDigit < max.toString().length; indexDigit++) {
			
				arrayBucket = new Array(10);
				
				// arrayBucket.forEach(function(element) {element = new Array();});	// 無法使用forEach方式指定二維陣列？
				for (index = 0; index < arrayBucket.length; index++) arrayBucket[index] = new Array();
				
				// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('arrayBucket: ' + arrayBucket);
				
				result["value"].forEach(function(element) {
				
					// radix = Math.floor(element / Math.pow(10, indexDigit)) % 10 
					// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Math.floor(element / Math.pow(10, ' + indexDigit + ')): ' + Math.floor(element / Math.pow(10, indexDigit)));
					// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('Math.floor(element / Math.pow(10, indexDigit)) % 10: ' + Math.floor(element / Math.pow(10, indexDigit)) % 10);
					
					arrayBucket[Math.floor(element / Math.pow(10, indexDigit)) % 10].push(element);
				});
				
				result["value"].length = 0;
				
				arrayBucket.forEach(function(element) {
				
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('element: ' + element);
					
					result["value"] = result["value"].concat(element);
				});
				
				if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result["value"]: ' + result["value"]);
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
	 * @description 堆積排序法(Heap Sort)
	 *
	 * @param value JSON String
	 *
	 * @memberof module:Sort
	 *
	 * @version 2025/11/01 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205193|[資料結構] 樹 (Tree) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205462|[資料結構] 二元樹 (Binary Tree) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205571|[資料結構] 二元樹走訪 (Binary Tree Traversal) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205875|[資料結構] 二元搜尋樹 (Binary Search Tree) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10206479|[資料結構] 堆積 (Heap) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10270326|【Day12】[資料結構]-樹Tree - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10270953|【Day13】[資料結構]-二元樹Binary Tree - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10271647|【Day14】[資料結構]-二元樹走訪Binary Tree Traversal - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10272328|【Day15】[資料結構]-二元搜尋樹Binary Search Tree, BST - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10272982|【Day16】[資料結構]-二元搜尋樹Binary Search Tree-實作 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10273685|【Day17】[資料結構]-堆積Heap - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10274633|【Day18】[資料結構]-堆積Heap-實作 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10279239|【Day27】[演算法]-堆積排序法 Heap Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10305502|Day 24 出疊書上課囉 - Binary Heap - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10307742|Day 26 展現解題 GAP - Heap Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 * @memo 2025/11/03 ace 平均時間複雜度：O(nlogn)。
	 *
	 */
	function heap(value) {

		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		// var arraySource = [];
		
		var heap;
		
		var length;
		var index;
		
		try {
		
			if (typeof Packages != 'undefined') {
			
				if (typeof tw.ace33022.DataStructure == 'undefined') load(tw["ace33022"]["RequireJSConfig"]["baseUrl"] + tw["ace33022"]["RequireJSConfig"]["paths"]["tw.ace33022.DataStructure"] + '.js');
			}
		
			// arraySource = JSON.parse(value)["data"];
		
			// if (!(arraySource instanceof Array)) throw new Error('data is not Array instance.');
			
			// result["value"] = arraySource.slice();	// 複製一份陣列資料，避免修改原始資料。
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
			
			// heap = new tw.ace33022.DataStructure.MaxHeap();
			heap = new tw.ace33022.DataStructure.MinHeap();
			
			result["value"].forEach(function(element) {heap.add(element);});
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('heap: ' + heap);
			
			length = result["value"].length;
			result["value"] = [];
			
			for (index = 0; index < length; index++) result["value"].push(heap.removeRoot());
		}
		catch (e) {
		
			result["code"] = 1;
			result["message"] = e.message;
		}
		
		return JSON.stringify(result);
	}
	
	/**
	 *
	 * @description shuffle
	 *
	 * @param data array
	 *
	 * @memberof module:Sort
	 *
	 * @version 2025/05/11 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link http://wemee.blogspot.com/2014/02/shuffle-array.html|研發宅的腦漿: 陣列洗牌程式(shuffle array)}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10197904|[筆記][JavaScript]用Math.random()取得亂數的技巧 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 */
	function shuffle(value) {
	
		// var result = this;
		
		var result = {
		
			"code": 0,
			"message": "",
			"value": []
		};
		
		var count;
		var index;
		var temp = [];
	
		try {
		
			result["value"] = JSON.parse(value)["data"].slice();	// 複製一份陣列資料，避免修改原始資料。
		
			while (result["value"].length) temp.push(result["value"].splice(Math.random() * result["value"].length, 1)[0]);
			
			result["value"].length = 0;
			while (temp.length) result["value"].push(temp.pop());
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
  
				"bubble": bubble,
				"shaker": shaker,
				"selection": selection,
				"insertion": insertion,
				"shell": shell,
				"merge": merge,
				"quick": quick,
				"bucket": bucket,
				"radix": radix,
				"heap": heap,
				"shuffle": shuffle
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports.bubble = bubble;
		module.exports.shaker = shaker;
		module.exports.selection = selection;
		module.exports.insertion = insertion;
		module.exports.shell = shell;
		module.exports.merge = merge;
		module.exports.quick = quick;
		module.exports.bucket = bucket;
		module.exports.radix = radix;
		module.exports.heap = heap;
		module.exports.shuffle = shuffle;
	}
	else {
	
		if (typeof root.tw.ace33022.functions.Sort == 'undefined') root.tw.ace33022.functions.Sort = {};
		
		root.tw.ace33022.functions.Sort.bubble = bubble;
		root.tw.ace33022.functions.Sort.shaker = shaker;
		root.tw.ace33022.functions.Sort.selection = selection;
		root.tw.ace33022.functions.Sort.insertion = insertion;
		root.tw.ace33022.functions.Sort.shell = shell;
		root.tw.ace33022.functions.Sort.merge = merge;
		root.tw.ace33022.functions.Sort.quick = quick;
		root.tw.ace33022.functions.Sort.bucket = bucket;
		root.tw.ace33022.functions.Sort.radix = radix;
		root.tw.ace33022.functions.Sort.heap = heap;
		root.tw.ace33022.functions.Sort.shuffle = shuffle;
	}
})(this);