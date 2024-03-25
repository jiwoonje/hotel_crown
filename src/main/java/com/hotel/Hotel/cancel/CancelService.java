package com.hotel.Hotel.cancel;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.FacilityReservation.FacilityReservationRepository;
import com.hotel.Hotel.Reservation.Reservation;
import com.hotel.Hotel.RoomReservation.RoomReservationRepository;


import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CancelService 
{
	public final RoomReservationRepository roomReservationRepository;
	public final FacilityReservationRepository facilityReservationRepository;
	public final CancelRepository cancelRepository;
	
	public Page<Cancel> getList(Integer page, String kw) 
	{
		
		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수 
		// Sort : 정렬을 위한 객체 
		List<Sort.Order> sorts = new ArrayList<>(); 
		sorts.add(Sort.Order.desc("seq")); 
		
		
		Pageable pageable = PageRequest.of(page, 110, Sort.by(sorts)); 
					
		return cancelRepository.findAll(pageable); 
	}
 
 	//방&시설 취소 리스트 생성
 	public Cancel createRoomFacilityReservationCancel
 	(
 			Reservation r
 	)
 	{
 		Cancel cancel = new Cancel();
 		cancel.setR(r);
 		cancel.setSave_seq(r.getSeq());
 		cancel.setSave_mid(r.getMember().getMid());
 		cancel.setSave_rid(r.getRoom().getRid());
 		cancel.setSave_fid(r.getFacility().getFid());
 		cancel.setSave_sdate(r.getSdate());
 		cancel.setSave_edate(r.getEdate());
 		cancel.setSave_cnt(r.getCnt());
 		cancel.setRegdate(LocalDateTime.now());
 		return cancelRepository.save(cancel);
 	}
	
	
	// 방&시설 Cancel테이블의 모든 레코드를 가져와서 리턴
 	// 페이징 처리되지 않는 모든 레코드를 출력
 	// 리스트 페이지 - 취소 목록 전체 조회
 	public List<Cancel> getCancelList()
 	{
 		return cancelRepository.findAll();
 	}
 
 
 	//방&시설 상세 페이지 - 취소 목록 1개 조회
 	public Cancel getCancel(int seq)
 	{
 		return cancelRepository.findById(seq).get();
 	}
 
 
 	//방&시설 취소 삭제
 	public void deleteCancel(Cancel cancel)
 	{
 		//삭제
 		cancelRepository.delete(cancel);
 	}

}
