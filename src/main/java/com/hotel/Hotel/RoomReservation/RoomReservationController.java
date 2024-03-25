package com.hotel.Hotel.RoomReservation;

import java.security.Principal;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class RoomReservationController 
{
	private final RoomReservationService roomReservationService;
	private final MemberService memberService;
	
	
	//전체 예약 목록
	@GetMapping("/getRoomReservationList")
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
		Page<RoomReservation> paging = roomReservationService.getList(page , kw); 

		model.addAttribute("paging", paging); 
		model.addAttribute("kw", kw); 
		
		//templates/reservation_list.html  
		//thymeleaf 라이브러리 설치시 view 페이지가 위치할 곳, .html 
		return "roomReservation_list";
	}
	
	//예약 1개 조회
	@GetMapping("/roomReservationDetail/{seq}")
	public String roomReservationDetail
	(
			Model model,
			@PathVariable("seq") int seq,
			RoomReservationCreateForm roomReservationCreateForm
	)
	{
		RoomReservation roomReservation = roomReservationService.getRoomReservation(seq);
		
		System.out.println(seq);
		System.out.println(roomReservation.getSeq());
		
		model.addAttribute("roomReservation" , roomReservation);
		
		return "roomReservation_detail";
	}
	
	
	// 예약 등록 하기 : 예약 등록 뷰 페이지만 전송 
	// http://localhost:9000/createReservation
	@GetMapping("/createRoomReservation")
	public String createRoomReservation(RoomReservationCreateForm roomReservationCreateForm)
	{
		return "roomReservation_Form";	
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/createRoomReservation")
	public String createRoomReservation
	(
			
			RoomReservationCreateForm roomReservationCreateForm,
			BindingResult bindingResult,
			Principal principal,
			Model model
	)
	{
		System.out.println("###현재 로그온한 계정 : " + principal.getName());
		System.out.println("RoomReservationController 시작");
		//DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		//LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		
		
		//유효성 체크에 오류가 발생 되었을때 signup_form.html 에 그대로 머물면서 오류 코드를 출력
		if (bindingResult.hasErrors() ) 
		{
			return "roomReservation_Form"; 
		}
		
		Member member = memberService.getMember(principal.getName());
		System.out.println("RoomReservationController에서 방 생성 메소드 호출");
		//유효성 검증을 통과 하면 DB에 저장 
		try
		{
			roomReservationService.createRoomReservation
			(
					member,
					roomReservationCreateForm.getRid(),
					roomReservationCreateForm.getSdate(),
					roomReservationCreateForm.getEdate(),
					roomReservationCreateForm.getCnt()
			);
			System.out.println(roomReservationCreateForm.getSdate().getClass());
			System.out.println(roomReservationCreateForm.getEdate().getClass());
		}
		
		// DB컬럼의 무결성 제약조건 위반시 작동됨
		//DataIntegrityViolationException : Unique 키 컬럼에 중복된 값이 들어옴.
		catch(DataIntegrityViolationException e)
		{
			bindingResult.reject("siginupFailed", "이미 있는 예약 입니다.");
			return "roomReservation_Form";
		}
		
		//그외의 예외(오류) 가 발생되면 작동
		catch(Exception e)
		{
			bindingResult.reject("duplicate", "날짜 중복 or 방 중복 선택 발생, 다시 선택하세요.");
			return "roomReservation_Form";
		}
		
		return "redirect:/getRoomReservationList";
	}
	
	//수정
	@GetMapping("/updateRoomReservation/{seq}")
	public String updateRoomReservation
	(
			RoomReservationForm roomReservationform,
			@PathVariable("seq") int seq, 
			Principal principal	
	)
	{
		System.out.println("RoomReservationController에서 방 정보 업데이트 메소드 호출");
		RoomReservation roomReservation = roomReservationService.getRoomReservation(seq);
		roomReservationform.setRid(roomReservation.getRroom().getRid());
		roomReservationform.setSdate(roomReservation.getSdate());
		roomReservationform.setEdate(roomReservation.getEdate());
		roomReservationform.setCnt(roomReservation.getCnt());
		
		return "roomReservation_Form2";
	}
	

	//수정된 내용을 받아서 DB에 저장 , save() 기존의 question 객체를 끄집어내서 수정후 저장 
	// http://localhost:9000/reservation/update/id
	@PostMapping("/updateRoomReservation/{seq}")
	public String updateRoomReservation
	(
			RoomReservationForm roomReservationForm,
			BindingResult bindingResult,
			@PathVariable("seq") int seq, 
			Principal principal	
	)
	{
		// reservationForm 에 주입된 값을 확인 
		if (bindingResult.hasErrors()) 
		{
			return "roomReservation_Form2" ; 
		}
		
		RoomReservation roomReservation = roomReservationService.getRoomReservation(seq);
		System.out.println(roomReservation.getSeq());
		System.out.println("RoomReservationController에서 방 정보 업데이트 메소드 호출");
		roomReservationService.updateRoomReservation
		(
				roomReservation, 
				roomReservationForm.getRid(),
				roomReservationForm.getSdate(),
				roomReservationForm.getEdate(),
				roomReservationForm.getCnt()
		);
		
		//수정 이후에 이동할 페이지
		return "redirect:/getRoomReservationList";
	}
	
	//삭제
	@GetMapping("/deleteRoomReservation/{seq}")
	public String deleteRoomReservation
	(
			@PathVariable("seq") int seq, 
			Principal principal 
	)
	{
		RoomReservation roomReservation = roomReservationService.getRoomReservation(seq);
		
		if(! principal.getName().equals(roomReservation.getRmember().getMid()))
		{
			// 예외를 강제로 발생 김 
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제할 권한이 없습니다. ");
		}
		
		roomReservationService.deleteRoomReservation(roomReservation);
		
		return "redirect:/getRoomReservationList";
	}
}
