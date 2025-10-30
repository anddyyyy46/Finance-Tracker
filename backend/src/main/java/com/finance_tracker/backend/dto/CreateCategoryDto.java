package com.finance_tracker.backend.dto;


import jakarta.validation.constraints.NotNull;

public class CreateCategoryDto {

    @NotNull(message = "Titel wird benötigt")
    private String title;
    private String description;
    private String color;


    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }


}
