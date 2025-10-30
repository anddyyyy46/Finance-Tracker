package com.finance_tracker.backend.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.finance_tracker.backend.dto.CreateCategoryDto;
import com.finance_tracker.backend.dto.CreatePaymentPartnerDto;
import com.finance_tracker.backend.dto.ReadPaymentPartnerDto;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.service.PaymentPartnerService;

@RestController
public class PaymentPartnerController {

    private PaymentPartnerService partnerService;

    public PaymentPartnerController(PaymentPartnerService partnerService){
        this.partnerService = partnerService;
    }

    @PostMapping("/paymentpartner")
    public ReadPaymentPartnerDto createPaymentPartner(@AuthenticationPrincipal User user, @RequestBody CreatePaymentPartnerDto createPaymentPartnerDto) {
        return this.partnerService.createPaymentPartner(createPaymentPartnerDto, user);
    }

    @GetMapping("/paymentpartner")
    public List<ReadPaymentPartnerDto> getAllPaymentPartner(@AuthenticationPrincipal User user){
        return this.partnerService.getPaymentPartnerFromUser(user);
    }

    
}
