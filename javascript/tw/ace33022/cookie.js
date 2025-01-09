// $Id: cookie.js 111658 2012-11-29 01:56:21Z joe.yao $
//Track+[11816] zhong.xu 2008/11/04 記錄使用者列印報表的選項
//onload:emisCookie.get(document.all.RPTTYPE);
//onrpt:emisCookie.set(document.all.RPTTYPE);
var emisCookie = {
  set: function (o,name){
    if(!name) name = this.key;
    var Days = 30;//保存30天
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (o.value) + ";expires=" + exp.toGMTString();
  },
  get: function (o,name){
    if(!name) name = this.key;
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null)
      o.value = unescape(arr[2]);
    return o.value;
  },
  set: function (value,name){
    if(!name) name = this.key;
    var Days = 30;//保存30天
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  },
  get: function (name){
    if(!name) name = this.key;
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null)
      return unescape(arr[2]);
    return null;
  },
  isEnable: navigator.cookieEnabled,
  query: function(sId){
    return document.getElementById(sId)
        || (document.forms[0] && document.forms[0].elements[sId])
        || document.getElementsByName(sId)[0];
  },
//  key: document.all.KEYS.value+document.all.USERID.value
  key: (function(){
    try{
      return this.query("KEYS").value + this.query("USERID").value;
    }catch(e){
      return "cookie"+window.location.pathname.replace(/\//g,"_").replace(/\./g,"_");
    }
  })()
}

