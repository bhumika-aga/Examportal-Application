package com.examportal.config;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.examportal.model.Role;
import com.examportal.model.User;
import com.examportal.model.UserRole;
import com.examportal.model.quiz.Category;
import com.examportal.model.quiz.Question;
import com.examportal.model.quiz.Quiz;
import com.examportal.service.CategoryService;
import com.examportal.service.QuestionService;
import com.examportal.service.QuizService;
import com.examportal.service.UserService;

/**
 * Initializes the database with sample data on application startup.
 * Creates users, categories, quizzes, and questions for demonstration.
 */
@Component
public class DataInitializer implements CommandLineRunner {

        private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

        @Autowired
        private UserService userService;

        @Autowired
        private CategoryService categoryService;

        @Autowired
        private QuizService quizService;

        @Autowired
        private QuestionService questionService;

        @Autowired
        private BCryptPasswordEncoder bCryptPasswordEncoder;

        @Override
        public void run(String... args) throws Exception {
                logger.info("Initializing sample data...");

                // Create Users
                createAdminUser();
                createNormalUser();

                // Create Categories
                Category programming = createCategory("Programming",
                                "Questions related to programming languages and concepts");
                Category webDev = createCategory("Web Development",
                                "Questions about HTML, CSS, JavaScript, and web frameworks");
                Category database = createCategory("Database", "Questions about SQL, NoSQL, and database management");
                Category generalKnowledge = createCategory("General Knowledge",
                                "Questions about general knowledge and current affairs");

                // Create Quizzes
                if (programming != null) {
                        Quiz javaQuiz = createQuiz("Java Fundamentals",
                                        "Test your knowledge of Java programming basics", "100",
                                        "5", programming);
                        Quiz pythonQuiz = createQuiz("Python Basics", "Basic Python programming concepts and syntax",
                                        "80", "5",
                                        programming);

                        if (javaQuiz != null) {
                                createJavaQuestions(javaQuiz);
                        }
                        if (pythonQuiz != null) {
                                createPythonQuestions(pythonQuiz);
                        }
                }

                if (webDev != null) {
                        Quiz htmlCssQuiz = createQuiz("HTML & CSS Essentials", "Fundamental concepts of HTML and CSS",
                                        "60", "5",
                                        webDev);
                        Quiz jsQuiz = createQuiz("JavaScript Mastery", "Test your JavaScript knowledge", "100", "5",
                                        webDev);

                        if (htmlCssQuiz != null) {
                                createHtmlCssQuestions(htmlCssQuiz);
                        }
                        if (jsQuiz != null) {
                                createJavaScriptQuestions(jsQuiz);
                        }
                }

                if (database != null) {
                        Quiz sqlQuiz = createQuiz("SQL Fundamentals", "Basic SQL queries and database concepts", "80",
                                        "5",
                                        database);

                        if (sqlQuiz != null) {
                                createSqlQuestions(sqlQuiz);
                        }
                }

                if (generalKnowledge != null) {
                        Quiz gkQuiz = createQuiz("World Knowledge", "Test your general knowledge", "50", "5",
                                        generalKnowledge);

                        if (gkQuiz != null) {
                                createGeneralKnowledgeQuestions(gkQuiz);
                        }
                }

                logger.info("Sample data initialization complete!");
        }

        private void createAdminUser() {
                try {
                        User admin = new User();
                        admin.setUsername("admin");
                        admin.setPassword(bCryptPasswordEncoder.encode("admin123"));
                        admin.setFirstName("Admin");
                        admin.setLastName("User");
                        admin.setEmail("admin@examportal.com");
                        admin.setPhone("1234567890");
                        admin.setProfile("default.png");
                        admin.setEnabled(true);

                        Role adminRole = new Role();
                        adminRole.setRoleId(1L);
                        adminRole.setRoleName("ADMIN");

                        Set<UserRole> userRoles = new HashSet<>();
                        UserRole userRole = new UserRole();
                        userRole.setRole(adminRole);
                        userRole.setUser(admin);
                        userRoles.add(userRole);

                        userService.createUser(admin, userRoles);
                        logger.info("Admin user created: username='admin', password='admin123'");
                } catch (Exception e) {
                        logger.info("Admin user already exists, skipping creation.");
                }
        }

