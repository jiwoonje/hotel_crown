package com.hotel.Hotel.answer;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.question.Question;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Answer {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int aid;
	
	@Column(length=20000)
	private String content;
	
	@DateTimeFormat(pattern = "yyyy-mm-dd HH:MM")
	private LocalDateTime regdate;
	
	@DateTimeFormat(pattern = "yyyy-mm-dd HH:MM")
	private LocalDateTime modifyDate;
	
	// 답변이 등록될 원본 질문 글
	@ManyToOne
	@JoinColumn(name = "qid")
	private Question question;
	
	// 답변을 쓴 사람(author)
	@ManyToOne
	@JoinColumn(name = "mid")
	private Member member;
}
