package com.examportal.repository;

import com.examportal.model.quiz.Category;
import com.examportal.model.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCategory(Category category);
    
    List<Quiz> findByActive(Boolean b);
    
    List<Quiz> findByCategoryAndActive(Category category, Boolean b);
}