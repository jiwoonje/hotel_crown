var auth_token="4567gfhjkgdprofthoi4m";

function special_include_list() {
	var add_html="";
	$("#loading").css({"display":"block"});

	$.ajax({
		type : "POST",
		url : "/src/package/include_offer_list.php",
		async : false,
		data : {  "num_per_page" : '10' , 'auth_token' : auth_token },
		success : function(data, status) {

			var json = eval("(" + data + ")");

			if (json.result=="true") {
				$("#special_include_list").empty();

				var box_i=1;

				$.each(json.msg,function(key,state){
					add_html = add_html + "<div class=\"cont_box cont_box_0"+box_i+"\">"+
						"<a href=\"../offer/"+state.type+"_view_01.html?num="+state.no+"\">"+
						"<div class=\"cont_img\">"+
							"<div class=\"img_box\" style=\"background:url("+state.list_img+") no-repeat center center;background-size:100% 100%;\">"+
								"<p class=\"cont_date\">"+state.start_date+" - "+state.end_date+"</p>"+
							"</div>"+
							"<div class=\"cont_tag\">"+state.tag_text+"</div>"+
						"</div>"+
						"<div class=\"cont_title "+state.title_type+"\">"+state.title+"</div>"+
						"<div class=\"cont_text\">"+state.sub_title+"</div>";


					if (include_type=="main") {
						add_html = add_html + "<div class=\"cont_price\"><p><span>"+state.promotion_won+"</span> "+state.won_view_type+"</p></div>";
					}

						add_html = add_html + "</a>"+
					"</div>";

					box_i++;
				});

				$("#special_include_list").html(add_html);
				slick_start();
			} else {
				alert(json.msg);
			}
			$("#loading").delay(300).fadeOut();
		},
		error : function(err)
		{
			alert(err.responseText);
			$("#loading").delay(300).fadeOut();
			return false;
		}
	});
}

function room_info(room_type) {
	var add_html="";
	$("#loading").css({"display":"block"});

	$.ajax({
		type : "POST",
		url : "/src/room/room_info.php",
		data : {  "room_type" : room_type , 'auth_token' : auth_token },
		success : function(data, status) {

			var json = eval("(" + data + ")");

			if (json.result=="true") {
				if (p_type=="mo") {
					$("#room_etc_info").html(json.msg['content_mo'])
				} else {
					$(".info_sec_05").html(json.msg['content'])
				}
			} else {
				alert(json.msg);
			}
			$("#loading").delay(300).fadeOut();
		},
		error : function(err)
		{
			alert(err.responseText);
			$("#loading").delay(300).fadeOut();
			return false;
		}
	});
}

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

var mobilecheck = function () {
	var check = false;
	(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

function login_check_go() {
	alert('로그인 후 이용해 주세요.');
	location.href="../main/login.php";
}

function login_check_false() {
	alert('로그인 후 이용해 주세요.');
	return false;
}

function logout() {
	location.href="../src/logout.php";
}

/* 팝업 */
function win_pop(url,width,height) {
	var newwin = window.open(url,'','width='+width+',height='+height+',left=0,top=0, scrollbars=yes, resizable=yes');
	newwin.focus();
}

function idCheck(uid){ 
    //var regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{5,12}/;

	//var regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,12}/;
	var regex = /^(?=.*[a-zA-Z]).{5,12}/;
	return regex.test(uid);
}

function emailCheck(email_address){ 
	email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if(!email_regex.test(email_address)){ 
		return false; 
	}else{
		return true;
	}
}

function chkPwd(str){
	var pw = str;
	var num = pw.search(/[0-9]/g);
	var eng = pw.search(/[a-z]/ig);


	if(pw.length < 6 || pw.length > 10){
		return false;
	}
	if(pw.search(/\s/) != -1){
		return false;
	}

	if(num < 0 || eng < 0){
		return false;
	}
	return true;
}
/*
function chkPwd(str){
	var regex = /^(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,10}/;
	return regex.test(str);
}
*/
function email_input(name,id_name) {
	$("#"+id_name).val(name);
}

function makeComma(val){
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeComma(str) {
	n = parseInt(str.replace(/,/g,""));
	return n;
}


$(document).ready(function(){
	$(".onlyNumber").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^0-9]/gi,''));
		}
	});

	$(".notSpace").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/\s/gi, ""));
		}
	});

	$(".onlyNumber_minus").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			str = inputVal.replace(/[^-0-9]/gi,'');
			 
			if(str.lastIndexOf("-")>0){ //중간에 -가 있다면 replace
				if(str.indexOf("-")==0){ //음수라면 replace 후 - 붙여준다.
					str = "-"+str.replace(/[-]/gi,'');
				}else{
					str = str.replace(/[-]/gi,'');
				}
			 
			}
									 
			$(this).val(str);
		}
	});


	$(".onlyAlphabet").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z]/gi,''));    
		}
	});		

	$(".notHangul").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
		}
	});	

	$(".onlyHangul").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[a-z0-9]/gi,''));
		}
	});

	$(".onlyID").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-zA-Z0-9._]/gi,''));    
		}
	});	

	$(".name_check").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z]/gi,''));    
		}
	});
});