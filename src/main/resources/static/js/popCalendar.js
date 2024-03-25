
document.write("<div id='popCalendarDiv' class='popCalendar' style='display:none' ></div>");


function getDaysInMonth(year, month) {
  return [31,((!(year % 4 ) && ( (year % 100 ) || !( year % 400 ) ))?29:28),31,30,31,30,31,31,30,31,30,31][month-1];
}

function getDayOfWeek(year, month, day) {
  var date = new Date(year,month-1,day);
  return date.getDay();
}

this.clearDate = clearDate;
function clearDate() {
  dateField.value = '';
  hide();
}

 function getCurrentYear() {
  var year = new Date().getFullYear();
  if(year < 1900) year += 1900;
  return year;
}

function getCurrentMonth() {
  return new Date().getMonth() + 1;
} 

function getCurrentDay() {
  return new Date().getDate();
}

var thisYear = getCurrentYear();
var thisMonth = getCurrentMonth();
var thisDay = getCurrentDay();


var selectedYear = thisYear;
var selectedMonth = thisMonth;
var selectedDay = "";


function calendarDrawTable( calenderDivId , currentYear , currentMonth , currentDay ) {

	if(currentMonth == 0){
		currentYear = currentYear - 1;
		currentMonth = 12;
	}

	var lastMonth =  currentMonth;

	if(currentMonth == 12){
		lastMonth = 1; 
	}else{
		lastMonth = lastMonth + 1;
	}

	var dayOfMonth = 1;
	var validDay = 0;
	var startDayOfWeek = getDayOfWeek(currentYear, currentMonth, dayOfMonth);
	var daysInMonth = getDaysInMonth(currentYear, currentMonth);
	
	var months = [];
	months.push(messages["javascript.calendar.january"]);
	months.push(messages["javascript.calendar.february"]);
	months.push(messages["javascript.calendar.march"]);
	months.push(messages["javascript.calendar.april"]);
	months.push(messages["javascript.calendar.may"]);
	months.push(messages["javascript.calendar.june"]);
	months.push(messages["javascript.calendar.july"]);
	months.push(messages["javascript.calendar.august"]);
	months.push(messages["javascript.calendar.september"]);
	months.push(messages["javascript.calendar.october"]);
	months.push(messages["javascript.calendar.november"]);
	months.push(messages["javascript.calendar.december"]);

    var table = "	<div class='dateCtl'>";

	table = table + "	<div class='datePrev'><a class='btnPrev' href='javascript:calenderView(0,-1);' title='" + messages["javascript.calendar.pre.month.title"] + "'>&lt;</a></div>";
	table = table + "	<div class='dateNow'>"+currentYear+"."+months[currentMonth-1]+"</div>";
	table = table + "	<div class='dateNext'><a class='btnNext' href='javascript:calenderView(0,1);' title='" + messages["javascript.calendar.next.month.title"] + "'>"+" &gt;</a></div>";
	table = table + "	</div>";

    table = table + "	<table summary='" + messages["javascript.calendar.next.month.title"] + "'>";
    table = table + "	<caption>" + messages["javascript.calendar.table.caption"].replaceMsg([months[currentMonth-1]]) + "</caption>";
    table = table + "	<thead>";
    table = table + "		<tr>";
    table = table + "		<th scope='col' class='sun'><span>" + messages["javascript.calendar.table.col.sun"] + "</span></th>	";
    table = table + "		<th scope='col' class='mon'><span>" + messages["javascript.calendar.table.col.mon"] + "</span></th>";
    table = table + "		<th scope='col' class='tue'><span>" + messages["javascript.calendar.table.col.tue"] + "</span></th>";
    table = table + "		<th scope='col' class='wed'><span>" + messages["javascript.calendar.table.col.wed"] + "</span></th>";
    table = table + "		<th scope='col' class='thu'><span>" + messages["javascript.calendar.table.col.thu"] + "</span></th>";
    table = table + "		<th scope='col' class='fri'><span>" + messages["javascript.calendar.table.col.fri"] + "</span></th>";
    table = table + "		<th scope='col' class='sat'><span>" + messages["javascript.calendar.table.col.sat"] + "</span></th>";
    table = table + "	</tr>	";
    table = table + "	</thead>	";
    table = table + "	<tbody>	";
    
    for(var week=0; week < 6; week++) {
      table = table + "<tr>";
      for(var dayOfWeek=0; dayOfWeek < 7; dayOfWeek++) {
        if(week == 0 && startDayOfWeek == dayOfWeek) {
          validDay = 1;
        } else if (validDay == 1 && dayOfMonth > daysInMonth) {
          validDay = 0;
        }

        if(validDay) {
          

		  var viewMonth = currentMonth;
		  var viewDay = dayOfMonth;
		  
		  if(currentMonth < 10 && viewMonth.length == 1 ){
			viewMonth = "0"+currentMonth;
		  }
		  if(dayOfMonth < 10 && viewDay.length == 1 ){
			viewDay = "0"+dayOfMonth;
		  }

		  
		  if(thisYear == currentYear && thisMonth == viewMonth && thisDay == viewDay ){
	          table = table + "<td><span class='today' >";
		  }else{
	          table = table + "<td><span  >";
		  }
		  table = table + "<div id='count_"+currentYear+viewMonth+viewDay+"'></div>";
		  table = table + "<div id='"+currentYear+viewMonth+viewDay+"'>";
		  table = table + "<a title='" + currentYear + messages["javascript.calendar.year.title"] + viewMonth + messages["javascript.calendar.month.title"] + viewDay + messages["javascript.calendar.day.title"]+"' onclick='javascript:setCalendarControlDate("+currentYear+","+viewMonth+","+viewDay+");'  >"+viewDay+"</a>";
		  table = table + "</div>";
		  table = table + "</span></td>";
          dayOfMonth++;
        } else {
          table = table + "<td><span>&nbsp;</span></td>";
        }
      }
      table = table + "</tr>";
    }
    table = table + "</tbody>";


    table = table + "</table>";
    
    $("#"+calenderDivId).html(table);

  }

