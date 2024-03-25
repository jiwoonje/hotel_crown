package com.hotel.Hotel.member;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.Base.Role;


import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberSecurityService implements UserDetailsService
{
	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String mid) throws UsernameNotFoundException 
	{
		Optional<Member> member = memberRepository.findByMid(mid);
		
		if(member.isEmpty())
		{
			throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
		}
		
		//사용자가 존재하는 경우 : Optional 에 저장된 Member객체를 끄집어 냄 
		//member.getMid 		
		Member m = member.get();
		
		// 권한을 부여하는 객체를 저장하는 List 생성 
		// GrantedAuthority : 세션에 적용할 권한을 넣어줌		
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		System.out.println("mid --> " + mid );
		System.out.println("Role --> " + m.getRole());
		
		
		
		if("admin".equals(mid))
		{
			authorities.add (new SimpleGrantedAuthority(Role.ADMIN.getValue()));
		}
		
		else
		{
			authorities.add (new SimpleGrantedAuthority(Role.USER.getValue()));
		}
		
		return new User(m.getMid(), m.getPassword(),authorities);
	}


}
