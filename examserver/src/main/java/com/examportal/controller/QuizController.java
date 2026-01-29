package com.examportal.controller;

import java.util.List;

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
import com.examportal.model.quiz.Quiz;
import com.examportal.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	private QuizService quizService;

	@PostMapping("/")
	public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
		Quiz newQuiz = quizService.addQuiz(quiz);
		return ResponseEntity.ok(newQuiz);
	}

	@GetMapping("/{quizId}")
	public Quiz getQuiz(@PathVariable Long quizId) {
		return quizService.getQuiz(quizId);
	}

	@GetMapping("/")
	public ResponseEntity<?> getAllQuizzes() {
		return ResponseEntity.ok(quizService.getAllQuiz());
	}

	@PutMapping("/")
	public Quiz updateQuiz(@RequestBody Quiz quiz) {
		return quizService.updateQuiz(quiz);
	}

	@DeleteMapping("/{quizId}")
	public void deleteQuiz(@PathVariable Long quizId) {
		quizService.deleteQuiz(quizId);
	}

	@GetMapping("/category/{cId}")
	public List<Quiz> GetQuizzesOfCategory(@PathVariable Long cId) {
		Category category = new Category();
		category.setcId(cId);
		return quizService.getQuizzesOfCategory(category);
	}

	@GetMapping("/active")
	public List<Quiz> getActiveQuizzes() {
		return quizService.getActiveQuizzes();
	}

	@GetMapping("/category/active/{cId}")
	public List<Quiz> getActiveQuizzes(@PathVariable Long cId) {
		Category category = new Category();
		category.setcId(cId);
		return quizService.getActiveQuizzesOfCategory(category);
	}
}