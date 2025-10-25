package com.finance_tracker.backend.response;

import jakarta.servlet.http.Cookie;

public class LoginResponse {
    private Cookie token;

    private int expiresIn;

    private Cookie refreshToken;

    public Cookie getToken() {
        return token;
    }

    public LoginResponse() {
    }

    public LoginResponse(Cookie accessToken, Cookie refreshToken, Integer expirationTime) {
        this.token = accessToken;
        this.expiresIn = expirationTime;
        this.refreshToken = refreshToken;
    }

    public void setToken(Cookie token) {
        this.token = token;
    }

    public int getExpiresIn() {
        return this.expiresIn;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    public Cookie getRefreshToken() {
        return this.refreshToken;
    }

    public void setRefreshToken(Cookie refreshToken) {
        this.refreshToken = refreshToken;
    }

}
