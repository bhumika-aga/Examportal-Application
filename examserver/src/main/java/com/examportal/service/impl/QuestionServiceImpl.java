package com.examportal.service.impl;

import com.examportal.model.quiz.Question;
import com.examportal.model.quiz.Quiz;
import com.examportal.repository.QuestionRepository;
import com.examportal.service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {
    
    private final QuestionRepository questionRepository;
    
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }
    
    @Override
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }
    
    @Override
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }
    
    @Override
    public Set<Question> getAllQuestions() {
        return new HashSet<>(questionRepository.findAll());
    }
    
    @Override
    public Question getQuestion(Long questionId) {
        return questionRepository.findById(questionId).get();
    }
    
    @Override
    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
    }
    
    @Override
    public Set<Question> getQuestionofQuiz(Quiz quiz) {
        return questionRepository.findByQuiz(quiz);
    }
    
    @Override
    public Question get(Long questionId) {
        return questionRepository.findById(questionId).get();
    }
}