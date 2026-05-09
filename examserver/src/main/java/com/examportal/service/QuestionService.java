package com.examportal.service;

import com.examportal.model.quiz.Question;
import com.examportal.model.quiz.Quiz;

import java.util.Set;

public interface QuestionService {
    
    Question addQuestion(Question question);
    
    Question updateQuestion(Question question);
    
    Set<Question> getAllQuestions();
    
    Question getQuestion(Long questionId);
    
    void deleteQuestion(Long questionId);
    
    Set<Question> getQuestionofQuiz(Quiz quiz);
    
    Question get(Long questionId);
}