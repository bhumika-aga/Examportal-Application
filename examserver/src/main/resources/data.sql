-- ============================================================
-- Exam Portal - H2 Database Seed Script
-- Run via H2 console at /h2-console  (JDBC URL: jdbc:h2:mem:examportal)
-- Uses MERGE INTO for idempotency; safe to re-run.
-- NOTE: Passwords below are BCrypt-encoded representations of:
--   admin → admin123   |   user → user123   |   others → Pass@1234
-- ============================================================

-- ============================================================
-- 1. ROLES
-- ============================================================
MERGE INTO roles (role_id, role_name) KEY (role_id) VALUES (1, 'ADMIN'),
                                                           (2, 'NORMAL');

-- ============================================================
-- 2. USERS  (BCrypt-encoded passwords)
-- ============================================================
-- admin123
MERGE INTO users (id, username, password, first_name, last_name, email, phone, enabled, profile)
    KEY (id) VALUES (1, 'admin', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP0GkIr.c9yCl.GHse', 'Admin', 'User',
                     'admin@examportal.com', '9000000001', TRUE, 'default.png'),
                    (2, 'alice', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Alice', 'Johnson',
                     'alice@example.com', '9000000002', TRUE, 'default.png'),
                    (3, 'bob', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Bob', 'Smith',
                     'bob@example.com', '9000000003', TRUE, 'default.png'),
                    (4, 'carol', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Carol', 'White',
                     'carol@example.com', '9000000004', TRUE, 'default.png'),
                    (5, 'dave', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Dave', 'Brown',
                     'dave@example.com', '9000000005', TRUE, 'default.png'),
                    (6, 'eve', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Eve', 'Davis',
                     'eve@example.com', '9000000006', TRUE, 'default.png'),
                    (7, 'frank', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Frank', 'Miller',
                     'frank@example.com', '9000000007', TRUE, 'default.png'),
                    (8, 'grace', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Grace', 'Wilson',
                     'grace@example.com', '9000000008', TRUE, 'default.png'),
                    (9, 'heidi', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Heidi', 'Taylor',
                     'heidi@example.com', '9000000009', TRUE, 'default.png'),
                    (10, 'ivan', '$2a$10$XHVbXJ5RYbmHTukeUbU5euWtUhq6SqpPWlNeEaEz/xq3Kq5YmCFhe', 'Ivan', 'Anderson',
                     'ivan@example.com', '9000000010', TRUE, 'default.png');

-- ============================================================
-- 3. USER ROLES
-- ============================================================
MERGE INTO user_role (user_role_id, user_id, role_id) KEY (user_role_id) VALUES (1, 1, 1), -- admin  → ADMIN
                                                                                (2, 2, 2), -- alice  → NORMAL
                                                                                (3, 3, 2), -- bob    → NORMAL
                                                                                (4, 4, 2), -- carol  → NORMAL
                                                                                (5, 5, 2), -- dave   → NORMAL
                                                                                (6, 6, 2), -- eve    → NORMAL
                                                                                (7, 7, 2), -- frank  → NORMAL
                                                                                (8, 8, 2), -- grace  → NORMAL
                                                                                (9, 9, 2), -- heidi  → NORMAL
                                                                                (10, 10, 2);
-- ivan   → NORMAL

-- ============================================================
-- 4. CATEGORIES
-- ============================================================
MERGE INTO category (c_id, title, description) KEY (c_id) VALUES (1, 'Programming',
                                                                  'Core programming concepts, algorithms, and data structures'),
                                                                 (2, 'Web Development',
                                                                  'HTML, CSS, JavaScript, REST APIs, and web frameworks'),
                                                                 (3, 'Database',
                                                                  'SQL, NoSQL, normalization, indexing, and transactions'),
                                                                 (4, 'General Knowledge',
                                                                  'Science, history, geography, and current affairs'),
                                                                 (5, 'Data Science',
                                                                  'Statistics, ML concepts, Python data libraries, and visualization'),
                                                                 (6, 'Operating Systems',
                                                                  'Process management, memory, file systems, and concurrency');