function calendarDrawTable2( calenderDivId , currentYear , currentMonth , currentDay, check ) {

	if(currentMonth == 0){
		currentYear = currentYear - 1;
		currentMonth = 12;
	}

	var lastMonth =  currentMonth;

	if(currentMonth == 12){
		lastMonth = 1; 
	}else{
		lastMonth = lastMonth + 1;
	}

	var dayOfMonth = 1;
	var validDay = 0;
	var startDayOfWeek = getDayOfWeek(currentYear, currentMonth, dayOfMonth);
	var daysInMonth = getDaysInMonth(currentYear, currentMonth);
	
	var months = [];
	months.push(messages["javascript.calendar.january"]);
	months.push(messages["javascript.calendar.february"]);
	months.push(messages["javascript.calendar.march"]);
	months.push(messages["javascript.calendar.april"]);
	months.push(messages["javascript.calendar.may"]);
	months.push(messages["javascript.calendar.june"]);
	months.push(messages["javascript.calendar.july"]);
	months.push(messages["javascript.calendar.august"]);
	months.push(messages["javascript.calendar.september"]);
	months.push(messages["javascript.calendar.october"]);
	months.push(messages["javascript.calendar.november"]);
	months.push(messages["javascript.calendar.december"]);

    var table = "	<div class='dateCtl'>";
    
    if (check == 0) {
    	table = table + "	<div class='dateNow'>"+currentYear+"."+months[currentMonth-1]+"</div>";
    	table = table + "	<div class='dateNext'><a class='btnNext' href='javascript:calenderView2(0,1);' title='" + messages["javascript.calendar.next.month.title"] + "'>"+" &gt;</a></div>";
	}
    if (check == 1) {
    	table = table + "	<div class='dateNow'>"+currentYear+"."+months[currentMonth-1]+"</div>";
    	table = table + "	<div class='dateNext'><a class='btnNext' href='javascript:calenderView2(0,1);' title='" + messages["javascript.calendar.next.month.title"] + "'>"+" &gt;</a></div>";
		
	}
    if (check == 2) {
    	table = table + "	<div class='datePrev'><a class='btnPrev' href='javascript:calenderView2(0,-1);' title='" + messages["javascript.calendar.pre.month.title"] + "'>&lt;</a></div>";
    	table = table + "	<div class='dateNow'>"+currentYear+"."+months[currentMonth-1]+"</div>";
		
	}
	table = table + "	</div>";

    table = table + "	<table summary='" + messages["javascript.calendar.next.month.title"] + "'>";
    table = table + "	<caption>" + messages["javascript.calendar.table.caption"].replaceMsg([months[currentMonth-1]]) + "</caption>";
    table = table + "	<thead>";
    table = table + "		<tr>";
    table = table + "		<th scope='col' class='sun'><span>" + messages["javascript.calendar.table.col.sun"] + "</span></th>	";
    table = table + "		<th scope='col' class='mon'><span>" + messages["javascript.calendar.table.col.mon"] + "</span></th>";
    table = table + "		<th scope='col' class='tue'><span>" + messages["javascript.calendar.table.col.tue"] + "</span></th>";
    table = table + "		<th scope='col' class='wed'><span>" + messages["javascript.calendar.table.col.wed"] + "</span></th>";
    table = table + "		<th scope='col' class='thu'><span>" + messages["javascript.calendar.table.col.thu"] + "</span></th>";
    table = table + "		<th scope='col' class='fri'><span>" + messages["javascript.calendar.table.col.fri"] + "</span></th>";
    table = table + "		<th scope='col' class='sat'><span>" + messages["javascript.calendar.table.col.sat"] + "</span></th>";
    table = table + "	</tr>	";
    table = table + "	</thead>	";
    table = table + "	<tbody>	";
    
    for(var week=0; week < 6; week++) {
      table = table + "<tr>";
      for(var dayOfWeek=0; dayOfWeek < 7; dayOfWeek++) {
        if(week == 0 && startDayOfWeek == dayOfWeek) {
          validDay = 1;
        } else if (validDay == 1 && dayOfMonth > daysInMonth) {
          validDay = 0;
        }

        if(validDay) {
          

		  var viewMonth = currentMonth;
		  var viewDay = dayOfMonth;
		  
		  if(currentMonth < 10 && viewMonth.length == 1 ){
			viewMonth = "0"+currentMonth;
		  }
		  if(dayOfMonth < 10 && viewDay.length == 1 ){
			viewDay = "0"+dayOfMonth;
		  }

		  
		  if(thisYear == currentYear && thisMonth == viewMonth && thisDay == viewDay ){
	          table = table + "<td><span class='today' >";
		  }else{
	          table = table + "<td><span  >";
		  }
		  table = table + "<div id='count_"+currentYear+viewMonth+viewDay+"'></div>";
		  table = table + "<div id='"+currentYear+viewMonth+viewDay+"'>";
		  table = table + "<a title='" + currentYear + messages["javascript.calendar.year.title"] + viewMonth + messages["javascript.calendar.month.title"] + viewDay + messages["javascript.calendar.day.title"]+"' onclick='javascript:setCalendarControlDate2("+currentYear+","+viewMonth+","+viewDay+");'  >"+viewDay+"</a>";
		  table = table + "</div>";
		  table = table + "</span></td>";
          dayOfMonth++;
        } else {
          table = table + "<td><span>&nbsp;</span></td>";
        }
      }
      table = table + "</tr>";
    }
    table = table + "</tbody>";


    table = table + "</table>";
    
    $("#"+calenderDivId).html(table);

  }
  

