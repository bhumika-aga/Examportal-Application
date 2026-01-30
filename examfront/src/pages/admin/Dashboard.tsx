import { Route, Routes } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Welcome from "./Welcome";
import AddCategory from "./categories/AddCategory";
import CategoryList from "./categories/CategoryList";
import AddQuestion from "./questions/AddQuestion";
import ViewQuestions from "./questions/ViewQuestions";
import AddQuiz from "./quizzes/AddQuiz";
import QuizList from "./quizzes/QuizList";
import UpdateQuiz from "./quizzes/UpdateQuiz";

// Placeholder components for other routes
import Profile from "../user/Profile";

export default function Dashboard() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/quiz/:qId" element={<UpdateQuiz />} />
        <Route path="/view-questions/:qId/:title" element={<ViewQuestions />} />
        <Route path="/add-question/:qId/:title" element={<AddQuestion />} />
      </Routes>
    </Layout>
  );
}
