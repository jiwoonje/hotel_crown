package com.hotel.Hotel.facility;

import java.util.ArrayList;
import java.util.List;

import com.hotel.Hotel.Base.Status;
import com.hotel.Hotel.FacilityReservation.FacilityReservation;
import com.hotel.Hotel.Reservation.Reservation;

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

@Table(name = "facility")
@Getter
@Setter
@ToString
@Entity
public class Facility {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int fid; // 시설 번호 PK

	private String fname; // 시설 이름

	private String ftype; // 시설 유형

	private int fprice; // 시설 가격

	@Enumerated(EnumType.STRING)
	private Status fstatus; // 예약 가능 여부

	@OneToMany(mappedBy = "facility")
	private List<Reservation> facility = new ArrayList<>();

	@OneToMany(mappedBy = "ffacility")
	private List<FacilityReservation> ffacility = new ArrayList<>();

}
