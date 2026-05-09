package com.examportal.service;

import com.examportal.model.quiz.Category;
import com.examportal.model.quiz.Quiz;

import java.util.List;
import java.util.Set;

public interface QuizService {
    
    Quiz addQuiz(Quiz quiz);
    
    Quiz updateQuiz(Quiz quiz);
    
    Set<Quiz> getAllQuiz();
    
    Quiz getQuiz(Long quizId);
    
    void deleteQuiz(Long quizId);
    
    List<Quiz> getQuizzesOfCategory(Category category);
    
    List<Quiz> getActiveQuizzes();
    
    List<Quiz> getActiveQuizzesOfCategory(Category category);
}