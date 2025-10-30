package com.finance_tracker.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finance_tracker.backend.model.PaymentPartner;
import com.finance_tracker.backend.model.Transaction;

public interface PaymentPartnerRepository extends JpaRepository<PaymentPartner, Integer>{
    List<PaymentPartner> findByUserId(Integer userId);
    
}
