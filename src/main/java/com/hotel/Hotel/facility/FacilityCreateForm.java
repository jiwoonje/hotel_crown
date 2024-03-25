package com.hotel.Hotel.facility;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FacilityCreateForm 
{
	@NotEmpty(message="시설 이름은 필수 입력 사항입니다. ")
	private String fname;
	
	@NotEmpty(message="시설 타입은 필수 입력 사항입니다. ")
	private String ftype;
	
	private int fprice;
}

