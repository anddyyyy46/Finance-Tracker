package com.finance_tracker.backend.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.finance_tracker.backend.dto.CreateCategoryDto;
import com.finance_tracker.backend.dto.ReadCategoryDto;
import com.finance_tracker.backend.model.Category;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.service.CategoryService;

@RestController
public class CategoryController {

    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/category")
    public ReadCategoryDto createCategory(@AuthenticationPrincipal User user, @RequestBody CreateCategoryDto category) {
        return this.categoryService.createCategory(category, user);
    }

    @GetMapping("/category")
    public List<ReadCategoryDto> getAllCategories(@AuthenticationPrincipal User user){
        return this.categoryService.getCategoryFromUser(user);
    }
}
