package com.finance_tracker.backend.dto;

import java.util.Date;
import java.util.Locale.Category;

import com.finance_tracker.backend.model.PaymentPartner;
import com.finance_tracker.backend.model.User;

import jakarta.validation.constraints.NotNull;

public class ReadTransactionDto {
    private String id;
    private ReadUserDto user;
    private ReadCategoryDto category;

    private Double amount;

    private Date date;

    private String transactionMedium;
    private ReadPaymentPartnerDto paymentPartner;
    private String importance;


    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ReadUserDto getUser() {
        return this.user;
    }

    public void setUser(ReadUserDto user) {
        this.user = user;
    }

    public ReadCategoryDto getCategory() {
        return this.category;
    }

    public void setCategory(ReadCategoryDto category) {
        this.category = category;
    }

    public Double getAmount() {
        return this.amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTransactionMedium() {
        return this.transactionMedium;
    }

    public void setTransactionMedium(String transactionMedium) {
        this.transactionMedium = transactionMedium;
    }

    public ReadPaymentPartnerDto getPaymentPartner() {
        return this.paymentPartner;
    }

    public void setPaymentPartner(ReadPaymentPartnerDto paymentPartner) {
        this.paymentPartner = paymentPartner;
    }

    public String getImportance() {
        return this.importance;
    }

    public void setImportance(String importance) {
        this.importance = importance;
    }

}
