package com.hotel.Hotel.FacilityReservation;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.Base.Status;
import com.hotel.Hotel.cancelfacility.CancelFacilityService;
import com.hotel.Hotel.facility.Facility;
import com.hotel.Hotel.facility.FacilityRepository;
import com.hotel.Hotel.facility.FacilityService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class FacilityReservationService 
{
	public final FacilityReservationRepository facilityReservationRepository;
 	public final FacilityRepository facilityRepository;
 	public final MemberRepository memberRepository;
 	public final FacilityService facilityService;
 	public final CancelFacilityService cancelFacilityService;
	
	//room의 정보를 요청해서 가져오는 method를 따로 구현
 	public Facility getFacility(int fid)
 	{
 		Facility facility = facilityRepository.findById(fid).get();
 		return facility;
 	}


 	//예약하려는 시설 id의 상태가 Available이면 예약 생성, Denied면 예약 방지
 	public void facilityDuplicate(int fid)
 	{
 		Facility facility = facilityRepository.findById(fid).get();
 		
 		System.out.println("시설 중복 확인 시작");
 		
 		if(facility.getFstatus() == Status.DENIED)
 		{
 			throw new IllegalStateException("이미 예약된 시설입니다.");
 		}
 	}
 	
 	//날짜 중복 예약 방지 + 동일 시설 생성 방지
 	public void timeAndFacilityDuplicate(Member member, int fid, Date date)
 	{
 		FacilityReservation facilityReservation = new FacilityReservation();

 		Timestamp t1 = new Timestamp(date.getTime());
 		
 		System.out.println("시설 예약 날짜 계산 시작");
 		
		// 전체 방 예약 목록 중 날짜 겹치는 거 조회
		for (int i = 1; i <= 10; i++) 
		{
			facilityReservation = facilityReservationRepository.findById(i).get();
			
			if (
					(facilityReservation.getDate().equals(t1))
					&& (facilityReservation.getFfacility().getFid()==fid)
					&& (facilityReservation.getFmember().getMid() == member.getMid())

			) 
			{

					System.out.println("날짜 & 시설 중복됨");
					throw new IllegalStateException("날짜 & 시설 중복");
			}
			
			else
			{
				break;
			}
		}
 	}

 	
 	// Reservation테이블의 모든 레코드를 가져와서 리턴
 	// 페이징 처리되지 않는 모든 레코드를 출력
 	// 리스트 페이지 - 예약 전체 조회
 	public List<FacilityReservation> getFacilityReservationList()
 	{
 		return facilityReservationRepository.findAll();
 	}
 
 
 	//상세 페이지 - 예약 1개 조회
 	public FacilityReservation getFacilityReservation(int seq)
 	{
 		return facilityReservationRepository.findById(seq).get();
 	}
 	
 	
 	//예약 생성
 	public FacilityReservation createFacilityReservation
 	(
		 Member member, int fid,
		 Date date, int cnt
 	)
 	{
 		//처음 생성 시
 		if(facilityReservationRepository.findAll().size() == 0)
 		{
 	 		FacilityReservation facilityReservation = new FacilityReservation();
 	 		facilityDuplicate(fid);
 	 		facilityReservation.setFmember(member);
 	 		facilityReservation.setFfacility(getFacility(fid));
 	 		facilityReservation.setDate(date);
 	 		facilityReservation.setCnt(cnt);
 	 		facilityService.fstatus(fid); //여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경
 		 
 	 		return facilityReservationRepository.save(facilityReservation);

 		}
 		
 		//그 다음 생성 시 - 객실에 대한 날짜..
 		else
 		{
 			FacilityReservation facilityReservation = new FacilityReservation();
 			facilityDuplicate(fid); //시설 중복 예약 방지
 			timeAndFacilityDuplicate(member, fid, date); //시간 중복 예약 확인
 	 		facilityReservation.setFmember(member);
 	 		facilityReservation.setFfacility(getFacility(fid));
 	 		facilityReservation.setDate(date);
 	 		facilityReservation.setCnt(cnt);
 	 		facilityService.fstatus(fid); //여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경
 		 
 	 		return facilityReservationRepository.save(facilityReservation);
 		}

 	} 
 
 	//예약 수정
 	public FacilityReservation updateFacilityReservation
 	(
 		FacilityReservation facilityReservation,
		 int fid, Date date,
		 int cnt
 	)
 	{
 		facilityDuplicate(fid); //시설 중복 예약 방지
 		facilityService.cstatus(facilityReservation.getFfacility().getFid()); //기존 시설 예약 해제 / denied(예약 불가능) -> available(예약 가능)
 		facilityReservation.setFfacility(getFacility(fid));
 		timeAndFacilityDuplicate(facilityReservation.getFmember(), fid, date);
 		facilityReservation.setDate(date);
 		facilityReservation.setCnt(cnt);
 		facilityService.fstatus(fid); //수정할 시설 예약 설정 / available(예약 가능) -> denied(예약 불가능)
	 
 		return facilityReservationRepository.save(facilityReservation);
 	}
 
 
 	//예약 삭제
 	public void deleteFacilityReservation(FacilityReservation facilityReservation)
 	{ 		
 		//삭제하기 전에 Facility를 Availiable(예약 가능)상태로 변경
 		facilityService.cstatus(facilityReservation.getFfacility().getFid());

 		//삭제할 Facility예약 정보 저장
 		cancelFacilityService.createFacilityReservationCancel(facilityReservation);
 		
 		//삭제
 		facilityReservationRepository.delete(facilityReservation);

 	}

 	
	// 요청할 페이지 번호를 매개변수로 입력 : 
	public Page<FacilityReservation> getList(Integer page, String kw) 
	{
		
		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수 
		// Sort : 정렬을 위한 객체 
		List<Sort.Order> sorts = new ArrayList<>(); 
		sorts.add(Sort.Order.desc("seq")); 
		
		
		Pageable pageable = PageRequest.of(page, 110, Sort.by(sorts)); 
					
		return facilityReservationRepository.findAll(pageable); 
	}
}
