package com.hotel.Hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.facility.Facility;
import com.hotel.Hotel.facility.FacilityService;

@SpringBootTest
public class FacilityCRUDTest 
{
	@Autowired
	FacilityService facilityService;
	
	//생성
	@Test
	void create()
	{
		//facilityService.create("a", "aa");
		//facilityService.create("b", "bb");
	}
	
	//전체조회
	@Test
	void getList()
	{
		List<Facility> list = facilityService.getFacilityList();

		// for 문을 사용해서 list의 question 객체를 끄집어내서 출력 
		for ( int i = 0 ; i < list.size(); i++) {
			System.out.println(list.get(i).getFid());
		}
		assertEquals (2 , list.size());
	}
	
	//1개 조회
	@Test
	void get()
	{
		facilityService.getFacility(1);
	}
	
	//수정
	@Test
	void update()
	{
		//facilityService.update(53, "cc", "cccc");

	}
	
	//삭제
	@Test
	void delete()
	{
		facilityService.delete(52);
		facilityService.delete(53);
	}
}
