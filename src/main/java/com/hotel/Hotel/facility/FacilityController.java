package com.hotel.Hotel.facility;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


import org.springframework.ui.Model;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class FacilityController 
{
	private final FacilityService facilityService;
	
	//시설 등록 form 전송 th:object="${facilityCreateForm}"
	@GetMapping("/createFacility")
	public String create(FacilityCreateForm facilityCreateForm)
	{
		return "facility_form";
	}
	
	//시설 등록
	@PostMapping("/createFacility")
	public String create
	(
			@Valid FacilityCreateForm facilityCreateForm,
			BindingResult bindingResult,
			Model model
			)
	{
		//유효성 체크에 오류가 발생 되었을때 signup_form.html 에 그대로 머물면서 오류 코드를 출력
		if (bindingResult.hasErrors() ) 
		{
			return "facility_form"; 
		}
		
		try
		{
			facilityService.create
			(
				facilityCreateForm.getFname(),
				facilityCreateForm.getFtype(),
				facilityCreateForm.getFprice()
				
			);
		}
		
		catch(DataIntegrityViolationException e)
		{
			bindingResult.reject("facilityCreateFailed", "이미 등록된 정보 입니다.");
			return "facility_form";
		}
		
		catch(Exception e)
		{
			bindingResult.reject("facilityCreateFailed", "알수 없는 오류 발생 ");
			return "facility_form";			
		}
		
		return "redirect:/facilityList";
	}
	
	//http://localhost:9000/facilityList
	@GetMapping("/facilityList")
	//@ResponseBody
	public String facilitylist
	(
			Model model, 
			@RequestParam(value = "page", defaultValue="0") Integer page, 
			@RequestParam(value="kw", defaultValue="") String kw
			
	) 
	{
		// 로그에서 출력 : 서버에 배포된 상태에서 변수 값을 출력 
		log.info("page:{}, kw:{}" , page, kw) ; 
		
		// 콘솔에서 출력 : 개발시 변수값을 출력 
		System.out.println("page : " + page);
		System.out.println("kw : " + kw);
		
		
		//Model : 서버의 데이터를 client view 페이지로 전송 
		// 메소드 인풋 값으로 선언되면 객체가 자동으로 생성됨 
		
		// client 요청에 대한 비즈니스 로직 처리 : question 테이블의 list 를 출력 하라는 요청 
		//List<Question> questionList = questionService.getList();  
		
		//페이징 처리된 객체를 받음 
		Page<Facility> paging = facilityService.getList(page , kw); 

		// paging 에 등록 되어 있는 중요 메소드 출력
		
		System.out.println("전체 레코드 수 : " + paging.getTotalElements());
		System.out.println("페이지당 출력 레코드 갯수 : " + paging.getSize());
		System.out.println("전체 페이지 갯수 : " + paging.getTotalPages());
		
		System.out.println("현재 요청 페이지 번호 : " + paging.getNumber());
		System.out.println("이전페이지 존재여부 : " + paging.hasPrevious());
		System.out.println("다음 페이지 존재여부 : " + paging.hasNext());
		 

		 
		// model 에 담아서 client view 페이지로 전송 					
		//model.addAttribute("questionList", questionList); 
		
		model.addAttribute("paging", paging); 
		model.addAttribute("kw", kw); 
		
		
		//templates/question_list.html  
		// thymeleaf 라이브러리 설치시 view 페이지가 위치할 곳, .html 
		return "facility_list" ; 	
	}	

	
	//상세 글 조회 
	// http://localhost:9000/roomDetail/{fid}
	@GetMapping("/facilityDetail/{fid}")
	public String facilityDetail 
	(
			Model model, 
			@PathVariable("fid") int fid
	) 
	{
		
		System.out.println(fid);
		// 백엔드의 로직 처리 
		Facility f = facilityService.getFacility(fid); 
		
		System.out.println(fid);
		System.out.println(f.getFid());
		
		
		// model 에 담아서 client로 전송 
		model.addAttribute("facility", f); 
			
		return "facility_detail"; 
	}


	// 질문 정보를 가져와서 뷰 페이지로 값을 넣어줌 
	// http://localhost:9000/roomModify/{fid}
	@GetMapping("/facilityModify/{fid}")
	public String facilityModify
	(
			FacilityCreateForm facilityCreateForm, 
			@PathVariable("fid") int fid		
	) 
	{
			// pincipal.getName();  : 현재 로그인한 사용자 정보를 출력 
		// 넘어오는 id 변수를 가져와서 수정할 question 객체를 끄집어 옴 
		// save() - insert 
		// save() - update	<== 기존의 DB의 레코드(Question)를 끄집어 내서 수정 
		Facility f = facilityService.getFacility(fid); 
		
		/*
		System.out.println("컨트롤러에서 제목 출력 : " + q.getSubject());
		System.out.println("컨트롤러에서 내용 출력 : " + q.getContent());
		*/ 
		
		// q 에 저장된 subject , content 필드의 값을 questionForm에 넣어서 클라이언트로 전송 
		facilityCreateForm.setFname(f.getFname());
		facilityCreateForm.setFtype(f.getFtype());
		facilityCreateForm.setFprice(f.getFprice());
			
		return "facility_form";
	}
	
	// 질문 수정된 내용을 받아서 DB에 저장 , save() 기존의 question 객체를 끄집어내서 수정후 저장 
	// http://localhost:9000/roomModify/{fid}
	@PostMapping("/facilityModify/{fid}")
	public String facilityModify
	(
			@Valid FacilityCreateForm facilityCreateForm,
			BindingResult bindingResult, 
			@PathVariable("fid") int fid
	) 
	{


		// questionForm 에 주입된 값을 확인 
		if (bindingResult.hasErrors()) 
		{
			return "facility_form" ; 
		}
		
		// 수정된 값을 DB에 저장하는 Service 메소드 호출 
			//수정할 Question 객체를 끄집어냄 
		Facility f = facilityService.getFacility(fid);
		facilityService.update
		(
				fid,
				facilityCreateForm.getFname(),
				facilityCreateForm.getFtype(),
				facilityCreateForm.getFprice()
		) ;
		
		// 수정 이후에 이동할 페이지 
		return String.format("redirect:/facilityDetail/%s", fid); 
	}
	
	
	// 삭제 요청에 대한 처리 
	@GetMapping("/facilityDelete/{fid}")
	public String facilityDelete
	(
		@PathVariable("fid") int fid			
	) 
	{
		// id 값을 가지고 Question 객체 
		Facility f = facilityService.getFacility(fid); 
		
		// 삭제됨 
		facilityService.delete(f.getFid()); 

		return "redirect:http://localhost:9000/facilityList"; 
	}
}
