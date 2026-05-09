package com.examportal.repository;

import com.examportal.model.quiz.Question;
import com.examportal.model.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    Set<Question> findByQuiz(Quiz quiz);
    
}