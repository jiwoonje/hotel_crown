package com.hotel.Hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.RoomReservation.RoomReservation;
import com.hotel.Hotel.RoomReservation.RoomReservationRepository;
import com.hotel.Hotel.RoomReservation.RoomReservationService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;

@SpringBootTest
public class RRCRUDTest 
{
	@Autowired
	RoomReservationService roomReservationService;
	
	@Autowired
	RoomReservationRepository roomReservationRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	
	//생성
	//@Test
	void create()
	{
		Member m1 = memberRepository.findById(452).get();
		//Member m1 = memberRepository.findByMid("a").get();
		RoomReservation r1 = new RoomReservation();
		r1.setRmember(m1);
		r1.setRroom(roomReservationService.getRoom(102));
		r1.setSdate(null);
		r1.setEdate(null);
		r1.setCnt(5);
		roomReservationRepository.save(r1);
		
		Member m2 = memberRepository.findById(453).get();
		//Member m1 = memberRepository.findByMid("a").get();
		RoomReservation r2 = new RoomReservation();
		r2.setRmember(m2);
		r2.setRroom(roomReservationService.getRoom(103));
		r2.setSdate(null);
		r2.setEdate(null);
		r2.setCnt(6);
		roomReservationRepository.save(r2);
	}
	
	
	//전체 조회
	@Test
	void getList()
	{
		List<RoomReservation> list = roomReservationService.getRoomReservationList();
		
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
		roomReservationService.getRoomReservation(1);
	}
	
	
	//수정
	//@Test
	void update()
	{
		Optional<RoomReservation> op = roomReservationRepository.findById(2);
		RoomReservation r = null;
		if ( op.isPresent()) 
		{ 
			 r = op.get(); 		
		}
		
		r.setRroom(roomReservationService.getRoom(104));
		r.setSdate(null);
		r.setEdate(null);
		r.setCnt(2);
		
		roomReservationRepository.save(r);
	}
	
	//삭제
	//@Test
	void delete()
	{
		Optional<RoomReservation> op = roomReservationRepository.findById(1);
		RoomReservation r = null;
		if ( op.isPresent()) 
		{ 
			 r = op.get(); 		
		}
		roomReservationRepository.delete(r);
	}
}
