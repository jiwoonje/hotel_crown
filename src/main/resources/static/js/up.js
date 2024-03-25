function addRow() {

    // 템플릿 가져오기
    const template = document.querySelector('#rowTemplate');
    
    // 추가할 테이블 가져오기
    const tbl = document.querySelector('#myTable');
    
    // 왼쪽 숫자 표시 설정
    const td_slNo = template.content.querySelectorAll("td")[0];
    const tr_count = tbl.rows.length;
    td_slNo.textContent = tr_count;
    
    // 템플릿의 content 속성과 그의 자식 모든 요소를 복사
    const clone = template.content.cloneNode(true); 
    
    // 기존 테이블에 복사한 템플릿을 추가
    tbl.appendChild(clone);
  
  }