package com.hotel.Hotel.member;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.hotel.Hotel.Base.Role;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	public final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	// 회원가입 전 아이디 중복 확인
	private void validateDuplicateMember(Member member) {
		Member findMember = memberRepository.findById(member.getSeq()).get();
		if (findMember != null) {
			throw new IllegalStateException("이미 가입된 회원입니다.");
		}
	}

	// 회원 생성
	public Member create(String mid, String password1, String name, String email, String address) {

		Member member = new Member();
		member.setMid(mid);
		member.setPassword(passwordEncoder.encode(password1));

		member.setMname(name);
		member.setEmail(email);
		member.setAddress(address);

		if (mid == "admin") {
			member.setRole(Role.ADMIN);
		}

		member.setRole(Role.USER);

		// validateDuplicateMember(member);
		return memberRepository.save(member);
	}

	// 전체 유저 정보 출력
	public List<Member> getMemberList() {
		return memberRepository.findAll();
	}

	// 유저 정보 출력 1개
	public Member getMember(int seq) {
		return memberRepository.findById(seq).get();
	}

	// 유저 정보 출력 1개 - id로
	public Member getMember(String mid) {
		return memberRepository.findByMid(mid).get();
	}

	// 요청할 페이지 번호를 매개변수로 입력 :
	public Page<Member> getList(Integer page, String kw) {

		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수
		// Sort : 정렬을 위한 객체
		List<Sort.Order> sorts = new ArrayList<>();
		sorts.add(Sort.Order.desc("seq"));

		Pageable pageable = PageRequest.of(page, 10, Sort.by(sorts));

		return memberRepository.findAll(pageable);
	}

	// 유저 정보 수정
	public Member update(int seq, String password, String name, String email, String address) {
		Member member = memberRepository.findById(seq).get();
		member.setPassword(passwordEncoder.encode(password));
		member.setMname(name);
		member.setEmail(email);
		member.setAddress(address);
		return memberRepository.save(member);
	}

	// 유저 정보 삭제
	public void delete(int seq) {
		Member member = memberRepository.findById(seq).get();
		memberRepository.delete(member);
	}
}
