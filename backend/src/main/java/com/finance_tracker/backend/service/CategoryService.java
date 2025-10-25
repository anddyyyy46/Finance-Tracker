package com.finance_tracker.backend.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.finance_tracker.backend.dto.CreateCategory;
import com.finance_tracker.backend.model.Category;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;

    public CategoryService(CategoryRepository categoryRepository, ModelMapper mapper) {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    public Category createCategory(CreateCategory createCategory) {
        Category category = mapper.map(createCategory, Category.class);
        return this.saveCategory(category);
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category getCategory(Integer id) {
        return categoryRepository.findById(id).orElseThrow();
    }

    public List<Category> getCategoryFromUser(User user) {
        return categoryRepository.findByUserId(user.getId());
    }

    public Category updateCategory(Integer id, Category newCategory) {
        Category oldCategory = this.getCategory(id);
        BeanUtils.copyProperties(newCategory, oldCategory);
        return this.saveCategory(oldCategory);
    }

}
