/**
 *
 * @description tw.ace33022.dao.db.vo.ForeignFutureOptionDayTrnLog(外資每日期貨/選擇權交易統計資料)
 *
 * @return {Object} tw.ace33022.dao.db.vo.ForeignFutureOptionDayTrnLog
 *
 * @require underscore.js
 * @require tw.ace33022.vo.ForeignFutureOptionDayTrnLog
 * @require tw.ace33022.dao.vo.Ancestor
 * 
 * @version 2013/11/07 ace 初始版本。
 * @version 2015/03/10 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2020/04/07 ace 名稱調整。
 *
 * @author ace
 *
 * @see <a href="http://ejohn.org/">John Resig</a>
 * @see <a href="https://github.com/jeresig/env-js">jeresig/env-js</a>
 *
 */
(function(root) {

	var RequireJSConfig;
	
	var _;	// underscore.js
	
	var ancestor;
	var accessVO;
	
	var result = function(conn) {

		var serialVersionUID = new Number(1);	// 保留
  
		var uber = new ancestor(conn);
		
		_.extend(this, uber);
		// this.prototype = uber;	// 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		this.setTableName('foreign_future_options_day_trn_log');
		this.setAccessVO(accessVO);
  
		this.setRStoVO = function(rs, vo) {

			// 需使用JavaScript語法重新轉型字串型態，以免vo物件處理資料時產生錯誤。
			// rs物件只可取值乙次，第二次再取值則該資料遺失，造成例外錯誤？
			vo.setTrnDate(new String(rs.getString('trn_date')));
			vo.setFutureBuyQty(new Number(rs.getDouble('futures_buy_qty')));
			vo.setOptionBuyQty(new Number(rs.getDouble('options_buy_qty')));
			vo.setFutureSellQty(new Number(rs.getDouble('futures_sell_qty')));
			vo.setOptionSellQty(new Number(rs.getDouble('options_sell_qty')));
			vo.setFutureStayBuyQty(new Number(rs.getDouble('futures_stay_buy_qty')));
			vo.setOptionStayBuyQty(new Number(rs.getDouble('options_stay_buy_qty')));
			vo.setFutureStaySellQty(new Number(rs.getDouble('futures_stay_sell_qty')));
			vo.setOptionStaySellQty(new Number(rs.getDouble('options_stay_sell_qty')));
		}
  
		this.doInsert = function(vo) {
  
			var result = false;
    
			var pstmt = null;
			
			var sql = 'insert into ' + this.getTableName() + ' '
              + '(trn_date, future_buy_qty, option_buy_qty, future_sell_qty, option_sell_qty, future_stay_buy_qty, option_stay_buy_qty, future_stay_sell_qty, option_stay_sell_qty) '
              + 'values '
              + '(?, ?, ?, ?, ?, ?, ?, ?, ?) ';

			try {   
    
				vo.initInsertDateTime();
			
				pstmt = conn.prepareStatement(sql);
				
				pstmt.setString(1, vo.getTrnDate());
				pstmt.setDouble(2, vo.getFutureBuyQty());
				pstmt.setDouble(3, vo.getOptionBuyQty());
				pstmt.setDouble(4, vo.getFutureSellQty());
				pstmt.setDouble(5, vo.getOptionSellQty());
				pstmt.setDouble(6, vo.getFutureStayBuyQty());
				pstmt.setDouble(7, vo.getOptionStayBuyQty());
				pstmt.setDouble(8, vo.getFutureStaySellQty());
				pstmt.setDouble(9, vo.getOptionStaySellQty());
				
				if (pstmt.executeUpdate() > 0) result = true;
			}
			finally {
    
				if (pstmt != null) pstmt.close();
			}
    
			return result;
		}
  
		this.doSelectByTrnDate = function(trnDate) {
  
			var result = new Array();
    
			var pstmt = null;
			var sql = 'select * from ' + this.getTableName() + ' '
							+ 'where (1=1) '
							+ 'and trn_date=? ';
    
			try {
    
				pstmt = conn.prepareStatement(sql);
				
				pstmt.setString(1, trnDate);       
				
				this.setSelectResult(pstmt.executeQuery(), result);
			}
			finally {
    
				if (pstmt != null) pstmt.close();
			}
    
			return result;
		}
  
		this.doDeleteByTrnDate = function(trnDate) {
  
			var result = false;
    
			var pstmt = null;
			
			var sql = 'delete from ' + this.getTableName() + ' '
							+ 'where (1=1) '
							+ 'and trn_date=? ';
    
			try {
    
				pstmt = conn.prepareStatement(sql);
				
				pstmt.setString(1, trnDate);
				
				if (pstmt.executeUpdate() > 0) result = true;
			}
			finally {
    
				if (pstmt != null) pstmt.close();
			}
    
			return result;
		}
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.vo.ForeignFutureOptionDayTrnLog", "tw.ace33022.dao.db.vo.Ancestor", "underscore"], function(ForeignFutureOptionDayTrnLog, Ancestor) {
		
			_ = root._;

			ancestor = Ancestor;
			accessVO = ForeignFutureOptionDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports  !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		_ = require(RequireJSConfig.paths["underscore"] + '.js');
	
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.ForeignFutureOptionDayTrnLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
	
		if (typeof load !== 'undefined') {
		
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
			
			if (typeof root.tw.ace33022.dao.db.vo.Ancestor === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
			if (typeof root.tw.ace33022.vo.ForeignFutureOptionDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.ForeignFutureOptionDayTrnLog"] + '.js');
		}
		
		_ = root._;
		
		ancestor = root.tw.ace33022.dao.db.vo.Ancestor;
		accessVO = root.tw.ace33022.vo.ForeignFutureOptionDayTrnLog;
			
		root.tw.ace33022.dao.db.vo.ForeignFutureOptionDayTrnLog = result;
	}    
})(this);