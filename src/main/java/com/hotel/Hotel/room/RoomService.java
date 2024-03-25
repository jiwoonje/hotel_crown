package com.hotel.Hotel.room;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.Base.Status;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoomService 
{
	public final RoomRepository roomRepository;
	
	//방 생성
	public Room create(String rname, String rtype, int rnum, int rprice)
	{
		Room room = new Room();
		room.setRname(rname);
		room.setRtype(rtype);
		room.setRnum(rnum); // 방 호수
		room.setRprice(rprice); // 방 가격
		room.setRstatus(Status.AVAILABLE); // 방 생성시에는 예약 가능한 상태
		//예약 후에는 예약 불가능 상태로 변경
		return roomRepository.save(room);
	}
	
	
	//방 정보 수정
	public Room update
	(
			int rid, String rname, String rtype, int rnum, int rprice
	)
	{
		Room room = roomRepository.findById(rid).get();
		room.setRname(rname);
		room.setRtype(rtype);
		room.setRnum(rnum);
		room.setRprice(rprice);
		return roomRepository.save(room);
	}
	
	
	//방 상태 변경 - 예약생성시 선택한 방id를 가지고 와서 상태를 변경
	public Room rstatus(int rid)
	{
		Room room = roomRepository.findById(rid).get();
		room.setRstatus(Status.DENIED);
		return roomRepository.save(room); 
	}

	//방 상태 변경 - 예약취소(예약 삭제)시 선택한 방id를 가지고 와서 상태를 변경
	public Room cstatus(int rid)
	{
		Room room = roomRepository.findById(rid).get();
		room.setRstatus(Status.AVAILABLE);
		return roomRepository.save(room); 
	}
	
	
	//방 1개 출력
	public Room getRoom(int rid)
	{
		return roomRepository.findById(rid).get();
	}
	
	
	//방 전체 출력
	public List<Room> getRoomList()
	{
		return roomRepository.findAll();
	}
	
	
	//방 삭제
	public void delete(int rid)
	{
		Optional<Room> op = roomRepository.findById(rid);
		Room room = null;
		if(op.isPresent())
		{
			room = op.get();
		}
		
		roomRepository.delete(room);
		
	}

	// 요청할 페이지 번호를 매개변수로 입력 : 
	public Page<Room> getList(Integer page, String kw) 
	{
		
		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수 
		// Sort : 정렬을 위한 객체 
		List<Sort.Order> sorts = new ArrayList<>(); 
		sorts.add(Sort.Order.desc("rid")); 
		
		
		Pageable pageable = PageRequest.of(page, 10, Sort.by(sorts)); 
					
		return roomRepository.findAll(pageable); 
	}
}
