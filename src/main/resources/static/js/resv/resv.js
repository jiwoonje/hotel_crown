/*
 * ---------------------------------------------------------------------------------------------
 * 객실/패키지/MICE 예약
 * ---------------------------------------------------------------------------------------------
 */

/*
 * ---------------------------------------------------------------------------------------------
 * 성인수, 어린이수 selectbox 옵션 셋팅
 * ---------------------------------------------------------------------------------------------
 */
function setGuestCntOpt(type, hotlId) {
	
	var roomCnt  = $("select[name='roomCnt']").val();
	var adltCnt = $("#adltCnt").val();
	var chldCnt = $("#chldCnt").val();
	var grRblokId = $("#grRblokId").val();
	var roomCd = $("#roomCd").val();
	
	if(roomCnt != '') {
		var param = {'type':type, 
				               'hotlId':hotlId,
							   'roomCnt':roomCnt,
							   'adltCnt':adltCnt,
							   'chldCnt':chldCnt,
							   'grRblokId':grRblokId,
							   'roomCd':roomCd};
		$.ajax({
			  url: URL_PREFIX + "/resv/rpm/listGuestCntOpt.do",
			  cache: false,
			  type: "POST",
			  data:"data="+encodeURIComponent(JSON.stringify(param))
			}).done(function( html ) {
				
				$("#guestCntOpt").empty();
			  	$("#guestCntOpt").html(html);
			  	//$("select").uniform();
			  	
				// 예약화면 객실수 정보 표시
				setRoomCntInfo();
				
				/*if($("#hotlIdSel").size() > 0) {
					$("#hotlIdSel").focus();
				} else if($("select[name='roomCnt']").size() > 0) {
					//$("select[name='roomCnt']:eq(0)").focus();
					$("#coporateCd").focus();
				}*/
				
				$("#coporateCd").focus();
			}).fail(function(jqXHR, textStatus) {
				  alert( "setGuestCntOpt Request failed: " + textStatus );
			}); // end of ajax
			
	}
	
}

/*
 * ---------------------------------------------------------------------------------------------
 * 객실/패키지/MICE 예약
 * ---------------------------------------------------------------------------------------------
 */

/*
 * ---------------------------------------------------------------------------------------------
 * 성인수, 어린이수 selectbox 옵션 셋팅
 * ---------------------------------------------------------------------------------------------
 */
function setGuestCntOpt2(type, hotlId) {
	
	var roomCnt  = $("select[name='roomCnt']").val();
	var adltCnt = $("#adltCnt").val();
	var chldCnt = $("#chldCnt").val();
	var grRblokId = $("#grRblokId").val();
	var roomCd = $("#roomCd").val();
	
	if(roomCnt != '') {
		
		var param = {'type':type, 
				               'hotlId':hotlId,
							   'roomCnt':roomCnt,
							   'adltCnt':adltCnt,
							   'chldCnt':chldCnt,
							   'grRblokId':grRblokId,
							   'roomCd':roomCd};
		$.ajax({
			  url: URL_PREFIX + "/resv/rpm/listGuestCntOpt.do",
			  cache: false,
			  type: "POST",
			  data:"data="+encodeURIComponent(JSON.stringify(param))
			}).done(function( html ) {
				
				//alert(html);
				$("#guestCntOpt").empty();
			  	$("#guestCntOpt").html(html);

			  	//$("select").uniform();
			  	
				// 예약화면 객실수 정보 표시
				setRoomCntInfo();
				
				if($("select[name='roomCnt']").size() > 0) {
					$("select[name='roomCnt']:eq(0)").focus();
				}
				
			}).fail(function(jqXHR, textStatus) {
				  alert( "setGuestCntOpt Request failed: " + textStatus );
			}); // end of ajax
			
	}
	
}

/*
 * ---------------------------------------------------------------------------------------------
 * 성인수, 어린이수 selectbox 옵션 셋팅 - setstep1용
 * ---------------------------------------------------------------------------------------------
 */
