package com.finance_tracker.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class CreateUserDto {

    @NotEmpty(message = "E-Mail darf nicht leer sein")
    @Email(message = "Ungültige E-Mail Adresse")
    private String email;

    @NotEmpty(message = "Passwort darf nicht leer sein.")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])[A-Za-z\\d!@#\\$%\\^&\\*]{8,}$", message = "Passwort muss mindestens 8 Zeichen lang sein und ein Großbuchstabe, eine Zahl und ein Sonderzeichen enthalten.")
    private String password;

    private String fullname;

    @NotEmpty(message = "Benutzername darf nicht leer sein.")
    @Pattern(regexp = "^[a-zA-Z0-9_]{5,20}$", message = "Benutzername muss zwischen 5 und 20 Zeichen lang sein und nur Buchstaben, Zahlen oder Unterstriche enthalten.")
    private String username;

    public String getfullname() {
        return this.fullname;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setfullname(String fullname) {
        this.fullname = fullname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
