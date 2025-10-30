package com.finance_tracker.backend.dto;

import java.util.Date;

import com.finance_tracker.backend.utils.DateConverter;
import com.finance_tracker.backend.utils.GermanDecimalConverter;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;

import jakarta.validation.constraints.NotNull;

public class CreateTransactionDto {

    @NotNull(message = "amount must be set")
    @CsvCustomBindByName(column="Betrag", converter = GermanDecimalConverter.class)
    private Double amount;

    @CsvCustomBindByName(column="Buchungstag",  converter = DateConverter.class)
    private Date date;

    @CsvBindByName(column="Buchungstext")
    private String transactionMedium;


    private Integer categoryId;

    //@CsvBindByName(column="Beguenstigter/Zahlungspflichtiger")
    private Integer paymentPartnerId;

    private String importance;

    public Integer getCategoryId() {
        return this.categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
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

    public Integer getPaymentPartnerId() {
        return this.paymentPartnerId;
    }

    public void setPaymentPartnerId(Integer paymentPartnerId) {
        this.paymentPartnerId = paymentPartnerId;
    }

    public String getImportance() {
        return this.importance;
    }

    public void setImportance(String importance) {
        this.importance = importance;
    }



    @Override
    public String toString() {
        return "{" +
            " categoryId='" + getCategoryId() + "'" +
            ", amount='" + getAmount() + "'" +
            ", date='" + getDate() + "'" +
            ", transactionMedium='" + getTransactionMedium() + "'" +
            ", paymentPartnerId='" + getPaymentPartnerId() + "'" +
            ", importance='" + getImportance() + "'" +
            "}";
    }

}
