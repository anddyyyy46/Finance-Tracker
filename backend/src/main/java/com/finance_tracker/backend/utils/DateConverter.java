package com.finance_tracker.backend.utils;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.opencsv.bean.AbstractBeanField;

public class DateConverter extends AbstractBeanField<Date, String>  {
 
    
    @Override
    protected Date convert(String value) {
        try{
            if (value == null || value.isBlank())
                return null;
            String pattern = "dd.MM.yyyy";
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            Date date = sdf.parse(value);
            return date;
        }catch(Exception e){
            System.out.println("Error: " + e);
            return null;
        }
    }

}
