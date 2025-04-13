package com.finance_tracker.backend.service;

import com.finance_tracker.backend.Exception.UserNotFoundException;
import com.finance_tracker.backend.dto.CreateUserDto;
import com.finance_tracker.backend.dto.LoginUserDto;
import com.finance_tracker.backend.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserService userService,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(CreateUserDto input) {
        User user = new User(input, passwordEncoder);
        return userService.saveUser(user);
    }

    public User authenticate(LoginUserDto input) {
        if (input.getEmail() != null) {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()));
            return userService.getUserByEmail(input.getEmail());
        }
        throw new UserNotFoundException(input.getEmail());

    }

    public boolean isUniqueEmail(String email) {
        return !userService.userWithEmailExists(email);
    }
}
