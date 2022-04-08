package com.mintpot.pii.utils;

import java.util.Date;

public class DateTimeUtils {
    public static long getDiffDays(Date compareDate, Date targetDate){
        return (compareDate.getTime() - targetDate.getTime()) / (1000 * 3600 * 24);
    }
}
