package com.hotel.Hotel.FacilityReservation;

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
public class FacilityReservationController 
{
	private final FacilityReservationService facilityReservationService;
	private final MemberService memberService;

	//전체 예약 목록
	@GetMapping("/getFacilityReservationList")
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
		Page<FacilityReservation> paging = facilityReservationService.getList(page , kw); 

		model.addAttribute("paging", paging); 
		model.addAttribute("kw", kw); 
		
		//templates/reservation_list.html  
		//thymeleaf 라이브러리 설치시 view 페이지가 위치할 곳, .html 
		return "facilityReservation_list";
	}
	
	//예약 1개 조회
	@GetMapping("/facilityReservationDetail/{seq}")
	public String FacilityReservationDetail
	(
			Model model,
			@PathVariable("seq") int seq,
			FacilityReservationCreateForm facilityReservationCreateForm
	)
	{
		System.out.println(seq);
		FacilityReservation facilityReservation = facilityReservationService.getFacilityReservation(seq);
		
		System.out.println(facilityReservation.getSeq());
		
		model.addAttribute("facilityReservation" , facilityReservation);
		
		return "facilityReservation_detail";
	}
	
	
	// 예약 등록 하기 : 예약 등록 뷰 페이지만 전송 
	// http://localhost:9000/createReservation
	@GetMapping("/createFacilityReservation")
	public String createFacilityReservation(FacilityReservationCreateForm facilityReservationCreateForm)
	{
		return "facilityReservation_Form";	
	}
	
	@PreAuthorize("isAuthenticated()")
	@PostMapping("/createFacilityReservation")
	public String createFacilityReservation
	(
			
			FacilityReservationCreateForm facilityReservationCreateForm,
			BindingResult bindingResult,
			Principal principal,
			Model model
	)
	{
		System.out.println("###현재 로그온한 계정 : " + principal.getName());
		System.out.println("FacilityReservationController 시작");
		
		//유효성 체크에 오류가 발생 되었을때 signup_form.html 에 그대로 머물면서 오류 코드를 출력
		if (bindingResult.hasErrors() ) 
		{
			return "facility_reservation"; 
		}
		
		Member member = memberService.getMember(principal.getName());

		
		//유효성 검증을 통과 하면 DB에 저장 
		try
		{
			facilityReservationService.createFacilityReservation
			(
					member,
					facilityReservationCreateForm.getFid(),
					facilityReservationCreateForm.getDate(),
					facilityReservationCreateForm.getCnt()
			);
		}
		
		// DB컬럼의 무결성 제약조건 위반시 작동됨
		//DataIntegrityViolationException : Unique 키 컬럼에 중복된 값이 들어옴.
		catch(DataIntegrityViolationException e)
		{
			bindingResult.reject("siginupFailed", "이미 있는 예약 입니다.");
			return "facility_reservation";
		}
		
		//그외의 예외(오류) 가 발생되면 작동
		catch(Exception e)
		{
			bindingResult.reject("duplicate", "날짜 중복 or 시설 중복 선택 발생, 다시 선택하세요.");
			return "facility_reservation";
		}
		
		return "redirect:/getFacilityReservationList";
	}
	
	//수정
	@GetMapping("/updateFacilityReservation/{seq}")
	public String updateFacilityReservation
	(
			FacilityReservationForm facilityReservationForm,
			@PathVariable("seq") int seq, 
			Principal principal	
	)
	{
		FacilityReservation facilityReservation = facilityReservationService.getFacilityReservation(seq);
		facilityReservationForm.setFid(facilityReservation.getFfacility().getFid());
		facilityReservationForm.setDate(facilityReservation.getDate());
		facilityReservationForm.setCnt(facilityReservation.getCnt());
		
		return "facilityReservation_form2";
	}
	

	//수정된 내용을 받아서 DB에 저장 , save() 기존의 question 객체를 끄집어내서 수정후 저장 
	// http://localhost:9000/reservation/update/id
	@PostMapping("/updateFacilityReservation/{seq}")
	public String updateFacilityReservation
	(
			FacilityReservationForm facilityReservationForm,
			BindingResult bindingResult,
			@PathVariable("seq") int seq, 
			Principal principal	
	)
	{
		// reservationForm 에 주입된 값을 확인 
		if (bindingResult.hasErrors()) 
		{
			return "FacilityReservation_form2" ; 
		}
		
		FacilityReservation facilityReservation = facilityReservationService.getFacilityReservation(seq);
		facilityReservationService.updateFacilityReservation
		(
				facilityReservation, 
				facilityReservationForm.getFid(),
				facilityReservationForm.getDate(),
				facilityReservationForm.getCnt()
		);
		
		//수정 이후에 이동할 페이지
		return "redirect:/getFacilityReservationList";
	}
	
	//삭제
	@GetMapping("/deleteFacilityReservation/{seq}")
	public String deleteFacilityReservation
	(
			@PathVariable("seq") int seq, 
			Principal principal 
	)
	{
		FacilityReservation FacilityReservation = facilityReservationService.getFacilityReservation(seq);
		
		if(! principal.getName().equals(FacilityReservation.getFmember().getMid()))
		{
			// 예외를 강제로 발생 김 
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제할 권한이 없습니다. ");
		}
		
		facilityReservationService.deleteFacilityReservation(FacilityReservation);
		
		return "redirect:/getFacilityReservationList";
	}
}