        private void createNormalUser() {
                try {
                        User user = new User();
                        user.setUsername("user");
                        user.setPassword(bCryptPasswordEncoder.encode("user123"));
                        user.setFirstName("Normal");
                        user.setLastName("User");
                        user.setEmail("user@examportal.com");
                        user.setPhone("0987654321");
                        user.setProfile("default.png");
                        user.setEnabled(true);

                        Role normalRole = new Role();
                        normalRole.setRoleId(2L);
                        normalRole.setRoleName("NORMAL");

                        Set<UserRole> userRoles = new HashSet<>();
                        UserRole userRole = new UserRole();
                        userRole.setRole(normalRole);
                        userRole.setUser(user);
                        userRoles.add(userRole);

                        userService.createUser(user, userRoles);
                        logger.info("Normal user created: username='user', password='user123'");
                } catch (Exception e) {
                        logger.info("Normal user already exists, skipping creation.");
                }
        }

        private Category createCategory(String title, String description) {
                try {
                        Category category = new Category();
                        category.setTitle(title);
                        category.setDescription(description);
                        Category saved = categoryService.addCategory(category);
                        logger.info("Category created: {}", title);
                        return saved;
                } catch (Exception e) {
                        logger.warn("Failed to create category {}: {}", title, e.getMessage());
                        return null;
                }
        }

        private Quiz createQuiz(String title, String description, String maxMarks, String noOfQuestions,
                        Category category) {
                try {
                        Quiz quiz = new Quiz();
                        quiz.setTitle(title);
                        quiz.setDescription(description);
                        quiz.setMaxMarks(maxMarks);
                        quiz.setNoOfQUestions(noOfQuestions);
                        quiz.setActive(true);
                        quiz.setCategory(category);
                        Quiz saved = quizService.addQuiz(quiz);
                        logger.info("Quiz created: {}", title);
                        return saved;
                } catch (Exception e) {
                        logger.warn("Failed to create quiz {}: {}", title, e.getMessage());
                        return null;
                }
        }

        private void createQuestion(Quiz quiz, String content, String opt1, String opt2, String opt3, String opt4,
                        String answer) {
                try {
                        Question question = new Question();
                        question.setContent(content);
                        question.setOption1(opt1);
                        question.setOption2(opt2);
                        question.setOption3(opt3);
                        question.setOption4(opt4);
                        question.setAnswer(answer);
                        question.setQuiz(quiz);
                        questionService.addQuestion(question);
                } catch (Exception e) {
                        logger.warn("Failed to create question: {}", e.getMessage());
                }
        }

        // ==================== JAVA QUESTIONS ====================
        private void createJavaQuestions(Quiz quiz) {
                createQuestion(quiz,
                                "Which keyword is used to define a class in Java?",
                                "class", "Class", "define", "struct",
                                "class");

                createQuestion(quiz,
                                "What is the default value of an int variable in Java?",
                                "null", "0", "1", "undefined",
                                "0");

                createQuestion(quiz,
                                "Which method is the entry point of a Java application?",
                                "start()", "run()", "main()", "init()",
                                "main()");

                createQuestion(quiz,
                                "What does JVM stand for?",
                                "Java Visual Machine", "Java Virtual Machine", "Java Variable Memory",
                                "Java Verified Module",
                                "Java Virtual Machine");

                createQuestion(quiz,
                                "Which of these is NOT a primitive data type in Java?",
                                "int", "boolean", "String", "char",
                                "String");

                logger.info("Java questions created for quiz: {}", quiz.getTitle());
        }

        // ==================== PYTHON QUESTIONS ====================
        private void createPythonQuestions(Quiz quiz) {
                createQuestion(quiz,
                                "What is the correct file extension for Python files?",
                                ".python", ".py", ".pt", ".pyt",
                                ".py");

                createQuestion(quiz,
                                "How do you create a variable with the value 5 in Python?",
                                "int x = 5", "x = 5", "var x = 5", "x := 5",
                                "x = 5");

                createQuestion(quiz,
                                "Which keyword is used to define a function in Python?",
                                "function", "define", "def", "func",
                                "def");

                createQuestion(quiz,
                                "What is the output of print(2 ** 3)?",
                                "6", "8", "9", "5",
                                "8");

                createQuestion(quiz,
                                "Which of these is a valid list in Python?",
                                "[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>",
                                "[1, 2, 3]");

                logger.info("Python questions created for quiz: {}", quiz.getTitle());
        }

