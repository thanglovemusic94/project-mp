package com.mintpot.busking.utils;

import org.apache.commons.lang3.time.DateUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.TimeZone;

public class DateTimeUtils {

    public static Date asDate(LocalDate localDate) {
        return localDate == null ? null : Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date asDate(LocalDateTime localDateTime) {
        return localDateTime == null ? null : Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    } 

    //https://www.baeldung.com/java-string-to-date
    public static Date asDate(String dateInString) throws ParseException {
        return dateInString == null ? null : DateUtils.parseDate(dateInString,new String[] { "yyyy-MM-dd'T'hh:mm:ss","yyyy-MM-dd'T'HH:mm:ss", "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'","YYYY-MM-DD HH:mm:ss.S", "yyyy-MM-dd hh:mm:ss","yyyy-MM-dd HH:mm:ss","YYYY-MM-DD HH:mm:ss" }); //nhan 1 mang cac dinh dang co the co
    }

    public static LocalDate asLocalDate(Date date) {
        return date == null ? null : Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public static LocalDateTime asLocalDateTime(Date date) {
        return date == null ? null : Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    public static LocalDateTime asLocalDateTime(String localDatetime) {
        return localDatetime == null ? null : LocalDateTime.parse(localDatetime);
    }

    //https://www.javatpoint.com/java-date-to-string
    //https://www.baeldung.com/java-string-to-date
    //https://mkyong.com/java8/java-8-convert-date-to-localdate-and-localdatetime/
    public static String asString(Date date, String format) {
        return date == null ? null :  new SimpleDateFormat(format).format(date);
    }

    //https://mkyong.com/java8/java-8-how-to-format-localdatetime/
    public static String asString(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return date == null ? null :  date.format(formatter);
    }

    public static void main(String[] args) throws ParseException {

        System.out.println(asDate("2018-05-05T11:50:55"));
        System.out.println(asDate("2021-03-30 18:40:00"));
        System.out.println(asLocalDateTime("2018-05-05T11:50:55"));
    }
}
