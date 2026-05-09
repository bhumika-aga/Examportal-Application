package com.examportal.controller;

import com.examportal.model.quiz.Question;
import com.examportal.model.quiz.Quiz;
import com.examportal.service.QuestionService;
import com.examportal.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
public class QuestionController {
    
    private static final Logger logger = LoggerFactory.getLogger(QuestionController.class);
    
    private final QuestionService questionService;
    
    private final QuizService quizService;
    
    public QuestionController(QuestionService questionService, QuizService quizService) {
        this.questionService = questionService;
        this.quizService = quizService;
    }
    
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.addQuestion(question));
    }
    
    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable Long questionId) {
        return questionService.getQuestion(questionId);
    }
    
    @GetMapping("/")
    public ResponseEntity<?> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }
    
    @PutMapping("/")
    public Question updateQuestion(@RequestBody Question question) {
        return questionService.updateQuestion(question);
    }
    
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
    }
    
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable Long quizId) {
        Quiz quiz = quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList<>(questions);
        
        int noOfQuestions = 0;
        try {
            noOfQuestions = Integer.parseInt(quiz.getNoOfQuestions());
        } catch (NumberFormatException e) {
            logger.error("Invalid number of questions for quiz {}: {}", quizId, quiz.getNoOfQuestions());
            noOfQuestions = list.size();
        }
        
        if (list.size() > noOfQuestions) {
            list = list.subList(0, noOfQuestions);
        }
        
        list.forEach((q) -> {
            q.setAnswer("");
        });
        
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }
    
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setqId(quizId);
        Set<Question> questionsOfQuiz = questionService.getQuestionofQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }
    
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evaluateQuiz(@RequestBody List<Question> questions) {
        logger.info("Evaluating quiz with {} questions", questions.size());
        
        if (questions.isEmpty()) {
            return ResponseEntity.ok(Map.of("marksGot", 0, "correctAnswers", 0, "attempted", 0));
        }
        
        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;
        
        Quiz quiz = questions.get(0).getQuiz();
        double maxMarks = (quiz != null && quiz.getMaxMarks() != null)
                              ? Double.parseDouble(quiz.getMaxMarks())
                              : 0;
        double marksSingle = !questions.isEmpty() ? maxMarks / questions.size() : 0;
        
        for (Question q : questions) {
            Question question = questionService.get(q.getQuestionId());
            if (question != null && question.getAnswer().equals(q.getGivenAnswer())) {
                correctAnswers++;
                marksGot += marksSingle;
            }
            if (q.getGivenAnswer() != null && !q.getGivenAnswer().trim().isEmpty()) {
                attempted++;
            }
        }
        
        Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted",
            attempted);
        return ResponseEntity.ok(map);
    }
}