-- ============================================================
-- 5. QUIZZES
-- ============================================================
MERGE INTO quiz (q_id, title, description, max_marks, no_of_questions, active, category_c_id)
    KEY (q_id) VALUES (1, 'Java Fundamentals', 'Core Java concepts: OOP, JVM, collections, and generics', '100', '10',
                       TRUE, 1),
                      (2, 'Python Basics', 'Python syntax, data types, comprehensions, and built-ins', '80', '8', TRUE,
                       1),
                      (3, 'Data Structures & Algos', 'Arrays, linked lists, trees, graphs, sorting, and complexity',
                       '100', '10', TRUE, 1),
                      (4, 'HTML & CSS Essentials', 'Semantic HTML5, CSS box model, flexbox, and grid', '60', '6', TRUE,
                       2),
                      (5, 'JavaScript Mastery', 'ES6+, closures, async/await, promises, and DOM manipulation', '100',
                       '10', FALSE, 2),
                      (6, 'React Fundamentals', 'Components, hooks, state management, and React Router', '80', '8',
                       TRUE, 2),
                      (7, 'SQL Fundamentals', 'SELECT, JOIN, aggregate functions, subqueries, and transactions', '80',
                       '8', TRUE, 3),
                      (8, 'Database Design', 'ER diagrams, normalization, indexing, and query optimization', '60', '6',
                       FALSE, 3),
                      (9, 'World Knowledge', 'Geography, world capitals, science facts, and world history', '50', '5',
                       TRUE, 4),
                      (10, 'Science & Technology', 'Physics, chemistry, biology fundamentals, and tech inventions',
                       '50', '5', TRUE, 4),
                      (11, 'Machine Learning Basics', 'Supervised vs unsupervised, bias-variance, evaluation metrics',
                       '80', '8', TRUE, 5),
                      (12, 'OS Concepts', 'Processes, threads, scheduling, virtual memory, and file systems', '80', '8',
                       TRUE, 6);

-- ============================================================
-- 6. QUESTIONS  (answer must exactly match one of the options)
-- ============================================================

-- ── Quiz 1: Java Fundamentals ──────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (1, 'Which keyword is used to define a class in Java?',
                              'class', 'Class', 'define', 'struct', 'class', NULL, 1),
                             (2, 'What is the default value of an int in Java?',
                              'null', '0', '1', 'undefined', '0', NULL, 1),
                             (3, 'Which method is the entry point of a Java application?',
                              'start()', 'run()', 'main()', 'init()', 'main()', NULL, 1),
                             (4, 'What does JVM stand for?',
                              'Java Visual Machine', 'Java Virtual Machine', 'Java Variable Memory',
                              'Java Verified Module',
                              'Java Virtual Machine', NULL, 1),
                             (5, 'Which of these is NOT a primitive type in Java?',
                              'int', 'boolean', 'String', 'char', 'String', NULL, 1),
                             (6, 'Which collection interface allows duplicate elements?',
                              'Set', 'Map', 'List', 'Queue', 'List', NULL, 1),
                             (7, 'What is autoboxing in Java?',
                              'Converting int to String', 'Automatic conversion between primitive and wrapper types',
                              'Garbage collection optimization', 'Thread synchronization',
                              'Automatic conversion between primitive and wrapper types', NULL, 1),
                             (8, 'Which access modifier makes a member accessible only within the class?',
                              'public', 'protected', 'default', 'private', 'private', NULL, 1),
                             (9, 'What keyword prevents a class from being subclassed?',
                              'static', 'sealed', 'final', 'abstract', 'final', NULL, 1),
                             (10, 'Which exception is thrown when accessing an out-of-bounds array index?',
                              'NullPointerException', 'IndexOutOfBoundsException', 'ArrayIndexOutOfBoundsException',
                              'IllegalArgumentException',
                              'ArrayIndexOutOfBoundsException', NULL, 1);

