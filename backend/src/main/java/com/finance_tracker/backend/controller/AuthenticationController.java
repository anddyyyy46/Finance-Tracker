package com.finance_tracker.backend.controller;

import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.dto.LoginUserDto;
import com.finance_tracker.backend.Exception.InvalidAttributeException;
import com.finance_tracker.backend.Exception.InvalidRefreshTokenException;
import com.finance_tracker.backend.dto.CreateUserDto;
import com.finance_tracker.backend.response.LoginResponse;
import com.finance_tracker.backend.service.AuthenticationService;
import com.finance_tracker.backend.service.JwtService;

import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpHeaders;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    @Value("${system.environment}")
    private String system;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody @Valid CreateUserDto registerUserDto, BindingResult result) {
        if (result.hasErrors()) {
            throw new InvalidAttributeException("Fehlerhafte Eingaben: " + result.getAllErrors());
        }
        if (!authenticationService.isUniqueEmail(registerUserDto.getEmail())) {
            throw new InvalidAttributeException("Email is not unique");
        }
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);

    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto,
            HttpServletResponse response) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String accessToken = jwtService.generateToken(authenticatedUser);
        String refreshToken = jwtService.generateRefreshToken(authenticatedUser);

        // LoginResponse loginResponse = new LoginResponse(accessToken, refreshToken,
        // jwtService.getExpirationTime());

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", accessToken)
                .httpOnly(true) // Verhindert den Zugriff über JavaScript
                .secure(system == "dev") // Nur über HTTPS (sicher)
                .path("/") // Gilt für die gesamte Domain
                .maxAge(jwtService.getExpirationTime()) // Gültigkeit: 15 Minuten
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true) // Verhindert den Zugriff über JavaScript
                .secure(system == "dev") // Nur über HTTPS (sicher)
                .path("/") // Gilt für die gesamte Domain
                .maxAge(jwtService.getJwtRefreshExpiration()) // Gültigkeit: 7 Tage
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok("Successful");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        if (jwtService.isRefreshTokenValid(refreshToken)) {
            String email = jwtService.extractUsername(refreshToken);
            User user = jwtService.loadUserByUsername(email);
            if (jwtService.isTokenValid(refreshToken, user)) {
                String newAccessToken = jwtService.generateToken(user);
                String newRefreshToken = jwtService.generateRefreshToken(user);
                LoginResponse loginResponse = new LoginResponse(newAccessToken, newRefreshToken,
                        jwtService.getExpirationTime());
                return ResponseEntity.ok(loginResponse);
            } else {
                throw new InvalidRefreshTokenException("Invalid or expired refresh token");
            }
        } else {
            throw new InvalidRefreshTokenException("Invalid or expired refresh token");
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String accessBearerToken) {
        if (accessBearerToken == null || !accessBearerToken.startsWith("Bearer ")) {
            throw new MalformedJwtException("");
        }
        String accessToken = accessBearerToken.substring(7);
        String email = jwtService.extractUsername(accessToken);
        User user = jwtService.loadUserByUsername(email);
        if (jwtService.isTokenValid(accessToken, user)) {
            return ResponseEntity.ok("Successfully validated");
        } else {
            throw new InvalidRefreshTokenException("Invalid or expired access token");
        }

    }
}