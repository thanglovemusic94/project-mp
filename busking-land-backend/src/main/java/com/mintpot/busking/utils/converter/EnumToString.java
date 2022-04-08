package com.mintpot.busking.utils.converter;

import java.util.Arrays;

public class EnumToString {
    public static String[] toArray(Class<? extends Enum<?>> e) {
        String[] arr = Arrays.stream(e.getEnumConstants()).map(Enum::name).toArray(String[]::new);
//        for (String i: arr){
//            System.out.println(i);
//        }
        return arr;
    }
}
