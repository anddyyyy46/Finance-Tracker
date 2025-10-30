package com.finance_tracker.backend.service;

import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.finance_tracker.backend.dto.CreateCategoryDto;
import com.finance_tracker.backend.dto.ReadCategoryDto;
import com.finance_tracker.backend.dto.ReadTransactionDto;
import com.finance_tracker.backend.model.Category;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public CategoryService(CategoryRepository categoryRepository, ModelMapper mapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = mapper;
    }

    public ReadCategoryDto createCategory(CreateCategoryDto createCategory, User user) {
        Category category = modelMapper.map(createCategory, Category.class);
        category.setUser(user);
        Category savedCategory = this.saveCategory(category);
        ReadCategoryDto readCategoryDto = modelMapper.map(savedCategory, ReadCategoryDto.class);
        return readCategoryDto;
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category getCategory(Integer id, User user) {
        Category category = categoryRepository.findById(id).orElseThrow();
        if(Objects.equals(category.getUser().getId(), user.getId())){
            return category;
        }
        return null;
    }

    public List<ReadCategoryDto> getCategoryFromUser(User user) {
        List<Category> categorys = categoryRepository.findByUserId(user.getId());
        List<ReadCategoryDto> readCategoryDtos = categorys.stream()
                .map(c -> modelMapper.map(c, ReadCategoryDto.class)).toList();
        return readCategoryDtos;
    }

    public ReadCategoryDto updateCategory(Integer id, Category newCategory, User user) {
        Category oldCategory = this.getCategory(id, user);
        BeanUtils.copyProperties(newCategory, oldCategory);
        Category category =this.saveCategory(oldCategory);
        ReadCategoryDto readCategoryDto = modelMapper.map(category, ReadCategoryDto.class);
        return readCategoryDto;
    }

}
