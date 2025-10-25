package com.finance_tracker.backend.dto;

import com.finance_tracker.backend.model.User;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCategory {

    @NotNull(message = "title must be set")
    private String title;
    private String description;
    private String color;
    private Integer userId;

}
