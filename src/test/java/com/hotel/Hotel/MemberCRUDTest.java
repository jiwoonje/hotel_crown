package com.hotel.Hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberService;


@SpringBootTest
public class MemberCRUDTest 
{	
	@Autowired
	MemberService memberService;
	
	//생성
	@Test
	void create()
	{
		memberService.create("a","1234","aa","a@a","aaaa");
		memberService.create("b","1234","bb","b@b","bbbb");
	}
	
	
	//전체 조회
	@Test
	void getList()
	{
		List<Member> list = 
				memberService.getMemberList(); 
		
		// for 문을 사용해서 list의 question 객체를 끄집어내서 출력 
		for ( int i = 0 ; i < list.size(); i++) {
			System.out.println(list.get(i).getSeq());
		}
		assertEquals (2 , list.size());
	}
	
	
	//1개 조회
	@Test 
	void get()
	{
		memberService.getMember(2);
	}
	
	
	//수정
	@Test
	void update()
	{
		memberService.update(2, "bbb","5678","bb@bb","bbbbbbb");
		memberService.getMember(2);
	}
	
	
	
	//삭제
	@Test
	void delete()
	{
		//memberService.delete(1);

	}
	
	
}
