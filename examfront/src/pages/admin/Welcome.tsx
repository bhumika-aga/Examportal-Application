import PageTransition from "../../components/layout/PageTransition";
import { useAuth } from "../../context/AuthContext";

export default function Welcome() {
  const { user } = useAuth();

  return (
    <PageTransition className="space-y-6 p-8">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-8 transition-all hover:shadow-md border border-gray-100 dark:border-zinc-700">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Here's what's happening in your exam portal today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white shadow-lg transform transition-transform hover:scale-[1.02]">
          <div className="text-indigo-100 text-sm font-medium mb-1">Total Users</div>
          <div className="text-3xl font-bold">1,234</div>
        </div>

        <div className="h-32 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg transform transition-transform hover:scale-[1.02]">
          <div className="text-purple-100 text-sm font-medium mb-1">Active Quizzes</div>
          <div className="text-3xl font-bold">42</div>
        </div>

        <div className="h-32 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-white shadow-lg transform transition-transform hover:scale-[1.02]">
          <div className="text-pink-100 text-sm font-medium mb-1">Categories</div>
          <div className="text-3xl font-bold">12</div>
        </div>
      </div>
    </PageTransition>
  );
}
