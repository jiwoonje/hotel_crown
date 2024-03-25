package com.hotel.Hotel.Reservation;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReservationForm 
{	
	private int rid;
	
	private int fid;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date sdate; //예약 시작일
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date edate; //예약 종료일
	
	@NotEmpty(message="인원 수는 필수 입력 사항입니다.")
	private int cnt; //예약 인원 수

}
