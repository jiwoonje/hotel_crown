
document.write("<div id='popForIdPwDiv' style='display:none'  >0</div>");
var popPointHotlPath = "";
var popForIdPwDiv = $("#popForIdPwDiv");

function popForId(hotlPath){
	popPointHotlPath = hotlPath;
	var errorCheck = "";
	$.ajax(
            {
                url: '/'+popPointHotlPath+'/mbr/forId/viewMbrInfoforId.do',
                type: "post",
                dataType: "html",
                error: function(){
                	errorCheck = "fail";
                },
                success: function( strData ){
                	popForIdPwDiv.html(strData);
                	popForIdPwDiv.show();
                	$("#popForIdPwDiv").attr("tabindex",-1).focus(); 
                }
            }                           
     );
     if(errorCheck == "fail"){
  		alert('<spring:message code="msg.cmm.fail.select"/>');
     }
}


function popCloaeForId(){
	popForIdPwDiv.html("");
	popForIdPwDiv.hide();
	$("#popForIdButton").focus();
}

function popForPw(hotlPath){
	popPointHotlPath = hotlPath;
	var errorCheck = "";
	$.ajax(
            {
                url: '/'+popPointHotlPath+'/mbr/forPw/viewMbrInfoforPw.do',
                type: "post",
                dataType: "html",
                error: function(){
                	errorCheck = "fail";
                },
                success: function( strData ){
                	popForIdPwDiv.html(strData);
                	popForIdPwDiv.show();
                	$("#popForIdPwDiv").attr("tabindex",-1).focus(); 
                }
            }                           
     );
     if(errorCheck == "fail"){
  		alert('<spring:message code="msg.cmm.fail.select"/>');
     }
}


function popCloaeForPw(){
	popForIdPwDiv.html("");
	popForIdPwDiv.hide();
	$("#popForPwButton").focus();
}






