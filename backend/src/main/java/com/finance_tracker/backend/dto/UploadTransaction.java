package com.finance_tracker.backend.dto;

import java.util.Date;

import com.finance_tracker.backend.model.Category;
import com.finance_tracker.backend.model.PaymentPartner;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.utils.GermanDecimalConverter;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;

public class UploadTransaction {
    

    private Category category;

    @CsvCustomBindByName(column="Betrag", converter = GermanDecimalConverter.class)
    private Double amount;

    private Date date;

    @CsvBindByName(column="Buchungstext")
    private String transactionMedium;

    //@CsvBindByName(column="Beguenstigter/Zahlungspflichtiger")
    private PaymentPartner paymentPartner;

    private String importance;

    private User user;

    public Double getAmount() { 
        return this.amount; 
    }


    public User getUser() { 
        return this.user; 
    }

    public void setUser(User user){
        this.user = user;
    }


}
