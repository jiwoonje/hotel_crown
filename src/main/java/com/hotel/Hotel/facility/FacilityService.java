package com.hotel.Hotel.facility;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hotel.Hotel.Base.Status;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class FacilityService 
{
	public final FacilityRepository facilityRepository;
	
	//시설 생성
	public Facility create(String fname, String ftype, int fprice)
	{
		Facility facility = new Facility();
		facility.setFname(fname);
		facility.setFtype(ftype);
		facility.setFprice(fprice);
		facility.setFstatus(Status.AVAILABLE); //시설 생성시 default = 예약 가능
		return facilityRepository.save(facility);
	}
	
	
	//시설 정보 수정
	public Facility update
	(
			int fid, String fname, String ftype, int fprice
	)
	{
		Facility facility = facilityRepository.findById(fid).get();
		facility.setFname(fname);
		facility.setFtype(ftype);
		facility.setFprice(fprice);
		return facilityRepository.save(facility);
	}
	
	
	//시설 상태 변경 - 예약시 선택한 시설id를 가지고 와서 상태를 변경
	public Facility fstatus(int fid)
	{
		Facility facility = facilityRepository.findById(fid).get();
		facility.setFstatus(Status.DENIED);
		return facilityRepository.save(facility); 
	}
	
	//시설 상태 변경 - 예약시 선택한 시설id를 가지고 와서 상태를 변경
	public Facility cstatus(int fid)
	{
		Facility facility = facilityRepository.findById(fid).get();
		facility.setFstatus(Status.AVAILABLE);
		return facilityRepository.save(facility); 
	}	
	
	//시설 1개 출력
	public Facility getFacility(int fid)
	{
		return facilityRepository.findById(fid).get();
	}
	
	
	//시설 전체 출력
	public List<Facility> getFacilityList()
	{
		return facilityRepository.findAll();
	}
	
	
	//시설 삭제
	public void delete(int fid)
	{
		Optional<Facility> op = facilityRepository.findById(fid);
		Facility facility = null;
		if(op.isPresent())
		{
			facility = op.get();
		}
		
		facilityRepository.delete(facility);	
	}
	
	// 요청할 페이지 번호를 매개변수로 입력 : 
	public Page<Facility> getList(Integer page, String kw) 
	{
		
		// page : 요청하는 페이지 번호, 10 : 한페이지에서 출력 하는 레코드 갯수 
		// Sort : 정렬을 위한 객체 
		List<Sort.Order> sorts = new ArrayList<>(); 
		sorts.add(Sort.Order.desc("fid")); 
		
		
		Pageable pageable = PageRequest.of(page, 10, Sort.by(sorts)); 
					
		return facilityRepository.findAll(pageable); 
	}
}
