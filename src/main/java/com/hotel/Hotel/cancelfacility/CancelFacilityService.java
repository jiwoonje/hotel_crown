package com.hotel.Hotel.cancelfacility;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.FacilityReservation.FacilityReservation;
import com.hotel.Hotel.FacilityReservation.FacilityReservationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CancelFacilityService 
{
	public final FacilityReservationRepository facilityReservationRepository;
	public final CancelFacilityRepository cancelFacilityRepository;
	
	public Page<CancelFacility> getList(Integer page, String kw) 
	{
		
		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수 
		// Sort : 정렬을 위한 객체 
		List<Sort.Order> sorts = new ArrayList<>(); 
		sorts.add(Sort.Order.desc("seq")); 
		
		
		Pageable pageable = PageRequest.of(page, 110, Sort.by(sorts)); 
					
		return cancelFacilityRepository.findAll(pageable); 
	}


 	//시설 취소 리스트 생성
 	public CancelFacility createFacilityReservationCancel
 	(
 		FacilityReservation fr
 	)
 	{
 		CancelFacility cancelFacility = new CancelFacility();
 		cancelFacility.setFr(fr);
 		cancelFacility.setSave_seq(fr.getSeq());
 		cancelFacility.setSave_mid(fr.getFmember().getMid());
 		cancelFacility.setSave_fid(fr.getFfacility().getFid());
 		cancelFacility.setSave_date(fr.getDate());
 		cancelFacility.setSave_cnt(fr.getCnt());
 		cancelFacility.setRegdate(LocalDateTime.now());
 		return cancelFacilityRepository.save(cancelFacility);
 	}	
	
	// 방&시설 Cancel테이블의 모든 레코드를 가져와서 리턴
 	// 페이징 처리되지 않는 모든 레코드를 출력
 	// 리스트 페이지 - 취소 목록 전체 조회
 	public List<CancelFacility> getFacilityCancelList()
 	{
 		return cancelFacilityRepository.findAll();
 	}
 
 
 	//시설 상세 페이지 - 취소 목록 1개 조회
 	public CancelFacility getFacilityCancel(int seq)
 	{
 		return cancelFacilityRepository.findById(seq).get();
 	}
 	


 	//방&시설 취소 삭제
 	public void deleteFacilityCancel(CancelFacility cancelFacility)
 	{
 		//삭제
 		cancelFacilityRepository.delete(cancelFacility);
 	}
}
