package com.hotel.Hotel.Reservation;


import java.security.Principal;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberService;


import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ReservationController 
{
	private final ReservationService reservationService;
	private final MemberService memberService;
	
	
	//전체 예약 목록
	@GetMapping("/getReservationList")
	public String getReservationList
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
		Page<Reservation> paging = reservationService.getList(page , kw); 

		model.addAttribute("paging", paging); 
		model.addAttribute("kw", kw); 
		
		//templates/reservation_list.html  
		//thymeleaf 라이브러리 설치시 view 페이지가 위치할 곳, .html 
		return "reservation_list";
	}
	
	//예약 1개 조회
	@GetMapping("/reservationDetail/{seq}")
	public String reservationDetail
	(
			Model model,
			@PathVariable("seq") int seq,
			ReservationForm reservationForm
	)
	{
		System.out.println(seq);
		Reservation reservation = reservationService.getReservation(seq);
		
		System.out.println(reservation.getSeq());
		
		model.addAttribute("reservation" , reservation);
		
		return "reservation_detail";
	}
	
	
	// 예약 등록 하기 : 예약 등록 뷰 페이지만 전송 
	// http://localhost:9000/createReservation
	@GetMapping("/createReservation")
	public String createReservation(ReservationCreateForm reservationCreateForm)
	{
		return "reservation_Form";	
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/createReservation")
	public String createReservation
	(
			
			ReservationCreateForm reservationCreateForm,
			BindingResult bindingResult,
			Principal principal,
			Model model
	)
	{
		System.out.println("###현재 로그온한 계정 : " + principal.getName());
		System.out.println("ReservationController 시작");
		//유효성 체크에 오류가 발생 되었을때 signup_form.html 에 그대로 머물면서 오류 코드를 출력
		if (bindingResult.hasErrors() ) 
		{
			return "reservation_Form"; 
		}
		
		Member member = memberService.getMember(principal.getName());

		
		//유효성 검증을 통과 하면 DB에 저장 
		try
		{
			reservationService.createReservation
			(
					member,
					reservationCreateForm.getRid(),
					reservationCreateForm.getFid(),
					reservationCreateForm.getSdate(),
					reservationCreateForm.getEdate(),
					reservationCreateForm.getCnt()
			);
		}
		
		// DB컬럼의 무결성 제약조건 위반시 작동됨
		//DataIntegrityViolationException : Unique 키 컬럼에 중복된 값이 들어옴.
		catch(DataIntegrityViolationException e)
		{
			bindingResult.reject("siginupFailed", "이미 있는 예약 입니다.");
			return "reservation_Form";
		}
		
		//그외의 예외(오류) 가 발생되면 작동
		catch(Exception e)
		{
			bindingResult.reject("duplicate", "날짜 중복 or 방 중복 or 시설 중복 선택 발생, 다시 선택하세요.");
			return "reservation_Form";
		}
		
		return "redirect:/getReservationList";
	}
	
	//수정
	@GetMapping("/updateReservation/{seq}")
	public String updateReservation
	(
			ReservationForm reservationForm,
			@PathVariable("seq") int seq, 
			Principal principal	
	)
	{
		Reservation r = reservationService.getReservation(seq);
		reservationForm.setRid(r.getRoom().getRid());
		reservationForm.setFid(r.getFacility().getFid());
		reservationForm.setSdate(r.getSdate());
		reservationForm.setEdate(r.getEdate());
		reservationForm.setCnt(r.getCnt());
		
		return "reservation_form2";
	}
	

	//수정된 내용을 받아서 DB에 저장 , save() 기존의 question 객체를 끄집어내서 수정후 저장 
	// http://localhost:9000/reservation/update/id
	@PostMapping("/updateReservation/{seq}")
	public String updateReservation
	(
			ReservationForm reservationForm,
			BindingResult bindingResult,
			@PathVariable("seq") int seq, 
			Principal principal	
	)
	{
		// reservationForm 에 주입된 값을 확인 
		if (bindingResult.hasErrors()) 
		{
			return "reservation_form2" ; 
		}
		
		Reservation r = reservationService.getReservation(seq);
		reservationService.updateReservation
		(
				r, 
				reservationForm.getRid(), 
				reservationForm.getFid(),
				reservationForm.getSdate(),
				reservationForm.getEdate(),
				reservationForm.getCnt()
		);
		
		//수정 이후에 이동할 페이지
		return "redirect:/getReservationList";
	}
	
	//삭제
	@GetMapping("/deleteReservation/{seq}")
	public String deleteReservation
	(
			@PathVariable("seq") int seq, 
			Principal principal 
	)
	{
		Reservation r = reservationService.getReservation(seq);
		
		if(! principal.getName().equals(r.getMember().getMid()))
		{
			// 예외를 강제로 발생 김 
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제할 권한이 없습니다. ");
		}
		
		reservationService.deleteReservation(r);
		
		return "redirect:/getReservationList";
	}
	
	
}
