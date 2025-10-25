package com.finance_tracker.backend;

import java.lang.reflect.Field;

public class Util {
    public static <T> void mergeObjects(T target, T source) {
        if (source == null) {
            return;
        }

        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
