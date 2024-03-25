/*
 * ---------------------------------------------------------------------------------------------
 * 고객문의
 * ---------------------------------------------------------------------------------------------
 */


var path2 = "";

function openAsk(askTypCd, typCd) {
	path2 = "mbsh";
	
	var url = "";
	if('ROOM_PAC' == askTypCd) {
		url = URL_PREFIX + "/contact/room/setRoomPack.do";
	} else if('RESTR' == askTypCd) {
		url = URL_PREFIX + "/contact/din/setDining.do?typCd="+typCd;
	} else if('WEDD' == askTypCd) {
		url = URL_PREFIX + "/contact/wedd/setWedd.do";
	} else if('MBSH' == askTypCd) {
		url = URL_PREFIX + "/contact/mbsh/setMbsh.do?typCd="+typCd;
	} else if('SITE_USE' == askTypCd) {
		url = URL_PREFIX + "/contact/site/setSiteUse.do";
	} else if('BANQ' == askTypCd) {
		url = URL_PREFIX + "/contact/banq/setBanq.do";
	}else if('ECC' == askTypCd) {
		url = URL_PREFIX + "/contact/ecc/setEcc.do";
	}
	
	$.ajax({
		  url: url,
		  cache: false,
		  type: "POST",
		  data: { "askTypCd": askTypCd}
		}).done(function( html ) {
			$('body').prepend("<div id='askLayer' style='display:none'></div><div style='display: block;' id='mdScreen' class='mdScreen'></div>");
			$("#askLayer").html(html.replace(/&lt;br\s*\&gt;/g,'<br/>'));
		  	$("#askLayer").show();
		  	$("#askLayer").attr("tabindex",-1).focus();
		  	
			//첨부파일 선택 UI 공통
			$(".uiAttachFile .fileInput").on("change", function(){ 
				$("#askLayer .fileLocation").val(this.value);
			});	
			
		}).fail(function(jqXHR, textStatus) {
			  alert( "Request failed: " + textStatus );
		}).always(function() { 
			$("select, input").not(".fileInput").uniform(); 
		});
}

function openAsk2(askTypCd, typCd, hotlId, contId) {
	path2 = "mbsh";
	
	var url = "";
	if('ROOM_PAC' == askTypCd) {
		url = URL_PREFIX + "/contact/room/setRoomPack.do";
	} else if('RESTR' == askTypCd) {
		url = URL_PREFIX + "/contact/din/setDining.do?typCd="+typCd;
	} else if('WEDD' == askTypCd) {
		url = URL_PREFIX + "/contact/wedd/setWedd.do";
	} else if('MBSH' == askTypCd) {
		url = URL_PREFIX + "/contact/mbsh/setMbsh.do?typCd="+typCd;
	} else if('SITE_USE' == askTypCd) {
		url = URL_PREFIX + "/contact/site/setSiteUse.do";
	} else if('BANQ' == askTypCd) {
		url = URL_PREFIX + "/contact/banq/setBanq.do";
	}else if('ECC' == askTypCd) {
		url = URL_PREFIX + "/contact/ecc/setEcc.do";
	}else if('RESVRC' == askTypCd) {
		url = URL_PREFIX + "/dining/resvDining.do?typCd="+typCd+"&contId="+contId;
	}
	
	$.ajax({
		  url: url,
		  cache: false,
		  type: "POST",
		  data: { "askTypCd": askTypCd,
		  	  "hotlId": hotlId,
	  		}
		}).done(function( html ) {
			$('body').prepend("<div id='askLayer' style='display:none'></div><div style='display: block;' id='mdScreen' class='mdScreen'></div>");
			$("#askLayer").html(html.replace(/&lt;br\s*\&gt;/g,'<br/>'));
		  	$("#askLayer").show();
		  	$("#askLayer").attr("tabindex",-1).focus();
		  	
			//첨부파일 선택 UI 공통
			$(".uiAttachFile .fileInput").on("change", function(){ 
				$("#askLayer .fileLocation").val(this.value);
			});	
			
		}).fail(function(jqXHR, textStatus) {
			  alert( "Request failed: " + textStatus );
		}).always(function() { 
			$("select, input").not(".fileInput").uniform(); 
		});
}

function openAskSecu(askTypCd, typCd) {

	path2 = "secu";
	
	url = URL_PREFIX + "/contact/secu/setMbsh.do?typCd="+typCd;
	$.ajax({
		  url: url,
		  cache: false,
		  type: "POST",
		  data: { "askTypCd": askTypCd}
		}).done(function( html ) {
			$('body').prepend("<div id='askLayer' style='display:none'></div><div style='display: block;' id='mdScreen' class='mdScreen'></div>");
			$("#askLayer").html(html.replace(/&lt;br\s*\&gt;/g,'<br/>'));
		  	$("#askLayer").show();
		  	$("#askLayer").attr("tabindex",-1).focus();
		  	
			//첨부파일 선택 UI 공통
			$(".uiAttachFile .fileInput").on("change", function(){ 
				$("#askLayer .fileLocation").val(this.value);
			});	
			
		}).fail(function(jqXHR, textStatus) {
			  alert( "Request failed: " + textStatus );
		}).always(function() { 
			$("select, input").not(".fileInput").uniform(); 
		});
}


/*
 * ---------------------------------------------------------------------------------------------
 * 문의 레이어 닫기
 * ---------------------------------------------------------------------------------------------
 */
function closeAskLayer() {
  	$("#askLayer").remove();
	$(".mdScreen").remove();
	$("#askBtn").focus();
	$("#popCalendarDiv").attr("style","z-Index:99999;display:none;");
}