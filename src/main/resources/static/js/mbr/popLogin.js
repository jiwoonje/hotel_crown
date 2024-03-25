document.write("<div id='popLoginDiv' class='popLogin' style='display:none' ></div>");

function loginPop(hotlPath , formId){
	
	var errorCheck = "success";
    var popLoginDiv = $("#popLoginDiv");
    $.ajax(
            {
                url: '/'+hotlPath+'/login/popLogin.do',
                type: "post",
                dataType: "html",
                error: function(){
                	errorCheck = "fail";
                	errorCheck = 1;
                },
                success: function( strData ){
                	popLoginDiv.html(strData);
                	popLoginDiv.attr("style","display:");
                	$("#popLoginformId").val(formId);
                	$("#popLoginDiv").attr("tabindex",-1).focus(); 
                }
            }                           
     );
     if(errorCheck == "fail"){
  		alert('로딩실패');
     }
}

function cloceLoginPop(){
    /*var popLoginDiv = $("#popLoginDiv");
	popLoginDiv.attr("style","display:none");
	$("#pooLoginbutton").focus();*/
	
	var popLoginDiv = $("#popLoginDiv");

	popLoginDiv.html("");
	popLoginDiv.attr("style","display:none");
}
