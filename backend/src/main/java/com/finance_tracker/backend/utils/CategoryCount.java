package com.finance_tracker.backend.utils;

import org.modelmapper.ModelMapper;

import com.finance_tracker.backend.dto.ReadCategoryDto;
import com.finance_tracker.backend.model.Category;

public class CategoryCount {
    private ReadCategoryDto category;
    private Integer count;


    public CategoryCount() {
    }

    public CategoryCount(Category category, Long count) {
        ModelMapper modelMapper = new ModelMapper();
        this.category = modelMapper.map(category, ReadCategoryDto.class);
        //this.category = category;
        this.count = count.intValue();
    }


    public ReadCategoryDto getCategory() {
        return this.category;
    }

    public void setCategory(ReadCategoryDto category) {
        this.category = category;
    }

    public Integer getCount() {
        return this.count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
   


}
