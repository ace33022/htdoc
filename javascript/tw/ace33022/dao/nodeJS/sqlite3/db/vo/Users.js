/**
 *
 * UsersDAO
 *
 * @author ace
 *
 * @version 2014/01/31 初始版本。
 * @version 2015/04/14 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 *
 * @description
 *
 * @see <a href="https://developer.mozilla.org/zh-TW/docs/JavaScript">JavaScript</a>
 * @see <a href="https://github.com/mapbox/node-sqlite3">mapbox / node-sqlite3</a>
 * @see <a href="https://github.com/mapbox/node-sqlite3/wiki">Home · mapbox/node-sqlite3 Wiki</a>
 * @see <a href="https://github.com/mapbox/node-sqlite3/wiki/API">API · mapbox/node-sqlite3 Wiki</a>
 *
 * {@link http://www.nodebeginner.org/index-zh-tw.html Node入門}
 *
 * @todo
 *
 * @comment
 *
 */

(function() {

	var _;					// underscore.js
	
	var ancestorDAO;
	var accessVO;

  var result = function(conn) {
	
		var serialVersionUID = 1;	// 保留
		
		var tableName = 'users';

		var uber = new ancestorDAO(conn);
		
		_.extend(this, uber);
		// this.prototype = uber; // 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		this.setTableName(tableName);
		this.setAccessVO(accessVO);

    this.setRStoVO = function(rs, vo) {

      // 需使用JavaScript語法重新轉型字串型態，以免vo物件處理資料時產生錯誤。
      vo.setRowId(rs.row_id);
      vo.setUserCode(rs.user_code);
      vo.setUserName(rs.user_name);
      vo.setUserAccount(rs.user_account);
      vo.setUserPassword(rs.user_password);
      vo.setUserType(rs.user_type);
      vo.setUserArriveDate(rs.user_arrive_date);
      vo.setUserLeaveDate(rs.user_leave_date);
      vo.setInvalidFlag(rs.invalid_flag);
      vo.setInsertDate(rs.insert_date);
      vo.setInsertTime(rs.insert_time);
      vo.setInsertUserCode(rs.insert_user_code);
      vo.setUpdateDate(rs.update_date);
      vo.setUpdateTime(rs.update_time);
      vo.setUpdateUserCode(rs.update_user_code);
    }

    this.doInsert = function(vo, callback) {

      var strSQL = new String();

      vo.initInsertDateTime();

			strSQL = 'insert into ' + tableName + ' '
             + '(user_code, user_name, user_account, user_password, user_type, user_arrive_date, user_leave_date, invalid_flag, insert_date, insert_time, '
             + 'insert_user_code, update_date, update_time, update_user_code) '
             + 'values '
             + '($user_code, $user_name, $user_account, $user_password, $user_type, $user_arrive_date, $user_leave_date, $invalid_flag, $insert_date, $insert_time, '
             + '$insert_user_code, $update_date, $update_time, $update_user_code) ';
      conn.run(strSQL, {

          $user_code: vo.getUserCode(),
          $user_name: vo.getUserName(),
          $user_account: vo.getUserAccount(),
          $user_password: vo.getUserPassword(),
          $user_type: vo.getUserType(),
          $user_arrive_date: vo.getUserArriveDate(),
          $user_leave_date: vo.getUserLeaveDate(),
          $invalid_flag: vo.getInvalidFlag(),
          $insert_date: vo.getInsertDate(),
          $insert_time: vo.getInsertTime(),
          $insert_user_code: vo.getInsertUserCode(),
          $update_date: vo.getUpdateDate(),
          $update_time: vo.getUpdateTime(),
          $update_user_code: vo.getUpdateUserCode()
        },
        function(lastID, changes) {

					if (lastID) console.log(changes);
					if (typeof callback === 'function') callback(lastID, changes);
        }
      );
    }

    this.doSelectByUserCode = function(userCode, callback) {

			var thisDAO = this;
			
      var result = new Array();

      var strSQL = new String();
      var vo;

			strSQL = 'select * from ' + tableName + ' '
						 + 'where 1=1 '
             + 'and user_code=$user_code '
             + 'and invalid_flag=$invalid_flag ';
      conn.each(strSQL, {

          $user_code: userCode,
          $invalid_flag: '0'
        },

        function(err, row) {

          vo = new accessVO();
					thisDAO.setRStoVO(row, vo);

          result.push(vo);
        },
        function(err, rowCount) {

				  if (err) console.log(err);
          if (typeof callback === 'function') callback(err, rowCount, result);
        }
      );
    }

    this.doSelectByUserAccount = function(userAccount, callback) {

			var thisDAO = this;
			
      var result = new Array();

      var strSQL = new String();
      var vo;

			strSQL = 'select * from ' + tableName + ' '
						 + 'where 1=1 '
             + 'and user_account=$user_account '
             + 'and invalid_flag=$invalid_flag ';
      conn.each(strSQL, {

          $user_account: userAccount,
          $invalid_flag: '0'
        },

        function(err, row) {

          vo = new accessVO();
					thisDAO.setRStoVO(row, vo);

          result.push(vo);
        },
        function(err, rowCount) {

				  if (err) console.log(err);
          if (typeof callback === 'function') callback(err, rowCount, result);
        }
      );
    }
  }

	if (typeof define === 'function') {
	
		define(['underscore', 'AncestorDAO', 'Users'], function(underscore, dAncestorDAO, dUsers) {

			_ = underscore;
			
			ancestorDAO = dAncestorDAO;
			
			accessVO = dUsers;
				
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		_ = require(RequireJSConfig.paths['underscore'] + '.js');
		
		ancestorDAO = require(RequireJSConfig.paths['AncestorDAO'] + '.js');
		
		accessVO = require(RequireJSConfig.paths['Users'] + '.js');
		
		module.exports = result;
	}
})();