        // ==================== HTML/CSS QUESTIONS ====================
        private void createHtmlCssQuestions(Quiz quiz) {
                createQuestion(quiz,
                                "What does HTML stand for?",
                                "Hyper Text Markup Language", "High Tech Modern Language",
                                "Hyper Transfer Markup Language",
                                "Home Tool Markup Language",
                                "Hyper Text Markup Language");

                createQuestion(quiz,
                                "Which HTML tag is used for the largest heading?",
                                "<heading>", "<h6>", "<h1>", "<head>",
                                "<h1>");

                createQuestion(quiz,
                                "What does CSS stand for?",
                                "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets",
                                "Colorful Style Sheets",
                                "Cascading Style Sheets");

                createQuestion(quiz,
                                "Which CSS property is used to change text color?",
                                "text-color", "font-color", "color", "foreground-color",
                                "color");

                createQuestion(quiz,
                                "Which HTML element is used to create a hyperlink?",
                                "<link>", "<a>", "<href>", "<hyperlink>",
                                "<a>");

                logger.info("HTML/CSS questions created for quiz: {}", quiz.getTitle());
        }

        // ==================== JAVASCRIPT QUESTIONS ====================
        private void createJavaScriptQuestions(Quiz quiz) {
                createQuestion(quiz,
                                "Which company developed JavaScript?",
                                "Microsoft", "Netscape", "Google", "Apple",
                                "Netscape");

                createQuestion(quiz,
                                "How do you declare a variable in modern JavaScript?",
                                "var x;", "variable x;", "let x;", "v x;",
                                "let x;");

                createQuestion(quiz,
                                "What is the correct way to write an array in JavaScript?",
                                "var arr = (1, 2, 3)", "var arr = [1, 2, 3]", "var arr = {1, 2, 3}",
                                "var arr = <1, 2, 3>",
                                "var arr = [1, 2, 3]");

                createQuestion(quiz,
                                "Which operator is used for strict equality in JavaScript?",
                                "==", "===", "=", "!=",
                                "===");

                createQuestion(quiz,
                                "What will console.log(typeof null) output?",
                                "null", "undefined", "object", "NaN",
                                "object");

                logger.info("JavaScript questions created for quiz: {}", quiz.getTitle());
        }

        // ==================== SQL QUESTIONS ====================
        private void createSqlQuestions(Quiz quiz) {
                createQuestion(quiz,
                                "Which SQL statement is used to extract data from a database?",
                                "GET", "EXTRACT", "SELECT", "PULL",
                                "SELECT");

                createQuestion(quiz,
                                "Which SQL keyword is used to sort the result-set?",
                                "SORT", "ORDER BY", "ARRANGE", "SORT BY",
                                "ORDER BY");

                createQuestion(quiz,
                                "What does SQL stand for?",
                                "Strong Question Language", "Structured Query Language", "Simple Query Language",
                                "Standard Query Language",
                                "Structured Query Language");

                createQuestion(quiz,
                                "Which SQL statement is used to insert new data in a database?",
                                "ADD", "INSERT INTO", "UPDATE", "CREATE",
                                "INSERT INTO");

                createQuestion(quiz,
                                "Which clause is used to filter records in SQL?",
                                "FILTER", "WHERE", "HAVING", "CONDITION",
                                "WHERE");

                logger.info("SQL questions created for quiz: {}", quiz.getTitle());
        }

        // ==================== GENERAL KNOWLEDGE QUESTIONS ====================
        private void createGeneralKnowledgeQuestions(Quiz quiz) {
                createQuestion(quiz,
                                "What is the capital of France?",
                                "London", "Berlin", "Paris", "Madrid",
                                "Paris");

                createQuestion(quiz,
                                "Which planet is known as the Red Planet?",
                                "Venus", "Jupiter", "Mars", "Saturn",
                                "Mars");

                createQuestion(quiz,
                                "What is the largest ocean on Earth?",
                                "Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean",
                                "Pacific Ocean");

                createQuestion(quiz,
                                "Who painted the Mona Lisa?",
                                "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo",
                                "Leonardo da Vinci");

                createQuestion(quiz,
                                "What is the chemical symbol for gold?",
                                "Go", "Gd", "Au", "Ag",
                                "Au");

                logger.info("General Knowledge questions created for quiz: {}", quiz.getTitle());
        }
}
