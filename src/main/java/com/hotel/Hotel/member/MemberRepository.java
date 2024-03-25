package com.hotel.Hotel.member;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer>
{
	/*
 	select : findAll(), findById()
 	insert : save() 
 	update : save() 
 	delete : delete()
	 */

	Optional<Member> findByMid(String mid);
	Optional<Member> findByRole(String role);
	
	// 페이징 처리 : Page <Question>  findAll(Pageable pageable)
	// Page : 페이징을 처리하기 위한 클래스 
	// Pageable : 페이징 처리하는 인터페이스 
	Page<Member> findAll(Pageable pageable); 
}
