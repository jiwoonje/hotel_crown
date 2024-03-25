package com.hotel.Hotel.FacilityReservation;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.hotel.Hotel.cancelfacility.CancelFacility;
import com.hotel.Hotel.facility.Facility;
import com.hotel.Hotel.member.Member;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name="FacilityReservation")
@Getter @Setter @ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FacilityReservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seq; //예약 번호, PK

	@ManyToOne
	@JoinColumn(name = "mid")
	private Member fmember;

	@ManyToOne
	@JoinColumn(name = "fid")
	private Facility ffacility; //예약할 시설 id 
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date date; //예약일

	private int cnt; //예약 인원 수
	
	@OneToOne(mappedBy = "fr", fetch = FetchType.LAZY)
	private CancelFacility cancelFacility;

}
