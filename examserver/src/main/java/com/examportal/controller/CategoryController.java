package com.examportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.model.quiz.Category;
import com.examportal.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

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