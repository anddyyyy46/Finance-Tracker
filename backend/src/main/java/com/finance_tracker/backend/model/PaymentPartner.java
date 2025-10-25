package com.finance_tracker.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "transactions")
public class PaymentPartner extends ExtendedBaseEntity {

    @Column(nullable = false)
    private String name;

    private String contact;

    @Email(message = "Email muss ein gültiges Format haben")
    private String email;

    private String telNr;

    public PaymentPartner(String plainName) {
        this.name = plainName;
    }

    public PaymentPartner(String name, String contact, String email, String telNr) {
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.telNr = telNr;
    }
}