-- ── Quiz 2: Python Basics ──────────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (11, 'What is the correct file extension for Python files?',
                              '.python', '.py', '.pt', '.pyt', '.py', NULL, 2),
                             (12, 'How do you create a variable with value 5 in Python?',
                              'int x = 5', 'x = 5', 'var x = 5', 'x := 5', 'x = 5', NULL, 2),
                             (13, 'Which keyword defines a function in Python?',
                              'function', 'define', 'def', 'func', 'def', NULL, 2),
                             (14, 'What is the output of print(2 ** 3)?',
                              '6', '8', '9', '5', '8', NULL, 2),
                             (15, 'Which of these is a valid list in Python?',
                              '[1,2,3]', '{1,2,3}', '(1,2,3)', '<1,2,3>', '[1,2,3]', NULL, 2),
                             (16, 'What does len([1,2,3,4]) return?',
                              '3', '4', '5', 'error', '4', NULL, 2),
                             (17, 'Which method adds an element to the end of a list?',
                              'add()', 'push()', 'append()', 'insert()', 'append()', NULL, 2),
                             (18, 'What is the output of bool("") in Python?',
                              'True', 'False', 'None', 'Error', 'False', NULL, 2);

-- ── Quiz 3: Data Structures & Algorithms ──────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (19, 'What is the time complexity of binary search?',
                              'O(n)', 'O(log n)', 'O(n log n)', 'O(1)', 'O(log n)', NULL, 3),
                             (20, 'Which data structure uses LIFO order?',
                              'Queue', 'Stack', 'Heap', 'Tree', 'Stack', NULL, 3),
                             (21, 'What is the worst-case time complexity of QuickSort?',
                              'O(n log n)', 'O(n)', 'O(n²)', 'O(log n)', 'O(n²)', NULL, 3),
                             (22, 'Which traversal visits the root node first?',
                              'Inorder', 'Postorder', 'Preorder', 'Level-order', 'Preorder', NULL, 3),
                             (23, 'Which data structure is best for implementing a priority queue?',
                              'Stack', 'Linked List', 'Heap', 'Array', 'Heap', NULL, 3),
                             (24, 'What is the space complexity of merge sort?',
                              'O(1)', 'O(log n)', 'O(n)', 'O(n²)', 'O(n)', NULL, 3),
                             (25, 'A graph with no cycles is called?',
                              'Connected graph', 'DAG', 'Complete graph', 'Tree', 'DAG', NULL, 3),
                             (26, 'Which algorithm finds the shortest path in a weighted graph?',
                              'BFS', 'DFS', 'Dijkstra''s', 'Kruskal''s', 'Dijkstra''s', NULL, 3),
                             (27, 'What is the average time complexity of HashMap get() in Java?',
                              'O(n)', 'O(log n)', 'O(1)', 'O(n²)', 'O(1)', NULL, 3),
                             (28, 'Which sorting algorithm is stable by default?',
                              'QuickSort', 'HeapSort', 'Merge Sort', 'Selection Sort', 'Merge Sort', NULL, 3);

-- ── Quiz 4: HTML & CSS Essentials ─────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (29, 'What does HTML stand for?',
                              'Hyper Text Markup Language', 'High Tech Modern Language',
                              'Hyper Transfer Markup Language', 'Home Tool Markup Language',
                              'Hyper Text Markup Language', NULL, 4),
                             (30, 'Which HTML tag creates the largest heading?',
                              '<heading>', '<h6>', '<h1>', '<head>', '<h1>', NULL, 4),
                             (31, 'What does CSS stand for?',
                              'Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets',
                              'Colorful Style Sheets',
                              'Cascading Style Sheets', NULL, 4),
                             (32, 'Which CSS property changes text color?',
                              'text-color', 'font-color', 'color', 'foreground-color', 'color', NULL, 4),
                             (33, 'Which HTML element creates a hyperlink?',
                              '<link>', '<a>', '<href>', '<hyperlink>', '<a>', NULL, 4),
                             (34, 'Which CSS display value makes elements sit side-by-side?',
                              'block', 'inline-block', 'grid', 'none', 'inline-block', NULL, 4);

