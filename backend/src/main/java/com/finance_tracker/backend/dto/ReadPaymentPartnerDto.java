package com.finance_tracker.backend.dto;

public class ReadPaymentPartnerDto {
 
    private Integer id;

    private String name;

    private String contact;

    private String email;

    private String telNr;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getTelNr() {
        return this.telNr;
    }

    public void setTelNr(String telNr) {
        this.telNr = telNr;
    }


}
