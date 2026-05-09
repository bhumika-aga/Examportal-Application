package com.examportal.service.impl;

import com.examportal.model.quiz.Category;
import com.examportal.repository.CategoryRepository;
import com.examportal.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    @Override
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(categoryRepository.findAll());
    }
    
    @Override
    public Category getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).get();
    }
    
    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}