function calenderView( yearMovieNum , monthMovieNum ){

		if (yearMovieNum == 0 && monthMovieNum == 0) {
		  selectedYear = thisYear;
		  selectedMonth = thisMonth;
		  selectedDay = thisDay;
		}else{
			
		  selectedYear = new Date(selectedYear+yearMovieNum,selectedMonth+monthMovieNum,1).getFullYear();
		  selectedMonth = new Date(selectedYear+yearMovieNum,selectedMonth+monthMovieNum,1).getMonth();
		  selectedDay = new Date(selectedYear+yearMovieNum,selectedMonth+monthMovieNum,1).getDate();
		}

	calendarDrawTable( "popCalendarDiv" , selectedYear,selectedMonth,1);
	
}

function calenderView2( yearMovieNum , monthMovieNum ){

	var check = 1;
	if (yearMovieNum == 0 && monthMovieNum == -1) {
		check = check - 1;
	}
	if (yearMovieNum == 0 && monthMovieNum == 1) {
		check = check + 1;
	}
	
	if (yearMovieNum == 0 && monthMovieNum == 0) {
	  selectedYear = thisYear;
	  selectedMonth = thisMonth;
	  selectedDay = thisDay;
	}else{
		
	  selectedYear = new Date(selectedYear+yearMovieNum,selectedMonth+monthMovieNum,1).getFullYear();
	  selectedMonth = new Date(selectedYear+yearMovieNum,selectedMonth+monthMovieNum,1).getMonth();
	  selectedDay = new Date(selectedYear+yearMovieNum,selectedMonth+monthMovieNum,1).getDate();
	}

calendarDrawTable2( "popCalendarDiv" , selectedYear,selectedMonth,1,check);

}

