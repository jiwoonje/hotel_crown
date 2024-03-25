package com.hotel.Hotel.RoomReservation;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hotel.Hotel.member.Member;

public interface RoomReservationRepository extends JpaRepository<RoomReservation, Integer>
{
	/*
		select : findAll(), findById()
		insert : save() 
		update : save() 
		delete : delete()
	 */

	//페이징 처리 : Page <Reservation>  findAll(Pageable pageable)
	// Page : 페이징을 처리하기 위한 클래스 
	// Pageable : 페이징 처리하는 인터페이스 
	Page<RoomReservation> findAll(Pageable pageable);
	Optional<RoomReservation> findByRmember(Member member);
	
	
//	//예약 날짜 중복 확인
//	//전체 예약 목록에서 하나씩 끄집어 내서 확인
//	//내가 2/26 ~ 2/29까지 예약하고 싶다. 조회조건 = 2/26~2/29
//	// select sdate, edate from Reservation where edate >= '2/26' and sdate <= '2/29'
//	//조회한다 sdate와 edate를 예약테이블에서 if 마지막 날짜가 2/26포함해서 이후인 날짜랑 시작날짜가 2/29일 포함해서 이전인 날짜를
//	//edate = 2/27, 2/28, 2/29 중 하나 sdate = 2/28, 2/27, 2/26 중 하나 = 중복을 허용?하는 건데
//	//정해진 날짜 사이에 중복되는 날짜가 있으면 오류 발생, 없으면 진행
//	@Query(value = "select sdate, edate from RoomReservation where sdate <= eedate and ssdate <= edate", nativeQuery=true)
//	RoomReservation validateDate(@Param("ssdate") Date ssdate, @Param("eedate") Date eedate);
//	
//	//@Query(value = "select sdate from RoomReservation where dates <= edate and sdate <= datee", nativeQuery=true)
//	
//	//sdate랑 edate랑 일치하는 데이터 조회
//	RoomReservation findBySdateAndEdate(Date sdate, Date edate);
}
