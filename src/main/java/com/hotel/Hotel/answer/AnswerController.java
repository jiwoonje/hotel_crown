package com.hotel.Hotel.answer;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.server.ResponseStatusException;

import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberService;
import com.hotel.Hotel.question.Question;
import com.hotel.Hotel.question.QuestionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class AnswerController {

	private final AnswerService answerService;
	private final QuestionService questionService;
	private final MemberService memberService;

	// 답변 등록 처리
	// 앵커 태그를 사용해서 등록 이후 그 위치로 이동 <== 수정됨 - 2월 1일
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/answer/create/{aid}")
	public String create(Model model, @PathVariable("aid") Integer aid,
//			@RequestParam(value="content") String content
			@Valid AnswerForm answerForm, BindingResult bindingResult, Principal principal) {

		// 뷰에서 인증된 사용자 정보를 가지고 오는 객체
		// 인증된 계정 정보가 출력
		System.out.println("뷰에서 인증된 계정 정보를 출력 : " + principal.getName());

		Question question = questionService.get(aid);

		if (bindingResult.hasErrors()) {

			model.addAttribute("question", question);
			return "getCs";

			// 메세지 출력 안하고 새롭게 리다이렉트로 이동됨
			// return String.format("redirect:/question/detail/%s", id);
		}

		System.out.println("question aid : " + aid);
		System.out.println("content : " + answerForm.getContent());

		// principal.getName() : 현재로그인 한 사용자 정보가 넘어옴.
		// 수정 추가됨
		Member member = memberService.getMember(principal.getName());

		// 수정됨
		Answer answer = answerService.create(aid, answerForm.getContent(), member);

		return String.format("redirect:/detail/%s#answer_%s", answer.getQuestion().getQid(), answer.getAid());
	}

	// 답변을 수정할 수 있는 뷰 페이지전송
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/answer/modify/{aid}")
	public String update(AnswerForm answerForm, @PathVariable("aid") int aid, Principal principal) {
		// id 값에 해당하는 answer 객체를 찾아온다.
		Answer a = answerService.get(aid);

		// 현재 로그온한 사용자가 자신이 작성한 답변이 아닌 경우 예외(오류)발생
		// 자신이 작성한 글이 아닐 경우 : 강제 오류 발생
		if (!principal.getName().equals(a.getMember().getMname())) {
			//
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "당신은 수정권한이 없습니다.");
		}

		answerForm.setContent(a.getContent());

		return "updateCs";
	}

	// 수정 폼에서 넘어오는 값을 받아서 저장
	// 앵커 를 이용해서 수정이후 해당 위치로 이동
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/answer/modify/{aid}")
	public String update(
			@PathVariable("aid") Integer aid, AnswerForm answerForm, Principal principal) {

		Answer a = answerService.get(aid);

		// 수정 완료
		answerService.update(a, answerForm.getContent());

		// 수정 완료후 이동 페이지
		return String.format("redirect:/question/detail/%s#answer_%s", a.getQuestion().getQid(), a.getAid());

	}

	// answer 삭제

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/answer/delete/{aid}")
	public String delete(@PathVariable("aid") Integer aid, Principal principal) {
		// id 로 Answer 객체를 반환
		Answer a = answerService.get(aid);

		// 현재 로그온한 계정이 DB에 저장된 계정과 동일할 경우 삭제
		if (!principal.getName().equals(a.getMember().getMname())) {
			// 강제로 오류 발생 : 예외 처리
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 요청입니다");
		}

		// 삭제
		answerService.delete(a);

		return String.format("redirect:/question/detail/%s", a.getQuestion().getQid());
	}

//	//답변 추천 기능 처리 
//	@PreAuthorize("isAuthenticated()")   //로그인 되었을때 접근 가능, 인증안된경우 인증 페이지로 던짐.
//	@GetMapping ("/answer/vote/{id}")
//	public String answerVote(
//			@PathVariable("id") Integer id, 
//			Principal principal 			
//			) {
//		// id 를 가지고 answer 객체를 끄집어 내어와야함. 
//		Answer answer = answerService.getAnswer(id); 
//		// principal 를 가지고 SiteUser 객체를 끄집어내야 함. 
//		Member member = memberService.getMember(member.getName()); 
//		
//		// DB에 저장 
//		answerService.vote(answer, member); 
//		
//		//투표후 : 질문 상세 페이지로 이동됨  
//		return String.format("redirect:/question/detail/%s#answer_%s", 
//				answer.getQid().getId(), answer.getId()) ; 
//	}

}