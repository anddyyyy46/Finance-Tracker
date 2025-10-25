package com.finance_tracker.backend.dto;

import java.util.Date;

import com.finance_tracker.backend.model.Category;
import com.finance_tracker.backend.model.PaymentPartner;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTransaction {
    private Integer categoryId;

    @NotNull(message = "amount must be set")
    private Double amount;

    private Date date;
    private String transactionMedium;
    private PaymentPartner paymentPartner;
    private String importance;

}
