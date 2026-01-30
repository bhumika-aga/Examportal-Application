import { AlertCircle, BookOpen, Clock, Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTransition from "../../../components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { useDeleteQuiz, useQuizzes, useQuizzesOfCategory } from "../../../hooks/useQuiz";

export default function QuizList() {
  const { catId } = useParams();
  const { data: allQuizzes, isLoading: isLoadingAll } = useQuizzes();
  const { data: catQuizzes, isLoading: isLoadingCat } = useQuizzesOfCategory(
    catId ? Number(catId) : null
  );
  const deleteQuizMutation = useDeleteQuiz();
  const navigate = useNavigate();

  const quizzes = catId ? catQuizzes : allQuizzes;
  const isLoading = catId ? isLoadingCat : isLoadingAll;
  const categoryTitle = catId && quizzes?.length ? quizzes[0].category.title : null;

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteQuizMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <PageTransition className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {categoryTitle ? `Quizzes: ${categoryTitle}` : "Quizzes"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {categoryTitle ? `Manage quizzes for ${categoryTitle}` : "Manage all quizzes"}
          </p>
        </div>
        <Link
          to="/admin/add-quiz"
          className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          Add Quiz
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes?.map((quiz) => (
          <Card
            key={quiz.qId}
            className="group relative overflow-hidden flex flex-col h-full hover:border-indigo-200 dark:hover:border-indigo-900"
          >
            <CardHeader className="flex justify-between items-start pb-2">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                <BookOpen size={24} />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/admin/quiz/${quiz.qId}`)}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(quiz.qId)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <CardTitle className="mb-2 line-clamp-1">{quiz.title}</CardTitle>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                {quiz.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                <div className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">
                  <span className="mr-1">{quiz.category.title}</span>
                </div>
                <div className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">
                  <Clock size={12} className="mr-1" />
                  {quiz.maxMarks} Marks
                </div>
                <div className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">
                  <AlertCircle size={12} className="mr-1" />
                  {quiz.noOfQuestions} Qs
                </div>
              </div>
            </CardContent>

            <div
              className={`mt-4 pt-3 border-t border-gray-100 dark:border-zinc-700 flex justify-between items-center text-xs font-medium ${quiz.active ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}
            >
              <span>{quiz.active ? "Published" : "Draft"}</span>
              <Link
                to={`/admin/view-questions/${quiz.qId}/${encodeURIComponent(quiz.title)}`}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
              >
                View Questions
              </Link>
            </div>
          </Card>
        ))}
        {quizzes?.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white dark:bg-zinc-800 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700">
            <p className="text-gray-500 dark:text-gray-400">
              No quizzes found. Create one to get started.
            </p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
