package com.hotel.Hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.Reservation.Reservation;
import com.hotel.Hotel.Reservation.ReservationRepository;
import com.hotel.Hotel.Reservation.ReservationService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;

@SpringBootTest
public class ReservationCRUDTEST 
{
	@Autowired
	ReservationService reservationService;
	
	@Autowired
	ReservationRepository reservationRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	
	//생성
	@Test
	void create()
	{
		Member m1 = memberRepository.findById(453).get();
		//Member m1 = memberRepository.findByMid("a").get();
		Reservation r1 = new Reservation();
		r1.setMember(m1);
		r1.setRoom(reservationService.getRoom(102));
		r1.setFacility(reservationService.getFacility(153));
		r1.setSdate(null);
		r1.setEdate(null);
		r1.setCnt(3);
		reservationRepository.save(r1);
		
		Member m2 = memberRepository.findById(454).get();
		Reservation r2 = new Reservation();
		r2.setMember(m2);
		r2.setRoom(reservationService.getRoom(103));
		r2.setFacility(reservationService.getFacility(154));
		r2.setSdate(null);
		r2.setEdate(null);
		r2.setCnt(6);
		reservationRepository.save(r2);
	}
	
	
	//전체 조회
	@Test
	void getList()
	{
		List<Reservation> list = reservationService.getReservationList();
		
		// for 문을 사용해서 list의 Reservation 객체를 끄집어내서 출력 
		for ( int i = 0 ; i < list.size(); i++) 
		{
			System.out.println(list.get(i).getSeq());
		}
		
		assertEquals (2 , list.size());		
	}
	
	
	//1개 조회
	@Test 
	void get()
	{
		reservationService.getReservation(153);
	}
	
	
	//수정
	@Test
	void update()
	{
		Optional<Reservation> op = reservationRepository.findById(153);
		Reservation r = null;
		if ( op.isPresent()) 
		{ 
			 r = op.get(); 		
		}
		
		r.setRoom(reservationService.getRoom(104));
		r.setFacility(reservationService.getFacility(155));
		r.setSdate(null);
		r.setEdate(null);
		r.setCnt(8);
		
		reservationRepository.save(r);
	}
	
	
	
	//삭제
	@Test
	void delete()
	{
		Optional<Reservation> op = reservationRepository.findById(153);
		Reservation r = null;
		if ( op.isPresent()) 
		{ 
			 r = op.get(); 		
		}
		reservationRepository.delete(r);
	}
	
	
	
}
