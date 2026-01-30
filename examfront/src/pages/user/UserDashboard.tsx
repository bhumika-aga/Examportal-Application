import { Route, Routes } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import CategoryList from "../admin/categories/CategoryList";
import Instructions from "./Instructions";
import LoadQuiz from "./LoadQuiz";
import Profile from "./Profile";
import StartQuiz from "./StartQuiz";

const WelcomeUser = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold dark:text-white">Welcome to Exam Portal</h1>
    <p className="mt-4 text-gray-600 dark:text-gray-400">
      Select a quiz category from the sidebar to get started.
    </p>
  </div>
);

export default function UserDashboard() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomeUser />} />
        <Route path="/categories" element={<CategoryList readOnly={true} />} />
        <Route path="/:catId" element={<LoadQuiz />} />
        <Route path="/instructions/:qId" element={<Instructions />} />
        <Route path="/start/:qId" element={<StartQuiz />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}
