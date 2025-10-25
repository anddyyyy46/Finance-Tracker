package com.finance_tracker.backend.dto;

import java.util.Date;
import java.util.Locale.Category;

import com.finance_tracker.backend.model.PaymentPartner;
import com.finance_tracker.backend.model.User;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadTransactionDto {
    private String id;
    private ReadUserDto user;
    private int categoryId;

    private Double amount;

    private Date date;

    private String transactionMedium;
    private int paymentPartnerId;
    private String importance;
}
