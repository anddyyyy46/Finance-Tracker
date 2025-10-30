package com.finance_tracker.backend.service;

import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.finance_tracker.backend.dto.CreatePaymentPartnerDto;
import com.finance_tracker.backend.dto.ReadCategoryDto;
import com.finance_tracker.backend.dto.ReadPaymentPartnerDto;
import com.finance_tracker.backend.model.Category;
import com.finance_tracker.backend.model.PaymentPartner;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.repository.PaymentPartnerRepository;


@Service
public class PaymentPartnerService {

    private final PaymentPartnerRepository partnerRepository;
    private final ModelMapper modelMapper;

    private PaymentPartnerService(PaymentPartnerRepository partnerRepository, ModelMapper modelMapper) {
        this.partnerRepository = partnerRepository;
        this.modelMapper = modelMapper;
    }

    public ReadPaymentPartnerDto createPaymentPartner(CreatePaymentPartnerDto createPaymentPartnerDto ,User user) {
        PaymentPartner partner = modelMapper.map(createPaymentPartnerDto, PaymentPartner.class);
        partner.setUser(user);
        PaymentPartner savedPartner = this.savePaymentPartner(partner);
        ReadPaymentPartnerDto readPaymentPartnerDto = modelMapper.map(savedPartner, ReadPaymentPartnerDto.class);
        return readPaymentPartnerDto;
        
    }

    public PaymentPartner savePaymentPartner(PaymentPartner paymentPartner) {
        return partnerRepository.save(paymentPartner);
    }

    public PaymentPartner getPaymentPartner(Integer id, User user) {
        PaymentPartner partner = partnerRepository.findById(id).orElseThrow();
        if(Objects.equals(partner.getUser().getId(), user.getId())){
            return partner;
        }
        return null;
    }

    public List<ReadPaymentPartnerDto> getPaymentPartnerFromUser(User user) {
        List<PaymentPartner> partner = partnerRepository.findByUserId(user.getId());
        List<ReadPaymentPartnerDto> readPaymentPartnerDtos = partner.stream()
                .map(p -> modelMapper.map(p, ReadPaymentPartnerDto.class)).toList();
        return readPaymentPartnerDtos;
    }

    public ReadPaymentPartnerDto updateCategory(Integer id, PaymentPartner newPaymentPartner, User user) {
        PaymentPartner oldPaymentPartner = this.getPaymentPartner(id, user);
        BeanUtils.copyProperties(newPaymentPartner, oldPaymentPartner);
        PaymentPartner paymentPartner =this.savePaymentPartner(oldPaymentPartner);
        ReadPaymentPartnerDto readPaymentPartnerDto = modelMapper.map(paymentPartner, ReadPaymentPartnerDto.class);
        return readPaymentPartnerDto;
    }
    
}
