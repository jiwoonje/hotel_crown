package com.hotel.Hotel.cancel;

import java.security.Principal;

import org.springframework.data.domain.Page;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class CancelController 
{
	private final CancelService cancelService;
	
	//전체 예약 목록
	@GetMapping("/getCancelList")
	public String getList
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
		
		//페이징 처리된 객체를 받음 
		Page<Cancel> paging = cancelService.getList(page , kw); 

		model.addAttribute("paging", paging); 
		model.addAttribute("kw", kw); 
		
		//templates/reservation_list.html  
		//thymeleaf 라이브러리 설치시 view 페이지가 위치할 곳, .html 
		return "cancel_list";
	}
	
	//1개 조회
	@GetMapping("/cancelDetail/{seq}")
	public String cancelDetail
	(
			Model model,
			@PathVariable("seq") int seq
	)
	{
		Cancel cancel = cancelService.getCancel(seq);
		
		System.out.println(seq);
		System.out.println(cancel.getSeq());
		
		model.addAttribute("cancel" , cancel);
		
		return "cancel_detail";
	}
	
	//삭제
	@GetMapping("/deleteCancel/{seq}")
	public String deleteCancel
	(
			@PathVariable("seq") int seq, 
			Principal principal 
	)
	{
		Cancel cancel = cancelService.getCancel(seq);
		
		cancelService.deleteCancel(cancel);
		
		return "redirect:/getCancelList";
	}
}
