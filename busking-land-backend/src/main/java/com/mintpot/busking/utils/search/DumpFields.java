package com.mintpot.busking.utils.search;

import com.mintpot.busking.builder.BuskingSearchBuilder;
import lombok.extern.log4j.Log4j2;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

@Log4j2
public class DumpFields {
//    public static void main(String[] args) throws IllegalAccessException {

//        BuskingSearchBuilder builder = BuskingSearchBuilder.builder()
//                .userName("t")
//                .build();

//        DumpFields.getValueFiedld(builder);
//    }
    public static <T> void inspect(Class<T> klazz) {
        Field[] fields = klazz.getDeclaredFields();
        System.out.printf("%d fields:%n", fields.length);
        for (Field field : fields) {
            System.out.printf("%s %s %s%n %s",
                    Modifier.toString(field.getModifiers()),
                    field.getType().getSimpleName(),
                    field.getName()
            );
        }
    }

    public static void getValueFiedld(Object o) throws IllegalAccessException {
        Field[] fields = o.getClass().getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
           log.info(fields[i].getType().getSimpleName() + " > " + fields[i].getName() + " > " + fields[i].get(o));
        }
    }

    public static void getValueFiedld(Object o, Object o2) throws IllegalAccessException {
        Field[] fields = o.getClass().getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            log.info(fields[i].getType().getSimpleName() + " > " + fields[i].getName() + " > " + fields[i].get(o));
        }
    }
}

/*
https://stackoverflow.com/questions/3333974/how-to-loop-over-a-class-attributes-in-java
 */