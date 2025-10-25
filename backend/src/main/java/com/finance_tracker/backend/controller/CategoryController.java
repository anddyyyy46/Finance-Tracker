package com.finance_tracker.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance_tracker.backend.dto.CreateCategory;
import com.finance_tracker.backend.model.Category;
import com.finance_tracker.backend.service.CategoryService;

@RestController
public class CategoryController {

    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/category")
    public Category createCategory(CreateCategory category) {
        return this.categoryService.createCategory(category);
    }
}
