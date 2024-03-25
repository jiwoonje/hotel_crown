package com.hotel.Hotel.cancelfacility;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.hotel.Hotel.FacilityReservation.FacilityReservation;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table(name="CancelFacility")
@Getter @Setter @ToString
@Entity
public class CancelFacility
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seq; //취소 목록 번호, PK
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "seq")
	private FacilityReservation fr; //시설 예약 기록
	
	private LocalDateTime regdate; //등록일자
	
	private int save_seq; // 삭제된 예약 번호 저장
	
	private String save_mid; // 삭제된 예약한 사람 저장
	
	private int save_fid; // 삭제된 시설 번호 저장
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date save_date; // 삭제된 시설 예약 날짜 저장
	
	private int save_cnt; // 삭제된 시설 예약 인원 저장
}
