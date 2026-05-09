package com.examportal.service.impl;

import com.examportal.model.quiz.Category;
import com.examportal.model.quiz.Quiz;
import com.examportal.repository.QuizRepository;
import com.examportal.service.QuizService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {
    
    private final QuizRepository quizRepository;
    
    public QuizServiceImpl(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }
    
    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    
    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    
    @Override
    public Set<Quiz> getAllQuiz() {
        return new HashSet<>(quizRepository.findAll());
    }
    
    @Override
    public Quiz getQuiz(Long quizId) {
        return quizRepository.findById(quizId).get();
    }
    
    @Override
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }
    
    @Override
    public List<Quiz> getQuizzesOfCategory(Category category) {
        return quizRepository.findByCategory(category);
    }
    
    @Override
    public List<Quiz> getActiveQuizzes() {
        return quizRepository.findByActive(true);
    }
    
    @Override
    public List<Quiz> getActiveQuizzesOfCategory(Category category) {
        return quizRepository.findByCategoryAndActive(category, true);
    }
}