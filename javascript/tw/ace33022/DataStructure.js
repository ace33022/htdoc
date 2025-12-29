/**
 *
 * @module DataStructure
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *
 */

(function(root) {

	function Node(value) {
	
		this.data = value;
		this.left = null;
		this.right = null;
	}

	/**
	 *
	 * @description 佇列（Queue）
	 *
	 * @param
	 *
	 * @memberof module:DataStructure
	 *
	 * @version 2019/11/23 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://blog.techbridge.cc/2016/12/10/javascript-data-structure-algorithm-queue/|用 JavaScript 學習資料結構和演算法：佇列（Queue）篇 | TechBridge 技術共筆部落格}
	 *
	 */
	function Queue() {

		var items = [];
		
		this.clear = function() {items = [];};
		
		this.size = function() {return items.length;};
		
		// this.isEmpty = function() {return items.length == 0;};
		this.isEmpty = function() {return this.size() == 0;};
		
		// this.isFull = function() {return false;};
		
		this.add = function(element) {items.push(element);};
		
		this.remove = function() {return items.shift();};
		
		// this.getRear = function() {return items[items.length - 1];};
		
		this.toString = function() {return items.toString();};
	};
	
	/**
	 *
	 * @description 二元搜尋樹(Binary Search Tree，BST)
	 *
	 * @version 2025/11/04 ace 初始版本。
	 *
	 * @author ace
	 *
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205193|[資料結構] 樹 (Tree) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205462|[資料結構] 二元樹 (Binary Tree) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205571|[資料結構] 二元樹走訪 (Binary Tree Traversal) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10205875|[資料結構] 二元搜尋樹 (Binary Search Tree) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10206479|[資料結構] 堆積 (Heap) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10270953|【Day13】[資料結構]-二元樹Binary Tree - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10271647|【Day14】[資料結構]-二元樹走訪Binary Tree Traversal - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10272328|【Day15】[資料結構]-二元搜尋樹Binary Search Tree, BST - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10272982|【Day16】[資料結構]-二元搜尋樹Binary Search Tree-實作 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 */
	var BinarySearchTree = function() {
	
		var rootNode = null;
		
		this.add = function(value) {
		
			function insertNode(node, newNode) {
			
				if (newNode.data < node.data) {
				
					if (node.left == null) {
					
						node.left = newNode;
					}
					else {
					
						insertNode(node.left, newNode);
					}
				}
				else {
				
					if (node.right == null) {
					
						node.right = newNode;
					}
					else {
					
						insertNode(node.right, newNode);
					}
				}
			}
			
			var node = new Node(value);
			
			if ((typeof logger != 'undefined') && (logger != null)) logger.debug('value: ' + value);
			
			if (rootNode == null) {
			
				rootNode = node;
			}
			else {
			
				insertNode(rootNode, node);
			}
		}
		
		this.remove = function(data) {
		
			function min(node) {
			
				var result = node;
				
				while ((result != null) && (result.left != null)) {
				
					result = result.left;
					
					if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result.data: ' + result.data);
				}
				
				return result;
			}		
		
			function removeNode(node, data) {
			
				var result = node;
				
				var auxNode
			
				if (result != null) {
				
					if (data < result.data) {
					
						result.left = removeNode(result.left, data);
					}
					else if (data > result.data) {
					
						result.right = removeNode(result.right, data);
					}
					else {
					
						if ((result.left == null) && (result.right == null)) {
						
							result = null;	// 沒有子節點的狀況，直接刪除節點(設定成null)。
						}
						else {
						
							if ((result.left != null) && (result.right != null)) {
							
								// 有左右兩邊子樹，左子樹取最大值，右子樹取最小值(兩邊子樹擇一即可)。
								
								// 此處取右邊節點最小值。
								// var auxNode = min(result.right);
								var auxNode = (function(node) {
								
									var result = node;
									
									while ((result != null) && (result.left != null)) {
									
										result = result.left;
										
										if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result.data: ' + result.data);
									}
									
									return result;
								})(result.right);
								
								if ((typeof logger != 'undefined') && (logger != null)) logger.debug('auxNode.data: ' + auxNode.data);
								
								result.data = auxNode.data;
								
								result.right = removeNode(result.right, auxNode.data);	// 從右邊節點移除取得的值。
							}
							else {
							
								// 有單邊子樹，用子樹代替該節點。
								if (result.left == null) result = result.right;
								
								if (result.right == null) result = result.left;
							}
						}
					}
				}
				
				return result;
			}
			
			return removeNode(rootNode, data);
		}
		
		// 前序走訪
		this.preOrderTraversal = function() {
		
			var result = [];
			
			var preHelper = function(node) {
			
				if (node) {
				
					result.push(node.data);
					preHelper(node.left);
					preHelper(node.right);
				}
			}
			
			preHelper(rootNode);
			
			return result;
		}
		
		// 中序走訪
		this.inOrderTraversal = function() {
		
			var result = [];
			
			var inHelper = function(node) {
			
				if (node) {
				
					inHelper(node.left);
					result.push(node.data);
					inHelper(node.right);
				}
			}
			
			inHelper(rootNode);
			
			return result;
		}
	
		// 後序走訪
		this.postOrderTraversal = function() {
		
			var result = [];
			
			var postHelper = function(node) {
			
				if (node) {
				
					postHelper(node.left);
					postHelper(node.right);
					result.push(node.data);
				}
			}
			
			postHelper(rootNode);
			
			return result;
		}
		
		// 搜尋元素是否存在
		this.search = function(value, node) {
		
			var result = false;
			
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('node: ' + node);
			
			if (typeof node == 'undefined') {
			
				result = this.search(value, rootNode);
			}
			else {
			
				if (node != null) {
				
					if (value == node.data) result = true;
					
					if (!result) {
					
						if (value < node.data) {
						
							result = this.search(value, node.left);
						} 
						else if (value > node.data) {
						
							result = this.search(value, node.right);
						}
					}
				}
			}
		
			return result;
		}  
	}
	
	/**
	 *
	 * @description Max堆積(Max Heap)
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
	 * @see {@link https://ithelp.ithome.com.tw/articles/10305502|Day 24 出疊書上課囉 - Binary Heap - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10307742|Day 26 展現解題 GAP - Heap Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 * @memo 2025/11/03 ace Max Binary Heap - Max Heap - 父節點永遠比子節點大。
	 * @memo 2025/11/03 ace Min Binary Heap - Min Heap - 子節點永遠比父節點大。
	 *
	 */
	var MaxHeap = function() {
	
		var arrayHeap = [];
	
		// 最大堆積化
		this.heapify = function(indexParent) {
		
			var indexLargest = indexParent;
			
			var indexChildrenLeft = 2 * indexParent + 1;
			var indexChildrenRight = 2 * indexParent + 2;

			// 找出父-子節點的最大值。
			if (indexChildrenLeft < arrayHeap.length && arrayHeap[indexChildrenLeft] > arrayHeap[indexLargest]) indexLargest = indexChildrenLeft; 
			if (indexChildrenRight < arrayHeap.length && arrayHeap[indexChildrenRight] > arrayHeap[indexLargest]) indexLargest = indexChildrenRight; 
			
			if (indexLargest != indexParent) { 
			
				[arrayHeap[indexParent], arrayHeap[indexLargest]] = [arrayHeap[indexLargest], arrayHeap[indexParent]];
				
				this.heapify(indexLargest); 
			} 
		}
		
		// 新增元素
		this.add = function(value) {
		
			var size = arrayHeap.length;
			
			var index;
			
			if (size == 0) {
			
				arrayHeap.push(value);
			}
			else {
			
				arrayHeap.push(value);
				
				for (index = parseInt(arrayHeap.length / 2 - 1); index >= 0; index--) this.heapify(index); 
			}
		}
		
		// 刪除元素
		this.remove = function(value) {
		
			var result = null;
		
			var size = arrayHeap.length;
			
			var index;
			
			for (index = 0; index < size; index++) {
			
				if (value == arrayHeap[index]) break;
			}
			
			// 要刪除元素與最後一個元素交換
			[arrayHeap[index], arrayHeap[size - 1]] = [arrayHeap[size - 1], arrayHeap[index]];
			
			// 刪除最後一個元素
			result = arrayHeap.splice(size - 1)[0];
			
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result: ' + result);
			
			for (index = parseInt(arrayHeap.length / 2 - 1); index >= 0; index--) this.heapify(index); 
			
			return result;
		}
		
		// 回傳最大值
		this.getRoot = function() {return arrayHeap[0];}
  
		// 刪除最大值
		this.removeRoot = function() {return this.remove(arrayHeap[0]);}
  
		this.toString = function() {return arrayHeap.toString();};
	}
	
	/**
	 *
	 * @description Min堆積(Min Heap)
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
	 * @see {@link https://ithelp.ithome.com.tw/articles/10305502|Day 24 出疊書上課囉 - Binary Heap - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10307742|Day 26 展現解題 GAP - Heap Sort - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 * @memo 2025/11/03 ace Max Binary Heap - Max Heap - 父節點永遠比子節點大。
	 * @memo 2025/11/03 ace Min Binary Heap - Min Heap - 子節點永遠比父節點大。
	 *
	 */
	var MinHeap = function() {
	
		var arrayHeap = [];
	
		// 最大堆積化
		this.heapify = function(indexParent) {
		
			var indexLargest = indexParent;
			
			var indexChildrenLeft = 2 * indexParent + 1;
			var indexChildrenRight = 2 * indexParent + 2;

			// 找出父-子節點的最大值。
			if (indexChildrenLeft < arrayHeap.length && arrayHeap[indexChildrenLeft] < arrayHeap[indexLargest]) indexLargest = indexChildrenLeft; 
			if (indexChildrenRight < arrayHeap.length && arrayHeap[indexChildrenRight] < arrayHeap[indexLargest]) indexLargest = indexChildrenRight; 
			
			if (indexLargest != indexParent) { 
			
				[arrayHeap[indexParent], arrayHeap[indexLargest]] = [arrayHeap[indexLargest], arrayHeap[indexParent]];
				
				this.heapify(indexLargest); 
			} 
		}
		
		// 新增元素
		this.add = function(value) {
		
			var size = arrayHeap.length;
			
			var index;
			
			if (size == 0) {
			
				arrayHeap.push(value);
			}
			else {
			
				arrayHeap.push(value);
				
				for (index = parseInt(arrayHeap.length / 2 - 1); index >= 0; index--) this.heapify(index); 
			}
		}
		
		// 刪除元素
		this.remove = function(value) {
		
			var result = null;
		
			var size = arrayHeap.length;
			
			var index;
			
			for (index = 0; index < size; index++) {
			
				if (value == arrayHeap[index]) break;
			}
			
			// 要刪除元素與最後一個元素交換
			[arrayHeap[index], arrayHeap[size - 1]] = [arrayHeap[size - 1], arrayHeap[index]];
			
			// 刪除最後一個元素
			result = arrayHeap.splice(size - 1)[0];
			
			// if ((typeof logger != 'undefined') && (logger != null)) logger.debug('result: ' + result);
			
			for (index = parseInt(arrayHeap.length / 2 - 1); index >= 0; index--) this.heapify(index); 
			
			return result;
		}
		
		// 回傳最小值
		this.getRoot = function() {return arrayHeap[0];}
  
		// 刪除最小值
		this.removeRoot = function() {return this.remove(arrayHeap[0]);}
  
		this.toString = function() {return arrayHeap.toString();};
	}
	
	if (typeof define == 'function') {
	
		define([], function() { 
		
			return {
  
				"Queue": Queue,
				"BinarySearchTree": BinarySearchTree,
				"MaxHeap": MaxHeap,
				"MinHeap": MinHeap
			}
		});
	}
	else if (typeof exports != 'undefined') {
	
		module.exports.Queue = Queue;
		module.exports.BinarySearchTree = BinarySearchTree;
		module.exports.MaxHeap = MaxHeap;
		module.exports.MinHeap = MinHeap;
	}
	else {
	
		if (typeof root.tw.ace33022.DataStructure == 'undefined') root.tw.ace33022.DataStructure = {};
		
		root.tw.ace33022.DataStructure.Queue = Queue;
		root.tw.ace33022.DataStructure.BinarySearchTree = BinarySearchTree;
		root.tw.ace33022.DataStructure.MaxHeap = MaxHeap;
		root.tw.ace33022.DataStructure.MinHeap = MinHeap;
	}
})(this);