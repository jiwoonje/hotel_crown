var pc = pc || {};
$(window).on('load', function () {
    pc.init();
});

var pc = (function (ns, $) {
    ns.init = function () {
        // 인풋 박스 기능 추가
        this.formEvent.init();

        //레이어 팝업 연결
        this.layerPopup.init();

        //예약
        this.domEvent.init();

        //헤더
        this.header.init();
    };

    ns.formEvent = {
        init: function () {
            // 선택 표시
            this.inputBox.init();

            //아코디언 메뉴 제어
            this.accordianMenu.init();

            //scroll 디자인 태그 추가
            this.scrollBarJs.init();

            //예약 바 호텔 input 검색 시 -> 닫기 버튼 생성
            this.writeInp.init();
        }
    };

    ns.formEvent.inputBox = {
        init: function () {
            this._bindEvent();
        },
        _bindEvent: function () {
            //다중 선택(체크 박스 기능)
            $(document).off('click.chkBox');
            $(document).on('click.chkBox', '.ckType li > a', $.proxy(this._onClickChkBox, this));

            //단일 선택 (라디오 버튼 기능)
            $(document).off('click.rdType');
            $(document).on('click.rdType', '.rdType > li > a', $.proxy(this._onClickRdBox, this));
        },
        _onClickChkBox: function (e) {
            e.preventDefault();
            var $target = $(e.currentTarget);
            var $targetWrap = $target.closest('.ckType');
            var isChecked = $target.hasClass('on');
            var maxCnt = $targetWrap.attr('data-maxSelCnt');

            if ($targetWrap.hasClass('disabled')) {
                return;
            }

            if (isChecked) {
                //삭제
                $target.removeClass('on');
            } else {
                //추가
                if (maxCnt !== undefined) {
                    if ($targetWrap.find('a.on').length < maxCnt) {
                        $target.addClass('on');
                    }
                } else {
                    $target.addClass('on');
                }
            }
        },
        _onClickRdBox: function (e) {
            e.preventDefault();
            var $target = $(e.currentTarget);
            var $targetWrap = $target.closest('.rdType');
            var isChecked = $target.hasClass('on');

            if ($targetWrap.hasClass('disabled')) {
                return;
            }

            if (!isChecked) {
                $targetWrap.find('>li>a').removeClass('on');
                $target.addClass('on');
            }

        }
    };

    ns.formEvent.accordianMenu = {
        init: function () {
            this._bindEvent();
        },
        _bindEvent: function () {
            // 아코디언 메뉴 클릭 시 -> 메뉴 토글
            $(document).off('click.tgType');
            $(document).on('click.tgType', '[class^=tglType] .tgTit .tgBtn', $.proxy(this._onClickTgType, this));
        },
        _onClickTgType: function (e) {
            e.preventDefault();
            var $target = $(e.currentTarget);
            var $targetWrap = $target.closest('li');

            if ($targetWrap.hasClass('active')) {
                //닫기
                if ($targetWrap.closest('.tglType2').length === 0) {
                    $targetWrap.removeClass('active');
                }
            } else {
                //열기
                $targetWrap.addClass('active');
            }
        }
    };

    ns.formEvent.scrollBarJs = {
        init: function () {
            this._setScrollBar();
        },
        _setScrollBar: function () {
            var $scrollBar = $('.scroll:visible');
            var scrollBarH;
            var oSelf = this;
            $scrollBar.each(function () {
                scrollBarH = $(this).outerHeight();

                if ($(this).data('jsp') !== undefined) {
                    $(this).data('jsp').reinitialise();

                    //스크롤 초기화
                    oSelf.resetScrollTop($(this));
                } else {
                    $(this)
                        .on(
                            'jsp-initialised',
                            function (event, isScrollable) {
                                scrollPad = parseInt($(this).find('.jspVerticalBar').css('top')) * 2;

                                //스크롤 조절
                                $(this).find('.jspTrack').removeAttr('style');
                                $(this).find('.jspDrag').css('height', $(this).find('.jspDrag').height() - scrollPad);

                                //불필요한 태그 삭제
                                $(this).find('.jspArrow').remove();
                                $(this).find('.jspCap').remove();
                                $(this).find('.jspHorizontalBar').remove();
                                $(this).css('max-height', '');

                                //불필요한 태그 삭제
                                $(this).css('max-height', '');
                            }
                        )
                        .jScrollPane({
                            showArrows: false,
                            verticalDragMinHeight: 30,
                            mouseWheelSpeed: scrollBarH
                        });
                }
            });
        },
        resizeScrollBar: function () {
            var resetScrollBarTid;
            var oSelf = this;
            resetScrollBarTid = setTimeout(function () {
                oSelf._setScrollBar();
                clearTimeout(resetScrollBarTid);
            }, 0);
        },
        resetScrollTop: function (_$target) {
            var $target = _$target;
            var $jsPane = $target.find('.jspPane');
            var $jsDrag = $target.find('.jspDrag');

            if (($jsPane.length > 0) && ($jsDrag.length > 0)) {
                $jsPane.css('top', 0);
                $jsDrag.css('top', 0);
            }

        }
    };

    ns.formEvent.writeInp = {
        init: function () {
            this._bindEvent();
        },
        _bindEvent: function () {
            // [호텔 검색 input] : 검색어 있을 경우-> 삭제 버튼(.btnDel) 보임, 검색어 없을 경우 -> 검색 버튼(.btnInpSch) 보임
            $(document).off('keyup.schInp');
            $(document).on('keyup.schInp', '.htSchWrap input', $.proxy(this._onkeyUpSchInp, this));

            // 호텔 검색 삭제 버튼 클릭 시 -> 검색어 삭제
            $(document).off('click.delInp');
            $(document).on('click.delInp', '.htSchWrap .btnDel', $.proxy(this._onClickDelBtn, this));
        },
        _onkeyUpSchInp: function (e) {
            var $target = $(e.currentTarget);
            var $targetWrap = $target.closest('div');
            var targetVal = $target.val();
            var inpClassNm = 'SchWrite';

            if (targetVal.length === 0) {
                $targetWrap.removeClass(inpClassNm);
            } else {
                $targetWrap.addClass(inpClassNm);
            }
        },
        _onClickDelBtn: function (e) {
            e.preventDefault();
            var $target = $(e.currentTarget);
            var $targetWrap = $target.closest('div');
            var schInp = $target.siblings('input');
            var inpClassNm = 'SchWrite';

            schInp.val('');
            $targetWrap.removeClass(inpClassNm);
        }
    };

    //레이어 팝업
    ns.layerPopup = {
        init: function () {
            this.g_pop_areaId = null;
            this._setElement();
            this._bindEvent();
        },
        _setElement: function () {
            var $pop = $('.new_popLayer:visible');
            var oSelf = this;
            $pop.each(function () {
                oSelf._alignCenterPop($(this));
                oSelf.lockScroll();
            });
        },
        /* 팝업 중앙 정렬 */
        _alignCenterPop: function (_$target) {
            var $popLayer = _$target;
            var popMarLeft = parseInt($popLayer.outerWidth() / 2);
            var popMarTop = parseInt($popLayer.outerHeight() / 2);
            $popLayer.css({
                'position': 'fixed',
                'top': '50%',
                'left': '50%',
                'marginLeft': -popMarLeft,
                'marginTop': -popMarTop
            });

        },
        _bindEvent: function () {
            //a href="#팝업id"  클릭 시 -> 팝업 열기
            $(document).off('click.openLayer');
            $(document).on('click.openLayer', 'a', $.proxy(this._onClickOpenLayer, this));
        },
        _onClickOpenLayer: function (e) {
            var $target = $(e.currentTarget);
            var targetHref = $target.attr('href');
            if ((targetHref !== undefined) && (targetHref !== '') && (targetHref.length > 1) && (targetHref.slice(0, 1) === '#')) {
            	if($target.hasClass('abtn')){
            	} else {
	            	e.preventDefault();
	                this.openPop(targetHref);
            	}
            }
        },
        /* 팝업 열기 */
        openPop: function (areaId, classId) {
            var $pop = $(areaId);
            if ($pop.length === 0) {
                return;
            }
            if (classId == null) classId = "popLayer";
            this.g_pop_areaId = areaId;

            //접근성
            this.$focusPop = $(':focus');

            this._closeOpenPop();
            $pop.show();

            //팝업 별 css 요소 정의
            this._setCssCont(areaId);

            if ($pop.find(".new_popLayer").length > 0) {
                // 신규 팝업

                //중앙 정렬
                this._alignCenterPop($pop.find('.new_popLayer'));

                //뒤에 스크롤 막기
                this.lockScroll();
            } else {
                //기존 팝업
                var sTop = $(document).scrollTop();
                var sLef = $(document).scrollLeft();
                var widthHalf = $pop.find("." + classId).width() / 2;
                $pop.find("." + classId).css("top", sTop < 130 ? 200 : sTop + 70);
                var diff = parseInt($(window).width() / 2 - widthHalf);
                $pop.find("." + classId).css({
                    "left": (sLef + widthHalf + (diff < 15 ? 15 : diff)),
                    'marginLeft': -widthHalf
                });
                $pop.find("." + classId).attr("tabindex", -1).focus();
                $(document).scrollTop(sTop);
                $(document).scrollLeft(sLef);
            }

            //접근성
            $('.container').attr('aria-hidden', 'true');
            $pop.find("." + classId).attr('aria-hidden', 'false');
            $pop.find("." + classId).attr('tabindex', 0).focus();

            //접근성 : 팝업 키 다운 시 -> 포커스 이동
            ns.domEvent.accessibility.setEvent($pop.find("." + classId));
        },
        _setCssCont: function (areaId) {
            var $pop = $(areaId);

            //스크롤 생성
            if ($pop.find('.scroll').length > 0) {
                ns.formEvent.scrollBarJs.init();
            }
        },
        /* 팝업 닫기 */
        closePop: function (areaId) {
            var area = $(areaId);
            var $popLayer = area.find(".new_popLayer");
            area.hide();
            $(areaId + "Btn").focus();

            //뒤에 스크롤 막기
            if ($popLayer.length > 0) {
                this.unLockScroll();
            }

            //팝업 별 css 요소 정의
            this._setCssCloseCont(areaId);

            //접근성
            if (this.$focusPop && this.$focusPop.length > 0) {
                this.$focusPop.attr('tabindex', 0).focus();
            }
            $('.container').removeAttr('aria-hidden');
            $popLayer.removeAttr('aria-hidden');
        },
        _setCssCloseCont: function (areaId) {
            var area = $(areaId);
            var $popLayer = area.find(".new_popLayer");
            //달력 팝업
            if ($popLayer.hasClass('popLayerRsvCalendar')) {
                var $rsvCal = $popLayer.find('.new_rsvCal');
                $rsvCal.show();
                $rsvCal.siblings('.ly_reserve').hide();
            }
        },
        _closeOpenPop: function () {
            if (this.g_pop_areaId != null) {
                $(this.g_pop_areaId).hide();
                this.g_pop_areaId = null;
            }
        },
        /* 스크롤 비 활성화 */
        lockScroll: function () {
            if ($('html').hasClass('has-modal')) {
                return;
            }
            var scroll = $('html,body').scrollTop();
            $('html').addClass('has-modal');
            $('body').css({
                marginTop: -scroll,
                paddingRight: 17
            });
        },
        /* 스크롤 활성화 */
        unLockScroll: function () {
            var scroll = -parseInt($('body').css('marginTop'));
            $('html').removeClass('has-modal');
            $('body').css('marginTop', '');
            $('body').css('paddingRight', '');
            $('html,body').scrollTop(scroll);
        }
    };

    ns.domEvent = {
        init: function () {
            this.steylHub.init();

            //객실 패키지 > 예약 하기 팝업
            this.popLayerRsvCalendar.init();

            //예약 step1 > 예약 바 객실
            this.rsvPeople.init();
        }
    };

    ns.domEvent.steylHub = {
        init: function () {
            $('.tab-list a').on('click', function () {
                $(this).toggleClass('on');
                $(this).siblings('.tab-content').toggleClass('active');
            });
        }
    };

    ns.domEvent.popLayerRsvCalendar = {
        init: function () {
            this._bindEvent();
        },
        _bindEvent: function () {
            $(document).off('click.popCalBtn');
            $(document).on('click.popCalBtn', '#rsvCalanderPop .btnCalShow', $.proxy(this._onClickBtnCal, this));
        },
        _onClickBtnCal: function (e) {
            $('#rsvCalanderPop .promotionCalendar').show();
            $('#rsvCalanderPop .rsvPeople').hide();
        }
    };


    ns.domEvent.rsvPeople = {
        init: function () {
            this._bindEvent();
        },
        _bindEvent: function () {
            // 예약 바 객실 버튼 클릭 시 -> 레이어 토글
            $('.new_rsvBox').off('click.toggleRoom');
            $('.new_rsvBox').on('click.toggleRoom', '.btnRoomshow', $.proxy(this._onClickShowRoom, this));

            // 예약 바 객실 확인 버튼 클릭 시-> 레이어 닫힘
            $('.new_rsvBox').off('click.closeRoomLayer');
            $('.new_rsvBox').on('click.closeRoomLayer', '.rsvPeople .btnSubmit', $.proxy(this._onClickCloseRoomLayer, this));

            // 예약 바 객실 인원 선택 레이어 밖에 클릭 시 -> 레이어 닫힘
            $(document).off('mousedown.externalRsvPeople');
            $(document).on('mousedown.externalRsvPeople', $.proxy(this._onMousedownExternalRsvPeople, this));

            // 예약 바 객실 인원 추가/삭제 버튼 클릭 시 -> 버튼명 변경
            $('.new_rsvBox').off('click.btnRoom');
            $('.new_rsvBox').on('click.btnRoom', '.rsvPeople .btnRooms', $.proxy(this._onClickBtnRooms, this));


            // oks
            $('.new_rsvBox').off('click.minus');
            $('.new_rsvBox').on('click.minus', '.rsvPeople .minus', $.proxy(this._onClickMinus, this));

            $('.new_rsvBox').off('click.plus');
            $('.new_rsvBox').on('click.plus', '.rsvPeople .plus', $.proxy(this._onClickPlus, this));

        },
        _onClickMinus: function (e) {
            e.preventDefault();
            var $target = $(e.target);
            var num = $target.closest('.number').find(".num").text();

            var $tabEl = $target.parent();

            if ($tabEl.parent().hasClass('first')) {
                if (Number(num) < 2) {
                    return;
                }
            } else {
                if (Number(num) < 1) {
                    return;
                }
            }

            if (Number(num) > 0) {
                $target.closest('.number').find(".num").text((Number(num) - 1));
            }

            var ary2 = [];
            if ($('.r_number').hasClass('addRoom3')) {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });

                $('.room2 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });

                $('.room3 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            } else if ($('.r_number').hasClass('addRoom2')) {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });

                $('.room2 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            } else {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            }


            if (ary2.length == 3) {
                var sumAd = Number(ary2[0]);
                var sumKi = Number(ary2[1]);
                var sumBb = Number(ary2[2]);
            } else if (ary2.length == 6) {
                var sumAd = Number(ary2[0]) + Number(ary2[3]);
                var sumKi = Number(ary2[1]) + Number(ary2[4]);
                var sumBb = Number(ary2[2]) + Number(ary2[5]);
            } else {
                var sumAd = Number(ary2[0]) + Number(ary2[3]) + Number(ary2[6]);
                var sumKi = Number(ary2[1]) + Number(ary2[4]) + Number(ary2[7]);
                var sumBb = Number(ary2[2]) + Number(ary2[5]) + Number(ary2[8]);
            }

            $('.htRoom > dl > dd').each(function (index) {
                if (index == 0) {
                } else if (index == 1) {
                    $(this).find('.btnRoomshow').text(sumAd);
                } else if (index == 2) {
                    $(this).find('.btnRoomshow').text(sumKi);
                } else if (index == 3) {
                    $(this).find('.btnRoomshow').text(sumBb);
                }
            });

            $("#totlAdltCnt").trigger('change');
        },
        _onClickPlus: function (e) {
            e.preventDefault();
            var $target = $(e.target);
            var num = $target.closest('.number').find(".num").text();

            $target.closest('.number').find(".num").text((Number(num) + 1));

            var ary2 = [];
            if ($('.r_number').hasClass('addRoom3')) {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });

                $('.room2 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });

                $('.room3 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            } else if ($('.r_number').hasClass('addRoom2')) {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });

                $('.room2 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            } else {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            }

            var row1 = 0;
            var row2 = 0;
            var row3 = 0;

            if (ary2.length == 3) {
                var sumAd = Number(ary2[0]);
                var sumKi = Number(ary2[1]);
                var sumBb = Number(ary2[2]);

                row1 = Number(ary2[0]) + Number(ary2[1]) + Number(ary2[2]);
            } else if (ary2.length == 6) {
                var sumAd = Number(ary2[0]) + Number(ary2[3]);
                var sumKi = Number(ary2[1]) + Number(ary2[4]);
                var sumBb = Number(ary2[2]) + Number(ary2[5]);

                row1 = Number(ary2[0]) + Number(ary2[1]) + Number(ary2[2]);
                row2 = Number(ary2[3]) + Number(ary2[4]) + Number(ary2[5]);
            } else {
                var sumAd = Number(ary2[0]) + Number(ary2[3]) + Number(ary2[6]);
                var sumKi = Number(ary2[1]) + Number(ary2[4]) + Number(ary2[7]);
                var sumBb = Number(ary2[2]) + Number(ary2[5]) + Number(ary2[8]);

                row1 = Number(ary2[0]) + Number(ary2[1]) + Number(ary2[2]);
                row2 = Number(ary2[3]) + Number(ary2[4]) + Number(ary2[5]);
                row3 = Number(ary2[6]) + Number(ary2[7]) + Number(ary2[8]);
            }

            // 객실당 최대 선택가능한 총인원수
            var maxCnt = 4;
            // 객실당 최대 선택가능한 성인수
            var adltMaxCnt = 3;
            var hotlCnt = 0;
            var alertFlag = "";
            // 선택된 호텔들의 배열
            var hotlIdArr = $("#hotlIdArr").val();

            if (hotlIdArr != "") {
                var hotlIds = hotlIdArr.split(",");
                hotlCnt = hotlIds.length;
                for (var i = 0; i < hotlIds.length; i++) {
                    if (hotlIds[i] == "D") {
                        //동탄인 경우
                        maxCnt = 3;
                        adltMaxCnt = 2;
                        break;
                    } else if(hotlIds[i] == "VDNSM"){
                    	if(hotlCnt == 1){
	                    	maxCnt = 10;
	                    	adltMaxCnt = 8;
                    	}else if(hotlCnt == 2 && hotlIdArr.indexOf("HUDSS") > -1){
                    		maxCnt = 5;
                            adltMaxCnt = 4;
                            break;
                    	}else{
                    		maxCnt = 4;
                            adltMaxCnt = 3;
                        }
                    } else if (hotlIds[i] == "HUDSS") {
                        // 스테이 해운대인 경우
                        if(hotlCnt == 1) {
                            maxCnt = 5;
                            adltMaxCnt = 4;
                        }else if(hotlCnt == 2 && hotlIdArr.indexOf("VDNSM") > -1){
                        	maxCnt = 5;
                            adltMaxCnt = 4;
                            break;
                        }else {
                            maxCnt = 4;
                            adltMaxCnt = 3;
                        }
                        continue;
                    } else if (hotlIds[i] == "S") {
                    	// 서울신라호텔인 경우, 단일 객실 선택시에만 적용하기로 함
                        if(hotlCnt == 1) {
                            maxCnt = 4;
                            adltMaxCnt = 4;
                        }else {
                            maxCnt = 4;
                            adltMaxCnt = 3;
                        }
                        continue;
                    }else{
                    	maxCnt = 4;
                        adltMaxCnt = 3;
                    }
                }
                var dongtanFlag = false;
                var haewoondaeFlag = false;
                var danangFlag = false;
                var seoulFlag = false;
                for (var i = 0; i < hotlIds.length; i++) {
                	if (hotlIds[i] == "D") {
                		dongtanFlag = true;
                	}
                	if(hotlIds[i] == "HUDSS"){
                		haewoondaeFlag = true;
                	}
                	if(hotlIds[i] == "VDNSM"){
                		danangFlag = true;
                	}
                	if(hotlIds[i] == "S"){
                		seoulFlag = true;
                	}
                }
                //동탄, 해운대, 다낭, 서울신라 호텔 포함 여부 확인
                if(dongtanFlag || haewoondaeFlag || danangFlag || seoulFlag){
                	alertFlag = "";
                	if(dongtanFlag){
                		alertFlag += "D";
                	}
        			if(haewoondaeFlag){
                		alertFlag += "H";
                	}
        			if(danangFlag){
                		alertFlag += "M";
                	}
        			if(seoulFlag){
                		alertFlag += "S";
                	}
                }else{
                	alertFlag = "N";
                }
            }

            // 클릭한 플러스버튼 (0 : 성인, 1 : 어린이, 2 : 유아)
            var unitIndex = $target.closest("li").index();

            var clickCnt = 0;
            var adltCnt = 0;
            $target.closest("ul").find("li").each(function (idx) {
                if (idx == 0) {
                    adltCnt = parseInt($(this).find(".num").text());
                }
                clickCnt += parseInt($(this).find(".num").text());
            });

          //단일 객실 ALERT
            if (2 > hotlCnt) {
            	if (unitIndex != 0 && clickCnt > maxCnt) {
                	if(alertFlag == "N"){
        				//객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.
        				var mag = messages["javascript.fncgoresv.room.alert1"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if(alertFlag == "D"){
	            		//신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능합니다. 
	            		var mag = messages["javascript.fncgoresv.room.alert2"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if(alertFlag == "H"){
	            		//신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.
	            		var mag = messages["javascript.fncgoresv.room.alert3"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if (alertFlag == "M"){
                    	 //신라모노그램 다낭은 객실 1실당 성인 10인 또는 성인과 소인 동반 시 최대 14인까지 투숙 가능합니다.
                        var mag = messages["javascript.fncgoresv.room.alert12"];
                        mag = mag.replace(/<br\/>/g, "\n");
                        alert(mag);
                    }else if(alertFlag == "S"){
                    	//객실 1실 당 성인과 소인 합계 최대 4인까지 투숙 가능합니다. 객실 1실 당 성인은 일반실 3인, 스위트 4인까지 투숙 가능합니다.
	            		var mag = messages["javascript.fncgoresv.room.alert16"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}
                    $target.closest('.number').find(".num").text((Number(num)));
                    return;
                }
                if (unitIndex == 0 && (maxCnt < clickCnt || adltCnt > adltMaxCnt)) {
                	if(alertFlag == "N"){
        				//객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.
        				var mag = messages["javascript.fncgoresv.room.alert1"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if(alertFlag == "D"){
	            		//신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능합니다. 
	            		var mag = messages["javascript.fncgoresv.room.alert2"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if(alertFlag == "H"){
	            		//신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.
	            		var mag = messages["javascript.fncgoresv.room.alert3"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if (alertFlag == "M"){
                    	 //신라모노그램 다낭은 객실 1실당 성인 10인 또는 성인과 소인 동반 시 최대 14인까지 투숙 가능합니다.
                        var mag = messages["javascript.fncgoresv.room.alert12"];
                        mag = mag.replace(/<br\/>/g, "\n");
                        alert(mag);
                    }else if(alertFlag == "S"){
                    	//객실 1실 당 성인과 소인 합계 최대 4인까지 투숙 가능합니다. 객실 1실 당 성인은 일반실 3인, 스위트 4인까지 투숙 가능합니다.
	            		var mag = messages["javascript.fncgoresv.room.alert16"]; 
				        mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}
                    $target.closest('.number').find(".num").text((Number(num)));
                    return;
                }
            }else if(2 == hotlCnt && (alertFlag == "DH" || alertFlag == "DM" || alertFlag == "HM")){
            	if (unitIndex != 0 && clickCnt > maxCnt) {
	            	if(alertFlag == "DH"){
	        			/** 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	        			* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능하오니 투숙을 원하시는 경우 해운대 지점만 선택해주십시오.*/
	    				var mag = messages["javascript.fncgoresv.room.alert13"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	        		}else if(alertFlag == "DM"){
	        			/* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	        			* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	    				var mag = messages["javascript.fncgoresv.room.alert14"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	        		}else if(alertFlag == "HM"){
	        			/* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.<br/>
	        			* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	    				var mag = messages["javascript.fncgoresv.room.alert15"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	        		}
	            	$target.closest('.number').find(".num").text((Number(num)));
	                return;
            	}
            	if (unitIndex == 0 && (maxCnt < clickCnt || adltCnt > adltMaxCnt)) {
            		if(alertFlag == "DH"){
	        			/** 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	        			* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능하오니 투숙을 원하시는 경우 해운대 지점만 선택해주십시오.*/
	    				var mag = messages["javascript.fncgoresv.room.alert13"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	        		}else if(alertFlag == "DM"){
	        			/* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	        			* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	    				var mag = messages["javascript.fncgoresv.room.alert14"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	        		}else if(alertFlag == "HM"){
	        			/* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.<br/>
	        			* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	    				var mag = messages["javascript.fncgoresv.room.alert15"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	        		}
            		$target.closest('.number').find(".num").text((Number(num)));
                    return;
            	}
            }else {
                if (unitIndex != 0 && clickCnt > maxCnt) {
                	if(alertFlag == "N"){
        				//객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.
	            		var mag = messages["javascript.fncgoresv.room.alert1"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if(alertFlag == "D"){
	            		/* 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다. 
 						* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.
 						*/
            			var mag = messages["javascript.fncgoresv.room.alert4"]; 
			        		mag = mag.replace(/<br\/>/g,"\n");
			        	alert(mag);
	            	}else if(alertFlag == "H"){
	            		/* alert("객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.\n"
            			+"\n* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지" 
            			+"\n투숙이 가능하오니 4인 이상 투숙을 원하시는 경우 해운대 지점만 단일 선택해주십시오."); */
	            		var mag = messages["javascript.fncgoresv.room.alert5"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if (alertFlag == "M"){
	            		/*객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다. 
	            		 * 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	                     var mag = messages["javascript.fncgoresv.room.alert11"];
	                     mag = mag.replace(/<br\/>/g, "\n");
	                     alert(mag);
	            	/*}else if(alertFlag == "S"){
	            		// 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>* 서울신라호텔은 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능하오니 투숙을 원하시는 경우 서울신라호텔만 선택해주십시오.
	            		var mag = messages["javascript.fncgoresv.room.alert17"]; 
				        mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);*/
	                }else if(alertFlag == "DH"){
	                	/*객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
	                	* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	                	* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	            		var mag = messages["javascript.fncgoresv.room.alert6"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if (alertFlag == "DM"){
	            		/* 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
	            		* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	            		* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오. */
                         var mag = messages["javascript.fncgoresv.room.alert8"];
                         mag = mag.replace(/<br\/>/g, "\n");
                         alert(mag);
                     }else if(alertFlag == "HM"){
                    	 /*객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
                    	 * 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.<br/>
                    	 * 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
                     	var mag = messages["javascript.fncgoresv.room.alert9"];
                         mag = mag.replace(/<br\/>/g, "\n");
                         alert(mag);
                     }else if(alertFlag == "DHM"){
                     	/* 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
                     	* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
                     	* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.<br/>
                     	* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.
                     	 */
                     	var mag = messages["javascript.fncgoresv.room.alert10"];
                         mag = mag.replace(/<br\/>/g, "\n");
                         alert(mag);
                     }
                    $target.closest('.number').find(".num").text((Number(num)));
                    return;
                }
                if (unitIndex == 0 && (maxCnt < clickCnt || adltCnt > adltMaxCnt)) {
                	if(alertFlag == "N"){
        				//객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.
	            		var mag = messages["javascript.fncgoresv.room.alert1"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if(alertFlag == "D"){
	            		/* 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다. 
 						* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.
 						*/
            			var mag = messages["javascript.fncgoresv.room.alert4"]; 
			        		mag = mag.replace(/<br\/>/g,"\n");
			        	alert(mag);
	            	}else if(alertFlag == "H"){
	            		/* alert("객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.\n"
            			+"\n* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지" 
            			+"\n투숙이 가능하오니 4인 이상 투숙을 원하시는 경우 해운대 지점만 단일 선택해주십시오."); */
	            		var mag = messages["javascript.fncgoresv.room.alert5"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if (alertFlag == "M"){
	            		/*객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다. 
	            		 * 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	                     var mag = messages["javascript.fncgoresv.room.alert11"];
	                     mag = mag.replace(/<br\/>/g, "\n");
	                     alert(mag);
	            	/*}else if(alertFlag == "S"){
	            		// 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>* 서울신라호텔은 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능하오니 투숙을 원하시는 경우 서울신라호텔만 선택해주십시오.
	            		var mag = messages["javascript.fncgoresv.room.alert17"]; 
				        mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);*/
	            	}else if(alertFlag == "DH"){
	                	/*객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
	                	* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	                	* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
	            		var mag = messages["javascript.fncgoresv.room.alert6"]; 
				        	mag = mag.replace(/<br\/>/g,"\n");
	            		alert(mag);
	            	}else if (alertFlag == "DM"){
	            		/* 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
	            		* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
	            		* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오. */
                         var mag = messages["javascript.fncgoresv.room.alert8"];
                         mag = mag.replace(/<br\/>/g, "\n");
                         alert(mag);
                     }else if(alertFlag == "HM"){
                    	 /*객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
                    	 * 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.<br/>
                    	 * 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.*/
                     	var mag = messages["javascript.fncgoresv.room.alert9"];
                         mag = mag.replace(/<br\/>/g, "\n");
                         alert(mag);
                     }else if(alertFlag == "DHM"){
                     	/* 객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다.<br/>
                     	* 신라스테이 동탄은 객실 1실당 성인과 소인 동반 시 최대 3인까지만 투숙 가능하오니 4인 이상 투숙을 원하시는 경우 동탄 지점을 선택 해제해주십시오.<br/>
                     	* 신라스테이 해운대는 객실 1실당 성인과 소인 동반 시 최대 5인까지 투숙 가능합니다.<br/>
                     	* 신라모노그램 다낭은 객실 1실당 성인과 소인 동반 시 최대 14인까지 투숙 가능하오니 투숙을 원하시는 경우 다낭 지점만 선택해주십시오.
                     	 */
                     	var mag = messages["javascript.fncgoresv.room.alert10"];
                         mag = mag.replace(/<br\/>/g, "\n");
                         alert(mag);
                     }
                    $target.closest('.number').find(".num").text((Number(num)));
                    return;
                }
            }

            $('.htRoom > dl > dd').each(function (index) {
                if (index == 0) {
                } else if (index == 1) {
                    $(this).find('.btnRoomshow').text(sumAd);
                } else if (index == 2) {
                    $(this).find('.btnRoomshow').text(sumKi);
                } else if (index == 3) {
                    $(this).find('.btnRoomshow').text(sumBb);
                }
            });
            $("#totlAdltCnt").trigger('change');
        },
        _onClickShowRoom: function (e) {
            e.preventDefault();
            var $roomLayer = $('.rsvPeople');
            this.$focusBtnRoomShow = $(e.currentTarget);

            if ($('.mainWrap').length === 0) {
                $roomLayer.show();
                if ($roomLayer.is(':visible')) {
                    $('.new_rsvCal').hide();
                } else {
                    $('.new_rsvCal').show();
                }
            } else {
                $roomLayer.toggle();

                if ($roomLayer.is(':visible')) {
                    $roomLayer.attr('tabindex', 0).focus();
                }
            }

        },
        _onClickCloseRoomLayer: function (e) {
            var $roomLayer = $('.rsvPeople');
            $roomLayer.hide();

            //접근성
            if (this.$focusBtnRoomShow) {
                this.$focusBtnRoomShow.focus();
            }

        },
        _onMousedownExternalRsvPeople: function (e) {
            if (
                !$('.rsvPeople').is(':visible') ||
                ($('.popLayerRsvCalendar:visible').length > 0)
            ) {
                return;
            }
            var $target = $(e.target);

            var isInRsvPeople = ($target.closest('.rsvPeople').length === 0) ? false : true;
            var isInRsvPeoplehBtn = ($target.closest('.btnRoomshow').length === 0) ? false : true;

            if (!isInRsvPeople && !isInRsvPeoplehBtn) {
                this._onClickCloseRoomLayer(e);
            }
        },
        _onClickBtnRooms: function (e) {
            e.preventDefault();
            var $btn = $(e.currentTarget);
            var $con = $btn.closest('.con');
            var conIdx = $con.index();
            var $r_number = $btn.closest('.r_number');
            var numberClass = 'addRoom' + (conIdx + 1);
            var romCnt = conIdx + 1;

            if ($btn.attr('class').indexOf('del') > 0) {
                if ($r_number.hasClass('addRoom3') && (numberClass === 'addRoom2')) {
                    if ($r_number.hasClass('addRoom2')) {
                        var arry = [];
                        $('.room3 .number > .num').each(function (index) {
                            arry.push($(this).text());
                            if (index == 0) {
                                $(this).text(0);
                            } else {
                                $(this).text(0);
                            }
                        });

                        $('.room2 .number > .num').each(function (index) {
                            if (index == 0) {
                                $(this).text(arry[0]);
                            } else if (index == 1) {
                                $(this).text(arry[1]);
                            } else if (index == 2) {
                                $(this).text(arry[2]);
                            }
                        });
                    } else {
                        if ($r_number.hasClass('addRoom3')) {
                            $('.room3 .number > .num').each(function (index) {
                                if (index == 0) {
                                    $(this).text(0);
                                } else {
                                    $(this).text(0);
                                }
                            });
                        }
                    }

                    $r_number.removeClass('addRoom3');
                } else {

                    if (numberClass == 'addRoom3') {
                        $('.room3 .number > .num').each(function (index) {
                            if (index == 0) {
                                $(this).text(0);
                            } else {
                                $(this).text(0);
                            }
                        });
                        romCnt -= 1;
                    } else if (numberClass == 'addRoom2') {
                        $('.room2 .number > .num').each(function (index) {
                            if (index == 0) {
                                $(this).text(0);
                            } else {
                                $(this).text(0);
                            }
                        });
                        romCnt -= 1;
                    }
                    $r_number.removeClass(numberClass);
                }
                $con.removeClass('add');

                //개발 연동
                $('.rsvPeople .r_number').trigger('changeClass');
            } else {
                if ((numberClass !== 'addRoom3') || $r_number.hasClass('addRoom2')) {
                    if (numberClass == 'addRoom3') {
                        $('.room3 .number > .num').each(function (index) {
                            if (index == 0) {
                                $(this).text(2);
                            } else {
                                $(this).text(0);
                            }
                        });
                    } else if (numberClass == 'addRoom2') {
                        $('.room2 .number > .num').each(function (index) {
                            if (index == 0) {
                                $(this).text(2);
                            } else {
                                $(this).text(0);
                            }
                        });
                    }
                    $r_number.addClass(numberClass);
                    $con.addClass('add');

                    //개발 연동
                    $('.rsvPeople .r_number').trigger('changeClass');
                }
            }


            // oks
            var ary2 = [];
            if ($r_number.hasClass('addRoom3')) {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
                $('.room2 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
                $('.room3 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            } else if ($r_number.hasClass('addRoom2')) {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
                $('.room2 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            } else {
                $('.room1 .number > .num').each(function (index) {
                    ary2.push($(this).text());
                });
            }

            if (ary2.length == 3) {
                var sumAd = Number(ary2[0]);
                var sumKi = Number(ary2[1]);
                var sumBb = Number(ary2[2]);
            } if (ary2.length == 6) {
                var sumAd = Number(ary2[0]) + Number(ary2[3]);
                var sumKi = Number(ary2[1]) + Number(ary2[4]);
                var sumBb = Number(ary2[2]) + Number(ary2[5]);
            } if (ary2.length == 9) {
                var sumAd = Number(ary2[0]) + Number(ary2[3]) + Number(ary2[6]);
                var sumKi = Number(ary2[1]) + Number(ary2[4]) + Number(ary2[7]);
                var sumBb = Number(ary2[2]) + Number(ary2[5]) + Number(ary2[8]);
            }

            // oks
            $('.htRoom > dl > dd').each(function (index) {
                if (index == 0) {
                    $(this).find('.btnRoomshow').text(romCnt);
                    $("#roomCnt").val(romCnt);
                } else if (index == 1) {
                    $(this).find('.btnRoomshow').text(sumAd);
                } else if (index == 2) {
                    $(this).find('.btnRoomshow').text(sumKi);
                } else if (index == 3) {
                    $(this).find('.btnRoomshow').text(sumBb);
                }
            });
        }
    };

    ns.domEvent.accessibility = {
        setEvent: function ($pop) {
            var oSelf = this;
            $pop.off('keydown.focusPop');
            $pop.on('keydown.focusPop', function (e) {
                oSelf._onKeydownPop($pop, e);
            });
        },
        _onKeydownPop: function ($pop, e) {
            var keyCode = e.keyCode;
            var $target = $(e.target);
            var $focusFirst = $pop;
            var $focusEl = $pop.find('a, button');
            var $focusLast = $focusEl.last();
            var focusCnt = $focusEl.length;
            if (parseInt($focusLast.parent().css('left')) < -$(window).width()) {
                $focusLast = $focusEl.eq(focusCnt - 2);
            }

            if (e.shiftKey && keyCode == 9) {
                if ($target.get(0) === $focusFirst.get(0)) {
                    setTimeout(function () {
                        $focusLast.focus();
                    }, 0)
                }
            } else if (keyCode == 9) {
                if ($target.get(0) === $focusLast.get(0)) {
                    $focusFirst.focus();
                    setTimeout(function () {
                        $focusFirst.focus();
                    }, 0);
                }
            }
        }
    };

    ns.header = {
        init: function () {
            //호텔 찾기 레이어
            this.findHotel.init();
        }
    };

    ns.header.findHotel = {
        init: function () {
            this._bindEvent();
        },
        _bindEvent: function () {
            //호텔 박스 토글
            $(document).off('click.findHotel');
            $(document).on('click.findHotel', '.hotelBox_wrap > a, .hotelBox_N .btnClose', $.proxy(this._onClickFindHotel, this));

            //tab 토글
            $(document).off('click.htBoxTab');
            $(document).on('click.htBoxTab', '.hotelBox_N .htTab li a', $.proxy(this._onClickHtBoxTab, this));
        },
        _onClickFindHotel: function (e) {
            e.preventDefault();
            var $hotelBox = $('.hotelBox_N');
            var $hotelBoxBtn = $('.hotelBox_wrap');

            //뒤에 mdScreen 추가
            if ($hotelBox.next('.mdScreen').length === 0) {
                $hotelBox.after('<div class="mdScreen" />');
            }
            var $mdScreen = $hotelBox.next('.mdScreen');

            $hotelBoxBtn.toggleClass('on');
            if ($hotelBoxBtn.hasClass('on')) {
                $hotelBox.show();
                $mdScreen.show();
                ns.layerPopup.lockScroll();
                $hotelBox.attr('tabindex', 0).focus();
            } else {
                $hotelBox.hide();
                $mdScreen.hide();
                ns.layerPopup.unLockScroll();
                $('.hotelBox_wrap .btn').focus();
            }
            //접근성 : 팝업 키 다운 시 -> 포커스 이동           
            ns.domEvent.accessibility.setEvent($hotelBox);

        },
        _onClickHtBoxTab: function (e) {
            e.preventDefault();
            var $target = $(e.currentTarget);
            var $targetWrap = $target.parent();
            var tabIdx = $targetWrap.index();
            var orgTabIdx = $('.hotelBox_N .htTab li.on').index();
            var $tabCon = $('.hotelBox_N .hCon');
            var tabIdx = $targetWrap.index();
            if (tabIdx === orgTabIdx) {
                return;
            }
            $targetWrap.addClass('on');
            $targetWrap.siblings().removeClass('on');

            $tabCon.hide();
            $tabCon.eq(tabIdx).show();
        }
    };

    // 예약 바 > 호텔 선택
    ns.resvSelHotel = {
        init: function () {
            this._setElement();
            this._bindEvent();
        },
        _setElement: function () {
            this.$htSearch = $('.htSearch');
            this.$htInp = $('.htSchWrap input');
            this.$htDelBtn = $('.htSchWrap .btnDel');
            this.$viewHotelSlideWrap = this.$htSearch.find('.flexslider');
            this.$ckList = this.$htSearch.find('.ckList ul');
            this.$prevBtn = this.$htSearch.find('.ad-prev');
            this.$nextBtn = this.$htSearch.find('.ad-next');
            this.$btnHtMore = $('.htSch .btnHtMore');
            this.$moreHt = $('.htSch .moreHt');

            this.$prevBtn.hide();
            this.$nextBtn.hide();

            this.$btnHtMore.hide();
            var ckListCnt = 0;
            // oks 2019-10-13
            $(".ckHotel .ckList  li").each(function () {
                ckListCnt++;
            });
            if (ckListCnt == 0) {
                this.$ckList.html('');
            }
            this.$moreHt.html('');

            this.oSelHotel = [];

            this._setMaxSelCnt();

            //flexSlide 플러그인 호출
            this._setPluginSlide();
        },
        _setMaxSelCnt: function () {
            var $ckOptList = $('.htSearch .ckType');
            var oSelf = this;
            $ckOptList.each(function () {
                oSelf.maxSelCnt = $(this).attr('data-maxSelCnt');

                if (oSelf.maxSelCnt === undefined) {
                    if ($('.newpromotionWrap').length > 0) {
                        oSelf.maxSelCnt = 1;
                    } else {
                        oSelf.maxSelCnt = 5;
                    }
                    $(this).attr('data-maxSelCnt', oSelf.maxSelCnt);
                }
            });
        },
        _setPluginSlide: function () {
            // 호텔 정보 리스트(.slideBox .flexslider) 슬라이드 플러그인 설정
            var oSelf = this;
            var slideIdx;
            if (this.hotelSlideData !== undefined) {
                return;
            }
            this.$viewHotelSlideWrap.flexslider({
                animation: "slide",
                animationLoop: false,
                slideshow: false,
                controlNav: false,
                directionNav: false,
                before: function (slider) {
                    slideIdx = slider.animatingTo;

                    //좌우 버튼
                    oSelf._setDirectionNav(slideIdx);

                    //목록
                    oSelf._setPageNation(slideIdx);
                }
            });
            this.hotelSlideData = this.$viewHotelSlideWrap.data('flexslider');
        },
        _bindEvent: function () {
            //호텔레이어 open
            $('.rsvWrap').off('click.showHtSearch');
            $('.rsvWrap').on('click.showHtSearch', '.inpHtSch, .btnInpSch', $.proxy(this._onClickShowHtSearch, this));

            //호텔레이어 close
            this.$htSearch.off('click.hideHtSearch');
            this.$htSearch.on('click.hideHtSearch', '.btnSubmit', $.proxy(this._onClickHideHtSearch, this));

            //호텔레이어 영역 밖 클릭 시 close
            $(document).off('mousedown.outHtLayer');
            $(document).on('mousedown.outHtLayer', $.proxy(this._onMousedownExternalHtSearch, this));

            //호텔 선택
            this.$htSearch.off('click.selHotel');
            this.$htSearch.on('click.selHotel', '.htData  li >a', $.proxy(this._onClickSelhotel, this));

            //슬라이드 방향 제어
            this.$htSearch.off('click.navBtn');
            this.$htSearch.on('click.navBtn', '.ad-prev , .ad-next', $.proxy(this._onClickNavBtn, this));

            //호텔 선택 해제
            this.$htSearch.off('click.btnClear');
            this.$htSearch.on('click.btnClear', '.btnClear', $.proxy(this._onClickBtnClear, this));

            //브랜드별, 권역별 탭 클릭
            this.$htSearch.off('click.htTab');
            this.$htSearch.on('click.htTab', '.htTab  >li >a', $.proxy(this._onClickHtTab, this));

            //체크 리스트 클릭
            this.$htSearch.off('click.ckListEl');
            this.$htSearch.on('click.ckListEl', '.ckList li >a', $.proxy(this._onClickCkList, this));
        },
        _onClickShowHtSearch: function (e) {
            var $target = $(e.currentTarget);
            if ($target.hasClass('btnInpSch')) {
                e.preventDefault();
            }

            this.$htSearch.show();

            this.$viewHotelSlideWrap.resize();
            //스크롤바 높이 재 설정
            this._resetScrollBarHeight();
        },
        _onClickHideHtSearch: function () {
            this._setHtSchInp();
            this.$htSearch.hide();

            //oks 2019-10-14
            var $target_tmp = $(".btnDel");
            var $targetWrap = $target_tmp.closest('div');
            var schInp = $target_tmp.siblings('input');
            var inpClassNm = 'SchWrite';
            var hotlIdarry = $("#hotlIdArr").val();
            // oks 2019-10-18
            if ($('body').hasClass('mainBody')) {
                schInp.val('');
            }
            $targetWrap.removeClass(inpClassNm);

        },
        /* 호텔 검색어 영역 값 설정 */
        _setHtSchInp: function () {
            if (this.oSelHotel.length > 0) {
                var htNm = this.oSelHotel[0];
                this.$htInp.val(htNm);
            }
        },
        _onMousedownExternalHtSearch: function (e) {
            if (!$('.htSearch').is(':visible')) {
                return;
            }

            var $target = $(e.target);

            var isInHtSearchLayer = ($target.closest('.htSearch').length === 0) ? false : true;
            var isInHtSearchBtn = ($target.closest('.htSch').length === 0) ? false : true;

            if (!isInHtSearchLayer && !isInHtSearchBtn) {
                this._onClickHideHtSearch();
            }

            // oks 2019-10-14 원복 후 추가 
            var $target_tmp = $(".btnDel");
            var $targetWrap = $target_tmp.closest('div');
            var schInp = $target_tmp.siblings('input');
            var inpClassNm = 'SchWrite';
            var hotlIdarry = $("#hotlIdArr").val();
            //if((schInp.val() != '') && (hotlIdarry == "")){	// 조정 필요함
            if ((hotlIdarry == "")) {

                var $chTypeInp = this.$htSearch.find('.ckType li > a');
                this.$btnHtMore.hide();
                this.$ckList.html('');
                this.$moreHt.html('');

                this.oSelHotel = [];
                $chTypeInp.removeClass('on');

                if (this.hotelSlideData !== undefined) {
                    var slideCnt = this.hotelSlideData.count;
                    var oSelf = this;
                    for (var i = 0; i < slideCnt; i++) {
                        oSelf.hotelSlideData.removeSlide(0);
                    }

                    this.hotelSlideData.vars.animationSpeed = 0;
                    this.hotelSlideData.flexAnimate(0);
                    this.hotelSlideData.vars.animationSpeed = 600;
                }
            }

        },
        _onClickSelhotel: function (e) {
            e.preventDefault();
            var $target = $(e.currentTarget);
            var $ckType = $target.closest('.ckType');
            var $targetWrap = $target.closest('li');
            var hotelTitle = $targetWrap.attr('data-hotelTitle');
            var selIdx = -1;

            if ($ckType.attr('data-maxSelCnt') === undefined) {
                this._setMaxSelCnt();
            }
            var cnt = 0;
            this.oSelHotel.forEach(function (element) {
                if (element === hotelTitle) {
                    selIdx = cnt;
                }
                cnt++;
            });

            var isSelHotel = (selIdx < 0 ? true : false);
            if (isSelHotel) {
                //호텔 선택               
                if (this.oSelHotel.length >= this.maxSelCnt) {
                    var mag = messages["javascript.alert.hotel.select"]; //호텔은 최대 ' + this.maxSelCnt + '개 까지 선택 가능합니다.
                    mag = mag.replace('{0}', this.maxSelCnt);
                    alert(mag);
                    $target.removeClass('on');
                    return;
                }

                this._drawHotelSlide($target);

            } else {
                // 호텔 선택 해제
                this.oSelHotel.splice(selIdx, 1);
                this.hotelSlideData.removeSlide(selIdx);

                if (this.oSelHotel.length === 0) {
                    this.$viewHotelSlideWrap.remove();
                    this.$viewHotelSlideWrap.removeData('flexslider');
                    this.hotelSlideData = undefined;

                    //검색어 초기화
                    $("#searchBarKeyword").val("");
                } else {
                    this.hotelSlideData.vars.animationSpeed = 0;
                    this.hotelSlideData.flexAnimate(this.oSelHotel.length - 1);
                    this.hotelSlideData.vars.animationSpeed = 600;
                }

                //좌우 버튼 숨김
                if (this.oSelHotel.length < 2) {
                    this.$prevBtn.hide();
                    this.$nextBtn.hide();
                }
            }

            this._drawCkList();
            this._drawMoreHt();
        },
        _drawHotelSlide: function ($target) {
            // 호텔 정보 리스트(.slideBox .flexslider) 슬라이드 추가/삭제
            var $targetWrap = $target.closest('li');
            var hotelImg = $targetWrap.attr('data-imgUrl');
            var hotelTitle = $targetWrap.attr('data-hotelTitle');
            var hotelAddr = $targetWrap.attr('data-addr');
            var slideHotel = '';

            this.oSelHotel.push(hotelTitle);

            slideHotel += '<li>';
            slideHotel += '<img src="' + hotelImg + '" alt="hotel image">';
            slideHotel += '<div class="hotelInfo">';
            slideHotel += '<strong>' + hotelTitle + '</strong>';
            slideHotel += '<span class="adr">' + hotelAddr + '</span>';
            slideHotel += '</div>';
            slideHotel += '</li>';

            if (this.oSelHotel.length === 1) {
                var slideWrap = '<div class="flexslider">';
                slideWrap += '<ul class="slides">';
                slideWrap += slideHotel;
                slideWrap += '</ul>';
                slideWrap += '</div>';

                this.$viewHotelSlideWrap.remove();
                this.$viewHotelSlideWrap.removeData('flexslider');
                this.hotelSlideData = undefined;

                $('.ckHotel .slideBox').append(slideWrap);

                //flexSlide 플러그인 호출
                this.$viewHotelSlideWrap = this.$htSearch.find('.flexslider');
                this._setPluginSlide();

            } else {
                this.hotelSlideData.addSlide(slideHotel);
                this.hotelSlideData.flexAnimate(this.oSelHotel.length - 1);
            }
        },
        _onClickNavBtn: function (e) {
            e.preventDefault();

            var $target = $(e.currentTarget);

            if (this.hotelSlideData === undefined) {
                return;
            }

            var curIdx = this.hotelSlideData.currentSlide;

            if ($target.hasClass('ad-next')) {
                curIdx++;
            } else {
                curIdx--;
            }

            this.hotelSlideData.flexAnimate(curIdx);
        },
        _setDirectionNav: function (_slideIdx) {
            //화살표 제어            

            if (this.hotelSlideData === undefined) {
                return;
            }

            var curSlideIdx = _slideIdx;
            var totSlideCnt = this.hotelSlideData.count;

            this.$prevBtn.hide();
            this.$nextBtn.hide();

            if (this.hotelSlideData.count >= 2) {

                if (curSlideIdx > 0) {
                    this.$prevBtn.show();
                }

                if (curSlideIdx < totSlideCnt - 1) {
                    this.$nextBtn.show();
                }
            }

        },
        _setPageNation: function (_curIdx) {
            this.$ckList.find('li').removeClass('on');
            this.$ckList.find('li').eq(_curIdx).addClass('on');
        },
        _drawCkList: function () {
            // 클릭 리스트(.ckList) 설정
            var oSelf = this;
            var oSelHotelCnt = this.oSelHotel.length;
            var html = '';

            this.$ckList.find('li').removeClass('on');

            if (oSelHotelCnt >= 2) {
                for (var i = 0; i < oSelHotelCnt; i++) {
                    html += '<li><a href="#">' + oSelf.oSelHotel[i] + '</a></li>';
                }
            }

            this.$ckList.html(html);

            if (this.hotelSlideData) {
                var slideIdx = this.hotelSlideData.currentSlide;
                this.$ckList.find('li').eq(slideIdx).addClass('on');
            }
        },
        _drawMoreHt: function () {
            // 다중 선택한 호텔 더 보기(.btnHtMore) 설정
            var oSelf = this;
            var oSelHotelCnt = this.oSelHotel.length;
            var html = '';

            if (oSelHotelCnt >= 2) {
                this.$btnHtMore.show();
            } else {
                this.$btnHtMore.hide();
            }

            this.$btnHtMore.find('span').eq(0).text('+' + (oSelHotelCnt - 1));

            for (var i = 0; i < oSelHotelCnt; i++) {
                html += '<span>' + oSelf.oSelHotel[i] + '</span>';
            }
            this.$moreHt.html(html);
        },
        _onClickBtnClear: function (e) {
            e.preventDefault();
            var $chTypeInp = this.$htSearch.find('.ckType li > a');
            this.$btnHtMore.hide();
            this.$ckList.html('');
            this.$moreHt.html('');

            this.oSelHotel = [];
            $chTypeInp.removeClass('on');

            if (this.hotelSlideData !== undefined) {
                var slideCnt = this.hotelSlideData.count;
                var oSelf = this;
                for (var i = 0; i < slideCnt; i++) {
                    oSelf.hotelSlideData.removeSlide(0);
                }

                this.hotelSlideData.vars.animationSpeed = 0;
                this.hotelSlideData.flexAnimate(0);
                this.hotelSlideData.vars.animationSpeed = 600;
            }
        },
        _onClickHtTab: function (e) {
            e.preventDefault();

            var $target = $(e.currentTarget);
            var $tabEl = $target.parent();
            var $resetBtn = $('.htSearch .btnClear');

            $tabEl.addClass('on');
            $tabEl.siblings().removeClass('on');

            //스크롤 바 높이 재 설정
            this._resetScrollBarHeight();

            //이전 선택 값 초기화            
            $resetBtn.trigger('click.btnClear');
        },
        _onClickCkList: function (e) {
            e.preventDefault();
            var curIdx = $(e.currentTarget).parent().index();
            this.hotelSlideData.flexAnimate(curIdx);

            this._setPageNation(curIdx);

            var slideCnt = this.hotelSlideData.count;
            if (curIdx >= slideCnt) {
                curIdx = slideCnt - 1;
                this.$nextBtn.addClass('disabled');
            } else {
                this.$nextBtn.removeClass('disabled');
            }

            if (curIdx <= 0) {
                curIdx = 0;
                this.$prevBtn.addClass('disabled');
            } else {
                this.$prevBtn.removeClass('disabled');
            }
        },
        isData: function (isData) {
            var $htSearch = $('.htSearch');
            var $noData = $htSearch.find('.noData');
            var $htTabCon = $htSearch.find('.htTabCon');
            var $ckHotelInfo = $htSearch.find('.ckHotelInfo');
            var $btnSubmit = $htSearch.find('.btnSubmit');
            var $scroll = $htSearch.find('.scroll');
            var $btnClear = $htSearch.find('.btnClear');


            if (isData) {
                //데이터 있을 경우
                $noData.hide();
                $htTabCon.eq(0).show();
                $ckHotelInfo.show();
                $btnSubmit.removeClass('disabled');
                $btnClear.show();

                //스크롤 바 높이 재 설정
                this._resetScrollBarHeight();

            } else {
                //데이터 없을 경우
                $noData.show();
                $htTabCon.hide();
                $ckHotelInfo.hide();
                $btnSubmit.addClass('disabled');
                $btnClear.hide();
                if ($scroll.data('jsp')) {
                    $scroll.data('jsp').destroy();
                }
            }
        },
        _resetScrollBarHeight: function () {
            var $scroll = this.$htSearch.find('.scroll');
            var scrollH = $scroll.outerHeight();
            var scrollContH = this.$htSearch.find('.scrollCont').outerHeight();

            if (scrollH > scrollContH) {
                if ($scroll.data('jsp')) {
                    $scroll.data('jsp').destroy();
                }
            } else {
                ns.formEvent.scrollBarJs.resizeScrollBar();
            }
        },
        /* 호텔 선택 설정 */
        drawSelHtData: function (oHtList) {
            if (oHtList === undefined || oHtList === "") {
                return;
            }

            //초기화
            this.init();

            var oSelHtList = oHtList.split(",");
            var oSelf = this;
            var isShowLayer = false;
            var $htSearch = $('.ly_reserve.htSearch');

            if ($htSearch.is(':visible')) {
                isShowLayer = true;
            }
            $htSearch.show();
            var htTitle;
            var $target;
            for (var i = 0; i < oSelHtList.length; i++) {
                htTitle = oSelHtList[i];
                $target = $('.htData li[data-hotelTitle="' + htTitle + '"]').eq(0);
                oSelf._drawHotelSlide($target);
            }
            this._drawCkList();
            this._drawMoreHt();

            if (this.hotelSlideData) {
                this.hotelSlideData.flexAnimate(0);
            }

            this._setHtSchInp();
            if (!isShowLayer) {
                $htSearch.hide();
            }
        }
    };

    //flex 슬라이드
    ns.flexslider = {
        roomRelation: function (_$target) {
            var $roomRelationSlide = _$target;
            if ($roomRelationSlide.length === 0) {
                return;
            }

            $roomRelationSlide.flexslider({
                animation: "slide",
                animationLoop: false, //자동재생
                directionNav: true,
                slideshow: false,
                prevText: 'prev',
                nextText: 'next'
            });

        }

    };


    return ns;
}(pc, jQuery));
// oks2019-10-14



/*!
 * jScrollPane - v2.0.22 - 2015-04-25
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) { a.fn.jScrollPane = function (b) { function c(b, c) { function d(c) { var f, h, j, k, l, o, p = !1, q = !1; if (N = c, void 0 === O) l = b.scrollTop(), o = b.scrollLeft(), b.css({ overflow: "hidden", padding: 0 }), P = b.innerWidth() + ra, Q = b.innerHeight(), b.width(P), O = a('<div class="jspPane">').css("padding", qa).append(b.children()), R = a('<div class="jspContainer">').css({ width: P + "px", height: Q + "px" }).append(O).appendTo(b); else { if (b.css("width", ""), p = N.stickToBottom && A(), q = N.stickToRight && B(), k = b.innerWidth() + ra != P || b.outerHeight() != Q, k && (P = b.innerWidth() + ra, Q = b.innerHeight(), R.css({ width: P + "px", height: Q + "px" })), !k && sa == S && O.outerHeight() == T) return void b.width(P); sa = S, O.css("width", ""), b.width(P), R.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end() } O.css("overflow", "auto"), S = c.contentWidth ? c.contentWidth : O[0].scrollWidth, T = O[0].scrollHeight, O.css("overflow", ""), U = S / P, V = T / Q, W = V > 1, X = U > 1, X || W ? (b.addClass("jspScrollable"), f = N.maintainPosition && ($ || ba), f && (h = y(), j = z()), e(), g(), i(), f && (w(q ? S - P : h, !1), v(p ? T - Q : j, !1)), F(), C(), L(), N.enableKeyboardNavigation && H(), N.clickOnTrack && m(), J(), N.hijackInternalLinks && K()) : (b.removeClass("jspScrollable"), O.css({ top: 0, left: 0, width: R.width() - ra }), D(), G(), I(), n()), N.autoReinitialise && !pa ? pa = setInterval(function () { d(N) }, N.autoReinitialiseDelay) : !N.autoReinitialise && pa && clearInterval(pa), l && b.scrollTop(0) && v(l, !1), o && b.scrollLeft(0) && w(o, !1), b.trigger("jsp-initialised", [X || W]) } function e() { W && (R.append(a('<div class="jspVerticalBar">').append(a('<div class="jspCap jspCapTop">'), a('<div class="jspTrack">').append(a('<div class="jspDrag">').append(a('<div class="jspDragTop">'), a('<div class="jspDragBottom">'))), a('<div class="jspCap jspCapBottom">'))), ca = R.find(">.jspVerticalBar"), da = ca.find(">.jspTrack"), Y = da.find(">.jspDrag"), N.showArrows && (ha = a('<a class="jspArrow jspArrowUp">').bind("mousedown.jsp", k(0, -1)).bind("click.jsp", E), ia = a('<a class="jspArrow jspArrowDown">').bind("mousedown.jsp", k(0, 1)).bind("click.jsp", E), N.arrowScrollOnHover && (ha.bind("mouseover.jsp", k(0, -1, ha)), ia.bind("mouseover.jsp", k(0, 1, ia))), j(da, N.verticalArrowPositions, ha, ia)), fa = Q, R.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () { fa -= a(this).outerHeight() }), Y.hover(function () { Y.addClass("jspHover") }, function () { Y.removeClass("jspHover") }).bind("mousedown.jsp", function (b) { a("html").bind("dragstart.jsp selectstart.jsp", E), Y.addClass("jspActive"); var c = b.pageY - Y.position().top; return a("html").bind("mousemove.jsp", function (a) { p(a.pageY - c, !1) }).bind("mouseup.jsp mouseleave.jsp", o), !1 }), f()) } function f() { da.height(fa + "px"), $ = 0, ea = N.verticalGutter + da.outerWidth(), O.width(P - ea - ra); try { 0 === ca.position().left && O.css("margin-left", ea + "px") } catch (a) { } } function g() { X && (R.append(a('<div class="jspHorizontalBar">').append(a('<div class="jspCap jspCapLeft">'), a('<div class="jspTrack">').append(a('<div class="jspDrag">').append(a('<div class="jspDragLeft">'), a('<div class="jspDragRight">'))), a('<div class="jspCap jspCapRight">'))), ja = R.find(">.jspHorizontalBar"), ka = ja.find(">.jspTrack"), _ = ka.find(">.jspDrag"), N.showArrows && (na = a('<a class="jspArrow jspArrowLeft">').bind("mousedown.jsp", k(-1, 0)).bind("click.jsp", E), oa = a('<a class="jspArrow jspArrowRight">').bind("mousedown.jsp", k(1, 0)).bind("click.jsp", E), N.arrowScrollOnHover && (na.bind("mouseover.jsp", k(-1, 0, na)), oa.bind("mouseover.jsp", k(1, 0, oa))), j(ka, N.horizontalArrowPositions, na, oa)), _.hover(function () { _.addClass("jspHover") }, function () { _.removeClass("jspHover") }).bind("mousedown.jsp", function (b) { a("html").bind("dragstart.jsp selectstart.jsp", E), _.addClass("jspActive"); var c = b.pageX - _.position().left; return a("html").bind("mousemove.jsp", function (a) { r(a.pageX - c, !1) }).bind("mouseup.jsp mouseleave.jsp", o), !1 }), la = R.innerWidth(), h()) } function h() { R.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () { la -= a(this).outerWidth() }), ka.width(la + "px"), ba = 0 } function i() { if (X && W) { var b = ka.outerHeight(), c = da.outerWidth(); fa -= b, a(ja).find(">.jspCap:visible,>.jspArrow").each(function () { la += a(this).outerWidth() }), la -= c, Q -= c, P -= b, ka.parent().append(a('<div class="jspCorner">').css("width", b + "px")), f(), h() } X && O.width(R.outerWidth() - ra + "px"), T = O.outerHeight(), V = T / Q, X && (ma = Math.ceil(1 / U * la), ma > N.horizontalDragMaxWidth ? ma = N.horizontalDragMaxWidth : ma < N.horizontalDragMinWidth && (ma = N.horizontalDragMinWidth), _.width(ma + "px"), aa = la - ma, s(ba)), W && (ga = Math.ceil(1 / V * fa), ga > N.verticalDragMaxHeight ? ga = N.verticalDragMaxHeight : ga < N.verticalDragMinHeight && (ga = N.verticalDragMinHeight), Y.height(ga + "px"), Z = fa - ga, q($)) } function j(a, b, c, d) { var e, f = "before", g = "after"; "os" == b && (b = /Mac/.test(navigator.platform) ? "after" : "split"), b == f ? g = b : b == g && (f = b, e = c, c = d, d = e), a[f](c)[g](d) } function k(a, b, c) { return function () { return l(a, b, this, c), this.blur(), !1 } } function l(b, c, d, e) { d = a(d).addClass("jspActive"); var f, g, h = !0, i = function () { 0 !== b && ta.scrollByX(b * N.arrowButtonSpeed), 0 !== c && ta.scrollByY(c * N.arrowButtonSpeed), g = setTimeout(i, h ? N.initialDelay : N.arrowRepeatFreq), h = !1 }; i(), f = e ? "mouseout.jsp" : "mouseup.jsp", e = e || a("html"), e.bind(f, function () { d.removeClass("jspActive"), g && clearTimeout(g), g = null, e.unbind(f) }) } function m() { n(), W && da.bind("mousedown.jsp", function (b) { if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) { var c, d = a(this), e = d.offset(), f = b.pageY - e.top - $, g = !0, h = function () { var a = d.offset(), e = b.pageY - a.top - ga / 2, j = Q * N.scrollPagePercent, k = Z * j / (T - Q); if (0 > f) $ - k > e ? ta.scrollByY(-j) : p(e); else { if (!(f > 0)) return void i(); e > $ + k ? ta.scrollByY(j) : p(e) } c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq), g = !1 }, i = function () { c && clearTimeout(c), c = null, a(document).unbind("mouseup.jsp", i) }; return h(), a(document).bind("mouseup.jsp", i), !1 } }), X && ka.bind("mousedown.jsp", function (b) { if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) { var c, d = a(this), e = d.offset(), f = b.pageX - e.left - ba, g = !0, h = function () { var a = d.offset(), e = b.pageX - a.left - ma / 2, j = P * N.scrollPagePercent, k = aa * j / (S - P); if (0 > f) ba - k > e ? ta.scrollByX(-j) : r(e); else { if (!(f > 0)) return void i(); e > ba + k ? ta.scrollByX(j) : r(e) } c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq), g = !1 }, i = function () { c && clearTimeout(c), c = null, a(document).unbind("mouseup.jsp", i) }; return h(), a(document).bind("mouseup.jsp", i), !1 } }) } function n() { ka && ka.unbind("mousedown.jsp"), da && da.unbind("mousedown.jsp") } function o() { a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), Y && Y.removeClass("jspActive"), _ && _.removeClass("jspActive") } function p(a, b) { W && (0 > a ? a = 0 : a > Z && (a = Z), void 0 === b && (b = N.animateScroll), b ? ta.animate(Y, "top", a, q) : (Y.css("top", a), q(a))) } function q(a) { void 0 === a && (a = Y.position().top), R.scrollTop(0), $ = a || 0; var c = 0 === $, d = $ == Z, e = a / Z, f = -e * (T - Q); (ua != c || wa != d) && (ua = c, wa = d, b.trigger("jsp-arrow-change", [ua, wa, va, xa])), t(c, d), O.css("top", f), b.trigger("jsp-scroll-y", [-f, c, d]).trigger("scroll") } function r(a, b) { X && (0 > a ? a = 0 : a > aa && (a = aa), void 0 === b && (b = N.animateScroll), b ? ta.animate(_, "left", a, s) : (_.css("left", a), s(a))) } function s(a) { void 0 === a && (a = _.position().left), R.scrollTop(0), ba = a || 0; var c = 0 === ba, d = ba == aa, e = a / aa, f = -e * (S - P); (va != c || xa != d) && (va = c, xa = d, b.trigger("jsp-arrow-change", [ua, wa, va, xa])), u(c, d), O.css("left", f), b.trigger("jsp-scroll-x", [-f, c, d]).trigger("scroll") } function t(a, b) { N.showArrows && (ha[a ? "addClass" : "removeClass"]("jspDisabled"), ia[b ? "addClass" : "removeClass"]("jspDisabled")) } function u(a, b) { N.showArrows && (na[a ? "addClass" : "removeClass"]("jspDisabled"), oa[b ? "addClass" : "removeClass"]("jspDisabled")) } function v(a, b) { var c = a / (T - Q); p(c * Z, b) } function w(a, b) { var c = a / (S - P); r(c * aa, b) } function x(b, c, d) { var e, f, g, h, i, j, k, l, m, n = 0, o = 0; try { e = a(b) } catch (p) { return } for (f = e.outerHeight(), g = e.outerWidth(), R.scrollTop(0), R.scrollLeft(0); !e.is(".jspPane");)if (n += e.position().top, o += e.position().left, e = e.offsetParent(), /^body|html$/i.test(e[0].nodeName)) return; h = z(), j = h + Q, h > n || c ? l = n - N.horizontalGutter : n + f > j && (l = n - Q + f + N.horizontalGutter), isNaN(l) || v(l, d), i = y(), k = i + P, i > o || c ? m = o - N.horizontalGutter : o + g > k && (m = o - P + g + N.horizontalGutter), isNaN(m) || w(m, d) } function y() { return -O.position().left } function z() { return -O.position().top } function A() { var a = T - Q; return a > 20 && a - z() < 10 } function B() { var a = S - P; return a > 20 && a - y() < 10 } function C() { R.unbind(za).bind(za, function (a, b, c, d) { ba || (ba = 0), $ || ($ = 0); var e = ba, f = $, g = a.deltaFactor || N.mouseWheelSpeed; return ta.scrollBy(c * g, -d * g, !1), e == ba && f == $ }) } function D() { R.unbind(za) } function E() { return !1 } function F() { O.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (a) { x(a.target, !1) }) } function G() { O.find(":input,a").unbind("focus.jsp") } function H() { function c() { var a = ba, b = $; switch (d) { case 40: ta.scrollByY(N.keyboardSpeed, !1); break; case 38: ta.scrollByY(-N.keyboardSpeed, !1); break; case 34: case 32: ta.scrollByY(Q * N.scrollPagePercent, !1); break; case 33: ta.scrollByY(-Q * N.scrollPagePercent, !1); break; case 39: ta.scrollByX(N.keyboardSpeed, !1); break; case 37: ta.scrollByX(-N.keyboardSpeed, !1) }return e = a != ba || b != $ } var d, e, f = []; X && f.push(ja[0]), W && f.push(ca[0]), O.bind("focus.jsp", function () { b.focus() }), b.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function (b) { if (b.target === this || f.length && a(b.target).closest(f).length) { var g = ba, h = $; switch (b.keyCode) { case 40: case 38: case 34: case 32: case 33: case 39: case 37: d = b.keyCode, c(); break; case 35: v(T - Q), d = null; break; case 36: v(0), d = null }return e = b.keyCode == d && g != ba || h != $, !e } }).bind("keypress.jsp", function (a) { return a.keyCode == d && c(), !e }), N.hideFocus ? (b.css("outline", "none"), "hideFocus" in R[0] && b.attr("hideFocus", !0)) : (b.css("outline", ""), "hideFocus" in R[0] && b.attr("hideFocus", !1)) } function I() { b.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"), O.unbind(".jsp") } function J() { if (location.hash && location.hash.length > 1) { var b, c, d = escape(location.hash.substr(1)); try { b = a("#" + d + ', a[name="' + d + '"]') } catch (e) { return } b.length && O.find(d) && (0 === R.scrollTop() ? c = setInterval(function () { R.scrollTop() > 0 && (x(b, !0), a(document).scrollTop(R.position().top), clearInterval(c)) }, 50) : (x(b, !0), a(document).scrollTop(R.position().top))) } } function K() { a(document.body).data("jspHijack") || (a(document.body).data("jspHijack", !0), a(document.body).delegate("a[href*=#]", "click", function (b) { var c, d, e, f, g, h, i = this.href.substr(0, this.href.indexOf("#")), j = location.href; if (-1 !== location.href.indexOf("#") && (j = location.href.substr(0, location.href.indexOf("#"))), i === j) { c = escape(this.href.substr(this.href.indexOf("#") + 1)); try { d = a("#" + c + ', a[name="' + c + '"]') } catch (k) { return } d.length && (e = d.closest(".jspScrollable"), f = e.data("jsp"), f.scrollToElement(d, !0), e[0].scrollIntoView && (g = a(window).scrollTop(), h = d.offset().top, (g > h || h > g + a(window).height()) && e[0].scrollIntoView()), b.preventDefault()) } })) } function L() { var a, b, c, d, e, f = !1; R.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function (g) { var h = g.originalEvent.touches[0]; a = y(), b = z(), c = h.pageX, d = h.pageY, e = !1, f = !0 }).bind("touchmove.jsp", function (g) { if (f) { var h = g.originalEvent.touches[0], i = ba, j = $; return ta.scrollTo(a + c - h.pageX, b + d - h.pageY), e = e || Math.abs(c - h.pageX) > 5 || Math.abs(d - h.pageY) > 5, i == ba && j == $ } }).bind("touchend.jsp", function (a) { f = !1 }).bind("click.jsp-touchclick", function (a) { return e ? (e = !1, !1) : void 0 }) } function M() { var a = z(), c = y(); b.removeClass("jspScrollable").unbind(".jsp"), O.unbind(".jsp"), b.replaceWith(ya.append(O.children())), ya.scrollTop(a), ya.scrollLeft(c), pa && clearInterval(pa) } var N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta = this, ua = !0, va = !0, wa = !1, xa = !1, ya = b.clone(!1, !1).empty(), za = a.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp"; "border-box" === b.css("box-sizing") ? (qa = 0, ra = 0) : (qa = b.css("paddingTop") + " " + b.css("paddingRight") + " " + b.css("paddingBottom") + " " + b.css("paddingLeft"), ra = (parseInt(b.css("paddingLeft"), 10) || 0) + (parseInt(b.css("paddingRight"), 10) || 0)), a.extend(ta, { reinitialise: function (b) { b = a.extend({}, N, b), d(b) }, scrollToElement: function (a, b, c) { x(a, b, c) }, scrollTo: function (a, b, c) { w(a, c), v(b, c) }, scrollToX: function (a, b) { w(a, b) }, scrollToY: function (a, b) { v(a, b) }, scrollToPercentX: function (a, b) { w(a * (S - P), b) }, scrollToPercentY: function (a, b) { v(a * (T - Q), b) }, scrollBy: function (a, b, c) { ta.scrollByX(a, c), ta.scrollByY(b, c) }, scrollByX: function (a, b) { var c = y() + Math[0 > a ? "floor" : "ceil"](a), d = c / (S - P); r(d * aa, b) }, scrollByY: function (a, b) { var c = z() + Math[0 > a ? "floor" : "ceil"](a), d = c / (T - Q); p(d * Z, b) }, positionDragX: function (a, b) { r(a, b) }, positionDragY: function (a, b) { p(a, b) }, animate: function (a, b, c, d) { var e = {}; e[b] = c, a.animate(e, { duration: N.animateDuration, easing: N.animateEase, queue: !1, step: d }) }, getContentPositionX: function () { return y() }, getContentPositionY: function () { return z() }, getContentWidth: function () { return S }, getContentHeight: function () { return T }, getPercentScrolledX: function () { return y() / (S - P) }, getPercentScrolledY: function () { return z() / (T - Q) }, getIsScrollableH: function () { return X }, getIsScrollableV: function () { return W }, getContentPane: function () { return O }, scrollToBottom: function (a) { p(Z, a) }, hijackInternalLinks: a.noop, destroy: function () { M() } }), d(c) } return b = a.extend({}, a.fn.jScrollPane.defaults, b), a.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () { b[this] = b[this] || b.speed }), this.each(function () { var d = a(this), e = d.data("jsp"); e ? e.reinitialise(b) : (a("script", d).filter('[type="text/javascript"],:not([type])').remove(), e = new c(d, b), d.data("jsp", e)) }) }, a.fn.jScrollPane.defaults = { showArrows: !1, maintainPosition: !0, stickToBottom: !1, stickToRight: !1, clickOnTrack: !0, autoReinitialise: !1, autoReinitialiseDelay: 500, verticalDragMinHeight: 0, verticalDragMaxHeight: 99999, horizontalDragMinWidth: 0, horizontalDragMaxWidth: 99999, contentWidth: void 0, animateScroll: !1, animateDuration: 300, animateEase: "linear", hijackInternalLinks: !1, verticalGutter: 4, horizontalGutter: 4, mouseWheelSpeed: 3, arrowButtonSpeed: 0, arrowRepeatFreq: 50, arrowScrollOnHover: !1, trackClickSpeed: 0, trackClickRepeatFreq: 70, verticalArrowPositions: "split", horizontalArrowPositions: "split", enableKeyboardNavigation: !0, hideFocus: !1, keyboardSpeed: 0, initialDelay: 300, speed: 30, scrollPagePercent: .8 } });



/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function ($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for (var i = types.length; i;) {
            $.event.fixHooks[types[--i]] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) { delta = orgEvent.wheelDelta / 120; }
        if (orgEvent.detail) { delta = -orgEvent.detail / 3; }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) { deltaY = orgEvent.wheelDeltaY / 120; }
        if (orgEvent.wheelDeltaX !== undefined) { deltaX = -1 * orgEvent.wheelDeltaX / 120; }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);