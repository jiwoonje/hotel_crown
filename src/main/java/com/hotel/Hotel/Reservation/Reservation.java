package com.hotel.Hotel.Reservation;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.hotel.Hotel.cancel.Cancel;
import com.hotel.Hotel.facility.Facility;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.room.Room;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table(name="reservation")
@Getter @Setter @ToString
@Entity
public class Reservation 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seq; //예약 번호, PK

	@ManyToOne
	@JoinColumn(name = "mid")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "rid")
	private Room room; //예약할 방 id 
	
	@ManyToOne
	@JoinColumn(name = "fid")
	private Facility facility; //예약할 시설 id
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date sdate; //예약 시작일
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date edate; //예약 종료일
	
	private int cnt; //예약 인원 수
	
	@OneToOne(mappedBy = "r", fetch = FetchType.LAZY)
	private Cancel cancel;


}
