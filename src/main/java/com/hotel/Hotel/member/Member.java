package com.hotel.Hotel.member;


import java.util.ArrayList;
import java.util.List;

import com.hotel.Hotel.Base.Role;
import com.hotel.Hotel.FacilityReservation.FacilityReservation;
import com.hotel.Hotel.Reservation.Reservation;
import com.hotel.Hotel.RoomReservation.RoomReservation;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="member")
@Getter @Setter
@ToString
public class Member
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seq; //회원 번호, PK
	
	private String mid; //회원 id

	private String password; //회원 비밀번호
	
	private String mname; //회원 이름
	
	@Column(unique = true)
	private String email; //회원 이메일
	
	private String address; //회원 주소
	
	@Enumerated(EnumType.STRING)
	private Role role; //회원 권한
	
	@OneToMany(mappedBy="member")
	private List<Reservation> member = new ArrayList<>();

	@OneToMany(mappedBy="rmember")
	private List<RoomReservation> rmember = new ArrayList<>();
	
	@OneToMany(mappedBy="fmember")
	private List<FacilityReservation> fmember = new ArrayList<>();
}