var DATE_ID = "";
function popCalendarLayer(dateId , today){
	DATE_ID = dateId;
	calenderView(  "0" , "0");
	var p = $("#"+dateId);
	var offset = p.offset();
	$("#popCalendarDiv").attr("style","z-Index:99999;display:;left:"+offset.left+"px; top:"+(offset.top+25)+"px;");
}
function popCalendarLayer2(dateId , today){
	DATE_ID = dateId;
	calenderView2(  "0" , "0");
	var p = $("#"+dateId);
	var offset = p.offset();
	$("#popCalendarDiv").attr("style","z-Index:99999;display:;left:"+offset.left+"px; top:"+(offset.top+25)+"px;");
}
function setCalendarControlDate(yyyy,mm,dd){
	  if(mm < 10){
		  mm = "0"+mm;
	  }
	  if(dd < 10){
		  dd = "0"+dd;
	  }
	  $("#"+DATE_ID).val(yyyy+"-"+mm+"-"+dd);
	  
	  $("#popCalendarDiv").attr("style","z-Index:99999;display:none;");
}

function setCalendarControlDate2(yyyy,mm,dd){

	  var i;
	  var sel_obj = document.getElementById("revTime1");
	  for(i = 1; i < sel_obj.options.length; i++) sel_obj.options[i] = null;
	    sel_obj.options.length = 1;
	    
	  sel_obj = document.getElementById("revNum");
	  for(i = 1; i < sel_obj.options.length; i++) sel_obj.options[i] = null;
	  sel_obj.options.length = 1;

	var day1 = new Date('2020-09-30');
	var day2 = new Date('2020-10-01');
	var day3 = new Date('2020-10-02');
	var day4 = new Date('2020-10-09');
//	var day5 = new Date('2020-04-30');
//	var day6 = new Date('2020-05-01');
//	var day7 = new Date('2020-05-05');
//	var day8 = new Date('2020-05-08');

	var soldOutDay1 = new Date('2021-01-01');
	var soldOutDay2 = new Date('2021-01-23');
	var soldOutDay3 = new Date('2021-01-30');
	var soldOutDay4 = new Date('2020-11-21');
	var soldOutDay5 = new Date('2020-12-05');
	var soldOutDay6 = new Date('2020-12-06');
	var soldOutDay7 = new Date('2020-12-12');
	var soldOutDay8 = new Date('2020-12-24');
	var soldOutDay9 = new Date('2020-12-25');
	var soldOutDay10 = new Date('2020-12-13');
	var soldOutDay11 = new Date('2020-12-19');
	var soldOutDay12 = new Date('2020-12-20');
	var soldOutDay13 = new Date('2020-12-26');
	var soldOutDay14 = new Date('2020-12-27');

	var endDate =  new Date('2020-12-31'); //매월 반영때 수정하기
	var lastDate = new Date('2021-01-31'); //매월 반영때 수정하기
	
	var resultCd;
	
	if(mm < 10){
		mm = "0"+mm;
	}
	if(dd < 10){
		dd = "0"+dd;
	}

	var temp = yyyy+"-"+mm+"-"+dd;
	var selectedDt = new Date(temp);
    var sdayLabel = selectedDt.getDay();
    
    var nowDate = new Date();
    var addDate = nowDate.getTime() + (5 * 24 * 60 * 60 * 1000); // 5일후
    nowDate.setTime(addDate);
    
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    var date = nowDate.getDate();
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    
    var today = year + "-" + month + "-" + date;
    var todayStr = new Date(today);

	if (lastDate < selectedDt || selectedDt < todayStr) {
		alert('예약 가능 일자가 아닙니다.');
	}else{
		
	    if (selectedDt - soldOutDay1 == 0 || selectedDt - soldOutDay2 == 0 ||
	    	selectedDt - soldOutDay3 == 0 || selectedDt - soldOutDay4 == 0 ||
	    	selectedDt - soldOutDay5 == 0 ||
	    	selectedDt - soldOutDay6 == 0 ||
	    	selectedDt - soldOutDay7 == 0 ||
	    	selectedDt - soldOutDay8 == 0 ||
	    	selectedDt - soldOutDay9 == 0 ||
	    	selectedDt - soldOutDay10 == 0 ||
	    	selectedDt - soldOutDay11 == 0 ||
	    	selectedDt - soldOutDay12 == 0 ||
	    	selectedDt - soldOutDay13 == 0 ||
	    	selectedDt - soldOutDay14 == 0
	    	) {
			alert('선택하신 날짜는 온라인 예약이 마감되어 전화 예약만 가능합니다.');
		}else{
			
			if (selectedDt <= endDate) { 	/////////////////////////// 12월
				
				// 12월 기본포멧아님 : 12월 예약 : 평일/금요일 3타임, 주말 4타임      기본포멧 : 평일2타임,금요일3타임,주말4타임
				// 예약마감 : 12월 5일, 6일, 12일, 24일, 25일			
				if (sdayLabel == 0 || sdayLabel == 6){
					resultCd = "ecpWeekend"; //주말
				}else if (sdayLabel == 5) {
					resultCd = "ecpWeek"; //금요일
				}else{
					resultCd = "ecpWeek"; //평일도 금요일처럼
				}
				
				// 빨간날
				//if (selectedDt - day2 == 0 || selectedDt - day3 == 0 || selectedDt - day4 == 0) {
				//	resultCd = "ecpWeekend"; //주말
				//}
				
			}else{  /////////////////////////// 1월
				
				// 1월 기본포멧아님 : 1월 예약 : 평일/금요일 3타임, 주말 4타임      기본포멧 : 평일2타임,금요일3타임,주말4타임
				// 예약마감 : 1월 1일, 1월 23일, 1월 30일		
				if (sdayLabel == 0 || sdayLabel == 6){
					resultCd = "ecpWeekend"; //주말
				}else if (sdayLabel == 5) {
					resultCd = "ecpWeek"; //금요일
				}else{
					resultCd = "ecpWeek"; //평일도 금요일처럼
				}
				
				// 빨간날
				//if (selectedDt - day2 == 0 || selectedDt - day3 == 0 || selectedDt - day4 == 0) {
				//	resultCd = "ecpWeekend"; //주말
				//}

			}
		
			$.ajax({
				  url: '/seoul/dining/checkAvailResv.do',
				  cache : false,
				  type: "POST",
				  dataType: "json",
				  data: { 'selectedDt' : temp, 'resultCd' : resultCd }
				}).done(function(result) {
					var check=result.model.check;
					if(check == "all"){ //모두 예약가능
						if (resultCd == "weekDay") {					
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="12:00 ~ 14:30" value="12:00 ~ 14:30">12:00 ~ 14:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="18:00 ~ 21:30" value="18:00 ~ 21:30">18:00 ~ 21:30</option>');
						}else if(resultCd == "ecpWeek"){					
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="12:00 ~ 14:30" value="12:00 ~ 14:30">12:00 ~ 14:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:30 ~ 19:30" value="17:30 ~ 19:30">17:30 ~ 19:30</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="20:00 ~ 22:00" value="20:00 ~ 22:00">20:00 ~ 22:00</option>');	
						}else if(resultCd == "friday"){
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="12:00 ~ 14:30" value="12:00 ~ 14:30">12:00 ~ 14:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:30 ~ 19:30" value="17:30 ~ 19:30">17:30 ~ 19:30</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="20:00 ~ 22:00" value="20:00 ~ 22:00">20:00 ~ 22:00</option>');
						}else if(resultCd == "weekend"){
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="11:30 ~ 13:30" value="11:30 ~ 13:30">11:30 ~ 13:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="14:00 ~ 16:00" value="14:00 ~ 16:00">14:00 ~ 16:00</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:00 ~ 19:00" value="17:00 ~ 19:00">17:00 ~ 19:00</option>');
							$("#revTime1").append('<option id="result3" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="19:30 ~ 21:30" value="19:30 ~ 21:30">19:30 ~ 21:30</option>');		
						}else if(resultCd == "ecpWeekend"){
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="11:00 ~ 13:00" value="11:00 ~ 13:00">11:00 ~ 13:00</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="14:00 ~ 16:00" value="14:00 ~ 16:00">14:00 ~ 16:00</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:00 ~ 19:00" value="17:00 ~ 19:00">17:00 ~ 19:00</option>');
							$("#revTime1").append('<option id="result3" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="19:30 ~ 21:30" value="19:30 ~ 21:30">19:30 ~ 21:30</option>');		
						}	
						
					}else if (check == "full") {
						alert('선택하신 날짜는 온라인 예약이 마감되어 전화 예약만 가능합니다.');
					}else{
						if (resultCd == "weekDay") {	
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="12:00 ~ 14:30" value="12:00 ~ 14:30">12:00 ~ 14:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="18:00 ~ 21:30" value="18:00 ~ 21:30">18:00 ~ 21:30</option>');
						}else if(resultCd == "ecpWeek"){					
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="12:00 ~ 14:30" value="12:00 ~ 14:30">12:00 ~ 14:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:30 ~ 19:30" value="17:30 ~ 19:30">17:30 ~ 19:30</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="20:00 ~ 22:00" value="20:00 ~ 22:00">20:00 ~ 22:00</option>');	
						}else if(resultCd == "friday"){
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="12:00 ~ 14:30" value="12:00 ~ 14:30">12:00 ~ 14:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:30 ~ 19:30" value="17:30 ~ 19:30">17:30 ~ 19:30</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="20:00 ~ 22:00" value="20:00 ~ 22:00">20:00 ~ 22:00</option>');
						}else if(resultCd == "weekend"){
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="11:30 ~ 13:30" value="11:30 ~ 13:30">11:30 ~ 13:30</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="14:00 ~ 16:00" value="14:00 ~ 16:00">14:00 ~ 16:00</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:00 ~ 19:00" value="17:00 ~ 19:00">17:00 ~ 19:00</option>');
							$("#revTime1").append('<option id="result3" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="19:30 ~ 21:30" value="19:30 ~ 21:30">19:30 ~ 21:30</option>');	
						}else if(resultCd == "ecpWeekend"){
							$("#revTime1").append('<option id="result0" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="11:00 ~ 13:00" value="11:00 ~ 13:00">11:00 ~ 13:00</option>');
							$("#revTime1").append('<option id="result1" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="14:00 ~ 16:00" value="14:00 ~ 16:00">14:00 ~ 16:00</option>');
							$("#revTime1").append('<option id="result2" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="17:00 ~ 19:00" value="17:00 ~ 19:00">17:00 ~ 19:00</option>');
							$("#revTime1").append('<option id="result3" person2="1" person3="1" person4="1" person5="1" person6="1" person8="1" title="19:30 ~ 21:30" value="19:30 ~ 21:30">19:30 ~ 21:30</option>');	
						}
						var revTime1Size = $("#revTime1 option").size();
						for ( var i = 0; i < result.model.goJspVOList.length; i++) {
							for(var j = 0; j < revTime1Size; j++){
							if($("#revTime1 option:eq("+j+")").val() == result.model.goJspVOList[i].askTxt){
							makeOption(i,j,result);
							}
							}								
						}
					}
					
				}).fail(function(jqXHR, textStatus) {
					  alert( "openFaciReq Request failed: " + textStatus );
				}); // end of ajax
			
			$("#revTime1 option:eq(0)").attr("selected", "selected");
			$("#revNum option:eq(0)").attr("selected", "selected");
			$("#uniform-revTime1 > span").text("시간을 선택해 주세요.");
			$("#uniform-revNum > span").text("인원을 선택해 주세요.");
		
			  $("#"+DATE_ID).val(yyyy+"-"+mm+"-"+dd);
			  $("#popCalendarDiv").attr("style","z-Index:99999;display:none;");
			  
			}
	}

}

