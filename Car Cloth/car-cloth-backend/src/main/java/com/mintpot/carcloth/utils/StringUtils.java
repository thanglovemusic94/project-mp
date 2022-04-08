package com.mintpot.carcloth.utils;

public class StringUtils {

    public static String join(final String token, String... items) {

        StringBuilder strRes = new StringBuilder();
        for (String item : items) {
            strRes.append(item).append(token);
        }

        if (strRes.length() > 0)
            strRes.deleteCharAt(strRes.length() - 1);

        return strRes.toString();
    }

}