-- ── Quiz 5: JavaScript Mastery ────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (35, 'Which company developed JavaScript?',
                              'Microsoft', 'Netscape', 'Google', 'Apple', 'Netscape', NULL, 5),
                             (36, 'How do you declare a block-scoped variable in modern JS?',
                              'var x;', 'variable x;', 'let x;', 'v x;', 'let x;', NULL, 5),
                             (37, 'What is the correct way to write an array in JavaScript?',
                              'var a = (1,2,3)', 'var a = [1,2,3]', 'var a = {1,2,3}', 'var a = <1,2,3>',
                              'var a = [1,2,3]', NULL, 5),
                             (38, 'Which operator checks value AND type equality?',
                              '==', '===', '=', '!=', '===', NULL, 5),
                             (39, 'What does typeof null return?',
                              'null', 'undefined', 'object', 'NaN', 'object', NULL, 5),
                             (40, 'Which keyword is used to handle rejected promises?',
                              'then', 'catch', 'finally', 'reject', 'catch', NULL, 5),
                             (41, 'What is a closure in JavaScript?',
                              'A loop construct', 'A function with access to its outer scope''s variables',
                              'An error handler', 'A module pattern',
                              'A function with access to its outer scope''s variables', NULL, 5),
                             (42, 'Which method converts a JSON string to an object?',
                              'JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.decode()',
                              'JSON.parse()', NULL, 5),
                             (43, 'What does the spread operator (...) do?',
                              'Declares rest params', 'Expands an iterable into individual elements',
                              'Merges two functions', 'Defines a generator',
                              'Expands an iterable into individual elements', NULL, 5),
                             (44, 'Which Array method returns a new array with filtered elements?',
                              'map()', 'reduce()', 'filter()', 'find()', 'filter()', NULL, 5);

-- ── Quiz 6: React Fundamentals ────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (45, 'Which hook manages local state in a functional component?',
                              'useEffect', 'useContext', 'useState', 'useReducer', 'useState', NULL, 6),
                             (46, 'What does useEffect with an empty dependency array do?',
                              'Runs on every render', 'Runs only on mount', 'Runs on unmount only', 'Throws an error',
                              'Runs only on mount', NULL, 6),
                             (47, 'What is JSX?',
                              'A CSS preprocessor', 'A syntax extension for JS that looks like HTML',
                              'A testing library', 'A state management tool',
                              'A syntax extension for JS that looks like HTML', NULL, 6),
                             (48, 'Which prop is required when rendering a list in React?',
                              'id', 'name', 'key', 'ref', 'key', NULL, 6),
                             (49, 'What does React.memo do?',
                              'Memoizes the component output and skips re-render if props unchanged',
                              'Creates a context', 'Manages side effects', 'Defines a ref',
                              'Memoizes the component output and skips re-render if props unchanged', NULL, 6),
                             (50, 'Which hook subscribes to a React Context?',
                              'useState', 'useRef', 'useContext', 'useReducer', 'useContext', NULL, 6),
                             (51, 'What is the virtual DOM?',
                              'A browser API', 'A lightweight copy of the real DOM kept in memory',
                              'A CSS framework', 'A server-side rendering technique',
                              'A lightweight copy of the real DOM kept in memory', NULL, 6),
                             (52, 'Which lifecycle event does useEffect replace for class components?',
                              'constructor', 'render', 'componentDidMount / componentDidUpdate / componentWillUnmount',
                              'getDerivedStateFromProps',
                              'componentDidMount / componentDidUpdate / componentWillUnmount', NULL, 6);

