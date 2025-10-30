package com.finance_tracker.backend.response;


public class StatusResponse {

    private Status status;
    private String text;

    public StatusResponse(Status status, String text) {
        this.status = status;
        this.text= text;
    }

    public enum Status {
        SUCCESS("Success"),
        ERROR("Error");

        private final String value;

        Status(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }


    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }


}
