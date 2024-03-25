package com.hotel.Hotel.cancelfacility;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CancelFacilityRepository extends JpaRepository<CancelFacility, Integer>
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
	Page<CancelFacility> findAll(Pageable pageable);
	

}