-- ── Quiz 7: SQL Fundamentals ──────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (53, 'Which SQL statement extracts data from a table?',
                              'GET', 'EXTRACT', 'SELECT', 'PULL', 'SELECT', NULL, 7),
                             (54, 'Which SQL keyword sorts results?',
                              'SORT', 'ORDER BY', 'ARRANGE', 'SORT BY', 'ORDER BY', NULL, 7),
                             (55, 'What does SQL stand for?',
                              'Strong Question Language', 'Structured Query Language', 'Simple Query Language',
                              'Standard Query Language',
                              'Structured Query Language', NULL, 7),
                             (56, 'Which statement inserts new rows?',
                              'ADD', 'INSERT INTO', 'UPDATE', 'CREATE', 'INSERT INTO', NULL, 7),
                             (57, 'Which clause filters rows in SQL?',
                              'FILTER', 'WHERE', 'HAVING', 'CONDITION', 'WHERE', NULL, 7),
                             (58, 'Which JOIN returns all rows from both tables?',
                              'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'FULL OUTER JOIN', NULL, 7),
                             (59, 'Which aggregate function counts non-null values?',
                              'SUM()', 'AVG()', 'COUNT()', 'MAX()', 'COUNT()', NULL, 7),
                             (60, 'Which keyword removes duplicate rows from results?',
                              'UNIQUE', 'DISTINCT', 'FILTER', 'GROUP', 'DISTINCT', NULL, 7);

-- ── Quiz 8: Database Design ────────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (61, 'What does 3NF stand for?',
                              'Third Normal Form', 'Third Null Factor', 'Third Natural Form', 'Three Node Framework',
                              'Third Normal Form', NULL, 8),
                             (62, 'Which key uniquely identifies a row in a table?',
                              'Foreign key', 'Index key', 'Primary key', 'Composite key', 'Primary key', NULL, 8),
                             (63, 'What is an index used for?',
                              'To enforce constraints', 'To speed up query lookups',
                              'To normalize data', 'To backup tables',
                              'To speed up query lookups', NULL, 8),
                             (64, 'Which relationship type does a junction table implement?',
                              'One-to-One', 'One-to-Many', 'Many-to-Many', 'Self-referencing', 'Many-to-Many', NULL, 8),
                             (65, 'What does ACID stand for in transactions?',
                              'Atomicity, Consistency, Isolation, Durability',
                              'Accuracy, Correctness, Integrity, Dependability',
                              'Atomicity, Concurrency, Integrity, Data-integrity',
                              'Access, Control, Index, Data',
                              'Atomicity, Consistency, Isolation, Durability', NULL, 8),
                             (66, 'Which concept eliminates redundancy by splitting tables?',
                              'Denormalization', 'Partitioning', 'Normalization', 'Sharding', 'Normalization', NULL, 8);

-- ── Quiz 9: World Knowledge ────────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (67, 'What is the capital of France?',
                              'London', 'Berlin', 'Paris', 'Madrid', 'Paris', NULL, 9),
                             (68, 'Which planet is known as the Red Planet?',
                              'Venus', 'Jupiter', 'Mars', 'Saturn', 'Mars', NULL, 9),
                             (69, 'What is the largest ocean on Earth?',
                              'Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean', 'Pacific Ocean', NULL,
                              9),
                             (70, 'Who painted the Mona Lisa?',
                              'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo',
                              'Leonardo da Vinci', NULL, 9),
                             (71, 'What is the chemical symbol for gold?',
                              'Go', 'Gd', 'Au', 'Ag', 'Au', NULL, 9);

-- ── Quiz 10: Science & Technology ─────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (72, 'What is the speed of light in a vacuum?',
                              '3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s',
                              '3 × 10⁸ m/s', NULL, 10),
                             (73, 'What is the atomic number of carbon?',
                              '6', '12', '8', '14', '6', NULL, 10),
                             (74, 'Which organ pumps blood in the human body?',
                              'Lungs', 'Liver', 'Kidneys', 'Heart', 'Heart', NULL, 10),
                             (75, 'Who invented the telephone?',
                              'Thomas Edison', 'Nikola Tesla', 'Alexander Graham Bell', 'Albert Einstein',
                              'Alexander Graham Bell', NULL, 10),
                             (76, 'What does RAM stand for?',
                              'Read Access Memory', 'Random Access Memory', 'Rapid Application Memory',
                              'Read Arithmetic Memory',
                              'Random Access Memory', NULL, 10);

-- ── Quiz 11: Machine Learning Basics ──────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (77, 'Which type of ML uses labeled training data?',
                              'Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning',
                              'Semi-supervised Learning',
                              'Supervised Learning', NULL, 11),
                             (78, 'What is overfitting?',
                              'Model performs well on train but poorly on test data',
                              'Model performs poorly on both train and test data',
                              'Model has too few parameters',
                              'Model converges too slowly',
                              'Model performs well on train but poorly on test data', NULL, 11),
                             (79, 'Which metric measures classification accuracy?',
                              'RMSE', 'MAE', 'F1 Score', 'R²', 'F1 Score', NULL, 11),
                             (80, 'What is a confusion matrix used for?',
                              'Visualizing loss curves', 'Evaluating classification model performance',
                              'Tuning hyperparameters', 'Selecting features',
                              'Evaluating classification model performance', NULL, 11),
                             (81, 'Which algorithm is a decision-tree ensemble method?',
                              'Logistic Regression', 'K-Means', 'Random Forest', 'SVM', 'Random Forest', NULL, 11),
                             (82, 'What does gradient descent do?',
                              'Evaluates model accuracy', 'Minimizes the loss function iteratively',
                              'Splits data into train/test', 'Removes outliers',
                              'Minimizes the loss function iteratively', NULL, 11),
                             (83, 'What is the purpose of a validation set?',
                              'To train the model', 'To tune hyperparameters without touching the test set',
                              'To augment training data', 'To encode categorical variables',
                              'To tune hyperparameters without touching the test set', NULL, 11),
                             (84, 'Which of the following is an unsupervised algorithm?',
                              'Linear Regression', 'Naive Bayes', 'K-Means Clustering', 'Decision Tree',
                              'K-Means Clustering', NULL, 11);

-- ── Quiz 12: OS Concepts ──────────────────────────────────
MERGE INTO question (question_id, content, option1, option2, option3, option4, answer, image, quiz_q_id)
    KEY (question_id) VALUES (85, 'What is a deadlock?',
                              'When a CPU runs at 100%',
                              'When two or more processes wait on each other indefinitely',
                              'When memory is completely full',
                              'When the OS crashes',
                              'When two or more processes wait on each other indefinitely', NULL, 12),
                             (86, 'Which scheduling algorithm gives the shortest job priority?',
                              'FCFS', 'Round Robin', 'SJF (Shortest Job First)', 'Priority Scheduling',
                              'SJF (Shortest Job First)', NULL, 12),
                             (87, 'What is virtual memory?',
                              'Extra physical RAM', 'Disk space used as an extension of RAM',
                              'Cache memory', 'GPU memory', 'Disk space used as an extension of RAM', NULL, 12),
                             (88, 'What is a process?',
                              'A program stored on disk',
                              'An executing instance of a program',
                              'A hardware interrupt', 'A file system entry',
                              'An executing instance of a program', NULL, 12),
                             (89, 'Which system call creates a child process in Unix?',
                              'exec()', 'spawn()', 'fork()', 'create()', 'fork()', NULL, 12),
                             (90, 'What is thrashing in OS?',
                              'CPU cache overflow',
                              'Excessive paging causing low CPU utilization',
                              'Disk fragmentation',
                              'Memory leak',
                              'Excessive paging causing low CPU utilization', NULL, 12),
                             (91, 'Which file system is used by most Linux distributions?',
                              'NTFS', 'FAT32', 'ext4', 'HFS+', 'ext4', NULL, 12),
                             (92, 'What does a semaphore do in OS?',
                              'Allocates disk space',
                              'Controls access to a shared resource via a counter',
                              'Manages CPU scheduling',
                              'Handles network packets',
                              'Controls access to a shared resource via a counter', NULL, 12);
