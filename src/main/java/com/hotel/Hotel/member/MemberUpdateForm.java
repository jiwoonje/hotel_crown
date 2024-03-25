package com.hotel.Hotel.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateForm 
{
	
	@NotEmpty(message="패스워드는 필수 입력 사항입니다. ")
	private String password;
	
	@NotEmpty(message="이름은 필수 입력 사항입니다. ")
	private String mname;
	
	@NotEmpty(message="메일 주소는 필수 입력 사항입니다. ")
	@Email
	private String email;
	
	@NotEmpty(message="주소는 필수 입력 사항입니다. ")
	private String address;
	
}
