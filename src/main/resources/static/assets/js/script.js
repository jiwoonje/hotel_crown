var scrollValue = 0;
var windowH = $(window).outerHeight();
var siteUrl = 'www.mayfield.co.kr/';


Kakao.init('ba508fbd2af4bac6b9ecf87d0c4801a5');

$(document).on('click','#popShare .share_btn a',function(){
    var shareType = $(this).index();
    
    

    if(shareType == '0'){
        ktShare()
    } else if(shareType == '1'){
        clip();
    }
})

function ktShare(){
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: kt_title,
            description: share_text,
            imageUrl:
            kt_image,
            imageWidth:632,
            imageHeight:520,
            link: {
                mobileWebUrl: kt_link_mobile,
                webUrl: kt_link_pc,
            },
        }
    });
}
function clip(){
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    if($('body').hasClass('en') == true){
        alert("The URL has been copied.")
    } else{
        alert("URL이 복사되었습니다.")
    }
}

$(document).on('click','#topPop .btn_box a',function(){
	var todayDontSee = $('input[id=topToday]').prop('checked');
	$('#topPop').slideUp(300,function(){
		$('#topPop').remove();
		$('#mainKv .kv_box .kv_text').stop().animate({'top':'18%'},300);
	})
	if(todayDontSee == true){
		setCookieTopPop( "todayCookieTopPop", "done" , 1);
	}
});

