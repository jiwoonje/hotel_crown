package com.hotel.Hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.room.Room;
import com.hotel.Hotel.room.RoomService;

@SpringBootTest
public class RoomCRUDTest 
{

	@Autowired
	RoomService roomService;
	
	//생성
	@Test
	void create()
	{
		//roomService.create("a", "aa");
		//roomService.create("b", "bb");
	}
	
	//전체조회
	@Test
	void getList()
	{
		List<Room> list = roomService.getRoomList();

		// for 문을 사용해서 list의 question 객체를 끄집어내서 출력 
		for ( int i = 0 ; i < list.size(); i++) {
			System.out.println(list.get(i).getRid());
		}
		assertEquals (2 , list.size());
	}
	
	//1개 조회
	@Test
	void get()
	{
		roomService.getRoom(1);
	}
	
	//수정
	@Test
	void update()
	{
		//roomService.update(2, "cc", "cccc");
		roomService.getRoom(2);
	}
	
	//삭제
	@Test
	void delete()
	{
		roomService.delete(1);
		roomService.delete(2);
	}
}
