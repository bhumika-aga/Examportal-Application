import { BookOpen, Grid3X3 } from "lucide-react";
import PageTransition from "../../components/layout/PageTransition";
import { useAuth } from "../../context/AuthContext";
import { useCategories } from "../../hooks/useCategory";
import { useQuizzes } from "../../hooks/useQuiz";

export default function Welcome() {
  const { user } = useAuth();
  const { data: categories } = useCategories();
  const { data: quizzes } = useQuizzes();

  const activeQuizzes = quizzes?.filter((q) => q.active).length ?? 0;
  const totalCategories = categories?.length ?? 0;

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white shadow-lg transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-indigo-100 text-sm font-medium">Active Quizzes</div>
            <BookOpen size={20} className="text-indigo-200" />
          </div>
          <div className="text-4xl font-bold">{activeQuizzes}</div>
          <div className="text-indigo-200 text-sm mt-1">of {quizzes?.length ?? 0} total</div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-purple-100 text-sm font-medium">Categories</div>
            <Grid3X3 size={20} className="text-purple-200" />
          </div>
          <div className="text-4xl font-bold">{totalCategories}</div>
          <div className="text-purple-200 text-sm mt-1">quiz categories</div>
        </div>
      </div>
    </PageTransition>
  );
}
