package com.hotel.Hotel.cancelroom;

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
public class CancelRoomController 
{
	private final CancelRoomService cancelRoomService;

	//전체 예약 목록
	@GetMapping("/getCancelRoomList")
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
		Page<CancelRoom> paging = cancelRoomService.getList(page , kw); 

		model.addAttribute("paging", paging); 
		model.addAttribute("kw", kw); 
		
		//templates/reservation_list.html  
		//thymeleaf 라이브러리 설치시 view 페이지가 위치할 곳, .html 
		return "cancelRoom_list";
	}
	
	//1개 조회
	@GetMapping("/cancelRoomDetail/{seq}")
	public String cancelRoomDetail
	(
			Model model,
			@PathVariable("seq") int seq
	)
	{
		CancelRoom cancelRoom = cancelRoomService.getCancelRoom(seq);
		
		System.out.println(seq);
		System.out.println(cancelRoom.getSeq());
		
		model.addAttribute("cancelRoom" , cancelRoom);
		
		return "cancelRoom_detail";
	}
	
	//삭제
	@GetMapping("/deleteCancelRoom/{seq}")
	public String deleteCancelRoom
	(
			@PathVariable("seq") int seq, 
			Principal principal 
	)
	{
		CancelRoom cancelRoom = cancelRoomService.getCancelRoom(seq);
		
		cancelRoomService.deleteCancelRoom(cancelRoom);
		
		return "redirect:/getCancelRoomList";
	}
}
