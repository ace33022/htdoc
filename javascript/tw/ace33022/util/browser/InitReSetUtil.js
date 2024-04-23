/**
 *
 * @description InitReSetUtil
 *
 * @version 2015/10/21 ace 初始版本。
 *
 * @author ace
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link https://jquery.com/|jQuery}
 * @see {@link https://api.jquery.com/jquery.ajax/|jQuery.ajax() | jQuery API Documentation}
 *
 * @see {@link http://www.victsao.com/blog/81-javascript/287-javascript-function-iife|立即函式(IIFE)}
 *
 * @see {@link https://stackoverflow.com/questions/9507606/when-should-i-use-require-and-when-to-use-define|requirejs - When should I use require() and when to use define()? - Stack Overflow}
 * @see {@link https://stackoverflow.com/questions/19710752/unable-to-call-functions-with-require-js|javascript - Unable to call functions with Require.js - Stack Overflow}
 * @see {@link https://stackoverflow.com/questions/19846817/require-js-set-return-value-for-callback-function|javascript - Require.js - set return value for callback function - Stack Overflow}
 * @see {@link https://stackoverflow.com/questions/13346399/accessing-the-return-value-of-a-require-js-callback|javascript - Accessing the return value of a require.js callback - Stack Overflow}
 *
 */

