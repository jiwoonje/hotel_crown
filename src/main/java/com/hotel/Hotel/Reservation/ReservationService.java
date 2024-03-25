package com.hotel.Hotel.Reservation;

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
import com.hotel.Hotel.cancel.CancelService;
import com.hotel.Hotel.facility.Facility;
import com.hotel.Hotel.facility.FacilityRepository;
import com.hotel.Hotel.facility.FacilityService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;
import com.hotel.Hotel.room.Room;
import com.hotel.Hotel.room.RoomRepository;
import com.hotel.Hotel.room.RoomService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReservationService
{
	public final ReservationRepository reservationRepository;
 	
	public final RoomRepository roomRepository;
 	public final RoomService roomService;
 	
 	public final FacilityRepository facilityRepository;
 	public final FacilityService facilityService;
 	
 	public final MemberRepository memberRepository;
 	
 	public final CancelService cancelService;
 	
 	
	//room이랑 facility의 정보를 요청해서 가져오는 method를 따로 구현
 	public Room getRoom(int rid)
 	{
 		Room room = roomRepository.findById(rid).get();
 		return room;
 	}
 	
 	public Facility getFacility(int fid)
 	{
 		Facility facility = facilityRepository.findById(fid).get();
 		return facility;
 	}
 	
 	
 	//예약하려는 방 id의 상태가 Available이면 예약 생성, Denied면 예약 방지
 	public void roomDuplicate(int rid)
 	{
 		Room room = roomRepository.findById(rid).get();
 		if(room.getRstatus() == Status.DENIED)
 		{
 			System.out.println("이미 예약된 방");
 			throw new IllegalStateException("이미 예약된 방입니다.");
 		}
 	}


 	//예약하려는 시설 id의 상태가 Available이면 예약 생성, Denied면 예약 방지
 	public void facilityDuplicate(int fid)
 	{
 		Facility facility = facilityRepository.findById(fid).get();
 		if(facility.getFstatus() == Status.DENIED)
 		{
 			System.out.println("이미 예약된 시설");
 			throw new IllegalStateException("이미 예약된 방입니다.");
 		}
 	}


	// 날짜 중복 예약 방지 + 동일 방 생성 방지
	public void timeAndRoomAndFacilityDuplicate(Member member,int rid, int fid, Date sdate, Date edate) 
	{

		Reservation reservation = new Reservation();

		Timestamp t1 = new Timestamp(sdate.getTime());
		Timestamp t2 = new Timestamp(edate.getTime());
		
		System.out.println("날짜 계산 시작");
		
		for (int i = 1; i <= 10; i++) 
		{
			reservation = reservationRepository.findById(i).get();
			
			if 
			(
				(reservation.getSdate().equals(t1))
				&&(reservation.getEdate().equals(t2))
				&&(reservation.getFacility().getFid()==fid)
				&&(reservation.getRoom().getRid()==rid)
				&&(reservation.getMember().getMid() == member.getMid())

			) 
			{
				System.out.println("날짜 & 방 중복됨");
				throw new IllegalStateException("날짜 & 방 중복");
			}
			
			else
			{
				break;
			}
		}

	} 	
 	

 	//예약 생성
 	public Reservation createReservation
 	(
		 Member member, int rid, int fid,
		 Date sdate,Date edate,
		 int cnt
 	)
 	{
 		if(reservationRepository.findAll().size()==0)
 		{
 	 		Reservation reservation = new Reservation();
 	 		roomDuplicate(rid); //방 중복 예약 방지
 	 		facilityDuplicate(fid); // 시설 중복 예약 방지
 	 		reservation.setMember(member);
 	 		reservation.setRoom(getRoom(rid));
 	 		reservation.setFacility(getFacility(fid));
 	 		reservation.setSdate(sdate);
 	 		reservation.setEdate(edate);
 	 		reservation.setCnt(cnt);
 	 		roomService.rstatus(rid); //여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경
 	 		facilityService.fstatus(fid); //여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경
 		 
 	 		return reservationRepository.save(reservation);
 		}
 		
 		else
 		{

 	 		Reservation reservation = new Reservation();
 	 		
 	 		timeAndRoomAndFacilityDuplicate(member, rid, fid, sdate, edate);
 	 		roomDuplicate(rid); //방 중복 예약 방지
 	 		facilityDuplicate(fid); //시설 중복 예약 방지
 	 		
 	 		reservation.setMember(member);
 	 		reservation.setRoom(getRoom(rid));
 	 		reservation.setFacility(getFacility(fid));
 	 		reservation.setSdate(sdate);
 	 		reservation.setEdate(edate);
 	 		reservation.setCnt(cnt);
 	 		roomService.rstatus(rid); //여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경
 	 		facilityService.fstatus(fid); //여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경
 		 
 	 		return reservationRepository.save(reservation);
 		}
 	}
 

 	// Reservation테이블의 모든 레코드를 가져와서 리턴
 	// 페이징 처리되지 않는 모든 레코드를 출력
 	// 리스트 페이지 - 예약 전체 조회
 	public List<Reservation> getReservationList()
 	{
 		return reservationRepository.findAll();
 	}
 
 
 	//상세 페이지 - 예약 1개 조회
 	public Reservation getReservation(int seq)
 	{
 		return reservationRepository.findById(seq).get();
 	}
 
 
 	//예약 수정
 	public Reservation updateReservation
 	(
		 Reservation reservation,
		 int rid, int fid,
		 Date sdate,Date edate,
		 int cnt
 	)
 	{
 		roomDuplicate(rid); //방 중복 예약 방지
 		roomService.cstatus(reservation.getRoom().getRid());//기존 방 예약 해제
 		
 		facilityDuplicate(fid); //시설 중복 예약 방지
 		facilityService.cstatus(reservation.getFacility().getFid()); //기존 시설 예약 해제 / denied(예약 불가능) -> available(예약 가능)
 		
 		reservation.setRoom(getRoom(rid));
 		reservation.setFacility(getFacility(fid));
 		reservation.setSdate(sdate);
 		reservation.setEdate(edate);
 		reservation.setCnt(cnt);
 		
 		roomService.rstatus(rid); //수정할 방 예약 설정
 		facilityService.fstatus(fid); //수정할 시설 예약 설정 / available(예약 가능) -> denied(예약 불가능)
	 
 		return reservationRepository.save(reservation);
 	}
 
 
 	//예약 삭제
 	public void deleteReservation(Reservation reservation)
 	{
 		//삭제하기 전에 Room예약한 정보 저장
 		cancelService.createRoomFacilityReservationCancel(reservation);
 		
 		//삭제하기 전에 Room이랑 Facility를 Availiable(예약 가능)상태로 변경
 		roomService.cstatus(reservation.getRoom().getRid());
 		facilityService.cstatus(reservation.getFacility().getFid());
 		
 		//삭제
		reservationRepository.delete(reservation);
 	}
 
	// 요청할 페이지 번호를 매개변수로 입력 : 
	public Page<Reservation> getList(Integer page, String kw) 
	{
		
		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수 
		// Sort : 정렬을 위한 객체 
		List<Sort.Order> sorts = new ArrayList<>(); 
		sorts.add(Sort.Order.desc("seq")); 
		
		
		Pageable pageable = PageRequest.of(page, 110, Sort.by(sorts)); 
					
		return reservationRepository.findAll(pageable); 
	}	
}
