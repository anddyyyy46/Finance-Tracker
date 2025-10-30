package com.finance_tracker.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;

public class CreatePaymentPartnerDto {
    
    @NotEmpty(message = "Name wird benötigt")
    private String name;

    private String contact;

    private String email;

    private String telNr;



    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return this.contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelNr() {
        return this.telNr;
    }

    public void setTelNr(String telNr) {
        this.telNr = telNr;
    }


}
