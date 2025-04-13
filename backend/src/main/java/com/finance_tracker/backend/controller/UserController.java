package com.finance_tracker.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.finance_tracker.backend.dto.ReadUserDto;
import com.finance_tracker.backend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<ReadUserDto> getUserDetails(Authentication authentication) {
        ReadUserDto readUserDto = userService.getUserDetails(authentication);

        return ResponseEntity.ok(readUserDto);
    }
}
