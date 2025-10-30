package com.finance_tracker.backend.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;


@Entity
@Table(name = "paymentpartner")
public class PaymentPartner extends ExtendedBaseEntity {

    @Column(nullable = false)
    private String name;

    private String contact;

    @Email(message = "Email muss ein gültiges Format haben")
    private String email;

    private String telnr;

    @OneToMany(mappedBy = "paymentPartner", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Transaction> transactions = new ArrayList<>();;

    public PaymentPartner(){

    }

    public PaymentPartner(String plainName) {
        this.name = plainName;
    }

    public PaymentPartner(String name, String contact, String email, String telNr) {
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.telnr = telNr;
    }


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

    public String getTelnr() {
        return this.telnr;
    }

    public void setTelnr(String telnr) {
        this.telnr = telnr;
    }

    public List<Transaction> getTransactions() {
        return this.transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

}
