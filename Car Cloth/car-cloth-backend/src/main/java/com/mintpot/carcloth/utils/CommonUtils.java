package com.mintpot.carcloth.utils;

import java.security.SecureRandom;

public class CommonUtils {
    //DIGIT is String number generate random string number
    private static final String DIGIT = "0123456789";

    public static String generateRandomDigit(int len) {
        var r = new SecureRandom();
        int maxLen = DIGIT.length();
        var sb = new StringBuilder();
        for (var j = 0; j < len; j++) {
            sb.append(DIGIT.charAt(r.nextInt(maxLen)));
        }
        return sb.toString();
    }
}
