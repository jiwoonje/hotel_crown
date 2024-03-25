

//비밀번호 체크 
//비밀번호 생성시 2개 문자종류를 조합할 경우 최소 10자리 이상으로 비밀번호를 구성
function checkPass(obj) {
    var v = obj.val();
    if(v.length == 0) return false;

       
       //영문자가 있는지 체크 
       if (!/[a-zA-Z]/.test(v)) {
           //alert("비밀번호에 영문자가 반드시 한자 이상 포함되어야 합니다.");
           alert(messages["javascript.mbr.join.msg1"]);
           obj.select();
           return false;
       }
       //숫자가 있는지 체크
       if (!/[0-9]/.test(v)) {
           alert(messages["javascript.mbr.join.msg2"]);
           //alert("비밀번호에 숫자가 반드시 한자 이상 포함되어야 합니다.");
           obj.select();
           return false;
       }
       //10~20자의 비밀번호인지 체크
       if (v.length < 8 || v.length > 15){
           alert(messages["javascript.mbr.join.msg3"]);
           //alert("비밀번호는 8자 에서 15자 까지만 허용합니다.");
           obj.select();
           return false;
       }

       //연속적인 문자 입력 체크
       //checkChar(v);
       
       //연속적인 숫자 입력 체크
       if(!checkNumber(v)) return false;

       //아이디와 비슷한 비밀번호인지 체크
       if(!checkIdPwd(v)) return false;

       //생일과 비슷한 비밀번호인지 체크
       if(!checkIdBirth(v)) return false;

       //전화번호와 비슷한 비밀번호인지 체크
       if(!checkIPhone(v)) return false;

       return true;
       
}


