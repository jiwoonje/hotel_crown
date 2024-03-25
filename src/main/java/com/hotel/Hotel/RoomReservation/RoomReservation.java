package com.hotel.Hotel.RoomReservation;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.hotel.Hotel.cancelroom.CancelRoom;
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

@Table(name = "RoomReservation")
@Getter
@Setter
@ToString
@Entity
public class RoomReservation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seq; // 예약 번호, PK

	@ManyToOne
	@JoinColumn(name = "mid")
	private Member rmember;

	@ManyToOne
	@JoinColumn(name = "rid")
	private Room rroom; // 예약할 방 id

	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date sdate; // 예약 시작일

	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date edate; // 예약 종료일

	private int cnt; // 예약 인원 수

	@OneToOne(mappedBy = "rr", fetch = FetchType.LAZY)
	private CancelRoom cancelRoom;

}
