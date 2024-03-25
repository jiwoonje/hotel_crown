package com.hotel.Hotel;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.hotel.Hotel.FacilityReservation.FacilityReservationService;
import com.hotel.Hotel.RoomReservation.RoomReservation;
import com.hotel.Hotel.RoomReservation.RoomReservationRepository;
import com.hotel.Hotel.RoomReservation.RoomReservationService;
import com.hotel.Hotel.cancelfacility.CancelFacility;
import com.hotel.Hotel.cancelfacility.CancelFacilityService;
import com.hotel.Hotel.cancelroom.CancelRoom;
import com.hotel.Hotel.cancelroom.CancelRoomService;
import com.hotel.Hotel.member.Member;
import com.hotel.Hotel.member.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MainController 
{
	private final MemberService memberService;
	private final RoomReservationService roomReservationService;
	private final RoomReservationRepository roomReservationRepository;
	private final FacilityReservationService facilityReservationService;
	private final CancelRoomService cancelRoomService;
	private final CancelFacilityService cancelFacilityService;

    @GetMapping("/")
    public String main() 
    {
        return "index";
    }
    
    @GetMapping("/admin")
    public String admin() 
    {
        return "admin";
    }
    
    @GetMapping("/facility_all")
    public String facility_all() 
    {
        return "facility_all";
    }
    
    @GetMapping("/bookFacility")
    public String bookFacility() 
    {
        return "bookFacility";
    }
    
    @GetMapping("/bookRoom")
    public String bookRoom() 
    {
        return "bookRoom";
    }
    
    @GetMapping("/facility_reservation")
    public String facility_reservation() 
    {
        return "facility_reservation";
    }
    
    @GetMapping("/facility_golf")
    public String facility_golf() 
    {
        return "facility_golf";
    }

    
    @GetMapping("/facility_health")
    public String facility_health() 
    {
        return "facility_health";
    }

    
    @GetMapping("/facility_pool")
    public String facility_pool() 
    {
        return "facility_pool";
    }
    
    
    @GetMapping("/facility_restaurant")
    public String facility_restaurant() 
    {
    	return "facility_restaurant";
    }
    
    @GetMapping("/getFacilityCancle")
    public String getFacilityCancle() 
    {
        return "getFacilityCancle";
    }
    
    @GetMapping("/getMyFacilityBook")
    public String getMyFacilityBook() 
    {
        return "getMyFacilityBook";
    }
    
    @GetMapping("/getMyRoomBook")
    public String getMyRoomBook() 
    {
        return "getMyRoomBook";
    }
    
    @GetMapping("/getRoomCancle")
    public String getRoomCancle() 
    {
        return "getRoomCancle";
    }
    
    
    @GetMapping("/join")
    public String join() 
    {
        return "join";
    }
    
    @GetMapping("/payment")
    public String payment() 
    {
        return "payment";
    }
    
    @GetMapping("/payment2")
    public String payment2() 
    {
        return "payment2";
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    @GetMapping("/myCancleList")
    public String myCancleList() 
    {
        return "myCancleList";
    }
    
    
    @GetMapping("/myPage")
    public String myPage
    (
    		Model model, 
    		Principal principal 
    ) 
    {
    	// 현재 로그온한 계정을 가지고옴 
    	System.out.println(principal.getName());
    	
    	// DB에서 Member 객체를 끄집어 냄. 
    	Member m = memberService.getMember(principal.getName());
    	System.out.println(m.getSeq());

    	// Model 에 seq
    	model.addAttribute("seq" , m.getSeq());
    	
    	// Model 에 Member 
    	model.addAttribute("member" , m);

        return "myPage";
    }
    
    @GetMapping("/myBookList_room")
    public String myBookList_room
    (
    		Model model, 
    		Principal principal
    ) 
    {
    	// 현재 로그온한 계정을 가지고옴 
    	System.out.println(principal.getName());
    	
    	Member m = memberService.getMember(principal.getName());
    	System.out.println(m.getSeq());
    	
    	// DB에서 RoomReservation 객체를 끄집어 냄. 
    	
    	RoomReservation rr = roomReservationService.getRoomReservation(m);
    	System.out.println(rr.getSeq());

    	// Model 에 seq
    	model.addAttribute("seq" , rr.getSeq());
    	
    	// Model 에 Member 
    	model.addAttribute("roomReservation" , rr);
    	
        return "myBookList_room";
    }
    
    @GetMapping("/myBookList_facility")
    public String myBookList_facility
    (
    		Model model, 
    		Principal principal
    ) 
    {
    	// 현재 로그온한 계정을 가지고옴 
    	System.out.println(principal.getName());
    	
        return "myBookList_facility";
    }
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    @GetMapping("/room_all")
    public String room_all() 
    {
        return "room_all";
    }
    
    @GetMapping("/room_classic")
    public String room_classic() 
    {
        return "room_classic";
    }
    
    @GetMapping("/room_deluxe")
    public String room_deluxe() 
    {
        return "room_deluxe";
    }
    
    @GetMapping("/room_family")
    public String room_family() 
    {
        return "room_family";
    }
    
    @GetMapping("/room_luxury")
    public String room_luxury() 
    {
        return "room_luxury";
    }
    
    @GetMapping("/room_suite")
    public String room_suite() 
    {
        return "room_suite";
    }
    
    @GetMapping("/room_superior")
    public String room_superior() 
    {
        return "room_superior";
    }
    
    @GetMapping("/room_reservation")
    public String room_reservation() 
    {
        return "room_reservation";
    }

    
    @GetMapping("/room")
    public String room() 
    {
        return "room";
    }

}
