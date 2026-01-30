import { useParams, Link } from "react-router-dom";
import { useQuizzes } from "../../hooks/useQuiz";
import { Loader2, PlayCircle } from "lucide-react";

export default function LoadQuiz() {
  const { catId } = useParams();
  const { data: allQuizzes, isLoading } = useQuizzes();

  // Filter quizzes based on category ID from URL (0 means all)
  const quizzes =
    catId && catId !== "0"
      ? allQuizzes?.filter((q) => q.category.cId === Number(catId) && q.active)
      : allQuizzes?.filter((q) => q.active);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {catId === "0" || !catId ? "All Quizzes" : "Quizzes"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Select a quiz to start</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes?.map((quiz) => (
          <div
            key={quiz.qId}
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                {quiz.title}
              </h3>
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 mb-4">
                {quiz.category?.title}
              </span>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                {quiz.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>{quiz.noOfQuestions} Questions</span>
                <span>{quiz.maxMarks} Marks</span>
              </div>

              <Link
                to={`/user-dashboard/instructions/${quiz.qId}`}
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <PlayCircle size={20} className="mr-2" />
                Start
              </Link>
            </div>
          </div>
        ))}
        {quizzes?.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white dark:bg-zinc-800 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700">
            <p className="text-gray-500 dark:text-gray-400">
              No active quizzes found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
