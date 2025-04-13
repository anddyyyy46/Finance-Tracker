package com.finance_tracker.backend.response;

public class LoginResponse {
    private String token;

    private long expiresIn;

    private String refreshToken;

    public String getToken() {
        return token;
    }

    public LoginResponse() {
    }

    public LoginResponse(String accessToken, String refreshToken, Long expirationTime) {
        this.token = accessToken;
        this.expiresIn = expirationTime;
        this.refreshToken = refreshToken;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return this.expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public String getRefreshToken() {
        return this.refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