function checkPassForn(obj) {
    var v = obj.val();
    if(v.length == 0) return false;

       
       //영문자가 있는지 체크 
       if (!/[a-zA-Z]/.test(v)) {
           alert(messages["javascript.mbr.join.msg1"]);
           //alert("비밀번호에 영문자가 반드시 한자 이상 포함되어야 합니다.");
           obj.select();
           return false;
       }
       //숫자가 있는지 체크
       if (!/[0-9]/.test(v)) {
           alert(messages["javascript.mbr.join.msg2"]);
           //alert("비밀번호에 숫자가 반드시 한자 이상 포함되어야 합니다.");
           obj.select();
           return false;
       }
       //10~20자의 비밀번호인지 체크
       if (v.length < 8 || v.length > 15){
           alert(messages["javascript.mbr.join.msg3"]);
           //alert("비밀번호는 8자 에서 15자 까지만 허용합니다.");
           obj.select();
           return false;
       }

       //연속적인 문자 입력 체크
       //checkChar(v);
       
       //연속적인 숫자 입력 체크
       if(!checkNumber(v)) return false;

       //아이디와 비슷한 비밀번호인지 체크
       if(!checkIdPwd(v)) return false;

       //생일과 비슷한 비밀번호인지 체크
       if(!checkIdBirth(v)) return false;

       //전화번호와 비슷한 비밀번호인지 체크
       if(!checkIPhoneForn(v)) return false;

       return true;
       
}

   //연속적인 문자 입력 체크
   function checkChar(pw) {
       var qwerty  = "qwertyuiopasdfghjklzxcvbnm";
       var start   = 4 - 1; // 연속글자수 - 1
       var seq     = "_" + pw.slice(0, start);
       for (var i = start; i < pw.length; i++) {
           seq = seq.slice(1) + pw.charAt(i);
           if (qwerty.indexOf(seq) > -1) {
               alert(messages["javascript.mbr.join.msg4"]);
               //alert("연속적인 문자는 3자 까지만 허용합니다.");
               return false;
           }
       }
       return true;
   }

   
   //연속적인 숫자 입력 체크
   function checkNumber(pw) {
       var qwerty  = "01234567890123456789";
       var start   = 4 - 1; // 연속글자수 - 1
       var seq     = "_" + pw.slice(0, start);
       for (var i = start; i < pw.length; i++) {
           seq = seq.slice(1) + pw.charAt(i);
           if (qwerty.indexOf(seq) > -1) {
               alert(messages["javascript.mbr.join.msg5"]);
               //alert("연속적인 숫자는 3자 까지만 허용합니다.");
               return false;
           }
       }
       return true;
   }

   //아이디와 비슷한 비밀번호인지 체크
   function checkIdPwd(pw) {
       var qwerty  = $("#mbrId").val();
       var start   = 4 - 1; // 연속글자수 - 1
       var seq     = "_" + pw.slice(0, start);
       for (var i = start; i < pw.length; i++) {
           seq = seq.slice(1) + pw.charAt(i);
           if (qwerty.indexOf(seq) > -1) {
               alert(messages["javascript.mbr.join.msg6"]);
               $("#mbrPw").focus();
               //alert("아이디와 비슷한 비밀번호는 사용 할 수 없습니다.");
               return false;
           }
       }
       return true;
   }

   //생일과 비슷한 비밀번호인지 체크
   function checkIdBirth(pw) {
       var qwerty  = $("#birthYear").val()+$("#birthMonth").val()+$("#birthDay").val();
       var start   = 4 - 1; // 연속글자수 - 1
       var seq     = "_" + pw.slice(0, start);
       for (var i = start; i < pw.length; i++) {
           seq = seq.slice(1) + pw.charAt(i);
           if (qwerty.indexOf(seq) > -1) {
               alert(messages["javascript.mbr.join.msg7"]);
               //alert("생일과 비슷한 비밀번호는 사용 할 수 없습니다.");
               return false;
           }
       }
       return true;
   }

   //전화번호와 비슷한 비밀번호인지 체크
   function checkIPhone(pw) {
       var qwerty  = $("#phno1").val()+$("#phno2").val()+$("#phno3").val();
       var start   = 4 - 1; // 연속글자수 - 1
       var seq     = "_" + pw.slice(0, start);
       for (var i = start; i < pw.length; i++) {
           seq = seq.slice(1) + pw.charAt(i);
           if (qwerty.indexOf(seq) > -1) {
               alert(messages["javascript.mbr.join.msg8"]);
               //alert("전화번호와 비슷한 비밀번호는 사용 할 수 없습니다.");
               return false;
           }
       }
       return true;
   }



   //전화번호와 비슷한 비밀번호인지 체크
   function checkIPhoneForn(pw) {
       var qwerty  = $("#phno").val();
       var start   = 4 - 1; // 연속글자수 - 1
       var seq     = "_" + pw.slice(0, start);
       for (var i = start; i < pw.length; i++) {
           seq = seq.slice(1) + pw.charAt(i);
           if (qwerty.indexOf(seq) > -1) {
               alert(messages["javascript.mbr.join.msg8"]);
               //alert("전화번호와 비슷한 비밀번호는 사용 할 수 없습니다.");
               return false;
           }
       }
       return true;
   }

   
   
   

   //아이디 체크
   function checkID(obj) {
       var v = obj.val();
       if(v.length == 0) return false;
           //if (/^[a-zA-Z0-9_]{6,12}$/.test(v)) {
               //if (!/[a-zA-Z]/.test(v)) {
           if (/^[a-z0-9_]{6,12}$/.test(v)) {
               if (!/[a-z]/.test(v)) {
               alert(messages["javascript.mbr.join.msg9"]);
               //alert("아이디에 영문자가 반드시 한자 이상 포함되어야 합니다.");
               obj.select();
               return false;
           }
           return true;
       }
       if (v.length < 6 || v.length > 12){
           alert(messages["javascript.mbr.join.msg10"]);
           //alert("아이디는 6자 에서 12자 까지만 허용합니다.");
       }else{
           alert(messages["javascript.mbr.join.msg11"]);
           //alert("영문 대소문자,숫자혼용,특수기호(_)만 사용할 수 있습니다.");
       }
       obj.select();
       return false;
   }


   //이메일체크
   function checkEmail(obj , obj2) {
       var v = obj.val()+"@"+obj2.val();
       if(v.length > 0) {
           var regExp = /[a-z0-9_-]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i;
           if(!regExp.test(v)){
               alert(messages["javascript.mbr.join.msg12"]);
               //alert("잘못된 e-mail 형식입니다.");
               obj.focus();
               return false;
           }
       }
       return true;
   }
   



   //이메일체크
   function checkEmailOneFild(obj ) {
       var v = obj.val();
       if(v.length > 0) {
           var regExp = /[a-z0-9_-]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i;
           if(!regExp.test(v)){
               alert(messages["javascript.mbr.join.msg12"]);
               //alert("잘못된 e-mail 형식입니다.");
               obj.focus();
               return false;
           }
       }
       return true;
   }