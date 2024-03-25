package com.hotel.Hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.FacilityReservation.FacilityReservation;
import com.hotel.Hotel.FacilityReservation.FacilityReservationRepository;
import com.hotel.Hotel.FacilityReservation.FacilityReservationService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;

@SpringBootTest
public class FRCRUDTest 
{
	@Autowired
	FacilityReservationService facilityReservationService;
	
	@Autowired
	FacilityReservationRepository facilityReservationRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	
	//생성
	//@Test
	void create()
	{
		Member m1 = memberRepository.findById(453).get();
		//Member m1 = memberRepository.findByMid("a").get();
		FacilityReservation f1 = new FacilityReservation();
		f1.setFmember(m1);
		f1.setFfacility(facilityReservationService.getFacility(153));
		f1.setDate(null);
		f1.setCnt(5);
		facilityReservationRepository.save(f1);
		
		Member m2 = memberRepository.findById(454).get();
		//Member m1 = memberRepository.findByMid("a").get();
		FacilityReservation f2 = new FacilityReservation();
		f2.setFmember(m2);
		f2.setFfacility(facilityReservationService.getFacility(154));
		f2.setDate(null);
		f2.setCnt(6);
		facilityReservationRepository.save(f2);
	}
	
	
	//전체 조회
	@Test
	void getList()
	{
		List<FacilityReservation> list = facilityReservationService.getFacilityReservationList();
		
		// for 문을 사용해서 list의 Reservation 객체를 끄집어내서 출력 
		for ( int i = 0 ; i < list.size(); i++) 
		{
			System.out.println(list.get(i).getSeq());
		}
		
		assertEquals (2 , list.size());		
	}
	
	
	//1개 조회
	//@Test 
	void get()
	{
		facilityReservationService.getFacilityReservation(1);
	}
	
	
	//수정
	//@Test
	void update()
	{
		Optional<FacilityReservation> op = facilityReservationRepository.findById(2);
		FacilityReservation f = null;
		if ( op.isPresent()) 
		{ 
			 f = op.get(); 		
		}
		
		f.setFfacility(facilityReservationService.getFacility(155));
		f.setDate(null);
		f.setCnt(4);
		
		facilityReservationRepository.save(f);
	}
	
	//삭제
	//@Test
	void delete()
	{
		Optional<FacilityReservation> op = facilityReservationRepository.findById(1);
		FacilityReservation f = null;
		if ( op.isPresent()) 
		{ 
			 f = op.get(); 		
		}
		facilityReservationRepository.delete(f);
	}
}
