package com.examportal.controller;

import com.examportal.model.quiz.Category;
import com.examportal.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
public class CategoryController {
    
    private final CategoryService categoryService;
    
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    
    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category newCategory = categoryService.addCategory(category);
        return ResponseEntity.ok(newCategory);
    }
    
    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable Long categoryId) {
        return categoryService.getCategory(categoryId);
    }
    
    @GetMapping("/")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }
    
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category) {
        return categoryService.updateCategory(category);
    }
    
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}