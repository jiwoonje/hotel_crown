package com.hotel.Hotel.room;


import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomCreateForm 
{ 
	
	@NotEmpty(message="방 이름은 필수 입력 사항입니다. ")
	private String rname;
	
	@NotEmpty(message="방 타입은 필수 입력 사항입니다. ")
	private String rtype;
	
	
	private int rnum;
	
	
	private int rprice;

}
