package com.hotel.Hotel.facility;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Integer>
{
	/*
		select : findAll(), findById()
		insert : save() 
		update : save() 
		delete : delete()
 */
	Page<Facility> findAll(Pageable pageable);
}
