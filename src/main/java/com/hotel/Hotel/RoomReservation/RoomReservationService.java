package com.hotel.Hotel.RoomReservation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.sql.Timestamp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;

import com.hotel.Hotel.Base.Status;
import com.hotel.Hotel.cancelroom.CancelRoomService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;
import com.hotel.Hotel.member.MemberService;
import com.hotel.Hotel.room.Room;
import com.hotel.Hotel.room.RoomRepository;
import com.hotel.Hotel.room.RoomService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoomReservationService {
	public final RoomReservationRepository roomReservationRepository;
	public final RoomRepository roomRepository;
	public final MemberRepository memberRepository;
	public final MemberService memberService;
	public final RoomService roomService;
	public final CancelRoomService cancelRoomService;

	// room의 정보를 요청해서 가져오는 method를 따로 구현
	public Room getRoom(int rid) {
		Room room = roomRepository.findById(rid).get();

		System.out.println(room.getRid());

		return room;
	}

	// 방 상태 보고 중복 예약 방지
	// 예약하려는 방 id의 상태가 Available이면 예약 생성, Denied면 예약 방지
	public void roomDuplicate(int rid) {
		Room room = roomRepository.findById(rid).get();

		System.out.println(room.getRid());
		System.out.println("방 중복 확인 시작");

		if (room.getRstatus() == Status.DENIED) {
			throw new IllegalStateException("이미 예약된 방");
		}
	}

	// 날짜 중복 예약 방지 + 동일 방 생성 방지
	public void timeAndRoomDuplicate(Member member, int rid, Date sdate, Date edate) {

		RoomReservation roomReservation = new RoomReservation();

		Timestamp t1 = new Timestamp(sdate.getTime());
		Timestamp t2 = new Timestamp(edate.getTime());

		System.out.println("날짜 중복 확인 시작");

		// 전체 방 예약 목록 중 날짜 겹치는 거 조회
		for (int i = 1; i <= 10; i++) {
			roomReservation = roomReservationRepository.findById(i).get();

			if ((roomReservation.getSdate().equals(t1)) && (roomReservation.getEdate().equals(t2))
					&& (roomReservation.getRroom().getRid() == rid)
					&& (roomReservation.getRmember().getMid() == member.getMid())

			) {

				System.out.println("날짜 & 방 중복됨");
				throw new IllegalStateException("날짜 & 방 중복");
			}

			else {
				break;
			}
		}

	}

	// 예약 생성
	public RoomReservation createRoomReservation(Member member, int rid, Date sdate, Date edate, int cnt) {
		System.out.println(roomReservationRepository.findAll().size());

		if (roomReservationRepository.findAll().size() == 0) {
			System.out.println(roomReservationRepository.findAll().size());
			RoomReservation roomReservation = new RoomReservation();
			roomDuplicate(rid); // 방 중복 예약 방지
			roomReservation.setRmember(member);
			roomReservation.setRroom(getRoom(rid));
			roomReservation.setSdate(sdate);
			roomReservation.setEdate(edate);
			roomReservation.setCnt(cnt);
			roomService.rstatus(rid); // 여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경

			return roomReservationRepository.save(roomReservation);

		}

		else {
			System.out.println(roomReservationRepository.findAll().size());

			RoomReservation roomReservation = new RoomReservation();

			timeAndRoomDuplicate(member, rid, sdate, edate); // 날짜 중복 예약 + 동일 방 생성 방지
			roomDuplicate(rid); // 방 상태 보고 중복 예약 방지
			roomReservation.setRmember(member);
			roomReservation.setRroom(getRoom(rid));
			roomReservation.setSdate(sdate);
			roomReservation.setEdate(edate);
			roomReservation.setCnt(cnt);
			roomService.rstatus(rid); // 여기서 상태 available(예약 가능) -> denied(예약 불가능)로 변경

			return roomReservationRepository.save(roomReservation);

		}

	}

	// Reservation테이블의 모든 레코드를 가져와서 리턴
	// 페이징 처리되지 않는 모든 레코드를 출력
	// 리스트 페이지 - 예약 전체 조회
	public List<RoomReservation> getRoomReservationList() {
		return roomReservationRepository.findAll();
	}

	// 상세 페이지 - 예약 1개 조회
	public RoomReservation getRoomReservation(int seq) {
		return roomReservationRepository.findById(seq).get();
	}

	// 상세 페이지 - 예약 1개 조회
	public RoomReservation getRoomReservation(Member member) {
		return roomReservationRepository.findByRmember(member).get();
	}

	// 예약 수정
	public RoomReservation updateRoomReservation(RoomReservation roomReservation, int rid, Date sdate, Date edate,
			int cnt) {
		timeAndRoomDuplicate(roomReservation.getRmember(), rid, sdate, edate); // 날짜 중복 예약 방지
		roomDuplicate(rid); // 방 중복 예약 방지
		roomService.cstatus(roomReservation.getRroom().getRid());// 기존 방 예약 해제
		roomReservation.setRroom(getRoom(rid));
		roomReservation.setSdate(sdate);
		roomReservation.setEdate(edate);
		roomReservation.setCnt(cnt);
		roomService.rstatus(rid); // 수정할 방 예약 설정

		return roomReservationRepository.save(roomReservation);
	}

	// 예약 삭제
	public void deleteRoomReservation(RoomReservation roomReservation) {
		// 삭제하기 전에 Room예약한 정보 저장
		cancelRoomService.createRoomReservationCancel(roomReservation);

		// 삭제하기 전에 Room을 Availiable(예약 가능)상태로 변경
		roomService.cstatus(roomReservation.getRroom().getRid());

		// 삭제
		roomReservationRepository.delete(roomReservation);
	}

	// 요청할 페이지 번호를 매개변수로 입력 :
	public Page<RoomReservation> getList(Integer page, String kw) {

		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수
		// Sort : 정렬을 위한 객체
		List<Sort.Order> sorts = new ArrayList<>();
		sorts.add(Sort.Order.desc("seq"));

		Pageable pageable = PageRequest.of(page, 110, Sort.by(sorts));

		return roomReservationRepository.findAll(pageable);
	}
}