function setGuestCntOpt3(type, hotlId) {
	
	var roomCnt  = $("select[name='roomCnt']").val();
	var adltCnt = $("#adltCnt").val();
	var chldCnt = $("#chldCnt").val();
	var grRblokId = $("#grRblokId").val();
	var roomCd = $("#roomCd").val();
	
	type = "";
	hotlId = "";
	roomCnt = "1";
	adltCnt = "";
	chldCnt = "";
	grRblokId = "";
	roomCd = "";
	
	if(roomCnt != '') {
		var param = {'type':type, 
				               'hotlId':hotlId,
							   'roomCnt':roomCnt,
							   'adltCnt':adltCnt,
							   'chldCnt':chldCnt,
							   'grRblokId':grRblokId,
							   'roomCd':roomCd};
		
		$.ajax({
			  url: URL_PREFIX + "/resv/rpm/listGuestCntOpt.do",
			  cache: false,
			  type: "POST",
			  data:"data="+encodeURIComponent(JSON.stringify(param))
			}).done(function( html ) {
				
				$("#guestCntOpt").empty();
			  	$("#guestCntOpt").html(html);

			  	//$("select").uniform();
			  	
				// 예약화면 객실수 정보 표시
				setRoomCntInfo();
				
				$("#tmpCoporateCd").focus();
				
			}).fail(function(jqXHR, textStatus) {
				  alert( "setGuestCntOpt Request failed: " + textStatus );
			}); // end of ajax
			
	}
	
}
function setGuestCntOpt4(type, hotlId) {
	
	var roomCnt  = $("select[name='roomCnt']").val();
	var adltCnt = $("#adltCnt").val();
	var chldCnt = $("#chldCnt").val();
	var grRblokId = $("#grRblokId").val();
	var roomCd = $("#roomCd").val();
	
	if(roomCnt != '') {
		var param = {'type':type, 
				               'hotlId':hotlId,
							   'roomCnt':roomCnt,
							   'adltCnt':adltCnt,
							   'chldCnt':chldCnt,
							   'grRblokId':grRblokId,
							   'roomCd':roomCd};
		$.ajax({
			  url: URL_PREFIX + "/resv/rpm/listGuestCntOpt.do",
			  cache: false,
			  type: "POST",
			  data:"data="+encodeURIComponent(JSON.stringify(param))
			}).done(function( html ) {
				
				$("#guestCntOpt").empty();
			  	$("#guestCntOpt").html(html);

			  	//$("select").uniform();
			  	
				// 예약화면 객실수 정보 표시
				setRoomCntInfo();
				
				if($("#hotlIdSel").size() > 0) {
					$("#hotlIdSel").focus();
				}
				
				
			}).fail(function(jqXHR, textStatus) {
				  alert( "setGuestCntOpt Request failed: " + textStatus );
			}); // end of ajax
			
	}
	
}
/*
 * ---------------------------------------------------------------------------------------------
 * 어린이수 selectbox 옵션 셋팅
 *
 * @param roomIdx 객실index
 * ---------------------------------------------------------------------------------------------
 */
function setChildCntOpt(roomIdx) {
	
	var opt = "";
	var adultCnt = $("select[name='adultCnt"+roomIdx+"']").val();
	
	if('3' == adultCnt) {
		opt += "<option value='0'>0</option>";
	} else if('2' == adultCnt || '1' == adultCnt) {
		
		for(var i=0;i<3;i++) {
			opt += "<option value='"+i+"'>"+i+"</option>";
		} // end of for
	} 
	
	$("#childCnt"+roomIdx).empty();
	$("#childCnt"+roomIdx).append(opt);
	
	//$("select").uniform();
	
	// 예약화면 객실수 정보 표시
	setRoomCntInfo();
	
	if($("select[name='adultCnt"+roomIdx+"']").size() > 0) {
		$("select[name='adultCnt"+roomIdx+"']").focus();
	}
}

