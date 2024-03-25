package com.hotel.Hotel.cancelroom;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.RoomReservation.RoomReservation;
import com.hotel.Hotel.RoomReservation.RoomReservationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CancelRoomService 
{
	public final RoomReservationRepository roomReservationRepository;
	public final CancelRoomRepository cancelRoomRepository;
	
	public Page<CancelRoom> getList(Integer page, String kw) 
	{
		
		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수 
		// Sort : 정렬을 위한 객체 
		List<Sort.Order> sorts = new ArrayList<>(); 
		sorts.add(Sort.Order.desc("seq")); 
		
		
		Pageable pageable = PageRequest.of(page, 110, Sort.by(sorts)); 
					
		return cancelRoomRepository.findAll(pageable); 
	}
//////////////////////////////////////////////////////////////////////

	//방 취소 리스트 생성
 	public CancelRoom createRoomReservationCancel
 	(
 		RoomReservation rr
 	)
 	{
 		CancelRoom cancelRoom = new CancelRoom();
 		cancelRoom.setRr(rr);
 		cancelRoom.setSave_seq(rr.getSeq());
 		cancelRoom.setSave_mid(rr.getRmember().getMid());
 		cancelRoom.setSave_rid(rr.getRroom().getRid());
 		cancelRoom.setSave_sdate(rr.getSdate());
 		cancelRoom.setSave_edate(rr.getEdate());
 		cancelRoom.setSave_cnt(rr.getCnt());
 		cancelRoom.setRegdate(LocalDateTime.now());
 		return cancelRoomRepository.save(cancelRoom);
 	}
	
	
	// 방&시설 Cancel테이블의 모든 레코드를 가져와서 리턴
 	// 페이징 처리되지 않는 모든 레코드를 출력
 	// 리스트 페이지 - 취소 목록 전체 조회
 	public List<CancelRoom> getCancelList()
 	{
 		return cancelRoomRepository.findAll();
 	}
 
 
 	//방 상세 페이지 - 취소 목록 1개 조회
 	public CancelRoom getCancelRoom(int seq)
 	{
 		return cancelRoomRepository.findById(seq).get();
 	}
 
 	//방&시설 취소 삭제
 	public void deleteCancelRoom(CancelRoom cancel)
 	{
 		//삭제
 		cancelRoomRepository.delete(cancel);
 	}
}
