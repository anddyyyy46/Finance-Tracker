package com.finance_tracker.backend.utils;

import com.opencsv.bean.AbstractBeanField;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class GermanDecimalConverter extends AbstractBeanField<Double, String> {
    @Override
    protected Double convert(String value) {
        try{
            if (value == null || value.isBlank())
                return null;

            NumberFormat nf = NumberFormat.getInstance(Locale.GERMANY);
            return nf.parse(value.trim()).doubleValue();
        }catch(Exception e){
            System.out.println("Error: " + e);
            return null;
        }
    }
}