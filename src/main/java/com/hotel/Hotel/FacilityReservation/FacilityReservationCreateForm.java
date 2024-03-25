package com.hotel.Hotel.FacilityReservation;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class FacilityReservationCreateForm 
{
	private int fid;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date date; //예약일
	
	@NotEmpty(message="인원 수는 필수 입력 사항입니다.")
	private int cnt; //예약 인원 수
}
