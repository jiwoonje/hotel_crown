package com.hotel.Hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberRepository;
import com.hotel.Hotel.question.Question;
import com.hotel.Hotel.question.QuestionService;

@SpringBootTest
public class QuestionCRUDTest {

	@Autowired
	QuestionService questionService;

	@Autowired
	MemberRepository memberRepository;

	@Test
	void create() {
		Member member = memberRepository.findByMid("a").get();
		questionService.create("aa", "aa", member);
		questionService.create("bb", "bb", member);
		questionService.create("cc", "cc", member);
		questionService.create("dd", "dd", member);
	}

	@Test
	void get() {
		questionService.get(152);
	}

	@Test
	void getList() {
		List<Question> list = questionService.getList();

		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).getQid());
		}
		assertEquals(2, list.size());
	}

	// @Test
	void update() {
		questionService.update(questionService.get(152), "aa", "aa");
	}

	// @Test
	void delete() {
		questionService.delete(questionService.get(152));
	}

}