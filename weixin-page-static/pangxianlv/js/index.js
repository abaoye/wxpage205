
$(function(){
	console.log('page start');
	$("#loading, #rules, #focus, #game").hide();
	$('.all').show();
	getOpenId();
});




function startBtnOnClick(){
	$("#startPage").hide();
	$("#game").show();
}

function rulesBtnOnClick(){
	$("#startPage").hide();
	$("#rules").show();
}

function focusBtnOnClick(){
	$("#startPage").hide();
	$("#focus").show();
}



