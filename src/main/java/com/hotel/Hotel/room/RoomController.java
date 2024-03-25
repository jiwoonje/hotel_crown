package com.hotel.Hotel.room;



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
public class RoomController 
{
	private final RoomService roomService;
	
	//방 등록 form 전송 th:object="${RoomCreateForm}"
	@GetMapping("/createRoom")
	public String create(RoomCreateForm roomCreateForm)
	{
		return "room_form";
	}
	
	//방 등록
	@PostMapping("/createRoom")
	public String create
	(
			@Valid RoomCreateForm roomCreateForm,
			BindingResult bindingResult,
			Model model
	)
	{
		//유효성 체크에 오류가 발생 되었을때 signup_form.html 에 그대로 머물면서 오류 코드를 출력
		if (bindingResult.hasErrors() ) 
		{
			return "room_Form"; 
		}
		
		try
		{
			roomService.create
			(
				roomCreateForm.getRname(),
				roomCreateForm.getRtype(),
				roomCreateForm.getRnum(),
				roomCreateForm.getRprice()
			);
		}
		
		catch(DataIntegrityViolationException e)
		{
			bindingResult.reject("roomCreateFailed", "이미 등록된 정보 입니다.");
			return "room_Form";
		}
		
		catch(Exception e)
		{
			bindingResult.reject("roomCreateFailed", "알수 없는 오류 발생 ");
			return "room_Form";			
		}
		
		return "redirect:/roomList";
	}
	
	//http://localhost:9000/roomList
	@GetMapping("/roomList")
	//@ResponseBody
	public String roomlist
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
		Page<Room> paging = roomService.getList(page , kw); 

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
		return "room_list" ; 	
	}	

	
	//상세 글 조회 
	// http://localhost:9000/roomDetail/{rid}
	@GetMapping("/roomDetail/{rid}")
	public String roomDetail 
	(
			Model model, 
			@PathVariable("rid") int rid
	) 
	{
		
		System.out.println(rid);
		// 백엔드의 로직 처리 
		Room r = roomService.getRoom(rid); 
		
		System.out.println(rid);
		System.out.println(r.getRid());
		
		
		// model 에 담아서 client로 전송 
		model.addAttribute("room", r); 
			
		return "room_detail"; 
	}


	// 질문 정보를 가져와서 뷰 페이지로 값을 넣어줌 
	// http://localhost:9000/roomModify/{rid}
	@GetMapping("/roomModify/{rid}")
	public String roomModify
	(
			RoomCreateForm roomCreateForm, 
			@PathVariable("rid") int rid		
	) 
	{
			// pincipal.getName();  : 현재 로그인한 사용자 정보를 출력 
		// 넘어오는 id 변수를 가져와서 수정할 question 객체를 끄집어 옴 
		// save() - insert 
		// save() - update	<== 기존의 DB의 레코드(Question)를 끄집어 내서 수정 
		Room r = roomService.getRoom(rid); 
		
		/*
		System.out.println("컨트롤러에서 제목 출력 : " + q.getSubject());
		System.out.println("컨트롤러에서 내용 출력 : " + q.getContent());
		*/ 
		
		// q 에 저장된 subject , content 필드의 값을 questionForm에 넣어서 클라이언트로 전송 
		roomCreateForm.setRname(r.getRname());
		roomCreateForm.setRtype(r.getRtype());
		roomCreateForm.setRnum(r.getRnum());
		roomCreateForm.setRprice(r.getRprice());
			
		return "room_form";
	}
	
	// 질문 수정된 내용을 받아서 DB에 저장 , save() 기존의 question 객체를 끄집어내서 수정후 저장 
	// http://localhost:9000/roomModify/{rid}
	@PostMapping("/roomModify/{rid}")
	public String roomModify
	(
			@Valid RoomCreateForm roomCreateForm,
			BindingResult bindingResult, 
			@PathVariable("rid") int rid		
	) 
	{


		// questionForm 에 주입된 값을 확인 
		if (bindingResult.hasErrors()) 
		{
			return "room_form" ; 
		}
		
		// 수정된 값을 DB에 저장하는 Service 메소드 호출 
			//수정할 Question 객체를 끄집어냄 
		Room r = roomService.getRoom(rid);
		roomService.update
		(
				rid,
				roomCreateForm.getRname(),
				roomCreateForm.getRtype(),
				roomCreateForm.getRnum(),
				roomCreateForm.getRprice()
		) ;
		
		// 수정 이후에 이동할 페이지 
		return String.format("redirect:/roomDetail/%s", rid); 
	}
	
	
	// 삭제 요청에 대한 처리 
	@GetMapping("/roomDelete/{rid}")
	public String roomDelete
	(
		@PathVariable("rid") int rid			
	) 
	{
		// id 값을 가지고 Question 객체 
		Room m = roomService.getRoom(rid); 
		
		// 삭제됨 
		roomService.delete(m.getRid()); 

		return "redirect:http://localhost:9000/roomList"; 
	}
	
}
