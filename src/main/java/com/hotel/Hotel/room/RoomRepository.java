package com.hotel.Hotel.room;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer>
{
	/*
 		select : findAll(), findById()
 		insert : save() 
 		update : save() 
 		delete : delete()
	 */
	
	Page<Room> findAll(Pageable pageable); 
}