function setChildCntOpt2(roomIdx) {
	
	var opt = "";
	var adultCnt = $("select[name='adultCnt"+roomIdx+"']").val();
	
	if('3' == adultCnt) {
		opt += "<option value='0'>0</option>";
	} else if('2' == adultCnt || '1' == adultCnt) {
		
		var _MAX_LOOP_COUNT = 3;
		
		if($("#hotlIdSel").val() == "D" && $("#roomAd1").val() == "2") {
			_MAX_LOOP_COUNT = 2;
		}
		
		for(var i=0;i<_MAX_LOOP_COUNT;i++) {
			opt += "<option value='"+i+"'>"+i+"</option>";
		} // end of for
	} 
	
	$("#roomKid"+roomIdx).empty();
	$("#roomKid"+roomIdx).append(opt);
	
	//$("select").uniform();
	
	// 예약화면 객실수 정보 표시
	setRoomCntInfo();
	
	if($("select[name='adultCnt"+roomIdx+"']").size() > 0) {
		$("select[name='adultCnt"+roomIdx+"']:eq(0)").focus();
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 예약달력 생성
 *
 * @param today 오늘날짜(yy-mm-dd)
 * ---------------------------------------------------------------------------------------------
 */
function createresvCalendar(options) {

	//$("#ckinYmd").val(""); // 체크인날짜
	//$("#ckoutYmd").val("");// 체크아웃 날짜
	//$("#nightCnt").val(""); // 숙박일수
	
	if($.trim($("#calenderDiv").html()) == "") {
		$.resvCalendar.setDefaults(options).createCalendar();
	}
    
	$(".calendarReserveBox").show();
} 

/*
 * ---------------------------------------------------------------------------------------------
 * 예약달력 리셋
 *
 * @param today 오늘날짜(yy-mm-dd)
 * ---------------------------------------------------------------------------------------------
 */
function reseteresvCalendar(options) {
	
	$("#ckinYmd").val(""); // 체크인날짜
	$("#ckoutYmd").val("");// 체크아웃 날짜
	$("#nightCnt").val(""); // 숙박일수
	
	$.resvCalendar.setDefaults(options).createCalendar();
    
	$(".calendarReserveBox").show();
}

/*
 * ---------------------------------------------------------------------------------------------
 * 예약화면 객실수 정보 표시
 * ---------------------------------------------------------------------------------------------
 */
function setRoomCntInfo() {
	
	// 예약화면이면 객실수 정보 표시
	if($("#roomCntInfo")) {
		
		
		var adltList = [], chldList = [];
		var roomCnt = $("select[name='roomCnt']").val();
		var resvTypCd = $("#resvTypCd").val();
		
		$("select[name^='adultCnt']").each(function(index){
			adltList.push($("select[name='adultCnt"+(index+1)+"']").val());
		});
		
		
		//if('M' !=  resvTypCd) {
			$("select[name^='childCnt']").each(function(index){
				chldList.push($("select[name='childCnt"+(index+1)+"']").val());
			});
		//}
		
		var data = { 'resvTypCd':resvTypCd, 
				           'roomCnt':roomCnt, 
				           'adltCnt':adltList.toString(), 
				           'chldCnt':chldList.toString()};
		
		$.ajax({
			  url: URL_PREFIX + "/resv/rpm/roomCntInfo.do",
			  cache: false,
			  type: "POST",
			  data:"data="+encodeURIComponent(JSON.stringify(data))
			}).done(function( html ) {
			  	$("#roomCntInfo").html(html);
			  	
			}).fail(function(jqXHR, textStatus) {
				  //alert( "roomCntInfo Request failed: " + textStatus );
			}); // end of ajax
		
	} // end of roomCntInfo
	
}

/*
 * ---------------------------------------------------------------------------------------------
 * 예약정보 초기화
 * ---------------------------------------------------------------------------------------------
 */
function resetResv(step, kind) {
	
	if('A' == kind) {
		$("#ckinYmd").val("");
		$("#ckoutYmd").val("");
		$("#nightCnt").val("");
		$("#roomCnt").val("1");
		$("#adltCnt").val("");
		$("#chldCnt").val("");
		$("#resvTypCd").val("");
		$("#roomCd").val("");
		$("#spofrId").val("");
		$("#packItNo").val("");
		$("#grRblokId").val("");
		$("#modResvId").val("");
		$("#modMultiResvId").val("");
	} 

	$('#resvForm').attr('action', URL_PREFIX + "/resv/rpm/setStep1.do").submit();
	
}

/*
 * ---------------------------------------------------------------------------------------------
 * 요금상세 레이어 열기
 * ---------------------------------------------------------------------------------------------
 */
function openStayPricDetail(id, isSecured) {
	
	var url = "";
	if(isSecured == 'true') {
		url = URL_PREFIX + "/secu/rpm/stayPricDetail.do";
	} else {
		url = URL_PREFIX + "/resv/rpm/stayPricDetail.do";
	}
	
	$("#"+id).append('<input type="hidden" id="formId" name="formId" value="'+id+'" />');
	
	
	$.ajax({
		  url: url,
		  cache: false,
		  type: "POST",
		  data:"data="+encodeURIComponent(JSON.stringify($("#"+id).serializeObject()))
		}).done(function( html ) {

			$('body').prepend("<div id='stayPricDetail' style='display:none'></div><div style='display: block;' class='mdScreen'></div>");
			$("#stayPricDetail").html(html);
			$("#stayPricDetail").show();
			$("#stayPricDetail").attr("tabindex",-1).focus();
			
		}).fail(function(jqXHR, textStatus) {
			  alert( "openStayPricDetail Request failed: " + textStatus );
		}); // end of ajax
			
	
}

/*
 * ---------------------------------------------------------------------------------------------
 * 요금상세 레이어 닫기
 * ---------------------------------------------------------------------------------------------
 */
function closeStayPricDetail() {
	
	$("#stayPricDetail").remove();
	$(".mdScreen").remove();
	$("#stayPricDetailBtn").focus();
	$("#formId").remove();
	$("#printYn").remove();
	$("#data").remove();
}
/*
 * ---------------------------------------------------------------------------------------------
 * 한국시간 리턴
 * ---------------------------------------------------------------------------------------------
 */
function getKrTime(strDate){
	var KR_TIME_DIFF = 9*60*60*1000;
	var local_time = new Date(strDate);
	var utc_time=local_time.getTime() + (local_time.getTimezoneOffset() *60*1000);
	var kr_time=new Date(utc_time+KR_TIME_DIFF);
	
	return kr_time;
}