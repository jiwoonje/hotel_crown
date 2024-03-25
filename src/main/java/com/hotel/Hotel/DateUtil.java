package com.hotel.Hotel;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil 
{
	private static SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
	
	public static Date pareDate(String dateStr) throws ParseException 
	{
		Date date = formatter.parse(dateStr);
		return date;
	}
	
	public static String formatDate(Date date)
	{
		String dateStr = null;
		if(date != null)
		{
			dateStr = formatter.format(date);
		}
		return dateStr;
	}
}