function makeOption(i,j,result){
	if (result.model.goJspVOList[i].perSons2Bol == 1 ||
			result.model.goJspVOList[i].perSons3Bol == 1 ||
			result.model.goJspVOList[i].perSons4Bol == 1 ||
			result.model.goJspVOList[i].perSons5Bol == 1 ||
			result.model.goJspVOList[i].perSons6Bol == 1 ||
			result.model.goJspVOList[i].perSons8Bol == 1) {
			if(result.model.goJspVOList[i].perSons2Bol==1) $("#revTime1 option:eq("+j+")").attr("person2","1");
			else  $("#revTime1 option:eq("+j+")").attr("person2","0");
			if(result.model.goJspVOList[i].perSons3Bol==1) $("#revTime1 option:eq("+j+")").attr("person3","1");
			else  $("#revTime1 option:eq("+j+")").attr("person3","0");
			if(result.model.goJspVOList[i].perSons4Bol==1) $("#revTime1 option:eq("+j+")").attr("person4","1");
			else  $("#revTime1 option:eq("+j+")").attr("person4","0");
			if(result.model.goJspVOList[i].perSons5Bol==1) $("#revTime1 option:eq("+j+")").attr("person5","1");
			else  $("#revTime1 option:eq("+j+")").attr("person5","0");
			if(result.model.goJspVOList[i].perSons6Bol==1) $("#revTime1 option:eq("+j+")").attr("person6","1");
			else $("#revTime1 option:eq("+j+")").attr("person6","0");
			if(result.model.goJspVOList[i].perSons8Bol==1) $("#revTime1 option:eq("+j+")").attr("person8","1");
			else  $("#revTime1 option:eq("+j+")").attr("person8","0");
		}else{
		  $("#revTime1 option:eq("+j+")").remove();

		}
}

function popCalendarLayerHide(){
	$("#popCalendarDiv").attr("style","z-Index:99999;display:none;");
}
