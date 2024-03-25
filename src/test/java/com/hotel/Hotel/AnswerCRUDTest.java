package com.hotel.Hotel;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.answer.Answer;
import com.hotel.Hotel.answer.AnswerRepository;
import com.hotel.Hotel.answer.AnswerService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;
import com.hotel.Hotel.question.Question;
import com.hotel.Hotel.question.QuestionRepository;
import com.hotel.Hotel.question.QuestionService;

@SpringBootTest
public class AnswerCRUDTest 
{

	@Autowired
	QuestionService questionService;

	@Autowired
	AnswerService answerService;

	@Autowired
	QuestionRepository questionRepository;

	@Autowired
	AnswerRepository answerRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Test
	void create() {
		Optional<Question> op = questionRepository.findById(402);
		Question q = null;
		
		if ( op.isPresent()) {
			q = op.get(); 
		}
		
		Answer a1 = new Answer();

		a1.setContent("첫번째 답변이에요");
		a1.setModifyDate(LocalDateTime.now());
		
		Member m1 = memberRepository.findByMid("a").get();
		a1.setMember(m1);
		
		a1.setQuestion(q);
		
		answerRepository.save(a1);
		
		Answer a2 = new Answer();

		a2.setContent("첫번째 답변이에요");
		a2.setModifyDate(LocalDateTime.now());
		
		Member m2 = memberRepository.findByMid("a").get();
		a2.setMember(m2);
		
		a2.setQuestion(q);
		
		answerRepository.save(a2);
	}
	
	@Test
	void get() {
		answerService.get(502);
	}
		
	@Test
	void update() {
		answerService.update(answerService.get(502), "첫번째 답변을 수정");
	}
	
	//@Test
	void delete() {
		answerService.delete(answerService.get(502));
	}
	
}