/* 최상단 팝업배너 오늘하루보지않기 쿠키 */
function setCookieTopPop ( name, value, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookieTopPop () {
	var cookiedata = document.cookie;
	if ( cookiedata.indexOf("todayCookieTopPop=done") < 0 ){
		$('#topPop').show();
	}
	else {
		$('#topPop').remove();
	}
}

$(document).ready(function(){
    var topBoxH = $('#topBox').innerHeight();
    
//    if($('body').hasClass('dining_view') == true){
//        
//    }
    
    /* IE 스크롤시 background-attachment : fixed; 덜덜거리는 현상 처리 */
    if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
    // $('body').on("mousewheel", function (event) {
    //     // remove default behavior
    //     //event.preventDefault(); 

    //     //scroll without smoothing
    //     //var wheelDelta = event.wheelDelta;
    //     //var currentScrollPosition = window.pageYOffset;
    //     //window.scrollTo(0, currentScrollPosition - wheelDelta);
    // });
    $('body').keydown(function (e) {
        var currentScrollPosition = window.pageYOffset;

        switch (e.which) {
            case 33: // page up
                e.preventDefault(); // prevent the default action (scroll / move caret)
                window.scrollTo(0, currentScrollPosition - 600);
                break;
            case 34: // page down
                e.preventDefault(); // prevent the default action (scroll / move caret)
                window.scrollTo(0, currentScrollPosition + 600);
                break;
            case 38: // up
                e.preventDefault(); // prevent the default action (scroll / move caret)
                window.scrollTo(0, currentScrollPosition - 120);
                break;
            case 40: // down
                e.preventDefault(); // prevent the default action (scroll / move caret)
                window.scrollTo(0, currentScrollPosition + 120);
                break;
                default: return; // exit this handler for other keys
            } 
        });

    }
    //$('#gnb').css({'top':topBoxH ,'height':'calc(100vh - '+ topBoxH +')'});
    
   /* $(window).on('resize',function(){
        windowH = $(window).outerHeight();
        sec3Offset = $('#sec03').offset().top;
        sec3H = $('#sec03').outerHeight();
        sec4Offset = $('#sec04').offset().top;
    })*/

    $(document).on('click','.top_btn',function(){
        $('html, body').stop().animate({scrollTop:0}, 100);
    });
    
    var lastScroll = 0;
    $(window).on('scroll',function(){
        scrollValue = $(document).scrollTop();
        var docH = $('html,body').outerHeight();
        var footerH = $('#footer').outerHeight();
        //sec4Offset = $('#sec04').offset().top;
        
        /*상단 팝업배너 숨기기,나타내기*/
        if(scrollValue > 10){
            $('#topPop').stop().slideUp(300);
            $('.top_btn').stop().fadeIn(500).css('z-index','5');
            if($('#topPop').length > 0){
                $('#mainKv .kv_box .kv_text').stop().animate({'top':'18%'},300);    
            }
            if($('body').hasClass('main') == true){
                $('#header').removeClass('w');
            }
        } else if(scrollValue <= 10){
            $('#topPop').stop().slideDown(300);
            $('.top_btn').stop().fadeOut(500).css('z-index','0');
            if($('#topPop').length > 0){
                $('#mainKv .kv_box .kv_text').stop().animate({'top':'30%'},300);
            }
            if($('body').hasClass('main') == true){
                $('#header').addClass('w');
            }
        }
        // 하단 탑버튼 처리
        if(scrollValue > docH - footerH - windowH){
            $('.top_btn').addClass('on');
        } else{
            $('.top_btn').removeClass('on');
        }
        
        /*다이닝뷰 예약 바 상단 고정 적용,해제*/
        if(scrollValue > windowH - 90){
            $('.view_reserve_box').addClass('fixed');
        } else{
            $('.view_reserve_box').removeClass('fixed');
        }
       
    })
    
    
    // $(document).on('click','.gnb_btn',function(){
    //     $('#gnb').stop().slideToggle();
    //     if($(this).is('.active')){  // gnb 열려있을때
    //         setTimeout(function(){
    //             $('#header').css({'transition':'all .3s'}).removeClass('gng');
    //         },300);
    //         $(this).removeClass('active');
    //         $('body').removeClass('scrollDisable');
    //         if(scrollValue <= 10){
    //             $('#topPop').slideDown();  
    //         }
            
    //         if($('body').hasClass('main') == true){
    //             if(scrollValue <= 10){
    //                 $('#header').addClass('w');
    //             } else{
    //                 $('#header').removeClass('w');
    //             }
    //         }
            
    //     } else if($(this).not('.active')){  // gnb 닫혀있을때
    //         $('#header').css('transition','none').addClass('gng');
    //         $(this).addClass('active');
    //         $('body').addClass('scrollDisable');
    //         if($('#topPop').css('display') == 'block'){
    //             $('#topPop').slideUp();   
    //         }
    //         $('#header').removeClass('w');
    //         // if($('body').hasClass('main') == true){
    //         //     if(scrollValue <= 10){
    //         //         $('#header').addClass('w');
    //         //     } else{
    //         //         $('#header').removeClass('w');
    //         //     }
    //         // }
    //     }
    // })
    $(document).on('click','.gnb_btn',function(){
        $('#gnb').stop().slideToggle();
        if($(this).is('.active')){  // gnb 열려있을때
            setTimeout(function(){
                $('#header').css({'transition':'all .3s'}).removeClass('gng');
            },300);
            $(this).removeClass('active');
            $('body').removeClass('scrollDisable');
            if(scrollValue <= 10){
                $('#topPop').slideDown();  
            }
            
            if($('body').hasClass('main') == true){
                if(scrollValue <= 10){
                    $('#header').addClass('w');
                } else{
                    $('#header').removeClass('w');
                }
            }
            
        } else if($(this).not('.active')){  // gnb 닫혀있을때
            $('#header').css('transition','none').addClass('gng');
            $(this).addClass('active');
            $('body').addClass('scrollDisable');
            if($('#topPop').css('display') == 'block'){
                $('#topPop').slideUp();   
            }
            $('#header').removeClass('w');
            // if($('body').hasClass('main') == true){
            //     if(scrollValue <= 10){
            //         $('#header').addClass('w');
            //     } else{
            //         $('#header').removeClass('w');
            //     }
            // }
        }
    })
    
    $(document).on('mouseenter','.full_section',function(){
        $('.full_section').removeClass('on');
        $(this).addClass('on');
    })
    /* 상단 팝업배너 index 파일에서만 노출시키기 */
    var path = window.location.pathname;

	if (path == '/main/' || path == '/main/index.html') {
		$.ajax({
			type : "POST",
			url : "../src/popup/top_main_list.php",
			data : {  "pop_cate" : "top" , 'auth_token' : auth_token },
			success : function(data, status) {

				var json = eval("(" + data + ")");

				if (json.result=="true") {
					var add_html="";

					if (json.msg!=null && json.msg!="") {
						$.each(json.msg,function(key,state){
							add_html = add_html + "<p><span>"+state.content+"</span>";
							if (state.link_url!="") {
								if (state.popup_check=="page") {
									add_html = add_html + "<a href=\""+state.link_url+"\">자세히보기</a></p>";
								} else if (state.popup_check=="popup") {
									add_html = add_html + "<a href=\""+state.link_url+"\" target=\"_blank\">자세히보기</a></p>";
								}
							}
						});

						$("#top_popup").html(add_html);

						var popText = $('.pop_text .top_bnr p');
						var popTextH = $('.top_bnr').outerHeight();
						var popTextLength = popText.length;

						var max = popTextH;
						var move = 0;

						function notiRoll(){
							move += popTextH;
							$('.top_bnr').animate({'top':-move},500,function(){
								$('.top_bnr').append($('.pop_text .top_bnr p:first-child'));
								if(move >= max){
									$(this).css('top',0);
									move = 0;
								}
							})
						}

						if(popTextLength > 1){
							var noticeRoll = setInterval(notiRoll,3000)   

							popText.on('mouseenter',function(){
								console.log('aaaaaaa');
								clearInterval(noticeRoll);
							})
							popText.on('mouseleave',function(){
								console.log('bbbbbbb');
								noticeRoll = setInterval(notiRoll,3000);
							})
						}

						getCookieTopPop();
					} else  {
                        $('#topPop').remove();
                    }
				} else {
					console.log(json.msg);
				}
			},
			error : function(err)
			{
				console.log(err.responseText);
				return false;
			}
		});
	} else if (path == '/en/main/' || path == '/en/main/index.html') {
		$.ajax({
			type : "POST",
			url : "../src/popup/top_main_list.php",
			data : {  "pop_cate" : "top" , 'auth_token' : auth_token },
			success : function(data, status) {

				var json = eval("(" + data + ")");

				if (json.result=="true") {
					var add_html="";

					if (json.msg!=null && json.msg!="") {
						$.each(json.msg,function(key,state){
							add_html = add_html + "<p><span>"+state.content+"</span>";
							if (state.link_url!="") {
								if (state.popup_check=="page") {
									add_html = add_html + "<a href=\""+state.link_url+"\">View more</a></p>";
								} else if (state.popup_check=="popup") {
									add_html = add_html + "<a href=\""+state.link_url+"\" target=\"_blank\">View more</a></p>";
								}
							}
						});

						$("#top_popup").html(add_html);

						var popText = $('.pop_text .top_bnr p');
						var popTextH = $('.top_bnr').outerHeight();
						var popTextLength = popText.length;

						var max = popTextH;
						var move = 0;

						function notiRoll(){
							move += popTextH;
							$('.top_bnr').animate({'top':-move},500,function(){
								$('.top_bnr').append($('.pop_text .top_bnr p:first-child'));
								if(move >= max){
									$(this).css('top',0);
									move = 0;
								}
							})
						}

						if(popTextLength > 1){
							var noticeRoll = setInterval(notiRoll,3000)   

							popText.on('mouseenter',function(){
								console.log('aaaaaaa');
								clearInterval(noticeRoll);
							})
							popText.on('mouseleave',function(){
								console.log('bbbbbbb');
								noticeRoll = setInterval(notiRoll,3000);
							})
						}

						getCookieTopPop();
					} else  {
                        $('#topPop').remove();
                    }
				} else {
					console.log(json.msg);
				}
			},
			error : function(err)
			{
				console.log(err.responseText);
				return false;
			}
		});
	} else {
		$('#topPop').remove();
	}

    $(document).on('keyup','input[id=search]',function(){
        var searchVal = $(this).val();

        if(searchVal != ''){
            $(this).parent('.search_box').addClass('on');
        } else{
            $(this).parent('.search_box').removeClass('on');
        }
    })

    /*****************************************************************************************************/
    /*********************************KV 스크립트입니다 ^^**************************************/
    /*****************************************************************************************************/
    
    var diningKv = $('.vis_box .vis_slide_box');
    var diningKvSpeed = 5000;
    if (diningKv.length) {
        var kvSlideCur;
        var kvSlideAll;
        var updateSliderCounterKv = function(slick, currentIndex) {
            kvSlideCur = slick.slickCurrentSlide() + 1;
            kvSlideAll = slick.slideCount;
            if(kvSlideCur < 10){
                kvSlideCur = '0' + kvSlideCur;
            }
            if(kvSlideAll < 10){
                kvSlideAll = '0' + kvSlideAll;
            }
            $('.slide_control .control_box .slide_info .slide_info_box .slide_cur').html(kvSlideCur);
            $('.slide_control .control_box .slide_info .slide_info_box .slide_ea').html(kvSlideAll);
        };

        diningKv.on('init', function(event, slick) {
            updateSliderCounterKv(slick);
            $('.progress_ing').stop().animate({'width':'100%'},diningKvSpeed);
        });

        diningKv.on('afterChange', function(event, slick, currentSlide) {
            updateSliderCounterKv(slick, currentSlide);
            $('.progress_ing').css('width','0');
            $('.progress_ing').stop().animate({'width':'100%'},diningKvSpeed);
        });

        diningKv.slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed:diningKvSpeed,
            speed:1000,
            pauseOnHover: false,
            pauseOnFocus: false,
            touchMove: false,
            swipe: false,
            fade: true,
            prevArrow: $('.slide_info .arr_btn.arr_left a'), 
            nextArrow: $('.slide_info .arr_btn.arr_right a'),
            custumPaging: $('.progress_bar .progress_ing'),
        });
    }
    // 재생 및 정지 버튼 클릭

    $(document).on('click','.slide_control .control_box .slide_info .play_pause p a',function(){
        if($(this).parent('p').is('.pause_btn') == true){
            $('.vis_slide_box').slick('slickPause');
            $('.play_btn').css('display','block');
            $('.pause_btn').css('display','none');
            $('.progress_ing').stop().css('width','0');
        } else if($(this).parent('p').is('.play_btn') == true){
            $('.vis_slide_box').slick('slickPlay');
            $('.pause_btn').css('display','block');
            $('.play_btn').css('display','none');
            $('.progress_ing').stop().animate({'width':'100%'},diningKvSpeed);
        }
    })
    
    var contSlide = $('#viewContets .info_slide .cont_box .slide_box');
    if (contSlide.length) {
        var contSlideCur;
        var contSlideAll;
        var updateSliderCounterCont = function(slick, currentIndex) {
            contSlideCur = slick.slickCurrentSlide() + 1;
            contSlideAll = slick.slideCount;
            
            if(contSlideCur < 10){
                contSlideCur = '0' + contSlideCur;
            }
            if(contSlideAll < 10){
                contSlideAll = '0' + contSlideAll;
            }
            $('#viewContets .cont_wrap .info_sec .cont_box .slide_info .slide_info_box .slide_cur').html(contSlideCur);
            $('#viewContets .cont_wrap .info_sec .cont_box .slide_info .slide_info_box .slide_ea').html(contSlideAll);
        };

        contSlide.on('init', function(event, slick) {
            updateSliderCounterCont(slick);
        });

        contSlide.on('afterChange', function(event, slick, currentSlide) {
            updateSliderCounterCont(slick, currentSlide);
        });

        contSlide.slick({
            infinite: false,
            prevArrow: $('#viewContets .cont_wrap .info_sec .cont_box .slide_info .arr_btn.arr_left a'), 
            nextArrow: $('#viewContets .cont_wrap .info_sec .cont_box .slide_info .arr_btn.arr_right a'),
            dots: true
        });

        if($('.info_slide_box .slide_box .slick-dots li').length <= 1){
            $('.info_slide_box .slide_box .slick-dots').css('display','none');
        }
    }

    function popOn(popName){                           //팝업 나오기
        $('#'+popName).fadeIn(300).addClass('on');
    }
    function popupOn(popName){
        $('.'+popName).fadeIn(300).addClass('on');
    }
    function popClose(){                        //팝업 닫기
        $('.pop_box').fadeOut(300).removeClass('on');
    }
    $(document).on('click','.close_btn',function(){
        $(this).parents()
        popClose();
        
        if($(this).hasClass('layer_x') == true){
            $('body').removeClass('scrollDisable');
            $('#layerPop').fadeOut(300);
        }else if($(this).hasClass('mbs') == true){
            $('#popupLayer').fadeOut(300);
        }
    });
    $('.view_reserve_box .btn_box a').on('click',function(event){ 
        var popName = $(this).data('pop');
        if($(this).parents('body').hasClass('dining_view') == true){ 
            if($('#'+popName).is('.on')){
                popClose();
            } else{    
                popClose();
                popOn(popName);
            }  
        } else{ // 다이닝뷰가 아닌것은 예약팝업 클릭시 얼럿
            if(popName == 'popReser'){
				if ($(this).data("id") != null && $(this).data("id") != "") {
					location.href="../reservation/reservation_1.html?type="+$(this).data("type")+"&id="+$(this).data("id");
				} else {
					if ($(this).data("text") != null && $(this).data("text") != "") {
                        var msg = $(this).data("text");
                        msg = msg.replace("<br/>","\n");
						alert(msg);
						return false;
					} else {
		                alert('현재 준비 중입니다.');
						return false;
					}
				}
            }else if(popName == 'popalert'){ //홈페이지 예약버튼 클릭시 얼럿 나오기 20240118 추가
                if($(this).hasClass('en') == true){
                    alert("Please make a reservation over the phone.\n02.2660.9000")
                }else{
                    alert("유선으로 예약해 주세요.\n02.2660.9000")
                    return false;
                }
            } else{
                if($('#'+popName).is('.on')){
                    popClose();
                } else{    
                    popClose();
                    popOn(popName);
                }   
            }    
        }
    })


    $('#diningViewTOGO .product_cont .order_btn a').on('click',function(){
        var popName = $(this).data('pop');
        
        if($('.'+popName).is('.on')){
            popClose();
        } else{
            popClose();
            popupOn(popName);
        }
    })
    $('.view_cau').on('click',function(){
        var popName = $(this).data('pop');
        $('body').addClass('scrollDisable');
        $('#layerPop,#'+popName).fadeIn(300);
    })

    $('#membership_login .mem_btn').on('click',function(){
        var popName = $(this).data('pop');
        $('#popupLayer').fadeIn(300);
        console.log(popName)
        popOn(popName);
    });

    $('#membershipView .info_title').on('click',function(){
        if($(this).parent('.info_box').hasClass('on') == true){
            $(this).parent('.info_box').removeClass('on');
            $(this).siblings('.info_text').slideUp(300);
        } else{
            $(this).parent('.info_box').addClass('on');
            $(this).siblings('.info_text').slideDown(500);
        }
    })
    $(document).on('click','#membership #viewContets .tab_box .tab_btn a',function(){
        var tabType = $(this).data('tab');
        
        $('#membership #viewContets .tab_box .tab_btn').removeClass('on');
        $(this).parent('.tab_btn').addClass('on');
        
        $('#membership #viewContets #sec03 .tab_box').css('display','none');
        if(tabType == '1'){
            $('#membership #viewContets #sec03 .tab_box'+tabType).css('display','flex');    
        } else{
            $('#membership #viewContets #sec03 .tab_box'+tabType).css('display','block');
        }
        
    })

    // S: 20230714 다이닝 메뉴판 변경 - yugyeong
    // 국문 pc,mobile / 영문 pc,mobile 전부 해당 이벤트 사용
    // pdf 파일 경로도 모두 국문 /assets/pdffile/ 바라보고 있음
    var pageUrl = window.location.hostname;
    // console.log(pageUrl);
    // $(document).on('click','#diningView .menu_down',function(){
    //   var pageName = $('#diningView').attr('class');
    //   // console.log(pageName);

    //   if(pageName == 'BONGRAEHEON'){
    //     $(this).attr('href','https://'+pageUrl+'/assets/pdffile/menu_bongraeheon_230707.pdf');
    //   }
    //   else if(pageName == 'CASTLE'){
    //     $(this).attr('href','javascript:void(0);');
    //   }
    //   else if(pageName == 'DELICE'){
    //     $(this).attr('href','javascript:void(0);');
    //   }
    //   else if(pageName == 'NAKWON'){
    //     $(this).attr('href','https://'+pageUrl+'/assets/pdffile/menu_nakwon_230714.pdf');
    //   }
    //   else if(pageName == 'RACHEZ'){
    //     $(this).attr('href','https://'+pageUrl+'/assets/pdffile/menu_rachez_230714.pdf');
    //     console.log()
    //   }
    //   else if(pageName == 'ROYALMILE'){
    //     $(this).attr('href','https://'+pageUrl+'/assets/pdffile/menu_royalmile_230502.pdf');
    //   }
    //   else if(pageName == 'THEKEW'){
    //     $(this).attr('href','https://'+pageUrl+'/assets/pdffile/menu_TheKEW_230419.pdf');
    //   }
    //   else if(pageName == 'YIYUAN'){
    //     $(this).attr('href','https://'+pageUrl+'/assets/pdffile/menu_yiyuan_220331.pdf');
    //   }
    //   else{
    //     $(this).attr('href','javascript:void(0);');
    //   }
    // });
    // E: 20230714 다이닝 메뉴판 변경
    
})