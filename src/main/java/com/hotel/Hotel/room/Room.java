package com.hotel.Hotel.room;

import java.util.ArrayList;
import java.util.List;

import com.hotel.Hotel.Base.Status;
import com.hotel.Hotel.Reservation.Reservation;
import com.hotel.Hotel.RoomReservation.RoomReservation;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table(name = "room")
@Getter @Setter
@ToString
@Entity
public class Room 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int rid; //방 번호 PK
	
	private String rname; //방 이름
	
	private String rtype; //방 유형
	
	private int rnum;// 방 호수
	
	private int rprice; //방 가격
	
	@Enumerated(EnumType.STRING)
	private Status rstatus; //예약 가능 여부

	@OneToMany(mappedBy = "room")
	private List<Reservation> room = new ArrayList<>();

	@OneToMany(mappedBy = "rroom")
	private List<RoomReservation> rroom = new ArrayList<>();
}