(function(root) {

  define(["tw.ace33022.util.browser.CommonForm", "tw.ace33022.util.HTTPUtil", "tw.ace33022.util.CommonUtil", "md5"], function(CommonForm, HTTPUtil, CommonUtil, md5) {

    /**
     *
     * @description setAceButtonClass
     *
     * @version 2016/05/20 ace 初始版本。
     *
     * @author ace
     *
		 * @see {@link https://api.jquery.com/addclass/|.addClass() | jQuery API Documentation}
		 * @see {@link https://api.jquery.com/removeclass/|.removeClass() | jQuery API Documentation}
		 *
		 * @comment 2016/05/20 ace jQuery UI的button函數會再加入span標籤，造成需要再放更寬的空間才可以顯示完整資料。底下套用jQuery UI的CSS設定，而不套用button函數。
     *
     */
    function setAceButtonClass() {

      jQuery('.ace-btn').addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only');
      jQuery('.ace-btn').hover(

        function() {jQuery(this).addClass('ui-state-hover');},
        function() {jQuery(this).removeClass('ui-state-hover');}
      );
    }
		
    /**
     *
     * @description 檢查使用者登入狀態
     *
     * @param {function} successCallback 執行成功回呼函數
		 * @param {function} errorCallback 執行錯誤回呼函數
		 * @param {function} completeCallback 執行完成回呼函數
     *
     * @version 2015/10/22 ace 初始版本。
     *
     * @author ace
     *
     */
    function checkLoginStatus(setting) {

      var ajaxSetting = CommonUtil.getDefaultAjaxSetting(setting);

			ajaxSetting["url"] = root["Configuration"]["location"]["origin"] + '/' + root["Configuration"]["RESTfulRelativePath"] + 'checkLoginStatus';
      ajaxSetting["type"] = 'GET';

      jQuery.ajax(ajaxSetting);
    };
		
    /**
     *
     * @description 取得meta標籤的force-login設定值
     *
     * @return {string} meta標籤的force-login設定值
     *
     * @version 2016/11/03 ace 初始版本。
     *
     * @author ace
     *
		 * @see {@link https://stackoverflow.com/questions/7524585/how-do-i-get-the-information-from-a-meta-tag-with-javascript|html - How do I get the information from a meta tag with JavaScript? - Stack Overflow}
     *
     */
    function getForceLogin() {

      var result = 'N';
      var index;

      var metas = document.getElementsByTagName('meta');

      for (index = 0; index < metas.length; index++) {

        if (metas[index].getAttribute('name') === 'force-login') {

          result = metas[index].getAttribute('content');
          break;
        }
      }

      return result;
    };

    /**
     *
     * @description 取得meta標籤的program-code設定值
     *
     * @return {string} meta標籤的program-code設定值
     *
     * @version 2017/11/16 ace 初始版本。
     *
     * @author ace
     *
     */
    function getProgramCode() {

      var result = '';
      var index;

      var metas = document.getElementsByTagName('meta');

      for (index = 0; index < metas.length; index++) {

        if (metas[index].getAttribute('name') === 'program-code') {

          result = metas[index].getAttribute('content');
          break;
        }
      }

      return result;
    };

    /**
     *
     * @description 取得meta標籤的attach-slide-menu設定值
     *
     * @return {string} meta標籤的attach-slide-menu設定值
     *
     * @version 2020/01/22 ace 初始版本。
     *
     * @author ace
     *
     */
    function getAttachSlideMenu() {

      var result = 'N';
      var index;

      var metas = document.getElementsByTagName('meta');

      for (index = 0; index < metas.length; index++) {

        if (metas[index].getAttribute('name') === 'attach-slide-menu') {

          result = metas[index].getAttribute('content');
          break;
        }
      }

      return result;
    }
		
    /**
     *
     * @description 檢查使用者是否有執行程式的權限
     *
		 * @param {string} programCode 程式代碼
     * @param {function} successCallback 執行成功回呼函數
		 * @param {function} errorCallback 執行錯誤回呼函數
		 * @param {function} completeCallback 執行完成回呼函數
     *
     * @return {string} 使用者是否有執行程式的權限
     *
     * @version 2017/11/16 ace 初始版本。
     *
     * @author ace
     *
     */
		function doCheckProgramAuthority(setting) {
		
			var ajaxSetting = CommonUtil.getDefaultAjaxSetting(setting);
		
			ajaxSetting["type"] = 'GET';
			
			ajaxSetting["url"] = root["Configuration"]["location"]["origin"] + '/' + root["Configuration"]["RESTfulRelativePath"] + 'checkProgramAuthority' + '?' + 'program_code=' + setting["program_code"];

      jQuery.ajax(ajaxSetting);
		}

    /**
     *
     * @description 登入系統
     *
		 * @param {string} userAccount 使用者帳號
		 * @param {string} userPassword 使用者密碼
     * @param {function} successCallback 執行成功回呼函數
		 * @param {function} errorCallback 執行錯誤回呼函數
		 * @param {function} completeCallback 執行完成回呼函數
     *
     * @version 2016/10/25 ace 初始版本。
		 * @version 2017/03/10 ace 使用者密碼加入md5編碼後送出。
     *
     * @author ace
		 *
		 * @see {@link http://api.jquery.com/jquery.ajax/|jQuery.ajax() | jQuery API Documentation}
		 *
		 * @see {@link https://blueimp.github.io/JavaScript-MD5/|JavaScript MD5 Demo}
		 * @see {@link https://github.com/blueimp/JavaScript-MD5|blueimp/JavaScript-MD5: JavaScript MD5 implementation. Compatible with server-side environments like node.js, module loaders like RequireJS and all web browsers.}
     *
		 * @see {@link https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call|javascript - How do I return the response from an asynchronous call? - Stack Overflow}
		 * @see {@link https://dotblogs.com.tw/jasonyah/archive/2013/06/02/use-ajax-you-need-to-be-care.aspx|[jQuery][筆記] 小心使用 Ajax 防止 Bug 產生 | 分享你的 Coding 新鮮事 - 點部落}
     *
     */
    function doLogin(setting) {
		
			var ajaxSetting = CommonUtil.getDefaultAjaxSetting(setting);

			ajaxSetting["url"] = root["Configuration"]["location"]["origin"] + '/' + root["Configuration"]["RESTfulRelativePath"]  + 'login';
			ajaxSetting["type"] = 'POST';
			ajaxSetting["data"] = JSON.stringify({

				"user_account": setting["user_account"],
				"user_password": md5(setting["user_password"])
			});
			
			jQuery.ajax(ajaxSetting);
    };

    /**
     *
     * @description 登出系統
     *
     * @param {function} successCallback 執行成功回呼函數
		 * @param {function} errorCallback 執行錯誤回呼函數
		 * @param {function} completeCallback 執行完成回呼函數
     *
     * @version 2016/10/25 ace 初始版本。
     *
     * @author ace
     *
     */
    function doLogout(setting) {

      var ajaxSetting = CommonUtil.getDefaultAjaxSetting(setting);

			ajaxSetting["url"] = root["Configuration"]["location"]["origin"] + '/' + root["Configuration"]["RESTfulRelativePath"] + 'logout';
			ajaxSetting["type"] = 'POST';
			ajaxSetting["data"] = JSON.stringify('{}');
			
      jQuery.ajax(ajaxSetting);
    };

		/**
		 *
		 * @description AttachSlideMenu
		 *
		 * @param {function} callback
		 *
		 * @version 2016/10/25 ace 初始版本。
		 * @version 2017/03/01 ace 調整工作面版路徑。
		 *
		 * @author ace
		 *
		 */
		function attachSlideMenu(forceLogin, callback) {

			var btnOperateId = 'btnOperate' + Math.random().toString(36).substr(2, 6);
			var btnChangePasswordId = 'btnChangePassword' + Math.random().toString(36).substr(2, 6);
			var btnSignId = 'btnSign' + Math.random().toString(36).substr(2, 6);

			var shortCutListId = 'shortCutList' + Math.random().toString(36).substr(2, 6);
			var miniSubmenuId = 'miniSubmenu' + Math.random().toString(36).substr(2, 6);
			var slideSubmenuId = 'slideSubmenu' + Math.random().toString(36).substr(2, 6);

			var loginStatusId = 'loginStatus' + Math.random().toString(36).substr(2, 6);

			var tag = '<div style="position: fixed; top: 0px; left: 0px; z-index: 1000;">'
							+ '  <div id="' + miniSubmenuId + '">'
							+ '    <span class="icon-bar"></span>'
							+ '    <span class="icon-bar"></span>'
							+ '    <span class="icon-bar"></span>'
							+ '  </div>'
							+ '  <div class="list-group" style="display: none;">'
							+ '    <span class="list-group-item active">'
							+ '      快捷選單'
							+ '      <span class="pull-right" id="' + slideSubmenuId + '" style="margin-left: 5px;"><i class="fa fa-times"></i></span>'
							+ '    </span>'
							+ '    <div id="' + shortCutListId + '"></div>'
							+ '  </div>'
							+ '</div>';

			if (getAttachSlideMenu() === 'Y') {
			
				jQuery(tag).appendTo('body');

				jQuery('#' + miniSubmenuId).css({

					"width": "42px",
					"padding": "9px",
					"border": "1px solid rgba(0, 0, 0, 0.9)",
					"border-radius": "4px",
					"background-color": "rgba(0, 0, 0, 0)"
				});

				jQuery('#' + miniSubmenuId + ' .icon-bar').css({

					"width": "22px",
					"height": "2px",
					"border-radius": "1px",
					"margin-top": "3px",
					"display": "block",
					"background-color": "#000000"
				});

				jQuery('#' + slideSubmenuId).css({

					"padding": "0 8px",
					"border-radius": "4px",
					"display": "inline-block",
					"background": "rgba(0, 0, 0, 0.45)",
					"cursor": "pointer"
				});

				jQuery('#' + miniSubmenuId).hover(

					function() { jQuery(this).css({"cursor": "pointer"}); },
					function() {}
				);

				jQuery('#' + slideSubmenuId).on('click', function() {

					jQuery(this).closest('.list-group').fadeOut('slide', function() { jQuery('#' + miniSubmenuId).fadeIn(); });
				});

				jQuery('#' + shortCutListId).on('click', function() {

					jQuery(this).closest('.list-group').fadeOut('slide', function() { jQuery('#' + miniSubmenuId).fadeIn(); });
				});

				jQuery('#' + miniSubmenuId).on('click', function(event) {
				
					var btnIndexId = 'btnIndex' + Math.random().toString(36).substr(2, 6);

					jQuery('#' + shortCutListId).empty();

					jQuery(this).next('.list-group').toggle('slide');

					jQuery('#' + miniSubmenuId).hide();

					// 返回首頁
					if (window.location.pathname !== '/') {

						jQuery('#' + shortCutListId).append('<a href="#" class="list-group-item" id="' + btnIndexId + '"><i class="fa fa-home" style="margin-right: 2px;"></i>返回首頁</a>');

						jQuery('#' + btnIndexId).on('click', function(event) {

							event.preventDefault();
							
							window.location.assign(root.Configuration.location.origin);
						});
					}

					checkLoginStatus({

						"complete": function(jqXHR, textStatus) {
						
							var loginText = '登入系統';
							
							// jqXHRResult = jqXHR;
							
							console.log('status: ' + jqXHR["status"]);
							
							if (jqXHR["status"] === HTTPUtil.Status.OK) {
							
								if (jqXHR["responseJSON"]["error_code"] === 0) {

									loginText = '登出系統';

									// OperatePanel
									jQuery('#' + shortCutListId).append('<a href="#" class="list-group-item" id="' + btnOperateId + '"><i class="fa fa-exchange" style="margin-right: 2px;"></i>工作面版</a>');

									jQuery('#' + btnOperateId).on('click', function(event) {

										event.preventDefault();

										window.location.assign(root.Configuration.location.origin + '/' + 'OperatePanel');
									});

									// ChangePassword
									jQuery('#' + shortCutListId).append('<a href="#" class="list-group-item" id="' + btnChangePasswordId + '"><i class="fa fa-user" style="margin-right: 2px;"></i>變更密碼</a>');

									jQuery('#' + btnChangePasswordId).on('click', function(event) {

										var ajaxSetting = CommonUtil.getDefaultAjaxSetting({
										
											"success": function(data, textStatus, jqXHR) {

												var modalId = 'modal' + Math.random().toString(36).substr(2, 6);
												var btnConfirmId = 'btnConfirm' + Math.random().toString(36).substr(2, 6);

												var activity = '';
												
												var originUserPassword, newUserPassword;

												var tag = '<div class="modal fade" tabindex="-1" role="dialog" id="' + modalId + '">'
																+ '  <div class="modal-dialog" role="document">'
																+ '    <div class="modal-content">'
																+ '      <div class="modal-header">'
																+ '        <h4 class="modal-title">變更密碼</h4>'
																+ '      </div>'
																+ '      <div class="modal-body row-fluid" style="">'
																+ '        <div class="form-horizontal">'
																+ '          <div class="form-group">'
																+ '            <label class="control-label col-sm-4" for="inpOldPassword">舊有密碼：</label>'
																+ '            <div class="col-sm-8">'
																+ '              <input type="password" id="inpOldPassword" class="form-control">'
																+ '            </div>'
																+ '          </div>'
																+ '          <div class="form-group">'
																+ '            <label class="control-label col-sm-4" for="inpNewPassword">新密碼：</label>'
																+ '            <div class="col-sm-8">'
																+ '              <input type="password" id="inpNewPassword" class="form-control">'
																+ '            </div>'
																+ '          </div>'
																+ '          <div class="form-group">'
																+ '            <label class="control-label col-sm-4" for="inpConfirmPassword">確認密碼：</label>'
																+ '            <div class="col-sm-8">'
																+ '              <input type="password" id="inpConfirmPassword" class="form-control">'
																+ '            </div">'
																+ '          </div>'
																+ '        </div>'
																+ '      </div>'
																+ '      <div class="modal-footer">'
																+ '        <button type="button" id="' + btnConfirmId + '" class="btn btn-primary">確定</button>'
																+ '        <button type="button" data-dismiss="modal" class="btn">取消</button>'
																+ '      </div>'
																+ '    </div> <!-- /.modal-content -->'
																+ '  </div> <!-- /.modal-dialog -->'
																+ '</div> <!-- /.modal -->';

												if (data["error_code"] === 0) {

													originUserPassword = data["user_password"];

													jQuery(tag).appendTo('body');

													jQuery('#' + modalId).on('shown.bs.modal', function(event) { jQuery('#inpOldPassword').focus(); });

													jQuery('#' + modalId).on('hidden.bs.modal', function(event) {
													
														var ajaxSetting = CommonUtil.getDefaultAjaxSetting({
														
															"success": function(data, textStatus, jqXHR) {
															
																if (data["error_code"] === 0) {

																	CommonForm.showMessage('密碼變更成功，下次登入請使用新密碼！');
																}
																else {

																	CommonForm.showMessage('密碼變更失敗，錯誤訊息：' + data["error_message"]);
																}
															}
														});
														
														this.remove();

														if (activity === 'confirm') {
														
															ajaxSetting["url"] = new String(location.origin) + '/changePassword';
															ajaxSetting["type"] = 'PUT';
															ajaxSetting["data"] = JSON.stringify({"user_password": md5(newUserPassword)});
															
															jQuery.ajax(ajaxSetting);
														}
													});

													jQuery('#' + btnConfirmId).on('click', function(event) {

														function checkValue() {

															var result = true;
															
															if (result === true) {
															
																if (jQuery('#inpOldPassword').val() === '') {

																	result = false;

																	jQuery('#inpOldPassword').attr('data-toggle', 'tooltip');
																	jQuery('#inpOldPassword').attr('title', '必須輸入舊有密碼');
																	jQuery('#inpOldPassword').tooltip();

																	jQuery('#inpOldPassword').focus();
																}
															}

															if (result === true) {

																if (md5(jQuery('#inpOldPassword').val()) !== originUserPassword) {

																	jQuery('#inpOldPassword').attr('data-toggle', 'tooltip');
																	jQuery('#inpOldPassword').attr('title', '舊有密碼不正確');
																	jQuery('#inpOldPassword').tooltip();

																	jQuery('#inpOldPassword').focus().select();

																	result = false;
																}
															}
															
															if (result === true) {

																if (jQuery('#inpNewPassword').val() !== jQuery('#inpConfirmPassword').val()) {

																	result = false;

																	jQuery('#inpConfirmPassword').attr('data-toggle', 'tooltip');
																	jQuery('#inpConfirmPassword').attr('title', '確認密碼不一至');
																	jQuery('#inpConfirmPassword').tooltip();

																	jQuery('#inpConfirmPassword').focus().select();
																}
															}
															
															return result;
														}

														if (checkValue() === true) {

															activity = 'confirm';
															
															newUserPassword = jQuery('#inpNewPassword').val();

															jQuery('#' + modalId).modal('hide');
														}
													});

													jQuery('#' + modalId).modal('show');
												}
												else {

													CommonForm.showMessage('無法取得個人資料，請重新登入後再進行作業！');
												}
											}
										});
										
										event.preventDefault();
										
										ajaxSetting["url"] = new String(location.origin) + '/getPassword';
										ajaxSetting["type"] = 'GET';
										
										jQuery.ajax(ajaxSetting);
									});
								}

								jQuery('#' + shortCutListId).append('<a href="#" class="list-group-item" id="' + btnSignId + '"><i class="fa fa-sign-in"></i><span id="' + loginStatusId + '" style="margin-left: 2px;">' + loginText + '</span></a>');

								// jQuery('#' + loginStatusId).text(loginText);

								jQuery('#' + btnSignId).on('click', function(event) {
								
									function logout() {
									
										CommonForm.showMarqueebar({
										
											"title": "系統登出中，請稍候‧‧‧",
											"onShownCallback": function(closeMarqueebar) {

												doLogout({

													"success": function(data, textStatus, jqXHR) {

														closeMarqueebar();

														if (data["error_code"] !== 0) {

															CommonForm.showMessage(data["error_message"], '登出系統失敗！');
														}
														else {

															CommonForm.showFlashMessage('已登出系統‧‧‧', function() {

																jQuery('#' + loginStatusId).text('登入系統');
																
																if (window.location.pathname !== '/') window.location.assign(window.location.origin);
															});
														}
													},
													"error": function(jqXHR, textStatus, errorThrown) {
													
														closeMarqueebar();
													}
												});
											}
										});
									}

									event.preventDefault();
									
									if (jQuery('#' + loginStatusId).text() === '登入系統') {
									
										CommonForm.showLogin(function(userAccount, userPassword) {
										
											var result;
											var status;
										
											if (typeof userAccount !== 'undefined') {
											
												CommonForm.showMarqueebar({
							
													"title": "登入中，請稍候‧‧‧",
													"onShownCallback": function(closeMarqueebar) {
													
														doLogin({
														
															"user_account": userAccount,
															"user_password": userPassword,
															"complete": function(jqXHR, textStatus) {
															
																status = jqXHR["status"];
																result = jqXHR["responseJSON"];
																
																closeMarqueebar();
															}
														});
													},
													"afterHiddenCallback": function() {
													
														if (status === HTTPUtil.Status.OK) {
														
															if (result["error_code"] !== 0) {
															
																CommonForm.showMessage({
																
																	"title": "登入系統過程失敗！",
																	"message": '錯誤代碼：' + result["error_code"]
																});
															}
															else {
															
																CommonForm.showFlashMessage('已登入系統‧‧‧', function() {
																
																	jQuery('#' + loginStatusId).text('登出系統');
																});
															}
														}
														else {
														
															CommonForm.showMessage({
															
																"title": "系統處理過程有誤！",
																"message": '錯誤代碼：' + status
															});
														}
													}
												});
											}
										});
									}
									else {

										if (forceLogin === 'Y') {

											CommonForm.showConfirmMessage('當前作業需要登入系統才可執行，登出後將離開目前作業！', logout);
										}
										else {

											logout();
										}
									}
								});
							}
							else {
							
								CommonForm.showMessage({
								
									"message": "檢查登入狀態過程有誤！",
									"callback": function() { window.location.assign(window.location.origin); }
								});
							}
						}
					});
				});
			}
			
			if (typeof callback === 'function') callback(shortCutListId);
		}
		
		function checkEnv(callback) {

			var forceLogin = getForceLogin();
			var programCode = getProgramCode();
			var execProgramAuthority = false;
			
			var loginStatus = 1;

			CommonForm.showMarqueebar({
					
				"title": "環境檢查‧‧‧",
				"onShownCallback": function(closeMarqueebar) {
			
					if (forceLogin === 'Y') {

						checkLoginStatus({

							"complete": function(jqXHR, textStatus) {
							
								if (jqXHR["status"] === HTTPUtil.Status.OK) {
								
									loginStatus = jqXHR["responseJSON"]["error_code"];
								
									if ((loginStatus === 0) && (programCode !== '')) {

										// OperatePanel只要登入即可開啟，至於可以使用的程式則由群組控制。
										if (programCode === 'OperatePanel') {
										
											execProgramAuthority = true;

											closeMarqueebar();
										}
										else {

											doCheckProgramAuthority({
										
												"program_code": programCode,
												"complete": function(jqXHR, textStatus) {
												
													if (jqXHR["status"] === HTTPUtil.Status.OK) {
													
														if (jqXHR["responseJSON"]["error_code"] === 0) execProgramAuthority = true;
													}
													
												
													closeMarqueebar();
												}
											});	
										}
									}
									else {
									
										closeMarqueebar();
									}
								}
								else {
								
									closeMarqueebar();
								}
							}
						});
					}
					else {

						closeMarqueebar();
					}
				},
				"afterHiddenCallback": function() {
				
					if (forceLogin === 'Y') {
					
						console.log('checkEnv afterHiddenCallback loginStatus: ' + loginStatus);
					
						if (loginStatus === 1) {
						
							CommonForm.showMessage({
							
								"title": "錯誤訊息",
								"message": "登入系統才可進行操作！",
								"callback": function() {

									CommonForm.showLogin(function(logined) {
									
										console.log('logined: ' + logined);

										if (logined) {
										
											loginStatus = 0;
										
											attachSlideMenu(forceLogin, callback);
										}
										else {

											CommonForm.showMessage({
											
												"title": "錯誤訊息", 
												"message": "登入系統失敗！", 
												"callback": function() { window.location.assign(window.location.origin); }
											});
										}
									});
								}
							});
						}
						else {
						
							if ((programCode !== '') && (execProgramAuthority === false)) {
							
								CommonForm.showMessage({
								
									"title": "錯誤訊息", 
									"message": "沒有執行程式的權限！", 
									"callback": function() { window.location.assign(window.location.origin); }
								});
							}
							else {
							
								attachSlideMenu(forceLogin, callback);
							}
						}							
					}
					else {
					
						attachSlideMenu(forceLogin, callback);
					}
				}
			});
		}
		
    return {

      "setAceButtonClass": setAceButtonClass,
      "checkLoginStatus": checkLoginStatus,
      "doLogin": doLogin,
      "doLogout": doLogout,
			"checkEnv": checkEnv
    };
  });
})(this);