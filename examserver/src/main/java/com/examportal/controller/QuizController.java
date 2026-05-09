package com.examportal.controller;

import com.examportal.model.quiz.Category;
import com.examportal.model.quiz.Quiz;
import com.examportal.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {
    
    private final QuizService quizService;
    
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }
    
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