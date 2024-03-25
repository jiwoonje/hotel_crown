package com.hotel.Hotel.member;


import java.security.Principal;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MemberController 
{
	private final MemberService memberService;    
    
	//회원 가입 폼을 전송 : 주의 : th:object="${MemberCreateForm}"
	@GetMapping("/signup")
	public String signup(MemberCreateForm memberCreateForm)
	{
		return "signUp";
	}
	
	//회원 가입 정보 전송
	@PostMapping("/signup")
	public String signup(
			@Valid MemberCreateForm memberCreateForm,
			BindingResult bindingResult,
			Model model
			)
	{
		//유효성 체크에 오류가 발생 되었을때 signup_form.html 에 그대로 머물면서 오류 코드를 출력
		if (bindingResult.hasErrors() ) 
		{
			return "signUp"; 
		}
		// password1, password2 필드의 값이 같은지 확인 후 다르면
		if(! memberCreateForm.getPassword1().equals
				(memberCreateForm.getPassword2()))
		{
			bindingResult.rejectValue
			("password2", "passwordInCorrect", 
					"두개의 패스워드가 일치하지 않습니다");
			return "signUp";
		}
		//유효성 검증을 통과 하면 DB에 저장 
		try
		{
			memberService.create(
					memberCreateForm.getMid(), 
					memberCreateForm.getPassword1(),
					memberCreateForm.getMname(),
					memberCreateForm.getEmail(),
					memberCreateForm.getAddress()
					);
		}
		// DB컬럼의 무결성 제약조건 위반시 작동됨
		//DataIntegrityViolationException : Unique 키 컬럼에 중복된 값이 들어옴.
		catch(DataIntegrityViolationException e)
		{
			bindingResult.reject("siginupFailed", "이미 등록된 사용자 입니다.");
			return "signUp";
		}
		
		//그외의 예외(오류) 가 발생되면 작동
		catch(Exception e)
		{
			bindingResult.reject("siginupFailed", "알수 없는 오류 발생 ");
			return "signUp";
		}
		
		return "redirect:/";
		
	}
	
	@GetMapping("/Login")
	public String Login() 
	{
		return "Login";
	}


	//http://localhost:9000/memberList
	@GetMapping("/memberList")
	//@ResponseBody
	public String list
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
		Page<Member> paging = memberService.getList(page , kw); 

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
		return "member_list" ; 	
	}	
	


	// 질문 정보를 가져와서 뷰 페이지로 값을 넣어줌 
	// http://localhost:8585/question/modify/1
	@GetMapping("/memberModify/{seq}")
	public String memberModify
	(
			MemberUpdateForm memberUpdateForm, 
			@PathVariable("seq") int seq, 
			Principal principal			
	) 
	{
			// pincipal.getName();  : 현재 로그인한 사용자 정보를 출력 
		// 넘어오는 id 변수를 가져와서 수정할 question 객체를 끄집어 옴 
		// save() - insert 
		// save() - update	<== 기존의 DB의 레코드(Question)를 끄집어 내서 수정 
		
		System.out.println("=====로그인 정보를 출력함 =======");
		System.out.println(principal.getName());
		
		
		Member m = memberService.getMember(seq);
		System.out.println(m.getRole());
		
		/*
		System.out.println("컨트롤러에서 제목 출력 : " + q.getSubject());
		System.out.println("컨트롤러에서 내용 출력 : " + q.getContent());
		*/ 
		
		// q 에 저장된 subject , content 필드의 값을 questionForm에 넣어서 클라이언트로 전송 
		memberUpdateForm.setPassword(m.getPassword());  
		memberUpdateForm.setMname(m.getMname());
		memberUpdateForm.setEmail(m.getEmail());
		memberUpdateForm.setAddress(m.getAddress());
			
		return "member_form"; 
	}
	
	// 질문 수정된 내용을 받아서 DB에 저장 , save() 기존의 question 객체를 끄집어내서 수정후 저장 
	// http://localhost:8585/question/modify/1
	@PostMapping("/memberModify/{seq}")
	public String memberModify
	(
			@Valid MemberUpdateForm memberUpdateForm, 
			BindingResult bindingResult, 
			@PathVariable("seq") int seq, 
			Principal principal			
	) 
	{
		
		System.out.println("=====로그인 정보를 출력함 =======");
		System.out.println(principal.getName());

		// questionForm 에 주입된 값을 확인 
		if (bindingResult.hasErrors()) 
		{
			return "member_form" ; 
		}
		
		// 수정된 값을 DB에 저장하는 Service 메소드 호출 
			//수정할 Question 객체를 끄집어냄 
		Member m = memberService.getMember(seq);
		System.out.println(m.getRole());
		memberService.update
		(
				seq,
				memberUpdateForm.getPassword(),
				memberUpdateForm.getMname(),
				memberUpdateForm.getEmail(),
				memberUpdateForm.getAddress()
		) ;
		
		// 수정 이후에 이동할 페이지 
		return String.format("redirect:/memberDetail/%s", seq); 
	}
	
	// 삭제 요청에 대한 처리 
	@GetMapping("/memberDelete/{seq}")
	public String memberDelete
	(
		@PathVariable("seq") int seq, 
		Principal principal 			
	) 
	{
		System.out.println("=====로그인 정보를 출력함 =======");
		System.out.println(principal.getName());
		// id 값을 가지고 Question 객체 
		Member m = memberService.getMember(seq);
		System.out.println(m.getRole());
		
		// URL를 사용해서 삭제 할 수 없도록 한다. 
		//현재 로그온한 계정과 DB의 저장된 username 과 같지 않을때 예외 발생 
		if (! principal.getName().equals(m.getMid())) 
		{
			// 예외를 강제로 발생 김 
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제할 권한이 없습니다. "); 
		}
				
		// 삭제됨 
		memberService.delete(m.getSeq()); 
		
		if (principal.getName()!=null) 
		{
			return "redirect:http://localhost:9000/logout"; 
		}
				
		return "redirect:/";
	}

	
	//상세 글 조회 
	// http://localhost:8585/question/detail/{id}
	@GetMapping("/memberDetail/{seq}")
	public String memberDetail 
	(
			Model model, 
			@PathVariable("seq") int seq
	) 
	{
		
		System.out.println(seq);
		// 백엔드의 로직 처리 
		Member m = 
				memberService.getMember(seq); 
		
		System.out.println(seq);
		System.out.println(m.getMid());
		System.out.println(m.getRole());
		
		// model 에 담아서 client로 전송 
		model.addAttribute("member" , m); 
			
		return "member_detail"; 
	}
}
