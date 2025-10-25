package com.finance_tracker.backend.model;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.finance_tracker.backend.dto.CreateUserDto;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User extends BaseEntity implements UserDetails {

    @Column(nullable = false)
    private String fullname;

    @Column(nullable = false)
    private String username;

    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Category> categories;

    public User(CreateUserDto input, PasswordEncoder passwordEncoder) {
        this.fullname = input.getfullname();
        this.email = input.getEmail();
        this.username = input.getUsername();
        this.password = passwordEncoder.encode(input.getPassword());
    }

    public String getPassword() {
        return password;
    }

    public String getRealUsername() {
        return username;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public User() {
    }

    public User(Integer id, String fullname, String username, String email, String password, Date createdAt,
            Date updatedAt) {
        super(id, createdAt, updatedAt);
        this.fullname = fullname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getfullname() {
        return this.fullname;
    }

    public void setfullname(String fullname) {
        this.fullname = fullname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}