
function getOpenId(){
	var api_url = 'localhost:3000/';
	var wxopenid=getCookie('wxopenid');
	if (wxopenid == null){
		console.log("wxopenid is null, try to get code");
		var access_code = getQueryString('code');
	//	var prj_name = getProjectName()
		var prj_name = 'pangxianlv'

		if (access_code==null){
			console.log("code is null, get code");
			var fromurl=location.href;
			var appid;
			$.ajax({
				url: api_url + '/common/getopenid/',
				data:{
					key: {'appid'}, 
					prj:prj_name
				},
				success: function(result) {
					if (!result || result.code != 200) {
						return;
					}
					console.log(result.appid);
					if(result.appid){
						appid = result.appid;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log('error');
					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				}
			});
			
			var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
        	console.log(url);
        	location.href=url;
        }
        else
        {   
        	$.ajax({
        		type:'get',
        		url:api_url + '/common/getopenid/', 
        		async:false,
        		cache:false,
        		data:{
        			key: {'appid', 'appsecret'}, 
        			prj:prj_name, 
        		},
        		dataType:'json',
        		success:function(result){      
      				if (!result || result.code != 200) {
						return;
					}
					console.log(result.appid);
					if(result.appid){
						appid = result.appid;
					}

        			if (result!=null && result.appid!="" && result.appsecret!=""){
        				var url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + result.appid + "appid&secret=" + result.appsecret + "&code=" + access_code + "&grant_type=authorization_code";
			            console.log(url);
			        	var openid = getOpenId(url);

        				addcookie('wxopenid',openid,360000);                           
        				getlogininfo(openid);
        			} 
        			else
        			{
        				alert('微信身份识别失败 \n '+result);
        				location.href=fromurl;
        			}
        		}
        	});  
        	
        }
    }else{
    	if (wxopenid!='')
    		getlogininfo(wxopenid);  
    }
}

function getlogininfo(wxopenid){ 
	var api_url = 'localhost:3000/';      
	$.ajax({
		type:'get',
		url: api_url + '/index.php?act=login&op=autologininfo',
		data: { wxopenid:wxopenid},
		dataType:'json',
		async:false,
		cache:false,               
		success: function (result) {                   
			if (result.return_code=='OK'){
				addcookie('key',result.memberinfo.key);
				addcookie('username',result.memberinfo.username);
			}else{
				alert(result.return_msg);
				location.href=WapSiteUrl+'/tmpl/member/login.html';
			}
		}
	});
}

function getProjectName()
{
	var tmp = window.location.pathname;
	var end = tmp.search("/")
	if(end == -1)
		end = tmp.length();
	return tmp.substr(0, end);
}

function getQueryString(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}


function getCookie(name) {
	var bikky = document.cookie;
	name += "=";
	var i = 0;
	while (i < bikky.length) {
		var offset = i + name.length;
		if (bikky.substring(i, offset) == name) {
			var endstr = bikky.indexOf(";", offset);
			if (endstr == -1) endstr = bikky.length;
			return unescape(bikky.substring(offset, endstr));
		}
		i = bikky.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

function getOpenId(openid_url){
	$.ajax({
		type:'get',
		url: openid_url,
		success: function(result) {
			if (!result || result.openid != 200) {
				return;
			}
			console.log(result.openid);
			return result.openid
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log('error');
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
}



