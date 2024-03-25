package com.hotel.Hotel.question;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.member.Member;


import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service // 빈등록 : 클래스를 객체화 해서 spring framework에 등록
public class QuestionService {
	// controller ==> service ==> repository
	
	private final QuestionRepository questionRepository;
	
	// question 테이블에 값 insert
	public void create(String title, String content, Member member) 
	{

		Question q = new Question();
		q.setTitle(title);
		q.setContent(content);
		q.setMember(member);
		q.setRegdate(LocalDateTime.now());

		questionRepository.save(q);
	}

	// question테이블의 모든 레코드를 가져와서 리턴
	// 리스트 페이지
	// 페이징 처리되지 않는 모든 레코드를 출력
	public List<Question> getList() {
		return questionRepository.findAll();
	}

	// 1:1 문의 리스트
	public Page<Question> getList(int page) {
		Pageable pageable = PageRequest.of(page, 10);
		return this.questionRepository.findAll(pageable);
	}

	// 요청할 페이지 번호를 매개변수로 입력 :
	public Page<Question> getList(Integer page, String kw) {

		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수
		// Sort : 정렬을 위한 객체
		List<Sort.Order> sorts = new ArrayList<>();
		sorts.add(Sort.Order.desc("regdate"));

		Pageable pageable = PageRequest.of(page, 10, Sort.by(sorts));

		return questionRepository.findAll(pageable);

	}

	// 상세 페이지
	public Question get(Integer id) {
		Optional<Question> op = questionRepository.findById(id);
		return op.get();
	}

	// 수정하는 메소드 생성 :
	public void update(Question question, String title, String content) 
	{
		// controller 에서 기존의 값을 끄집어낸 question
		
		question.setTitle(title);
		question.setContent(content);
		question.setModifyDate(LocalDateTime.now());

		// 수정 : update
		questionRepository.save(question);
	}

	// 삭제하는 메소드 생성 :
	public void delete(Question question) 
	{

		questionRepository.delete(question);

	}

//	// 추천할 내용을 DB에 저장하는 메소드
//	// question : 추천할 질문, siteUser : 추천할 사용자
//	public void vote(Question question, SiteUser siteUser) {
//
//		// set<SiteUser>
//		question.getVoter().add(siteUser);
//
//		// 투표 내용이 저장됨.
//		questionRepository.save(question);
//
//	}

//	// 검색 기능 추가하기
//	private Specification<Question> search(String kw) {
//        return new Specification<>() {
//            private static final long serialVersionUID = 1L;
//            @Override
//            public Predicate toPredicate(Root<Question> q, CriteriaQuery<?> query, CriteriaBuilder cb) {
//                query.distinct(true);  // 중복을 제거 
//                Join<Question, SiteUser> u1 = q.join("author", JoinType.LEFT);
//                Join<Question, Answer> a = q.join("answerList", JoinType.LEFT);
//                Join<Answer, SiteUser> u2 = a.join("author", JoinType.LEFT);
//                return cb.or(cb.like(q.get("subject"), "%" + kw + "%"), // 제목 
//                        cb.like(q.get("content"), "%" + kw + "%"),      // 내용 
//                        cb.like(u1.get("username"), "%" + kw + "%"),    // 질문 작성자 
//                        cb.like(a.get("content"), "%" + kw + "%"),      // 답변 내용 
//                        cb.like(u2.get("username"), "%" + kw + "%"));   // 답변 작성자 
//            }
//        };
//    }

}