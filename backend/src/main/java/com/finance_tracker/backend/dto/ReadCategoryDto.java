package com.finance_tracker.backend.dto;

public class ReadCategoryDto {
    
    private Integer id;
    private String title;
    private String description;
    private String color;



    public ReadCategoryDto() {
    }

    public ReadCategoryDto(Integer id) {
        this.id = id;
    }

    public ReadCategoryDto(Integer id, String title, String description, String color) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
